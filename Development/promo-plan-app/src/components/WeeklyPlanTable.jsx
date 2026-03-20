import React from 'react';
import { eventsData } from '../data/mockData';

const WeeklyPlanTable = ({ monthCalendar, month, customPlans, setCustomPlans }) => {
  const handlePlanChange = (weekKey, field, value) => {
    setCustomPlans(prev => ({
      ...prev,
      [weekKey]: {
        ...(prev[weekKey] || {}),
        [field]: value
      }
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">週</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">期間</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12">一般的な歳時記</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-primary-600 uppercase tracking-wider w-4/12">店舗独自施策・重点商品</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/12">前年実績・気象・メモ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthCalendar.map((week, index) => {
              // 月ごとの歳時記データから週番目に対応するものを取得
              // (実際のカレンダー週番号ではなく、その月における第何週かで簡易マッピング)
              const weekNumInMonth = `week${index + 1}`;
              const events = eventsData[month]?.[weekNumInMonth] || [];
              const weekCustomPlan = customPlans[week.weekKey] || {};

              return (
                <tr key={week.weekKey} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">第{week.weekNumber}週</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{week.label}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {events.map((event, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          {event}
                        </span>
                      ))}
                      {events.length === 0 && <span className="text-gray-400 text-xs">なし</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <textarea
                      placeholder="特売品・独自フェアーを入力"
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:ring-primary-500 focus:border-primary-500 border min-h-[60px]"
                      value={weekCustomPlan.action || ''}
                      onChange={(e) => handlePlanChange(week.weekKey, 'action', e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <textarea
                      placeholder="昨年の気温、反省など"
                      className="w-full text-sm border-gray-300 rounded-md shadow-sm py-1.5 px-2 focus:ring-gray-500 focus:border-gray-500 border min-h-[60px]"
                      value={weekCustomPlan.memo || ''}
                      onChange={(e) => handlePlanChange(week.weekKey, 'memo', e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyPlanTable;
