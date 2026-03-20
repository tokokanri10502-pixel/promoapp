/**
 * BOOK MARKERS — script.js
 * 機能: 画像アップロード → Tesseract.js OCR → テキスト編集・保存 → ライブラリ管理
 */

'use strict';

// ============================================
// 定数・状態管理
// ============================================
const DB_NAME = 'book_markers_db';
const DB_VERSION = 1;
const STORE_NAME = 'bookmarks';
let _db = null;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

let state = {
    view: 'library',      // library | capture | processing | editor | detail
    bookmarks: [],        // 保存済みブックマーク
    originalImage: null,  // アップロードされた未加工の元画像
    currentImage: null,   // 切り抜き後の画像 (OCR対象)
    cropperInfo: null,    // Cropper.jsのインスタンス
    currentEditId: null,  // 編集中のブックマークID (null = 新規)
    searchQuery: '',      // 検索クエリ
    sortOrder: 'newest',  // ソート順
    deleteTargetId: null  // 削除対象ID
};

// ============================================
// DOM要素キャッシュ
// ============================================
const $ = id => document.getElementById(id);

const els = {
    // ヘッダー
    logoBtnEl: $('logo-btn'),
    navLibrary: $('nav-library'),
    navCapture: $('nav-capture'),

    // ライブラリ
    viewLibrary: $('view-library'),
    bookmarkCount: $('bookmark-count'),
    emptyState: $('empty-state'),
    emptyAddBtn: $('empty-add-btn'),
    bookmarksGrid: $('bookmarks-grid'),
    searchInput: $('search-input'),
    searchClear: $('search-clear'),
    sortSelect: $('sort-select'),
    noResults: $('no-results'),
    noResultsQ: $('no-results-query'),

    // キャプチャ
    viewCapture: $('view-capture'),
    uploadArea: $('upload-area'),
    fileInput: $('file-input'),
    btnGallery: $('btn-gallery'),
    btnCamera: $('btn-camera'),
    previewArea: $('preview-area'),
    previewImg: $('preview-img'),
    btnRemoveImg: $('btn-remove-img'),
    btnStartOcr: $('btn-start-ocr'),
    btnStartOcrFull: $('btn-start-ocr-full'),

    // 処理中
    viewProcessing: $('view-processing'),
    processingStatus: $('processing-status'),
    progressBar: $('progress-bar'),

    // エディタ
    viewEditor: $('view-editor'),
    editorImg: $('editor-img'),
    bookTitle: $('book-title'),
    bookAuthor: $('book-author'),
    bookPage: $('book-page'),
    bookTag: $('book-tag'),
    ocrText: $('ocr-text'),
    userNote: $('user-note'),
    btnBackCapture: $('btn-back-capture'),
    btnSave: $('btn-save'),

    // 詳細
    viewDetail: $('view-detail'),
    btnBackLibrary: $('btn-back-library'),
    btnDetailEdit: $('btn-detail-edit'),
    btnDetailDelete: $('btn-detail-delete'),
    detailBookTitle: $('detail-book-title'),
    detailBookAuthor: $('detail-book-author'),
    detailPage: $('detail-page'),
    detailDate: $('detail-date'),
    detailTags: $('detail-tags'),
    detailImg: $('detail-img'),
    detailPassage: $('detail-passage'),
    detailNoteWrap: $('detail-note-wrap'),
    detailNote: $('detail-note'),

    // モーダル
    modalOverlay: $('modal-overlay'),
    btnModalCancel: $('btn-modal-cancel'),
    btnModalConfirm: $('btn-modal-confirm'),

    // トースト
    toast: $('toast'),
    toastMsg: $('toast-msg'),

    // ボトムナビ
    bottomNavLibrary: $('bottom-nav-library'),
    bottomNavCapture: $('bottom-nav-capture'),

    // 詳細ナビ
    btnPrevBookmark: $('btn-prev-bookmark'),
    btnNextBookmark: $('btn-next-bookmark'),
    detailNavPos: $('detail-nav-position'),

};


// ============================================
// 初期化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // UI は即座に起動（DB を待たない）
    bindEvents();
    navigateTo('library');

    // DB 初期化はバックグラウンドで実行し、完了後にライブラリを再描画
    (async () => {
        try {
            await migrateFromLocalStorage();
            state.bookmarks = await dbGetAll();
            renderLibrary();
        } catch (e) {
            console.error('IndexedDB の初期化に失敗しました:', e);
        }
    })();

    // file:// プロトコルでの警告表示
    if (location.protocol === 'file:') {
        showFileProtocolBanner();
    }

    // スクロール時ヘッダーに影を付与
    window.addEventListener('scroll', () => {
        const header = document.getElementById('site-header');
        if (header) header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
});

