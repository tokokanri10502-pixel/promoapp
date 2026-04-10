import { endOfMonth, eachWeekOfInterval, endOfWeek, eachDayOfInterval, format, getWeek, isSameMonth } from 'date-fns';
import { ja } from 'date-fns/locale';
import JapaneseHolidays from 'japanese-holidays';

// 当月日数が少ない端数週とみなす閾値（この日数以下なら隣の週にマージ）
const MERGE_THRESHOLD = 3;

// 週のdays配列から当月部分だけのラベルを生成
const monthRangeLabel = (days) => {
  const inMonth = days.filter(d => d.isCurrentMonth);
  if (inMonth.length === 0) return '';
  const first = inMonth[0];
  const last = inMonth[inMonth.length - 1];
  return `${first.monthNum}/${first.dayNum}〜${last.monthNum}/${last.dayNum}`;
};

/**
 * 指定された年・月のカレンダー情報を生成し、日単位の詳細データを含める
 * 月初・月末の端数週（当月日数が MERGE_THRESHOLD 以下）は隣の週にマージして
 * 最大5行に収める。
 * @param {number} year - 年
 * @param {number} month - 月 (1-12)
 */
export const generateMonthCalendar = (year, month) => {
  const targetMonthIndex = month - 1;
  const firstDay = new Date(year, targetMonthIndex, 1);
  const lastDay = endOfMonth(firstDay);

  // 月に含まれる週の開始日（月曜日始まり）
  const weekStarts = eachWeekOfInterval(
    { start: firstDay, end: lastDay },
    { weekStartsOn: 1 }
  );

  // 各週のデータを生成
  let weeks = weekStarts.map((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    const weekNumber = getWeek(weekStart, { weekStartsOn: 1, firstWeekContainsDate: 4 });

    const days = eachDayOfInterval({ start: weekStart, end: weekEnd }).map(dayDate => {
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

    return {
      weekNumber,
      startDate: weekStart,
      endDate: weekEnd,
      days,
      daysInMonth: days.filter(d => d.isCurrentMonth).length,
    };
  });

  // 月初の端数週（当月日数 ≤ 閾値）を次の週にマージ
  if (weeks.length > 1 && weeks[0].daysInMonth <= MERGE_THRESHOLD) {
    const [thin, next, ...rest] = weeks;
    weeks = [
      {
        ...next,
        days: [...thin.days, ...next.days],
        startDate: thin.startDate,
        daysInMonth: next.daysInMonth + thin.daysInMonth,
      },
      ...rest,
    ];
  }

  // 月末の端数週（当月日数 ≤ 閾値）を前の週にマージ
  if (weeks.length > 1 && weeks[weeks.length - 1].daysInMonth <= MERGE_THRESHOLD) {
    const thin = weeks[weeks.length - 1];
    const prev = weeks[weeks.length - 2];
    weeks = [
      ...weeks.slice(0, -2),
      {
        ...prev,
        days: [...prev.days, ...thin.days],
        endDate: thin.endDate,
        daysInMonth: prev.daysInMonth + thin.daysInMonth,
      },
    ];
  }

  // ラベルと weekKey を付与して返す
  return weeks.map(week => ({
    weekNumber: week.weekNumber,
    startDate: week.startDate,
    endDate: week.endDate,
    label: monthRangeLabel(week.days),
    weekKey: `W${week.weekNumber}`,
    days: week.days,
  }));
};
