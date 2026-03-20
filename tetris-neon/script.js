/**
 * Neon Tetris - Main Script
 * 初心者向けに、コードの各部分が何をしているか詳しく解説しています。
 */

// --- 定数（変更されない値）の定義 ---

// 1ブロックのサイズ（ピクセル単位）
const BLOCK_SIZE = 30;

// ボードのサイズ（ブロック単位）
// 通常のテトリスは横10マス、縦20マスです
const COLS = 10;
const ROWS = 20;

// キャンバス要素を取得
const canvas = document.getElementById('tetris');
// 描画コンテキストを取得（これを使って絵を描きます）
const ctx = canvas.getContext('2d');

// Nextブロック表示用のキャンバス
const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');

// --- テトリミノ（ブロック）の定義 ---
const SHAPES = [
    [], // 0番目は空
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I (棒) - 水色
    [[2, 0, 0], [2, 2, 2], [0, 0, 0]], // J (逆L) - 青
    [[0, 0, 3], [3, 3, 3], [0, 0, 0]], // L (L字) - オレンジ
    [[0, 4, 4], [4, 4, 0], [0, 0, 0]], // O (四角) - 黄色
    [[0, 5, 5], [5, 5, 0], [0, 0, 0]], // S (稲妻) - 緑
    [[0, 6, 0], [6, 6, 6], [0, 0, 0]], // T (T字) - 紫
    [[7, 7, 0], [0, 7, 7], [0, 0, 0]]  // Z (逆稲妻) - 赤
];

const COLORS = [
    'transparent',
    '#00f0f0', // 1: I
    '#0000f0', // 2: J
    '#f0a000', // 3: L
    '#f0f000', // 4: O
    '#00f000', // 5: S
    '#a000f0', // 6: T
    '#f00000'  // 7: Z
];

// --- 変数 ---
let board = [];
let currentPiece = null;
let nextPiece = null;
let score = 0;
let highScore = 0;
let level = 1;
let gameOver = false;
let isPlaying = false; // ゲーム中かどうか

// アニメーション制御
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let requestId = null;