function showFileProtocolBanner() {
    const banner = document.createElement('div');
    banner.id = 'file-protocol-banner';
    banner.style.cssText = `
        position: fixed; top: 0; left: 0; right: 0;
        background: linear-gradient(90deg, #d4af37, #f1d592);
        color: #121214; padding: 10px 20px; font-size: 14px;
        z-index: 2000; font-weight: 700; display: flex;
        justify-content: center; align-items: center; gap: 15px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.4); border-bottom: 1px solid rgba(0,0,0,0.1);
    `;
    banner.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-circle-exclamation" style="font-size:16px;"></i>
            <span>読み取り機能を使うには、下のボタンを押してください</span>
        </div>
        <div style="display:flex; gap:10px;">
            <button id="btn-activate-ocr" style="background:#121214; color:#d4af37; border:none; padding:6px 18px; border-radius:30px; cursor:pointer; font-size:13px; font-weight:800;">
                <i class="fa-solid fa-power-off"></i> 今すぐ有効にする
            </button>
            <button id="btn-banner-close" style="background:transparent; border:none; color:rgba(0,0,0,0.5); cursor:pointer; padding:4px;">
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
    `;
    document.body.appendChild(banner);
    document.body.style.paddingTop = '45px';

    banner.querySelector('#btn-activate-ocr').onclick = () => showFileProtocolWarning();
    banner.querySelector('#btn-banner-close').onclick = () => {
        banner.remove();
        document.body.style.paddingTop = '0';
    };
}

// ============================================
// イベントバインディング
// ============================================
function bindEvents() {
    els.logoBtnEl.addEventListener('click', () => navigateTo('library'));
    els.logoBtnEl.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') navigateTo('library'); });
    els.navLibrary.addEventListener('click', () => navigateTo('library'));
    els.navCapture.addEventListener('click', () => navigateTo('capture'));
    els.emptyAddBtn.addEventListener('click', () => navigateTo('capture'));

    let searchTimer = null;
    els.searchInput.addEventListener('input', () => {
        const q = els.searchInput.value.trim();
        els.searchClear.classList.toggle('hidden', q === '');
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            state.searchQuery = q;
            renderLibrary();
        }, 500);
    });
    els.searchClear.addEventListener('click', () => {
        els.searchInput.value = '';
        state.searchQuery = '';
        els.searchClear.classList.add('hidden');
        renderLibrary();
    });

    els.sortSelect.addEventListener('change', () => {
        state.sortOrder = els.sortSelect.value;
        renderLibrary();
    });

    // アップロードエリア
    els.uploadArea.addEventListener('click', e => {
        if (!e.target.closest('.btn-upload')) openFilePicker(false);
    });
    els.uploadArea.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') openFilePicker(false);
    });

    // ドラッグ&ドロップ
    els.uploadArea.addEventListener('dragover', e => {
        e.preventDefault();
        els.uploadArea.classList.add('drag-over');
    });
    els.uploadArea.addEventListener('dragleave', () => {
        els.uploadArea.classList.remove('drag-over');
    });
    els.uploadArea.addEventListener('drop', e => {
        e.preventDefault();
        els.uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleImageFile(file);
    });

    // ファイル選択ボタン
    els.btnGallery.addEventListener('click', e => {
        e.stopPropagation();
        openFilePicker(false);
    });
    els.btnCamera.addEventListener('click', e => {
        e.stopPropagation();
        openFilePicker(true);
    });

    // ファイル入力
    els.fileInput.addEventListener('change', () => {
        const file = els.fileInput.files[0];
        if (file) handleImageFile(file);
        els.fileInput.value = '';
    });

    els.btnRemoveImg.addEventListener('click', () => {
        state.originalImage = null;
        state.currentImage = null;
        els.previewArea.classList.add('hidden');
        els.uploadArea.classList.remove('hidden');
    });
    els.btnStartOcr.addEventListener('click', () => startOcrProcess());
    els.btnStartOcrFull.addEventListener('click', () => startOcrProcessFull());

    els.btnBackCapture.addEventListener('click', () => {
        if (state.currentEditId) {
            navigateTo('library');
        } else {
            navigateTo('capture');
        }
    });
    els.btnSave.addEventListener('click', saveBookmark);

    els.btnBackLibrary.addEventListener('click', () => navigateTo('library'));
    els.btnDetailEdit.addEventListener('click', startEditBookmark);
    els.btnDetailDelete.addEventListener('click', () => showDeleteModal(state.currentEditId));

    els.btnModalCancel.addEventListener('click', hideModal);
    els.btnModalConfirm.addEventListener('click', confirmDelete);
    els.modalOverlay.addEventListener('click', e => {
        if (e.target === els.modalOverlay) hideModal();
    });

    // ── ボトムナビゲーション ──
    els.bottomNavLibrary.addEventListener('click', () => navigateTo('library'));
    els.bottomNavCapture.addEventListener('click', () => navigateTo('capture'));

    // ── 詳細ビュー: スワイプナビゲーション ──
    let touchStartX = 0;
    let touchStartY = 0;
    els.viewDetail.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    els.viewDetail.addEventListener('touchend', e => {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        // 水平方向のスワイプのみ（縦スクロールを妨げない）
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
            navigateToAdjacentBookmark(deltaX < 0 ? 1 : -1);
        }
    }, { passive: true });

    // ── 詳細ビュー: 前後ボタン ──
    els.btnPrevBookmark.addEventListener('click', () => navigateToAdjacentBookmark(-1));
    els.btnNextBookmark.addEventListener('click', () => navigateToAdjacentBookmark(1));

}

// ============================================
// ビューナビゲーション
// ============================================
function navigateTo(viewName) {
    state.view = viewName;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = $(`view-${viewName}`);
    if (target) target.classList.add('active');
    els.navLibrary.classList.toggle('active', viewName === 'library');
    els.navCapture.classList.toggle('active', viewName === 'capture');

    // ボトムナビのアクティブ状態を同期（detail はライブラリ側）
    const isLibrarySide = viewName === 'library' || viewName === 'detail';
    els.bottomNavLibrary.classList.toggle('active', isLibrarySide);
    els.bottomNavCapture.classList.toggle('active', !isLibrarySide);

    if (viewName === 'library') { renderLibrary(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    if (viewName === 'capture') { resetCaptureView(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

function resetCaptureView() {
    state.originalImage = null;
    state.currentImage = null;
    state.currentEditId = null;
    if (state.cropperInfo) { state.cropperInfo.destroy(); state.cropperInfo = null; }
    els.previewArea.classList.add('hidden');
    els.uploadArea.classList.remove('hidden');
    els.previewImg.src = '';
    els.fileInput.removeAttribute('capture');
}

function openFilePicker(useCamera) {
    if (useCamera) els.fileInput.setAttribute('capture', 'environment');
    else els.fileInput.removeAttribute('capture');
    els.fileInput.click();
}

function handleImageFile(file) {
    if (!file.type.startsWith('image/')) { showToast('画像ファイルを選択してください', 'error'); return; }
    if (file.size > MAX_IMAGE_SIZE) { showToast('ファイルサイズが大きすぎます', 'error'); return; }
    const reader = new FileReader();
    reader.onload = e => {
        state.originalImage = e.target.result;
        els.previewImg.src = state.originalImage;
        els.uploadArea.classList.add('hidden');
        els.previewArea.classList.remove('hidden');
        if (state.cropperInfo) state.cropperInfo.destroy();
        state.cropperInfo = new Cropper(els.previewImg, {
            viewMode: 2, dragMode: 'crop', autoCropArea: 0.8,
            restore: false, guides: true, center: true, highlight: false,
            cropBoxMovable: true, cropBoxResizable: true, toggleDragModeOnDblclick: false,
        });
    };
    reader.readAsDataURL(file);
}

// ============================================
// OCR処理
// ============================================
async function startOcrProcess() {
    if (!state.originalImage || !state.cropperInfo) return;

    // file:// プロトコルではWebWorkerが動作しないため警告を表示
    if (location.protocol === 'file:') { showFileProtocolWarning(); return; }

    const sourceImage = state.cropperInfo.getCroppedCanvas({
        maxWidth: 4000, maxHeight: 4000,
        imageSmoothingEnabled: true, imageSmoothingQuality: 'high'
    }).toDataURL('image/png');
    state.currentImage = sourceImage;
    els.editorImg.src = sourceImage;

    const dirRadio = document.querySelector('input[name="text-dir"]:checked');
    const tesseractLang = dirRadio ? dirRadio.value : 'jpn_vert';

    navigateTo('processing');
    setProgress(5, '高度な前処理（適応的二値化）を実行中…');

    try {
        const processedImage = await preprocessImageForOCR(sourceImage);
        setProgress(15, '認識エンジンを最適化中…');

        const worker = await Tesseract.createWorker(tesseractLang, 1, {
            langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
            logger: m => {
                if (m.status === 'recognizing text') {
                    const prog = Math.round((m.progress || 0) * 55) + 40;
                    setProgress(prog, `最高精度で文字を認識中… ${Math.round((m.progress || 0) * 100)}%`);
                }
            }
        });

        const psmValue = tesseractLang === 'jpn_vert' ? 5 : 6;
        await worker.setParameters({
            tessedit_pageseg_mode: psmValue.toString(),
            preserve_interword_spaces: '0',
            tessedit_ocr_engine_mode: '1',
            tessjs_create_hocr: '0',
            tessjs_create_tsv: '0',
        });

        const { data: { text } } = await worker.recognize(processedImage);
        await worker.terminate();

        setProgress(95, 'テキストをクリーンアップ中…');

        let formattedText = text.trim();


        if (tesseractLang.includes('jpn')) {
            formattedText = formattedText
                // 1. 基本的な文字間スペース除去（全角/半角問わず）
                .replace(/([ぁ-んァ-ヶ亜-黑])\s+([ぁ-んァ-ヶ亜-黑])/g, '$1$2')
                .replace(/([ぁ-んァ-ヶ亜-黑])\s+([、。！？（）「」])/g, '$1$2')
                .replace(/([、。！？（）「」])\s+([ぁ-んァ-ヶ亜-黑])/g, '$1$2')
                // 2. 句読点・記号の正規化
                .replace(/([ぁ-んァ-ヶ亜-黑])\./g, '$1。')
                .replace(/([ぁ-んァ-ヶ亜-黑]),/g, '$1、')
                .replace(/([ぁ-んァ-ヶ亜-黑])\.\.\./g, '$1…')
                .replace(/[\|｜!]/g, match => (match === '!' ? '！' : '')) // 縦線ノイズ除去 + 感嘆符正規化
                .replace(/[\u2022\u2013\u2014]/g, 'ー')
                // 3. 頻出誤読の文脈補正
                .replace(/([ぁ-ん])1/g, '$1ー')
                .replace(/([ぁ-ん])0/g, '$1〇')
                .replace(/([ぁ-ん])O/g, '$1〇')
                .replace(/([ぁ-ん])o/g, '$1っ')
                .replace(/([ぁ-ん])u/g, '$1し')
                .replace(/([ぁ-ん])v/g, '$1い')
                .replace(/([ぁ-ん])w/g, '$1め')
                .replace(/([ぁ-ん])r/g, '$1ん')
                // 4. 改行とゴミ取り
                .replace(/\n\s*\n/g, '\n\n')
                .replace(/[\s・]+$/g, '');

            if (tesseractLang === 'jpn_vert') {
                formattedText = formattedText
                    .replace(/一(?=[ぁ-んァ-ヶ亜-黑])/g, 'ー')
                    .replace(/（\s*/g, '（')
                    .replace(/\s*）/g, '）');
            }
        }

        setProgress(100, '完了！');
        setTimeout(() => { prepareEditor(formattedText); navigateTo('editor'); }, 500);

    } catch (err) {
        console.error('[OCR Error]', err);
        prepareEditor(''); navigateTo('editor');
        showToast('OCRに失敗しました。', 'error');
    }
}

async function startOcrProcessFull() {
    if (!state.originalImage) return;
    if (location.protocol === 'file:') { showFileProtocolWarning(); return; }

    const sourceImage = state.originalImage;
    state.currentImage = sourceImage;
    els.editorImg.src = sourceImage;

    const dirRadio = document.querySelector('input[name="text-dir"]:checked');
    const tesseractLang = dirRadio ? dirRadio.value : 'jpn_vert';

    navigateTo('processing');
    setProgress(5, '画像全体を読み取り中…');

    try {
        const processedImage = await preprocessImageForOCR(sourceImage);
        setProgress(15, '認識エンジンを最適化中…');

        const worker = await Tesseract.createWorker(tesseractLang, 1, {
            langPath: 'https://tessdata.projectnaptha.com/4.0.0_best',
            logger: m => {
                if (m.status === 'recognizing text') {
                    const prog = Math.round((m.progress || 0) * 55) + 40;
                    setProgress(prog, `文字を認識中… ${Math.round((m.progress || 0) * 100)}%`);
                }
            }
        });

        const psmValue = tesseractLang === 'jpn_vert' ? 5 : 6;
        await worker.setParameters({
            tessedit_pageseg_mode: psmValue.toString(),
            preserve_interword_spaces: '0',
            tessedit_ocr_engine_mode: '1',
            tessjs_create_hocr: '0',
            tessjs_create_tsv: '0',
        });

        const { data: { text } } = await worker.recognize(processedImage);
        await worker.terminate();

        setProgress(95, 'テキストをクリーンアップ中…');

        let formattedText = text.trim();

        if (tesseractLang.includes('jpn')) {
            formattedText = formattedText
                .replace(/([ぁ-んァ-ヶ亜-黑])\s+([ぁ-んァ-ヶ亜-黑])/g, '$1$2')
                .replace(/([ぁ-んァ-ヶ亜-黑])\s+([、。！？（）「」])/g, '$1$2')
                .replace(/([、。！？（）「」])\s+([ぁ-んァ-ヶ亜-黑])/g, '$1$2')
                .replace(/([ぁ-んァ-ヶ亜-黑])\./g, '$1。')
                .replace(/([ぁ-んァ-ヶ亜-黑]),/g, '$1、')
                .replace(/([ぁ-んァ-ヶ亜-黑])\.\.\./g, '$1…')
                .replace(/[\|｜!]/g, match => (match === '!' ? '！' : ''))
                .replace(/[\u2022\u2013\u2014]/g, 'ー')
                .replace(/([ぁ-ん])1/g, '$1ー')
                .replace(/([ぁ-ん])0/g, '$1〇')
                .replace(/([ぁ-ん])O/g, '$1〇')
                .replace(/([ぁ-ん])o/g, '$1っ')
                .replace(/([ぁ-ん])u/g, '$1し')
                .replace(/([ぁ-ん])v/g, '$1い')
                .replace(/([ぁ-ん])w/g, '$1め')
                .replace(/\n\s*\n/g, '\n\n')
                .replace(/[\s・]+$/g, '');

            if (tesseractLang === 'jpn_vert') {
                formattedText = formattedText
                    .replace(/一(?=[ぁ-んァ-ヶ亜-黑])/g, 'ー')
                    .replace(/（\s*/g, '（')
                    .replace(/\s*）/g, '）');
            }
        }

        setProgress(100, '完了！');
        setTimeout(() => { prepareEditor(formattedText); navigateTo('editor'); }, 500);

    } catch (err) {
        console.error('[OCR Full Error]', err);
        prepareEditor(''); navigateTo('editor');
        showToast('OCRに失敗しました。', 'error');
    }
}

function showFileProtocolWarning() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'display:flex; z-index:2100; backdrop-filter: blur(15px); background: rgba(0,0,0,0.85);';
    overlay.innerHTML = `
        <div class="modal" style="max-width:540px; border: 2px solid var(--gold); background: #121214; padding: 40px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
            <div style="text-align:center; margin-bottom:24px;">
                <div style="width:60px; height:60px; background:rgba(212,175,55,0.1); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
                    <i class="fa-solid fa-rocket" style="color:var(--gold); font-size:28px;"></i>
                </div>
                <h3 style="color:var(--gold); font-size:24px; font-family:var(--font-display); margin:0;">準備が整いました</h3>
            </div>
            
            <div style="background:rgba(255,255,255,0.03); padding:24px; border-radius:12px; border:1px solid rgba(212,175,55,0.3); margin-bottom:24px;">
                <p style="font-size:15px; line-height:1.6; color:var(--text-primary); margin:0 0 16px 0; text-align:center;">
                    デスクトップにある<strong>「Book Markers を起動」</strong><br>
                    というアイコンをダブルクリックしてください。<br>
                    <span style="font-size:13px; color:var(--text-secondary);">（フォルダーを探す手間がなくなりました！）</span>
                </p>
                
                <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top:16px;">
                    <p style="font-size:12px; color:var(--text-muted); margin:0;">
                        ※ アイコンが見当たらない場合は、フォルダー内の「START_APP.bat」からも起動できます。
                    </p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
                <button class="btn-secondary" id="warn-cancel" style="padding:12px;">閉じる</button>
                <button class="btn-primary" id="warn-manual" style="background:transparent; border:1px solid var(--gold); color:var(--gold); padding:12px;">
                    手動で入力する
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#warn-cancel').onclick = () => overlay.remove();
    overlay.querySelector('#warn-manual').onclick = () => { overlay.remove(); prepareEditor(''); navigateTo('editor'); };
}

