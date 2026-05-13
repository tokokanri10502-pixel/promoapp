const fs = require('fs');

const rawText = fs.readFileSync('data.txt', 'utf8');
const lines = rawText.split(/\r?\n/).map(l => l.trim());
let chapterTitle = '';
let currentQ = null;
const questions = [];

for (const line of lines) {
    if (line.startsWith('### ')) {
        chapterTitle = line.replace('### ', '');
    } else if (line.startsWith('**Q')) {
        currentQ = {
            chapter: chapterTitle,
            id: line.match(/Q\d+/)[0],
            text: line.replace(/\*\*Q\d+\.\s?/, '').replace('\*\*', '').trim(),
            options: [],
            answerIndex: -1
        };
        questions.push(currentQ);
    } else if (line.match(/^\d+\.\s/)) {
        if (currentQ) {
            currentQ.options.push(line.replace(/^\d+\.\s/, '')); // Remove "1. " etc
        }
    } else if (line.startsWith('【正解】')) {
        const correct = line.replace('【正解】', '').trim();
        if (currentQ) {
            currentQ.answerIndex = parseInt(correct, 10) - 1;
        }
    }
}

const scriptContent = `// DMS 問題集データ (自動生成)
const QUIZ_DATA = ${JSON.stringify(questions, null, 2)};

let currentQuestionIndex = 0;
let failCount = 0; // 現在の問題に対する間違い回数
let correctCount = 0; // 1回目で正解した問題数
const chapterStats = {};

document.addEventListener('DOMContentLoaded', () => {
    QUIZ_DATA.forEach(q => {
        if (!chapterStats[q.chapter]) {
            chapterStats[q.chapter] = { total: 0, correct: 0 };
        }
        chapterStats[q.chapter].total++;
    });
    renderQuestion(currentQuestionIndex);
});

function renderQuestion(index) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    
    if (index >= QUIZ_DATA.length) {
        showResult();
        return;
    }

    const q = QUIZ_DATA[index];
    failCount = 0; // 新しい問題の開始時にリセット
    
    const card = document.createElement('div');
    card.className = 'quiz-card fade-in';

    const header = document.createElement('div');
    header.className = 'quiz-header';
    header.innerHTML = \`<span class="chapter-badge">\${q.chapter}</span>
                        <h2>\${q.id}. \${q.text}</h2>\`;
    
    card.appendChild(header);

    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        // 'ア〜エ' を '1〜4' に変換
        btn.innerHTML = \`<span class="option-number">\${idx + 1}</span> \${opt}\`;
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
    const feedback = document.getElementById('feedback-area');
    
    // Disable buttons temporarily
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === correctIndex) {
        // 1回目の選択で正解した場合のみカウントアップ
        if (failCount === 0) {
            correctCount++;
            chapterStats[QUIZ_DATA[currentQuestionIndex].chapter].correct++;
        }
        showOverlay('circle');
        btnElement.classList.add('correct-answer');
        feedback.innerHTML = '<span class="correct-text">正解！</span> 次の問題へ進みます...';
        feedback.classList.remove('incorrect-text');
        feedback.classList.add('correct-text');
        
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion(currentQuestionIndex);
        }, 1200);
        
    } else {
        failCount++;
        btnElement.classList.add('wrong-answer');
        
        if (failCount < 2) {
            showOverlay('cross');
            const remaining = 2 - failCount;
            feedback.innerHTML = \`<span class="incorrect-text">不正解！ 残り\${remaining}回挑戦できます。</span>\`;
            
            setTimeout(() => {
                buttons.forEach(btn => btn.disabled = false);
            }, 1000);
        } else {
            showOverlay('cross');
            feedback.innerHTML = '<span class="incorrect-text">2回間違えました。正解は <strong>' + (correctIndex + 1) + '</strong> です。次の問題へ進みます...</span>';
            buttons[correctIndex].classList.add('correct-answer'); // highlight correct
            
            setTimeout(() => {
                currentQuestionIndex++;
                renderQuestion(currentQuestionIndex);
            }, 3000);
        }
    }
}

function showOverlay(type) {
    const overlay = document.getElementById('overlay');
    const circle = document.getElementById('circle-mark');
    const cross = document.getElementById('cross-mark');
    
    overlay.style.display = 'flex';
    circle.style.display = 'none';
    cross.style.display = 'none';
    
    if (type === 'circle') {
        circle.style.display = 'block';
    } else {
        cross.style.display = 'block';
    }
    
    overlay.classList.add('show-anim');
    
    setTimeout(() => {
        overlay.classList.remove('show-anim');
        overlay.style.display = 'none';
    }, 800);
}

function updateProgress(current, total) {
    const progressEl = document.getElementById('progress-text');
    const barEl = document.getElementById('progress-bar-fill');
    if(progressEl) progressEl.textContent = \`第 \${current} 問 / 全 \${total} 問\`;
    if(barEl) barEl.style.width = \`\${(current / total) * 100}%\`;
}

function showResult() {
    const container = document.getElementById('quiz-container');
    const total = QUIZ_DATA.length;
    const percentage = Math.round((correctCount / total) * 100);
    
    // 円グラフのHTML生成
    const pieChartHtml = \`
        <div style="display: flex; justify-content: center; margin: 1.5rem 0;">
            <div style="
                width: 140px;
                height: 140px;
                border-radius: 50%;
                background: conic-gradient(var(--correct-color) \${percentage}%, var(--border-color) 0);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    width: 110px;
                    height: 110px;
                    background: var(--surface-color);
                    border-radius: 50%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                ">
                    <span style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: -0.2rem;">正解率</span>
                    <span style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); line-height: 1;">\${percentage}<span style="font-size: 1rem;">%</span></span>
                </div>
            </div>
        </div>
    \`;
    
    let chapterHtml = '<div class="chapter-results" style="margin: 2rem 0; text-align: left;">';
    for (const [chapter, stats] of Object.entries(chapterStats)) {
        const chapPercent = Math.round((stats.correct / stats.total) * 100) || 0;
        chapterHtml += \`
            <div style="margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <div style="font-weight: bold; margin-bottom: 0.25rem; font-size: 1.1rem; color: var(--text-main);">\${chapter}</div>
                    <div style="color: var(--text-muted); font-size: 0.95rem;">
                        <span>正解数: <strong style="color: var(--text-main);">\${stats.correct}</strong> / \${stats.total} 問</span>
                    </div>
                </div>
                <div style="
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: conic-gradient(var(--correct-color) \${chapPercent}%, var(--border-color) 0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-left: 1rem;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        background: var(--surface-color);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 0.8rem;
                        font-weight: bold;
                        color: var(--text-main);
                    ">
                        \${chapPercent}%
                    </div>
                </div>
            </div>
        \`;
    }
    chapterHtml += '</div>';

    // スコアに応じてメッセージを変える
    let message = '';
    if (percentage >= 90) {
        message = '素晴らしい！ITの基礎知識はバッチリです！';
    } else if (percentage >= 70) {
        message = 'よくできました！あと少しで完璧です！';
    } else if (percentage >= 50) {
        message = '半分以上正解！復習してさらに伸ばしましょう！';
    } else {
        message = 'まだまだ伸びしろがあります！もう一度挑戦してみよう！';
    }
    container.innerHTML = \`
        <div class="result-card fade-in">
            <h2>お疲れ様でした！</h2>
            <div class="score-display">
                <span class="score-number">\${correctCount}</span>
                <span class="score-label"> / \${total} 問正解</span>
            </div>
            \${pieChartHtml}
            <p>\${message}</p>
            \${chapterHtml}
            <button onclick="location.reload()" class="restart-btn">最初からやり直す</button>
        </div>
    \`;
    const progressContainer = document.querySelector('.progress-container');
    if(progressContainer) progressContainer.style.display = 'none';
}
`;

fs.writeFileSync('script.js', scriptContent, 'utf8');
console.log('Successfully generated script.js');