// --- サウンド機能（Web Audio API） ---
const Sound = {
    ctx: null,
    init: function () {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    play: function (type) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        const now = this.ctx.currentTime;

        switch (type) {
            case 'move':
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'rotate':
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
                break;
            case 'drop':
                osc.type = 'square';
                osc.frequency.setValueAtTime(150, now);
                osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
                break;
            case 'clear':
                // シンプルな和音アルペジオ
                this.playNote(880, 'sine', 0.1, 0);
                this.playNote(1108, 'sine', 0.1, 0.05);
                this.playNote(1318, 'sine', 0.2, 0.1);
                break;
            case 'milestone':
                this.playNote(523, 'triangle', 0.1, 0); // C5
                this.playNote(659, 'triangle', 0.1, 0.1); // E5
                this.playNote(783, 'triangle', 0.1, 0.2); // G5
                this.playNote(1046, 'triangle', 0.3, 0.3); // C6
                break;
            case 'milestone-strong':
                // より派手なファンファーレ
                [440, 554, 659, 880, 1108].forEach((freq, i) => {
                    this.playNote(freq, 'sawtooth', 0.4, i * 0.08);
                });
                break;
            case 'gameover':
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(50, now + 0.5);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
                break;
        }
    },
    playNote: function (freq, type, dur, delay) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        const now = this.ctx.currentTime + delay;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + dur);
        osc.start(now);
        osc.stop(now + dur);
    },
    // BGM関連
    bgmOscillators: [],
    bgmNextNoteTime: 0,
    bgmNoteIndex: 0,
    bgmIsPlaying: false,
    bgmTempo: 0.5, // 秒/拍
    bgmTimerId: null,

    startBgm: function () {
        if (this.bgmIsPlaying) return;
        this.bgmIsPlaying = true;
        this.bgmNextNoteTime = this.ctx.currentTime;
        this.bgmNoteIndex = 0;
        this.scheduleNote();
    },

    stopBgm: function () {
        this.bgmIsPlaying = false;
        clearTimeout(this.bgmTimerId);
        this.bgmOscillators.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });
        this.bgmOscillators = [];
    },

    scheduleNote: function () {
        if (!this.bgmIsPlaying) return;
        const secondsPerBeat = 0.5; // 120 BPM

        while (this.bgmNextNoteTime < this.ctx.currentTime + 0.1) {
            this.playMarchNote(this.bgmNextNoteTime, this.bgmNoteIndex);
            this.bgmNextNoteTime += secondsPerBeat;
            this.bgmNoteIndex++;
        }
        this.bgmTimerId = setTimeout(() => this.scheduleNote(), 25);
    },

    playMarchNote: function (time, index) {
        // マーチのリズムとメロディ
        // Cメジャーで勇ましく
        const beat = index % 16; // 4小節ループ

        // ベース（ドラム風）
        if (beat % 1 === 0) { // 4分音符ごと
            this.playDrum(time, 150, 'square', 0.1, 0.5); // ドン
        }
        if (beat % 2 === 1) { // 裏拍
            // this.playDrum(time, 400, 'noise', 0.05, 0.3); // ツッ（ノイズは難しいので省略高音矩形波）
            this.playDrum(time, 800, 'square', 0.05, 0.1);
        }

        // メロディ（トランペット風）
        // ドー ドー ソー ソー | ラー ラー ソー - | ファー ファー ミー ミー | レー レー ドー - 
        // 簡易的なファンファーレ: ドミソド ドミソド
        const notes = [
            523.25, // C5
            0,
            659.25, // E5
            0,
            783.99, // G5
            0,
            1046.50, // C6
            783.99, // G5

            659.25, // E5
            659.25,
            783.99, // G5
            783.99,
            523.25, // C5
            523.25,
            523.25, // C5
            0
        ];

        const freq = notes[beat];
        if (freq > 0) {
            this.playTone(time, freq, 'sawtooth', 0.3, 0.3);
        }
    },

    playTone: function (time, freq, type, duration, vol) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        osc.start(time);
        osc.stop(time + duration);
        this.bgmOscillators.push(osc);
        // クリーンアップは厳密には必要だが簡略化
    },

    playDrum: function (time, freq, type, duration, vol) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.type = type;
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(10, time + duration);

        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        osc.start(time);
        osc.stop(time + duration);
    },

    playNote: function (freq, type, dur, delay) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        const now = this.ctx.currentTime + delay;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + dur);
        osc.start(now);
        osc.stop(now + dur);
    }
};

// --- 関数定義 ---

/**
 * ゲームの初期化
 */
function init() {
    // サウンドの初期化（ユーザー操作が必要）
    Sound.init();

    // ボードをリセット
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

    score = 0;
    highScore = localStorage.getItem('tetris_high_score') || 0;
    level = 1;
    gameOver = false;
    isPlaying = true;
    dropInterval = 1000;

    // ピース作成
    createNextPiece();
    spawnPiece();

    // 表示更新
    updateScore();

    // ループ開始（前のループがあればキャンセル）
    if (requestId) cancelAnimationFrame(requestId);
    lastTime = 0;
    update();

    // BGM開始
    Sound.startBgm();

    // 兵隊生成
    // populateSoldiers(); // Removed by user request

    console.log("Game Initialized!");
}

function createNextPiece() {
    const typeId = Math.floor(Math.random() * 7) + 1;
    nextPiece = {
        shape: SHAPES[typeId],
        colorIndex: typeId
    };
    drawNext();
}

function spawnPiece() {
    currentPiece = {
        shape: nextPiece.shape,
        colorIndex: nextPiece.colorIndex,
        x: Math.floor((COLS - nextPiece.shape[0].length) / 2),
        y: 0
    };

    createNextPiece();

    if (collide(board, currentPiece)) {
        Sound.play('gameover');
        gameOver = true;
        isPlaying = false;
        Sound.stopBgm();
        showGameOver();
    }
}

