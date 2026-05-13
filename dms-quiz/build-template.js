// build.js / build-v2.js から共通利用される、生成スクリプト本体テンプレート
// 「__QUIZ_DATA__」「__QUIZ_VERSION__」「__WEBHOOK_URL__」を置換して使う
module.exports = function buildScript(quizDataJson, version, webhookUrl) {
    return `// DMS 問題集 (自動生成) - 結果送信機能付き
const QUIZ_DATA = ${quizDataJson};
const QUIZ_VERSION = ${JSON.stringify(version)};
const WEBHOOK_URL = ${JSON.stringify(webhookUrl)};

let currentQuestionIndex = 0;
let failCount = 0;
let correctCount = 0;
const chapterStats = {};
let userInfo = { name: '', department: '' };
let questionLog = [];
let startedAt = null;
let questionStartedAt = null;
let currentQAttempts = [];

document.addEventListener('DOMContentLoaded', () => {
    // 章ごとの初期化
    QUIZ_DATA.forEach(q => {
        if (!chapterStats[q.chapter]) {
            chapterStats[q.chapter] = { total: 0, correct: 0 };
        }
        chapterStats[q.chapter].total++;
    });

    // localStorage から名前・部署を読む。無ければ top.html にリダイレクト
    const saved = JSON.parse(localStorage.getItem('dms_quiz_user') || '{}');
    if (!saved.name || !saved.department) {
        window.location.href = 'top.html';
        return;
    }

    userInfo.name = saved.name;
    userInfo.department = saved.department;
    startedAt = new Date();
    renderQuestion(0);
});

// ========== クイズ進行 ==========
function renderQuestion(index) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    if (index >= QUIZ_DATA.length) {
        showResult();
        return;
    }

    const q = QUIZ_DATA[index];
    failCount = 0;
    currentQAttempts = [];
    questionStartedAt = new Date();

    const card = document.createElement('div');
    card.className = 'quiz-card fade-in';

    const header = document.createElement('div');
    header.className = 'quiz-header';
    header.innerHTML = \`<span class="chapter-badge">\${escapeHtml(q.chapter)}</span>
                        <h2>\${escapeHtml(q.id)}. \${escapeHtml(q.text)}</h2>\`;
    card.appendChild(header);

    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = \`<span class="option-number">\${idx + 1}</span> \${escapeHtml(opt)}\`;
        btn.onclick = () => handleAnswer(idx, q.answerIndex, btn);
        optionsList.appendChild(btn);
    });
    card.appendChild(optionsList);

    const feedback = document.createElement('div');
    feedback.id = 'feedback-area';
    feedback.className = 'feedback';
    card.appendChild(feedback);

    container.appendChild(card);
    updateProgress(index + 1, QUIZ_DATA.length);
}

function handleAnswer(selectedIndex, correctIndex, btnElement) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    const q = QUIZ_DATA[currentQuestionIndex];
    currentQAttempts.push(selectedIndex);

    if (selectedIndex === correctIndex) {
        // 採点: 1回目正解=1点、2回目正解=0.5点
        if (failCount === 0) {
            correctCount += 1;
            chapterStats[q.chapter].correct += 1;
        } else if (failCount === 1) {
            correctCount += 0.5;
            chapterStats[q.chapter].correct += 0.5;
        }
        showOverlay('circle');
        btnElement.classList.add('correct-answer');
        recordQuestionLog(correctIndex, true);
        setTimeout(() => showExplanation(true, correctIndex, q.explanation, failCount), 800);
    } else {
        failCount++;
        btnElement.classList.add('wrong-answer');

        if (failCount < 2) {
            showOverlay('cross');
            const feedback = document.getElementById('feedback-area');
            const remaining = 2 - failCount;
            feedback.innerHTML = \`<span class="incorrect-text">不正解！ 残り\${remaining}回挑戦できます。</span>\`;
            setTimeout(() => {
                buttons.forEach(btn => {
                    if (!btn.classList.contains('wrong-answer')) {
                        btn.disabled = false;
                    }
                });
            }, 1000);
        } else {
            showOverlay('cross');
            buttons[correctIndex].classList.add('correct-answer');
            recordQuestionLog(correctIndex, false);
            setTimeout(() => showExplanation(false, correctIndex, q.explanation, 2), 800);
        }
    }
}

function recordQuestionLog(correctIndex, ultimatelyCorrect) {
    const q = QUIZ_DATA[currentQuestionIndex];
    const now = new Date();
    const timeSpent = questionStartedAt ? Math.round((now - questionStartedAt) / 1000) : 0;
    const firstTry = currentQAttempts[0] === correctIndex;
    let scorePoints = 0;
    if (firstTry) scorePoints = 1;
    else if (ultimatelyCorrect) scorePoints = 0.5;
    questionLog.push({
        qid: q.id,
        chapter: q.chapter,
        selectedFirst: currentQAttempts[0],
        selectedFinal: currentQAttempts[currentQAttempts.length - 1],
        correctIndex: correctIndex,
        fails: currentQAttempts.filter(a => a !== correctIndex).length,
        firstTryCorrect: firstTry,
        ultimatelyCorrect: ultimatelyCorrect,
        scorePoints: scorePoints,
        timeSpentSec: timeSpent
    });
}

function showExplanation(isCorrect, correctIndex, explanation, attemptCount) {
    const feedback = document.getElementById('feedback-area');
    let resultLabel;
    if (isCorrect && attemptCount === 0) {
        resultLabel = '<span class="correct-text">正解！（+1点）</span>';
    } else if (isCorrect && attemptCount === 1) {
        resultLabel = '<span class="correct-text">2回目で正解！（+0.5点）</span>';
    } else {
        resultLabel = \`<span class="incorrect-text">不正解。正解は \${correctIndex + 1} です。（+0点）</span>\`;
    }

    const explanationHtml = explanation
        ? \`<div class="explanation-box">
              <span class="explanation-title">解説</span>
              <p class="explanation-text">\${escapeHtml(explanation)}</p>
           </div>\`
        : '';

    feedback.innerHTML = \`
        <div class="result-label">\${resultLabel}</div>
        \${explanationHtml}
        <button class="next-btn" onclick="goToNext()">次の問題へ →</button>
    \`;
}

function goToNext() {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
}

// ========== オーバーレイ・進捗 ==========
function showOverlay(type) {
    const overlay = document.getElementById('overlay');
    const circle = document.getElementById('circle-mark');
    const cross = document.getElementById('cross-mark');
    overlay.style.display = 'flex';
    circle.style.display = 'none';
    cross.style.display = 'none';
    if (type === 'circle') circle.style.display = 'block';
    else cross.style.display = 'block';
    overlay.classList.add('show-anim');
    setTimeout(() => {
        overlay.classList.remove('show-anim');
        overlay.style.display = 'none';
    }, 800);
}

function updateProgress(current, total) {
    const progressEl = document.getElementById('progress-text');
    const barEl = document.getElementById('progress-bar-fill');
    if (progressEl) progressEl.textContent = \`第 \${current} 問 / 全 \${total} 問\`;
    if (barEl) barEl.style.width = \`\${(current / total) * 100}%\`;
}

// ========== 結果画面 ==========
function showResult() {
    const container = document.getElementById('quiz-container');
    const total = QUIZ_DATA.length;
    const percentage = Math.round((correctCount / total) * 100);

    const pieChartHtml = \`
        <div style="display: flex; justify-content: center; margin: 1.5rem 0;">
            <div style="
                width: 140px; height: 140px; border-radius: 50%;
                background: conic-gradient(var(--correct-color) \${percentage}%, var(--border-color) 0);
                display: flex; align-items: center; justify-content: center;">
                <div style="width: 110px; height: 110px; background: var(--surface-color); border-radius: 50%;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <span style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: -0.2rem;">正解率</span>
                    <span style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); line-height: 1;">\${percentage}<span style="font-size: 1rem;">%</span></span>
                </div>
            </div>
        </div>\`;

    let chapterHtml = '<div class="chapter-results" style="margin: 2rem 0; text-align: left;">';
    for (const [chapter, stats] of Object.entries(chapterStats)) {
        const chapPercent = Math.round((stats.correct / stats.total) * 100) || 0;
        chapterHtml += \`
            <div style="margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <div style="font-weight: bold; margin-bottom: 0.25rem; font-size: 1.1rem; color: var(--text-main);">\${escapeHtml(chapter)}</div>
                    <div style="color: var(--text-muted); font-size: 0.95rem;">
                        <span>正解数: <strong style="color: var(--text-main);">\${stats.correct}</strong> / \${stats.total} 問</span>
                    </div>
                </div>
                <div style="width: 50px; height: 50px; border-radius: 50%;
                    background: conic-gradient(var(--correct-color) \${chapPercent}%, var(--border-color) 0);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 1rem;">
                    <div style="width: 40px; height: 40px; background: var(--surface-color); border-radius: 50%;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 0.8rem; font-weight: bold; color: var(--text-main);">
                        \${chapPercent}%
                    </div>
                </div>
            </div>\`;
    }
    chapterHtml += '</div>';

    let message = '';
    if (percentage >= 90) message = '素晴らしい！ITの基礎知識はバッチリです！';
    else if (percentage >= 70) message = 'よくできました！あと少しで完璧です！';
    else if (percentage >= 50) message = '半分以上正解！復習してさらに伸ばしましょう！';
    else message = 'まだまだ伸びしろがあります！もう一度挑戦してみよう！';

    container.innerHTML = \`
        <div class="result-card fade-in">
            <h2>お疲れ様でした！</h2>
            <div class="user-info-display">\${escapeHtml(userInfo.name)} さん（\${escapeHtml(userInfo.department)}）</div>
            <div class="score-display">
                <span class="score-number">\${correctCount}</span>
                <span class="score-label"> / \${total} 問正解</span>
            </div>
            \${pieChartHtml}
            <p>\${message}</p>
            \${chapterHtml}
            <div id="send-status" class="send-status">📤 結果を送信中...</div>
            <div id="csv-fallback-area"></div>
            <button onclick="restartQuiz()" class="restart-btn">トップへ戻る（別バージョンも受験できます）</button>
        </div>\`;

    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) progressContainer.style.display = 'none';

    // 自動送信
    sendResult();
}

function restartQuiz() {
    // トップページに戻る（名前・部署はlocalStorageに残っているので再入力不要）
    window.location.href = 'top.html';
}

// ========== 送信処理 ==========
function buildPayload() {
    const finishedAt = new Date();
    return {
        version: QUIZ_VERSION,
        name: userInfo.name,
        department: userInfo.department,
        startedAt: startedAt ? startedAt.toISOString() : '',
        finishedAt: finishedAt.toISOString(),
        durationSec: startedAt ? Math.round((finishedAt - startedAt) / 1000) : 0,
        totalScore: correctCount,
        totalQuestions: QUIZ_DATA.length,
        chapterScores: Object.entries(chapterStats).map(([c, s]) => ({
            chapter: c, correct: s.correct, total: s.total
        })),
        questionLog: questionLog
    };
}

async function sendResult() {
    const statusEl = document.getElementById('send-status');
    const fallbackEl = document.getElementById('csv-fallback-area');
    const payload = buildPayload();

    if (!WEBHOOK_URL || WEBHOOK_URL === '__WEBHOOK_URL_PLACEHOLDER__' || WEBHOOK_URL === '') {
        statusEl.className = 'send-status warn';
        statusEl.innerHTML = '⚠ 送信先が未設定です。下のボタンから結果ファイルをダウンロードして管理者にメールでお送りください。';
        renderFallback(fallbackEl, payload);
        return;
    }

    try {
        const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        const json = await res.json();
        if (json.success) {
            statusEl.className = 'send-status ok';
            statusEl.innerHTML = '✓ 結果を送信しました（管理者に集計されます）';
        } else {
            throw new Error(json.error || 'unknown');
        }
    } catch (err) {
        console.error('送信失敗:', err);
        statusEl.className = 'send-status warn';
        statusEl.innerHTML = '⚠ 送信に失敗しました（' + escapeHtml(String(err.message || err)) + '）<br>下のボタンから結果ファイルをダウンロードして管理者にメールでお送りください。';
        renderFallback(fallbackEl, payload);
    }
}

function renderFallback(el, payload) {
    el.innerHTML = \`
        <button class="fallback-btn" onclick="downloadResult()">📥 結果ファイル（JSON）をダウンロード</button>
    \`;
    window.__lastPayload = payload;
}

function downloadResult() {
    const payload = window.__lastPayload || buildPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = (payload.name || 'unknown').replace(/[^\\w\\u3040-\\u30ff\\u4e00-\\u9fffa-zA-Z0-9-]/g, '_');
    a.href = url;
    a.download = \`dms-quiz-\${payload.version}-\${safeName}-\${Date.now()}.json\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========== ユーティリティ ==========
function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
`;
};
