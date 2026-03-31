import React from 'react';
import { getEventsForDate } from '../data/mockData';

const MonthlyCalendar = ({ monthCalendar, notes = {}, onNoteChange }) => {
  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

  // 全ての日付をフラットな配列にする
  const allDays = monthCalendar.flatMap(week => week.days);

  const getDateKey = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 print-break-inside-avoid">
      <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-bold text-primary-800 text-lg flex items-center gap-2">
          📅 月間カレンダー
        </h3>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className={`text-center text-xs font-bold py-1 ${day === '土' ? 'text-blue-600' : day === '日' ? 'text-red-600' : 'text-gray-500'}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 border-t border-l border-gray-200">
          {allDays.map((dayObj, index) => {
            const isWeekend = dayObj.isWeekend;
            const isCurrent = dayObj.isCurrentMonth;
            const dateKey = getDateKey(dayObj.date);
            const noteValue = notes[dateKey] || '';

            let bgClass = "bg-white";
            let textClass = "text-gray-800";

            if (!isCurrent) {
              bgClass = "bg-gray-50";
              textClass = "text-gray-400";
            } else if (dayObj.isHoliday) {
              bgClass = "bg-red-50";
              textClass = "text-red-700 font-bold";
            } else if (dayObj.dayOfWeek === '土') {
              bgClass = "bg-blue-50";
              textClass = "text-blue-700";
            } else if (dayObj.dayOfWeek === '日') {
              bgClass = "bg-red-50";
              textClass = "text-red-700";
            }

            return (
              <div
                key={index}
                className={`min-h-[90px] h-[90px] border-r border-b border-gray-200 p-1 flex flex-col ${bgClass}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs ${textClass}`}>
                    {dayObj.date.getDate()}
                  </span>
                  {dayObj.isHoliday && (
                    <span className="text-[9px] text-red-600 font-bold leading-tight text-right w-11 truncate" title={dayObj.holidayName}>
                      {dayObj.holidayName}
                    </span>
                  )}
                  {!dayObj.isHoliday && isCurrent && getEventsForDate(dayObj.date.getMonth() + 1, dayObj.date.getDate(), dayObj.date.getFullYear()).includes('ゆめトクサンデー') && (
                    <span className="text-[9px] text-orange-600 font-bold leading-tight text-right w-11 truncate">
                      ゆめトク
                    </span>
                  )}
                </div>

                {isCurrent && (
                  <textarea
                    value={noteValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) {
                        onNoteChange(dateKey, e.target.value);
                      }
                    }}
                    placeholder="メモ..."
                    className="w-full flex-grow bg-transparent text-[10px] leading-tight resize-none outline-none focus:bg-primary-50 rounded p-0.5 border border-transparent hover:border-gray-200 focus:border-primary-300 placeholder-gray-300 overflow-hidden cursor-text"
                    maxLength={30}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