function setProgress(percent, statusText) { els.progressBar.style.width = `${percent}%`; els.processingStatus.textContent = statusText; }

function prepareEditor(ocrText) {
    if (!state.currentEditId) {
        els.bookTitle.value = ''; els.bookAuthor.value = ''; els.bookPage.value = '';
        els.bookTag.value = ''; els.userNote.value = ''; els.ocrText.value = ocrText;
    }
    // 新規・編集を問わず、現在の切り抜き・編集画像を反映
    els.editorImg.src = state.currentImage || '';
}

async function saveBookmark() {
    const text = els.ocrText.value.trim();
    if (!text) { showToast('テキストを入力してください', 'warn'); els.ocrText.focus(); return; }
    const tags = els.bookTag.value ? [els.bookTag.value] : [];
    let bookmarkToSave;
    if (state.currentEditId) {
        const idx = state.bookmarks.findIndex(b => b.id === state.currentEditId);
        if (idx !== -1) {
            state.bookmarks[idx] = { ...state.bookmarks[idx], bookTitle: els.bookTitle.value.trim() || '無題', bookAuthor: els.bookAuthor.value.trim(), page: els.bookPage.value.trim(), tags, text, note: els.userNote.value.trim(), updatedAt: Date.now() };
            bookmarkToSave = state.bookmarks[idx];
        }
        showToast('更新しました');
    } else {
        const bookmark = { id: generateId(), bookTitle: els.bookTitle.value.trim() || '無題', bookAuthor: els.bookAuthor.value.trim(), page: els.bookPage.value.trim(), tags, text, note: els.userNote.value.trim(), imageUrl: state.currentImage, createdAt: Date.now(), updatedAt: Date.now() };
        state.bookmarks.unshift(bookmark);
        bookmarkToSave = bookmark;
        showToast('保存しました');
    }
    try {
        await dbPut(bookmarkToSave);
    } catch {
        showToast('保存容量が不足しています。', 'error');
    }
    state.currentEditId = null; navigateTo('library');
}

