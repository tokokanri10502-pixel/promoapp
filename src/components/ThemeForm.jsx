import React from 'react';
import { Target, TrendingUp, AlertCircle, FileText } from 'lucide-react';

const ThemeForm = ({ themeData, setThemeData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setThemeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 print-break-inside-avoid">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-secondary-600" />
        重点月間テーマ・施策
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <span className="text-primary-600 font-bold">●</span> 月間重点テーマ
            </label>
            <textarea
              name="mainTheme"
              value={themeData.mainTheme || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[80px]"
              placeholder="例: 「春の旬彩」 地場野菜と新生活応援フェア"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-gray-500" /> 消費者トレンド・世相
            </label>
            <textarea
              name="trends"
              value={themeData.trends || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 min-h-[80px]"
              placeholder="例: 物価高騰による節約志向、時短・簡便惣菜の需要増加"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-orange-500" /> 前年実績と反省点
            </label>
            <textarea
              name="lastYearRef"
              value={themeData.lastYearRef || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-h-[80px]"
              placeholder="例: 前年は週末に雨天が多く客数減。生鮮の夕方見切りが遅れた反省あり。"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <FileText className="w-4 h-4 text-blue-500" /> 特記事項（地域行事など）
            </label>
            <textarea
              name="notes"
              value={themeData.notes || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
              placeholder="例: 第3土曜日は地元の「みなと祭り」で交通規制あり。"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeForm;
