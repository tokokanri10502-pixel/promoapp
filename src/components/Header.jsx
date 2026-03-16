import React from 'react';
import { Calendar } from 'lucide-react';

const Header = ({ year, month, setYear, setMonth }) => {
  const years = Array.from({ length: 7 }, (_, i) => 2024 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm py-4 px-6 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-primary-100 p-2 rounded-lg">
            <Calendar className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">オリジナル月間販促計画書</h1>
            <p className="text-sm text-gray-500">スーパーマーケット食品部・販促部向け</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="year-select" className="text-sm font-medium text-gray-700">年:</label>
            <select
              id="year-select"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {years.map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="month-select" className="text-sm font-medium text-gray-700">月:</label>
            <select
              id="month-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}月</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