function startEditBookmark() {
    const bm = state.bookmarks.find(b => b.id === state.currentEditId);
    if (!bm) return;
    state.currentImage = bm.imageUrl; els.editorImg.src = bm.imageUrl || '';
    els.bookTitle.value = bm.bookTitle; els.bookAuthor.value = bm.bookAuthor;
    els.bookPage.value = bm.page || ''; els.bookTag.value = bm.tags[0] || '';
    els.ocrText.value = bm.text; els.userNote.value = bm.note || '';
    navigateTo('editor');
}

function showDeleteModal(id) { state.deleteTargetId = id; els.modalOverlay.classList.remove('hidden'); }
function hideModal() { state.deleteTargetId = null; els.modalOverlay.classList.add('hidden'); }
async function confirmDelete() {
    if (!state.deleteTargetId) return;
    const id = state.deleteTargetId;
    state.bookmarks = state.bookmarks.filter(b => b.id !== id);
    try {
        await dbDelete(id);
    } catch {
        showToast('削除に失敗しました。', 'error');
        return;
    }
    hideModal(); showToast('削除しました'); navigateTo('library');
}

function renderLibrary() {
    const q = state.searchQuery.toLowerCase();
    let list = state.bookmarks.filter(bm => !q || bm.bookTitle.toLowerCase().includes(q) || bm.bookAuthor.toLowerCase().includes(q) || bm.text.toLowerCase().includes(q) || bm.tags.some(t => t.toLowerCase().includes(q)));
    list = sortBookmarks(list);
    const total = state.bookmarks.length;
    els.bookmarkCount.textContent = `${total} passage${total !== 1 ? 's' : ''}`;
    els.emptyState.classList.toggle('hidden', total > 0 || q !== '');
    els.noResults.classList.toggle('hidden', !(total > 0 && list.length === 0));
    if (total > 0 && list.length === 0) els.noResultsQ.textContent = state.searchQuery;
    els.bookmarksGrid.innerHTML = '';
    list.forEach(bm => els.bookmarksGrid.appendChild(createBookmarkCard(bm)));
}

