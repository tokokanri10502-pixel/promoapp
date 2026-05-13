// DMS Quiz トップページ - 名前/部署入力 + バージョン選択
document.addEventListener('DOMContentLoaded', () => {
    // 以前の入力を復元
    const saved = JSON.parse(localStorage.getItem('dms_quiz_user') || '{}');
    if (saved.name) document.getElementById('user-name').value = saved.name;
    if (saved.department) document.getElementById('user-department').value = saved.department;

    document.getElementById('user-name').focus();

    // Enter キーで次の入力 / 最後ならv1ボタンへフォーカス
    document.getElementById('user-name').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('user-department').focus();
        }
    });
    document.getElementById('user-department').addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.querySelector('.version-btn-v1').focus();
        }
    });

    // バージョン選択ボタン
    document.querySelectorAll('.version-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = document.getElementById('user-name').value.trim();
            const dept = document.getElementById('user-department').value.trim();
            const errEl = document.getElementById('start-error');

            if (!name || !dept) {
                errEl.textContent = 'お名前と部署を入力してから、バージョンを選択してください。';
                if (!name) document.getElementById('user-name').focus();
                else document.getElementById('user-department').focus();
                return;
            }

            // 保存して該当バージョンへ遷移
            localStorage.setItem('dms_quiz_user', JSON.stringify({ name, department: dept }));
            window.location.href = btn.dataset.target;
        });
    });
});
