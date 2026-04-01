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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden print-break-inside-avoid h-full">
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
                className={`min-h-[110px] h-[110px] border-r border-b border-gray-200 p-1 flex flex-col ${bgClass}`}
              >
                {(() => {
                  const eventsForDay = isCurrent ? getEventsForDate(dayObj.date.getMonth() + 1, dayObj.date.getDate(), dayObj.date.getFullYear()) : [];
                  const isYumeToku = !dayObj.isHoliday && isCurrent && eventsForDay.includes('ゆめトクサンデー');
                  const isCLYume = !dayObj.isHoliday && isCurrent && eventsForDay.includes('CLゆめタウンデー');
                  const is15ichi = isCurrent && eventsForDay.includes('15市');
                  const isYume25 = isCurrent && eventsForDay.includes('ゆめ25市');
                  const isPension = isCurrent && eventsForDay.includes('年金支給日');
                  const yumeTokuKey = `${dateKey}_yumeToku`;
                  const clYumeKey = `${dateKey}_clYume`;
                  const ichiKey = `${dateKey}_15ichi`;
                  const yume25Key = `${dateKey}_yume25`;
                  const pensionKey = `${dateKey}_pension`;
                  const yumeTokuValue = notes[yumeTokuKey] !== undefined ? notes[yumeTokuKey] : (isYumeToku ? 'ゆめトクサンデー' : '');
                  const clYumeValue = notes[clYumeKey] !== undefined ? notes[clYumeKey] : (isCLYume ? 'CLゆめタウンデー' : '');
                  const ichiValue = notes[ichiKey] !== undefined ? notes[ichiKey] : (is15ichi ? '15市' : '');
                  const yume25Value = notes[yume25Key] !== undefined ? notes[yume25Key] : (isYume25 ? 'ゆめ25市' : '');
                  const pensionValue = notes[pensionKey] !== undefined ? notes[pensionKey] : (isPension ? '年金支給日' : '');
                  return (
                    <div className="mb-1">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-bold ${textClass}`}>
                          {dayObj.date.getDate()}
                        </span>
                        {dayObj.isHoliday && (
                          <span className="text-[11px] text-red-600 font-bold leading-tight truncate" title={dayObj.holidayName}>
                            {dayObj.holidayName}
                          </span>
                        )}
                      </div>
                      {(isYumeToku || yumeTokuValue) && isCurrent && !dayObj.isHoliday && (
                        <input
                          type="text"
                          value={yumeTokuValue}
                          onChange={(e) => {
                            if (e.target.value.length <= 12) onNoteChange(yumeTokuKey, e.target.value);
                          }}
                          className="text-[11px] text-orange-600 font-bold leading-tight w-full bg-transparent outline-none border border-transparent hover:border-gray-200 focus:border-orange-300 rounded px-0.5 cursor-text"
                          maxLength={12}
                        />
                      )}
                      {(isCLYume || clYumeValue) && isCurrent && !dayObj.isHoliday && (
                        <input
                          type="text"
                          value={clYumeValue}
                          onChange={(e) => {
                            if (e.target.value.length <= 12) onNoteChange(clYumeKey, e.target.value);
                          }}
                          className="text-[11px] text-purple-600 font-bold leading-tight w-full bg-transparent outline-none border border-transparent hover:border-gray-200 focus:border-purple-300 rounded px-0.5 cursor-text"
                          maxLength={12}
                        />
                      )}
                      {(is15ichi || ichiValue) && isCurrent && (
                        <input
                          type="text"
                          value={ichiValue}
                          onChange={(e) => {
                            if (e.target.value.length <= 12) onNoteChange(ichiKey, e.target.value);
                          }}
                          className="text-[11px] text-green-700 font-bold leading-tight w-full bg-transparent outline-none border border-transparent hover:border-gray-200 focus:border-green-300 rounded px-0.5 cursor-text"
                          maxLength={12}
                        />
                      )}
                      {(isYume25 || yume25Value) && isCurrent && (
                        <input
                          type="text"
                          value={yume25Value}
                          onChange={(e) => {
                            if (e.target.value.length <= 12) onNoteChange(yume25Key, e.target.value);
                          }}
                          className="text-[11px] text-pink-600 font-bold leading-tight w-full bg-transparent outline-none border border-transparent hover:border-gray-200 focus:border-pink-300 rounded px-0.5 cursor-text"
                          maxLength={12}
                        />
                      )}
                      {(isPension || pensionValue) && isCurrent && (
                        <input
                          type="text"
                          value={pensionValue}
                          onChange={(e) => {
                            if (e.target.value.length <= 12) onNoteChange(pensionKey, e.target.value);
                          }}
                          className="text-[11px] text-teal-600 font-bold leading-tight w-full bg-transparent outline-none border border-transparent hover:border-gray-200 focus:border-teal-300 rounded px-0.5 cursor-text"
                          maxLength={12}
                        />
                      )}
                    </div>
                  );
                })()}

                {isCurrent && (
                  <textarea
                    value={noteValue}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) {
                        onNoteChange(dateKey, e.target.value);
                      }
                    }}
                    placeholder=""
                    className="w-full flex-grow bg-transparent text-xs leading-tight resize-none outline-none focus:bg-primary-50 rounded p-0.5 border border-transparent hover:border-gray-200 focus:border-primary-300 placeholder-gray-300 overflow-hidden cursor-text"
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
