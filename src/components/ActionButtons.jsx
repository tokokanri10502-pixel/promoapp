import React, { useState } from 'react';
import { Download, Printer, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ActionButtons = ({ year, month }) => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPDF(true);

      const element = document.getElementById('pdf-export-content');
      if (!element) {
        alert("PDF化する内容が見つかりません。");
        return;
      }

      // Hide no-print elements before capturing
      const noPrintElements = element.querySelectorAll('.no-print');
      noPrintElements.forEach(el => {
        el.style.display = 'none';
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      // Restore displayed properties
      noPrintElements.forEach(el => {
        el.style.display = '';
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('l', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      const filename = `販促計画書_${year}年${month}月.pdf`;
      pdf.save(filename);

    } catch (error) {
      console.error('PDF生成エラー:', error);
      alert('PDFの生成中にエラーが発生しました。');
    } finally {
      setIsGeneratingPDF(false);
    }
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
        disabled={isGeneratingPDF}
        className={`flex items-center gap-2 px-4 py-2 ${
          isGeneratingPDF ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 shadow-primary-500/30'
        } text-white rounded-md transition-colors shadow-sm font-medium`}
      >
        {isGeneratingPDF ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {isGeneratingPDF ? 'PDF生成中...' : 'PDFダウンロード'}
      </button>
    </div>
  );
};

export default ActionButtons;