function sortBookmarks(list) {
    return [...list].sort((a, b) => {
        if (state.sortOrder === 'oldest') return a.createdAt - b.createdAt;
        if (state.sortOrder === 'book') return a.bookTitle.localeCompare(b.bookTitle, 'ja');
        return b.createdAt - a.createdAt;
    });
}

const TAG_COLOR_MAP = {
    '文学・小説':     'tag-bg-literature',
    'ビジネス・経済': 'tag-bg-business',
    '教養・人文':     'tag-bg-humanities',
    '科学・技術':     'tag-bg-science',
    '自己啓発・精神': 'tag-bg-selfhelp',
    '実用・暮らし':   'tag-bg-living',
    '政治・社会':     'tag-bg-politics',
    '芸術・文化':     'tag-bg-arts',
    '学習・語学':     'tag-bg-learning',
    'その他':         'tag-bg-other',
};

function createBookmarkCard(bm) {
    const card = document.createElement('article');
    const tagClass = bm.tags.length ? (TAG_COLOR_MAP[bm.tags[0]] || '') : '';
    card.className = `bookmark-card${tagClass ? ' ' + tagClass : ''}`; card.setAttribute('tabindex', '0'); card.setAttribute('role', 'button');
    const imageHtml = bm.imageUrl ? `<img class="card-image" src="${bm.imageUrl}" alt="${escHtml(bm.bookTitle)}" loading="lazy">` : `<div class="card-image-placeholder"><i class="fa-solid fa-book-open"></i></div>`;
    const tagsHtml = bm.tags.length ? bm.tags.map(t => `<span class="tag-chip">${escHtml(t)}</span>`).join('') : '';
    const authorStr = bm.bookAuthor ? `著: ${bm.bookAuthor}` : '';
    card.innerHTML = `${imageHtml}<div class="card-body"><div class="card-book-info"><div class="card-spine"></div><div class="card-titles"><div class="card-title">${escHtml(bm.bookTitle)}</div>${authorStr ? `<div class="card-author">${escHtml(authorStr)}</div>` : ''}</div></div><p class="card-passage">${escHtml(bm.text)}</p><div class="card-footer"><span class="card-date">${formatDate(bm.createdAt)}</span><div class="card-tags">${tagsHtml}</div></div></div>`;
    const openDetail = () => openBookmarkDetail(bm.id);
    card.addEventListener('click', openDetail);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openDetail(); });
    return card;
}

