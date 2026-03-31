import React from 'react';
import { Download, Printer } from 'lucide-react';

const ActionButtons = ({ year, month }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // タイトルを一時的に変更してPDF保存時のファイル名を誘導
    const originalTitle = document.title;
    document.title = `販促計画書_${year}年${month}月`;
    window.print();
    document.title = originalTitle;
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
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors shadow-sm font-medium shadow-primary-500/30"
      >
        <Download className="w-4 h-4" />
        PDFダウンロード
      </button>
    </div>
  );
};

export default ActionButtons;
