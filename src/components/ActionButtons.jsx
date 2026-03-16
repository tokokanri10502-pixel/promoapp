import React from 'react';
import { Download, FileDown, Printer } from 'lucide-react';

const ActionButtons = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert("ダミーの動作です。実際にはブラウザの印刷から「PDFに保存」を使用するか、jsPDFなどで生成します。");
  };

  const handleDownloadCSV = () => {
    alert("ダミーの動作です。実際には独自のCSVテキストを生成してBlobとしてダウンロードさせます。");
  };

  return (
    <div className="flex flex-wrap justify-end gap-3 mt-8 no-print pb-10">
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors shadow-sm font-medium"
      >
        <Printer className="w-4 h-4" />
        プレビュー・印刷
      </button>
      
      <button
        onClick={handleDownloadCSV}
        className="flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 border border-secondary-300 rounded-md hover:bg-secondary-200 transition-colors shadow-sm font-medium"
      >
        <FileDown className="w-4 h-4" />
        CSV出力
      </button>

      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors shadow-sm font-medium shadow-primary-500/30"
      >
        <Download className="w-4 h-4" />
        PDFダウンロード
      </button>
    </div>
  );
};

export default ActionButtons;
