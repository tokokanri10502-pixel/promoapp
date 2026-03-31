import React from 'react';
import EditableCell from './EditableCell';
import { getEventsForDate } from '../data/mockData';

const WeeklyMDTable = ({ monthCalendar, plans, updatePlan }) => {
  return (
    <div className="bg-white shadow-sm border border-gray-200 overflow-x-auto print-break-inside-avoid">
      <p className="text-[10px] text-gray-400 px-3 pt-2 sm:hidden">← 横にスクロールできます</p>
      <table className="min-w-full divide-y divide-gray-300 border-collapse table-fixed text-sm">
        <thead className="bg-primary-50">
          <tr>
            <th className="w-16 px-2 py-3 text-center border-r border-gray-300 font-bold text-gray-700">週/期間</th>
            <th className="w-32 px-2 py-3 text-left border-r border-gray-300 font-bold text-gray-700">暮らしの歳時記</th>
            <th className="w-40 px-2 py-3 text-left border-r border-gray-300 font-bold text-gray-700">重点テーマ</th>
            <th className="w-96 px-2 py-3 text-center border-r border-gray-300 font-bold text-gray-700">
              生活行動とプロモーション
            </th>
            <th className="w-48 px-2 py-3 text-left border-r border-gray-300 font-bold text-gray-700">昨年の販促施策</th>
            <th className="w-40 px-2 py-3 text-left font-bold text-gray-700">個店対応・重点店舗差替え</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 bg-white">
          {monthCalendar.map((week) => {
            const weekKey = week.weekKey;
            const weekPlan = plans[weekKey] || {};

            // その週の歳時記・祝日・二十四節気などをテキストにまとめる（編集の初期値）
            const autoEventsText = week.days.flatMap((dayObj) => {
              const m = dayObj.date.getMonth() + 1;
              const d = dayObj.date.getDate();
              const eventSet = new Set();
              if (dayObj.isHoliday) eventSet.add(dayObj.holidayName);
              getEventsForDate(m, d).forEach(ev => eventSet.add(ev));
              return Array.from(eventSet).map(ev => `${m}/${d}(${dayObj.dayOfWeek}): ${ev}`);
            }).join('\n');

            // ユーザーが編集済みなら編集値、未編集なら自動生成テキストを使用
            const eventsValue = weekPlan.events !== undefined ? weekPlan.events : autoEventsText;

            return (
              <tr key={weekKey} className="hover:bg-gray-50 transition-colors">
                {/* 週/期間 */}
                <td className="px-2 py-2 border-r border-gray-300 align-top bg-gray-50">
                  <div className="font-bold text-gray-800 text-center mb-1">第{week.weekNumber}週</div>
                  <div className="text-[10px] text-gray-500 text-center">{week.label}</div>
                </td>

                {/* 暮らしの歳時記 */}
                <td className="p-1 border-r border-gray-300 align-top">
                  <EditableCell
                    value={eventsValue}
                    onChange={(val) => updatePlan(weekKey, 'events', val)}
                    placeholder="歳時記・行事を入力"
                  />
                </td>

                {/* 重点テーマ */}
                <td className="p-1 border-r border-gray-300 align-top">
                  <EditableCell
                    value={weekPlan.theme || ''}
                    onChange={(val) => updatePlan(weekKey, 'theme', val)}
                    placeholder="テーマ名など"
                  />
                </td>

                {/* 生活行動とプロモーション */}
                <td className="p-1 border-r border-gray-300 align-top">
                  <EditableCell
                    value={weekPlan.lifestyle_promo || ''}
                    onChange={(val) => updatePlan(weekKey, 'lifestyle_promo', val)}
                    placeholder="生活行動やプロモーションの詳細"
                  />
                </td>

                {/* 販促施策 */}
                <td className="p-1 border-r border-gray-300 align-top">
                  <EditableCell
                    value={weekPlan.promotion || ''}
                    onChange={(val) => updatePlan(weekKey, 'promotion', val)}
                    placeholder="前年のチラシ内容・イベント等"
                  />
                </td>

                {/* 独自施策 */}
                <td className="p-1 align-top">
                  <EditableCell
                    value={weekPlan.custom || ''}
                    onChange={(val) => updatePlan(weekKey, 'custom', val)}
                    placeholder="個店ごとの施策や差替え"
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