function openBookmarkDetail(id) {
    const bm = state.bookmarks.find(b => b.id === id);
    if (!bm) return;
    state.currentEditId = id;
    els.detailBookTitle.textContent = bm.bookTitle; els.detailBookAuthor.textContent = bm.bookAuthor ? `著: ${bm.bookAuthor}` : '';
    els.detailPage.textContent = bm.page ? `p. ${bm.page}` : ''; els.detailDate.textContent = `記録日: ${formatDate(bm.createdAt)}`;
    els.detailPassage.textContent = bm.text;
    els.detailTags.innerHTML = bm.tags.length ? bm.tags.map(t => `<span class="tag-chip">${escHtml(t)}</span>`).join('') : '';
    if (bm.imageUrl) { els.detailImg.src = bm.imageUrl; els.detailImg.style.display = 'block'; } else { els.detailImg.style.display = 'none'; }
    if (bm.note) { els.detailNote.textContent = bm.note; els.detailNoteWrap.classList.remove('hidden'); } else { els.detailNoteWrap.classList.add('hidden'); }
    navigateTo('detail');
    updateDetailNavButtons();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// IndexedDB ヘルパー
// ============================================
function openDB() {
    if (_db) return Promise.resolve(_db);
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
        req.onsuccess = e => { _db = e.target.result; resolve(_db); };
        req.onerror = e => reject(e.target.error);
    });
}

