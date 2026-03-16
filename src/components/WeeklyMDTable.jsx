import React from 'react';
import EditableCell from './EditableCell';
import { getEventsForDate } from '../data/mockData';

const WeeklyMDTable = ({ monthCalendar, plans, updatePlan }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-x-auto print-break-inside-avoid">
      <table className="min-w-full divide-y divide-gray-300 border-collapse table-fixed text-sm">
        <thead className="bg-primary-50">
          <tr>
            <th className="w-16 px-2 py-3 text-center border-r border-gray-300 font-bold text-gray-700">週/期間</th>
            <th className="w-32 px-2 py-3 text-left border-r border-gray-300 font-bold text-gray-700">暮らしの歳時記</th>
            <th className="w-40 px-2 py-3 text-left border-r border-gray-300 font-bold text-gray-700">重点テーマ</th>
            <th className="w-96 px-2 py-3 text-center border-r border-gray-300 font-bold text-gray-700" colSpan="4">
              <div className="border-b border-gray-300 pb-1 mb-1">部門別MD計画</div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div>青果</div>
                <div>精肉</div>
                <div>鮮魚</div>
                <div>惣菜</div>
              </div>
            </th>
            <th className="w-48 px-2 py-3 text-left border-r border-gray-300 font-bold text-gray-700">販促施策(チラシ/SNS等)</th>
            <th className="w-40 px-2 py-3 text-left font-bold text-gray-700">独自施策・地域行事</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 bg-white">
          {monthCalendar.map((week) => {
            const weekKey = week.weekKey;
            const weekPlan = plans[weekKey] || {};

            // その週の歳時記・祝日・二十四節気などをまとめる
            const weekEventsMarkup = week.days.map((dayObj, i) => {
              const month = dayObj.date.getMonth() + 1;
              const date = dayObj.date.getDate();
              const seasonalEvents = getEventsForDate(month, date);
              const events = [];
              if (dayObj.isHoliday) events.push(dayObj.holidayName);
              events.push(...seasonalEvents);

              if (events.length === 0) return null;

              return (
                <div key={i} className="mb-1 text-xs">
                  <span className="font-bold text-gray-600 mr-1">{month}/{date}({dayObj.dayOfWeek}):</span>
                  {events.map((ev, ei) => (
                    <span key={ei} className="inline-block bg-orange-100 text-orange-800 px-1 py-0.5 rounded mr-1 mb-1">{ev}</span>
                  ))}
                </div>
              );
            }).filter(Boolean);

            return (
              <tr key={weekKey} className="hover:bg-gray-50 transition-colors">
                {/* 週/期間 */}
                <td className="px-2 py-2 border-r border-gray-300 align-top bg-gray-50">
                  <div className="font-bold text-gray-800 text-center mb-1">第{week.weekNumber}週</div>
                  <div className="text-[10px] text-gray-500 text-center">{week.label}</div>
                </td>
                
                {/* 暮らしの歳時記 */}
                <td className="px-2 py-2 border-r border-gray-300 align-top">
                  {weekEventsMarkup.length > 0 ? weekEventsMarkup : <span className="text-gray-400 text-xs italic">特になし</span>}
                </td>

                {/* 重点テーマ */}
                <td className="p-1 border-r border-gray-300 align-top">
                  <EditableCell 
                    value={weekPlan.theme || ''} 
                    onChange={(val) => updatePlan(weekKey, 'theme', val)} 
                    placeholder="テーマ名など" 
                  />
                </td>

                {/* 部門別MD計画 */}
                <td className="p-0 border-r border-gray-300 align-top" colSpan="4">
                  <div className="grid grid-cols-4 h-full divide-x divide-gray-200">
                    <div className="p-1">
                      <EditableCell 
                        value={weekPlan.produce || ''} 
                        onChange={(val) => updatePlan(weekKey, 'produce', val)} 
                        placeholder="青果" 
                        className="bg-green-50/30"
                      />
                    </div>
                    <div className="p-1">
                      <EditableCell 
                        value={weekPlan.meat || ''} 
                        onChange={(val) => updatePlan(weekKey, 'meat', val)} 
                        placeholder="精肉" 
                        className="bg-red-50/30"
                      />
                    </div>
                    <div className="p-1">
                      <EditableCell 
                        value={weekPlan.fish || ''} 
                        onChange={(val) => updatePlan(weekKey, 'fish', val)} 
                        placeholder="鮮魚" 
                        className="bg-blue-50/30"
                      />
                    </div>
                    <div className="p-1">
                      <EditableCell 
                        value={weekPlan.deli || ''} 
                        onChange={(val) => updatePlan(weekKey, 'deli', val)} 
                        placeholder="惣菜" 
                        className="bg-yellow-50/30"
                      />
                    </div>
                  </div>
                </td>

                {/* 販促施策 */}
                <td className="p-1 border-r border-gray-300 align-top">
                  <EditableCell 
                    value={weekPlan.promotion || ''} 
                    onChange={(val) => updatePlan(weekKey, 'promotion', val)} 
                    placeholder="チラシ・ポイント等" 
                  />
                </td>

                {/* 独自施策 */}
                <td className="p-1 align-top">
                  <EditableCell 
                    value={weekPlan.custom || ''} 
                    onChange={(val) => updatePlan(weekKey, 'custom', val)} 
                    placeholder="店舗固有の行事" 
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyMDTable;
