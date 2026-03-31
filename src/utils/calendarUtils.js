import { startOfMonth, endOfMonth, eachWeekOfInterval, startOfWeek, endOfWeek, eachDayOfInterval, format, getWeek, isSameMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import JapaneseHolidays from 'japanese-holidays';

/**
 * 指定された年・月のカレンダー情報を生成し、日単位の詳細データを含める
 * @param {number} year - 年
 * @param {number} month - 月 (1-12)
 */
export const generateMonthCalendar = (year, month) => {
  const targetMonthIndex = month - 1;
  const firstDay = new Date(year, targetMonthIndex, 1);
  const lastDay = endOfMonth(firstDay);

  // 月に含まれる週の開始日（月曜日始まり）
  const weeks = eachWeekOfInterval(
    { start: firstDay, end: lastDay },
    { weekStartsOn: 1 }
  );

  return weeks.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const weekNumber = getWeek(weekStart, { weekStartsOn: 1, firstWeekContainsDate: 4 });
    
    // その週に含まれる「日」の配列を生成
    const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(dayDate => {
      const isCurrentMonth = isSameMonth(dayDate, firstDay);
      const holidayName = JapaneseHolidays.isHoliday(dayDate);
      
      return {
        date: dayDate,
        dayNum: dayDate.getDate(),
        monthNum: dayDate.getMonth() + 1,
        dayOfWeek: format(dayDate, 'E', { locale: ja }),
        isCurrentMonth,
        isHoliday: !!holidayName,
        holidayName: holidayName || '',
        isWeekend: dayDate.getDay() === 0 || dayDate.getDay() === 6
      };
    });

    // 表示用ラベル
    const label = `${format(weekStart, 'M/d')}〜${format(weekEnd, 'M/d')}`;

    return {
      weekNumber,
      startDate: weekStart,
      endDate: weekEnd,
      label,
      weekKey: `W${weekNumber}`,
      days: daysInWeek
    };
  });
};
