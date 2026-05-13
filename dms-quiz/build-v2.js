const fs = require('fs');
const buildScript = require('./build-template.js');

// === 設定 ===
const DATA_FILE = 'data-v2.txt';
const OUT_FILE = 'script-v2.js';
const VERSION = 'v2';
const WEBHOOK_URL = process.env.DMS_QUIZ_WEBHOOK || 'https://script.google.com/macros/s/AKfycbykucLUQOhYV_Nhfah2BNbG1xMUMintYRXNB-GdNBxrMWgz8basCI7i7vzzQOkW86Ll/exec';
// =============

const rawText = fs.readFileSync(DATA_FILE, 'utf8');
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
            text: line.replace(/\*\*Q\d+\.\s?/, '').replace(/\*\*$/, '').trim(),
            options: [],
            answerIndex: -1,
            explanation: ''
        };
        questions.push(currentQ);
    } else if (line.match(/^\d+\.\s/)) {
        if (currentQ) currentQ.options.push(line.replace(/^\d+\.\s/, ''));
    } else if (line.startsWith('【正解】')) {
        const correct = line.replace('【正解】', '').trim();
        if (currentQ) currentQ.answerIndex = parseInt(correct, 10) - 1;
    } else if (line.startsWith('**【解説】**')) {
        if (currentQ) currentQ.explanation = line.replace('**【解説】**', '').trim();
    }
}

const scriptContent = buildScript(JSON.stringify(questions, null, 2), VERSION, WEBHOOK_URL);
fs.writeFileSync(OUT_FILE, scriptContent, 'utf8');

console.log(`Successfully generated ${OUT_FILE}`);
console.log(`  - Version: ${VERSION}`);
console.log(`  - Questions: ${questions.length}`);
console.log(`  - With explanation: ${questions.filter(q => q.explanation).length}`);
console.log(`  - Webhook: ${WEBHOOK_URL ? '(設定済み)' : '(未設定 → CSV/JSONダウンロードフォールバック)'}`);