async function dbGetAll() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = e => reject(e.target.error);
    });
}

async function dbPut(bookmark) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const req = tx.objectStore(STORE_NAME).put(bookmark);
        req.onsuccess = () => resolve();
        req.onerror = e => reject(e.target.error);
    });
}

async function dbDelete(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const req = tx.objectStore(STORE_NAME).delete(id);
        req.onsuccess = () => resolve();
        req.onerror = e => reject(e.target.error);
    });
}

async function migrateFromLocalStorage() {
    const OLD_KEY = 'book_markers_data';
    const raw = localStorage.getItem(OLD_KEY);
    if (!raw) return;
    try {
        const bookmarks = JSON.parse(raw);
        if (Array.isArray(bookmarks) && bookmarks.length > 0) {
            for (const bm of bookmarks) { await dbPut(bm); }
        }
        localStorage.removeItem(OLD_KEY);
    } catch {
        // 移行失敗時は無視
    }
}

let toastTimer = null;
function showToast(msg, type = 'success') {
    els.toastMsg.textContent = msg;
    const icon = els.toast.querySelector('.toast-icon');
    if (type === 'error') { icon.className = 'fa-solid fa-circle-exclamation toast-icon'; icon.style.color = 'var(--danger-hover)'; } else if (type === 'warn') { icon.className = 'fa-solid fa-triangle-exclamation toast-icon'; icon.style.color = 'var(--gold)'; } else { icon.className = 'fa-solid fa-bookmark toast-icon'; icon.style.color = 'var(--gold)'; }
    els.toast.classList.remove('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { els.toast.classList.add('hidden'); }, 3000);
}

function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function formatDate(timestamp) { const d = new Date(timestamp); return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`; }

function escHtml(str) {
    if (!str) return '';
    const map = { '&': '&', '<': '<', '>': '>', '"': '"', "'": '&#039;' };
    return String(str).replace(/[&<>"']/g, m => map[m]);
}

// ============================================
// ブックマーク前後ナビゲーション
// ============================================

/** 詳細ビューの前後ボタンと位置表示を更新 */
function updateDetailNavButtons() {
    const sorted = sortBookmarks(state.bookmarks);
    const idx = sorted.findIndex(b => b.id === state.currentEditId);
    els.btnPrevBookmark.disabled = idx <= 0;
    els.btnNextBookmark.disabled = idx >= sorted.length - 1;
    els.detailNavPos.textContent = sorted.length > 1 ? `${idx + 1} / ${sorted.length}` : '';
}

/** direction: -1=前, 1=次 */
function navigateToAdjacentBookmark(direction) {
    const sorted = sortBookmarks(state.bookmarks);
    const idx = sorted.findIndex(b => b.id === state.currentEditId);
    if (idx === -1) return;
    const nextIdx = idx + direction;
    if (nextIdx < 0 || nextIdx >= sorted.length) return;
    openBookmarkDetail(sorted[nextIdx].id);
}

/**
 * 高精度OCRのための高度な画像前処理
 * - 適応的二値化（Bradley-Roth法）
 * - ノイズ除去（メディアンフィルタ的処理）
 */
async function preprocessImageForOCR(dataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            const MAX_DIM = 5000;
            let width = img.width * 1.5;
            let height = img.height * 1.5;

            if (Math.max(width, height) > MAX_DIM) {
                const ratio = MAX_DIM / Math.max(width, height);
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            } else {
                width = Math.floor(width);
                height = Math.floor(height);
            }

            canvas.width = width; canvas.height = height;

            ctx.filter = 'contrast(1.4) brightness(1.0) saturate(0)';
            
            ctx.drawImage(img, 0, 0, width, height);

            // 適応的二値化の前にさらにエッジを強調（簡易的なシャープネス）
            const imageData = ctx.getImageData(0, 0, width, height);
            const data = imageData.data;
            const grayscale = new Uint8ClampedArray(width * height);
            for (let i = 0; i < data.length; i += 4) {
                grayscale[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            }

            // 適応的二値化のパラメータ調整
            // S: 近傍サイズ、T: 閾値比
            const S = Math.floor(width / 8);
            const T = 0.18;
            const integralImage = new Float64Array(width * height);
            const binary = new Uint8ClampedArray(width * height);

            for (let x = 0; x < width; x++) {
                let sum = 0;
                for (let y = 0; y < height; y++) {
                    sum += grayscale[y * width + x];
                    if (x === 0) integralImage[y * width + x] = sum;
                    else integralImage[y * width + x] = integralImage[y * width + (x - 1)] + sum;
                }
            }

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const x1 = Math.floor(Math.max(0, x - S / 2));
                    const x2 = Math.floor(Math.min(width - 1, x + S / 2));
                    const y1 = Math.floor(Math.max(0, y - S / 2));
                    const y2 = Math.floor(Math.min(height - 1, y + S / 2));
                    const count = (x2 - x1) * (y2 - y1);
                    const sum = integralImage[y2 * width + x2] - integralImage[y1 * width + x2] - integralImage[y2 * width + x1] + integralImage[y1 * width + x1];
                    binary[y * width + x] = (grayscale[y * width + x] * count < sum * (1.0 - T)) ? 0 : 255;
                }
            }

            const denoised = new Uint8ClampedArray(width * height);
            for (let x = 1; x < width - 1; x++) {
                for (let y = 1; y < height - 1; y++) {
                    let blackCount = 0;
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            if (binary[(y + dy) * width + (x + dx)] === 0) blackCount++;
                        }
                    }
                    if (binary[y * width + x] === 0) denoised[y * width + x] = (blackCount >= 2) ? 0 : 255;
                    else denoised[y * width + x] = (blackCount >= 7) ? 0 : 255;
                }
            }

            for (let i = 0; i < denoised.length; i++) {
                const idx = i * 4;
                data[idx] = data[idx + 1] = data[idx + 2] = denoised[i];
                data[idx + 3] = 255;
            }
            ctx.putImageData(imageData, 0, 0);

            // 白い余白を追加（エッジ付近の文字認識を改善）
            const PADDING = 24;
            const paddedCanvas = document.createElement('canvas');
            paddedCanvas.width = width + PADDING * 2;
            paddedCanvas.height = height + PADDING * 2;
            const paddedCtx = paddedCanvas.getContext('2d');
            paddedCtx.fillStyle = 'white';
            paddedCtx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
            paddedCtx.drawImage(canvas, PADDING, PADDING);

            resolve(paddedCanvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = dataUrl;
    });
}