function collide(board, piece) {
    const m = piece.shape;
    const o = piece;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0) {
                if (!board[y + o.y] || !Number.isInteger(board[y + o.y][x + o.x]) || board[y + o.y][x + o.x] !== 0) {
                    return true;
                }
            }
        }
    }
    return false;
}

function rotate(piece) {
    const rotatedShape = piece.shape[0].map((val, index) => piece.shape.map(row => row[index]).reverse());
    const prevShape = piece.shape;
    piece.shape = rotatedShape;

    let offset = 1;
    while (collide(board, piece)) {
        piece.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > piece.shape[0].length) {
            piece.shape = prevShape;
            piece.x = currentPiece.x;
            return;
        }
    }
    Sound.play('rotate');
}

function move(dir) {
    currentPiece.x += dir;
    if (collide(board, currentPiece)) {
        currentPiece.x -= dir;
    } else {
        Sound.play('move');
    }
}

function drop() {
    if (!currentPiece) return;
    currentPiece.y++;
    if (collide(board, currentPiece)) {
        currentPiece.y--;
        merge(board, currentPiece);
        Sound.play('drop');
        arenaSweep();
        spawnPiece();
    }
    dropCounter = 0;
}

function merge(board, piece) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                board[y + piece.y][x + piece.x] = value;
            }
        });
    });
}

function arenaSweep() {
    let rowCount = 0;
    outer: for (let y = ROWS - 1; y >= 0; --y) {
        for (let x = 0; x < COLS; ++x) {
            if (board[y][x] === 0) continue outer;
        }
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        ++y;
        rowCount++;
    }

    if (rowCount > 0) {
        Sound.play('clear');
        const lineScores = [0, 100, 300, 500, 800];
        const prevScore = score;
        score += lineScores[rowCount] * level;

        // 1000点区切り（500点の2倍強エフェクト）
        if (Math.floor(score / 1000) > Math.floor(prevScore / 1000)) {
            triggerMilestoneEffect('Good!', 'strong');
            Sound.play('milestone-strong');
        }

        // ハイスコア更新チェック
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('tetris_high_score', highScore);
        }
        // 500点区切り（通常エフェクト）
        // 1000点の時は上記が優先されるので、ここはelse ifではなく個別に判定するが、
        // 1000点のタイミングで500点も踏むことになるため、重複を避けるロジックが必要。
        // 単純に「1000点区切りでなければ500点区切りをチェック」とする。
        else if (Math.floor(score / 500) > Math.floor(prevScore / 500)) {
            triggerMilestoneEffect('Got it!', 'normal');
            Sound.play('milestone');
        }

        if (score >= level * 500) {
            level++;
            dropInterval = Math.max(100, 1000 - (level - 1) * 100);
        }
        updateScore();
    }
}

function triggerMilestoneEffect(text, type) {
    // コンテナを光らせる
    const container = document.querySelector('.game-container');
    container.classList.remove('flash-screen', 'flash-screen-strong'); // 既存クラス削除
    void container.offsetWidth; // リフロー強制

    if (type === 'strong') {
        container.classList.add('flash-screen-strong');
    } else {
        container.classList.add('flash-screen');
    }

    // メッセージ表示
    const msg = document.getElementById('milestone-msg');
    msg.innerText = text; // テキスト更新
    msg.classList.remove('hidden', 'animate-got-it', 'animate-good'); // クラスリセット
    void msg.offsetWidth; // リフロー強制

    if (type === 'strong') {
        msg.classList.add('animate-good');
    } else {
        msg.classList.add('animate-got-it');
    }
    msg.classList.remove('hidden');

    // アニメーション終了後に隠す
    setTimeout(() => {
        msg.classList.add('hidden');
    }, 2000);
}

function drawBlock(ctx, x, y, colorIndex) {
    if (colorIndex === 0) return;
    ctx.fillStyle = COLORS[colorIndex];
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(x * BLOCK_SIZE + 5, y * BLOCK_SIZE + 5, BLOCK_SIZE - 10, BLOCK_SIZE - 10);
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {
        row.forEach((value, x) => drawBlock(ctx, x, y, value));
    });

    if (currentPiece) {
        currentPiece.shape.forEach((row, dy) => {
            row.forEach((value, dx) => {
                if (value > 0) drawBlock(ctx, currentPiece.x + dx, currentPiece.y + dy, value);
            });
        });
    }
}

