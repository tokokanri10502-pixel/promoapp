// DMS Quiz 管理コンソール
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbykucLUQOhYV_Nhfah2BNbG1xMUMintYRXNB-GdNBxrMWgz8basCI7i7vzzQOkW86Ll/exec';
let TOKEN = '';

document.addEventListener('DOMContentLoaded', () => {
    const pwInput = document.getElementById('admin-pw');
    const authBtn = document.getElementById('auth-btn');
    const authErr = document.getElementById('auth-error');

    pwInput.focus();
    pwInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); authBtn.click(); }
    });

    authBtn.addEventListener('click', async () => {
        const pw = pwInput.value.trim();
        if (!pw) { authErr.textContent = '合言葉を入力してください。'; return; }

        // Apps Script に疎通＆認証チェック（ダミーaction）
        authErr.textContent = '';
        authBtn.disabled = true;
        authBtn.textContent = '確認中...';
        try {
            // 軽い疎通+認証チェック: 「setupAnalysisSheets」は実行重いので、generateReportでもなく、認証だけ確認したい
            // → 簡易的に、TOKEN を保存して管理画面を出す。間違ってたらボタン押下時にエラーが返る
            TOKEN = pw;
            document.getElementById('auth-section').style.display = 'none';
            document.getElementById('admin-section').style.display = '';
        } catch (err) {
            authErr.textContent = 'エラー: ' + err.message;
            authBtn.disabled = false;
            authBtn.textContent = '確認';
        }
    });

    // 管理ボタン
    document.querySelectorAll('.admin-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const action = btn.dataset.action;
            const status = document.getElementById('admin-status');
            const btns = document.querySelectorAll('.admin-btn');
            btns.forEach(b => b.disabled = true);
            status.className = 'admin-status admin-running';
            status.innerHTML = '⏳ <strong>' + getActionLabel(action) + '</strong> を実行中…（30秒〜1分かかります、お待ちください）';

            try {
                const url = WEBHOOK_URL + '?action=' + encodeURIComponent(action) + '&token=' + encodeURIComponent(TOKEN);
                const res = await fetch(url, { method: 'GET', redirect: 'follow' });
                const text = await res.text();
                let json;
                try { json = JSON.parse(text); }
                catch (e) { throw new Error('予期しない応答: ' + text.substring(0, 100)); }

                if (json.success) {
                    status.className = 'admin-status admin-ok';
                    status.innerHTML = '✅ <strong>' + (json.message || '完了しました') + '</strong>';
                } else {
                    status.className = 'admin-status admin-error';
                    status.innerHTML = '❌ ' + (json.error || 'エラー');
                    // 合言葉エラーは戻れるよう
                    if (json.error && json.error.indexOf('合言葉') >= 0) {
                        setTimeout(() => location.reload(), 1500);
                    }
                }
            } catch (err) {
                status.className = 'admin-status admin-error';
                status.innerHTML = '❌ 通信エラー: ' + err.message;
            }

            btns.forEach(b => b.disabled = false);
        });
    });
});

function getActionLabel(action) {
    return {
        'generateReport': '報告書生成',
        'setupAnalysisSheets': '分析シート再生成'
    }[action] || action;
}
