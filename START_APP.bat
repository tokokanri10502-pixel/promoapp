@echo off
setlocal
cd /d %~dp0

:: 1. Node.js のチェック
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js がインストールされていないようです。
    echo https://nodejs.org/ からインストールしてください。
    pause
    exit /b
)

:: 2. 依存関係（serve）のチェックとインストール
if not exist "node_modules\serve" (
    echo 必要なツールを準備しています（初回のみ数分かかります）...
    call npm install
)

:: 3. アプリの起動（最小化状態で実行）
echo アプリを起動しています...
start /min cmd /c "title BOOK MARKERS - サーバー && npm start"

:: ブラウザを起動
echo ブラウザを開きます...
start http://localhost:3001

echo 起動完了！この画面は自動的に閉じます。
timeout /t 3 >nul
exit /b