function drawNext() {
    nextCtx.fillStyle = '#000';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    if (!nextPiece) return;

    const offsetX = (4 - nextPiece.shape[0].length) / 2;
    const offsetY = (4 - nextPiece.shape.length) / 2;

    nextPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value > 0) {
                nextCtx.fillStyle = COLORS[value];
                nextCtx.fillRect((x + offsetX) * 30, (y + offsetY) * 30, 30, 30);
                nextCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                nextCtx.strokeRect((x + offsetX) * 30, (y + offsetY) * 30, 30, 30);
            }
        });
    });
}

function update(time = 0) {
    if (!isPlaying) return;
    const deltaTime = time - lastTime;
    lastTime = time;
    dropCounter += deltaTime;
    if (dropCounter > dropInterval) drop();
    draw();
    requestId = requestAnimationFrame(update);
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = score;
    const highScoreElement = document.getElementById('high-score');
    if (highScoreElement) highScoreElement.innerText = highScore;
    const levelElement = document.getElementById('level');
    if (levelElement) levelElement.innerText = level;
}

function showGameOver() {
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('screen-title').innerText = 'GAME OVER';
    document.getElementById('restart-btn').innerText = 'Try Again';
    document.getElementById('score-text').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
}

// キー操作
document.addEventListener('keydown', event => {
    if (!isPlaying || gameOver) return;
    if (event.code === 'ArrowLeft') move(-1);
    else if (event.code === 'ArrowRight') move(1);
    else if (event.code === 'ArrowDown') drop();
    else if (event.code === 'ArrowUp') rotate(currentPiece);
    else if (event.code === 'Space') {
        // スペースキーで2倍速落下（2回dropを実行）
        drop();
        if (!gameOver && isPlaying) drop();
    }
});

// スタート/リスタートボタン
const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    document.getElementById('game-over').classList.add('hidden');
    init();
});

// モバイルボタン操作
function setupMobileControls() {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnRotate = document.getElementById('btn-rotate');
    const btnDrop = document.getElementById('btn-drop');
    const btnHardDrop = document.getElementById('btn-hard-drop');

    const handleTouch = (action) => (e) => {
        if (e.cancelable) e.preventDefault(); // タッチによるスクロールなどを防止
        if (!isPlaying || gameOver) return;
        action();
    };

    if (btnLeft) {
        btnLeft.addEventListener('touchstart', handleTouch(() => move(-1)), { passive: false });
        btnLeft.addEventListener('mousedown', () => { if (isPlaying && !gameOver) move(-1) });
    }
    if (btnRight) {
        btnRight.addEventListener('touchstart', handleTouch(() => move(1)), { passive: false });
        btnRight.addEventListener('mousedown', () => { if (isPlaying && !gameOver) move(1) });
    }
    if (btnRotate) {
        btnRotate.addEventListener('touchstart', handleTouch(() => rotate(currentPiece)), { passive: false });
        btnRotate.addEventListener('mousedown', () => { if (isPlaying && !gameOver) rotate(currentPiece) });
    }
    if (btnDrop) {
        btnDrop.addEventListener('touchstart', handleTouch(() => drop()), { passive: false });
        btnDrop.addEventListener('mousedown', () => { if (isPlaying && !gameOver) drop() });
    }
    if (btnHardDrop) {
        btnHardDrop.addEventListener('touchstart', handleTouch(() => hardDrop()), { passive: false });
        btnHardDrop.addEventListener('mousedown', () => { if (isPlaying && !gameOver) hardDrop() });
    }
}

function hardDrop() {
    while (!collide(board, { ...currentPiece, y: currentPiece.y + 1 })) {
        currentPiece.y++;
        score += 2; // ハードドロップボーナス
    }
    drop(); // 最後の1段を落として固定
    updateScore();
}

setupMobileControls();

// 初期状態描画（黒い画面）
draw();
