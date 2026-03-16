import React from 'react';

const MonthlyCalendar = ({ monthCalendar }) => {
  const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

  // 全ての日付をフラットな配列にする
  const allDays = monthCalendar.flatMap(week => week.days);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6 print-break-inside-avoid">
      <div className="bg-primary-50 px-4 py-3 border-b border-gray-200">
        <h3 className="font-bold text-primary-800 text-lg flex items-center gap-2">
          📅 月間カレンダー俯瞰
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
                className={`min-h-[80px] border-r border-b border-gray-200 p-1 flex flex-col ${bgClass}`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm ${textClass}`}>
                    {dayObj.date.getDate()}
                  </span>
                  {dayObj.isHoliday && (
                    <span className="text-[10px] text-red-600 font-bold leading-tight text-right w-12 truncate break-words" title={dayObj.holidayName}>
                      {dayObj.holidayName}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
