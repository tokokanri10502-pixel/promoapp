import React, { useMemo } from 'react';
import Header from './components/Header';
import ThemeForm from './components/ThemeForm';
import MonthlyCalendar from './components/MonthlyCalendar';
import WeeklyMDTable from './components/WeeklyMDTable';
import ActionButtons from './components/ActionButtons';
import { generateMonthCalendar } from './utils/calendarUtils';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const currentDate = new Date();
  const [year, setYear] = useLocalStorage('promo_app_current_year', currentDate.getFullYear());
  const [month, setMonth] = useLocalStorage('promo_app_current_month', currentDate.getMonth() + 1);

  // 月と年が変わったときにカレンダー生成
  const monthCalendar = useMemo(() => {
    return generateMonthCalendar(year, month);
  }, [year, month]);

  // 全体共通テーマの永続化
  const themeKey = `promo_theme_${year}_${month}`;
  const [themeData, setThemeData] = useLocalStorage(themeKey, {
    mainTheme: '',
    trends: '',
    lastYearRef: '',
    notes: ''
  });

  // 各週の詳細データ(部門別、販促など)の永続化
  const plansKey = `promo_plans_${year}_${month}`;
  const [weeklyPlans, setWeeklyPlans] = useLocalStorage(plansKey, {});

  const updateWeeklyPlan = (weekKey, field, value) => {
    setWeeklyPlans(prev => ({
      ...prev,
      [weekKey]: {
        ...(prev[weekKey] || {}),
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans print:bg-white pb-20">
      <Header year={year} month={month} setYear={setYear} setMonth={setMonth} />
      
      {/* 印刷用にはパディングを調整、横幅をフル活用する */}
      <main className="w-full px-2 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto print:p-0 print:max-w-none">
        
        <div className="mb-4 flex justify-between items-end border-b-2 border-primary-500 pb-2">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">
            {year}年 {month}月度 52週MD・販促計画書
          </h2>
          <div className="text-sm text-gray-500 font-medium">
            全社共通・部門別施策シート
          </div>
        </div>

        {/* 上段：テーマフォームと月間カレンダーを並べる */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <ThemeForm themeData={themeData} setThemeData={setThemeData} />
          </div>
          <div className="xl:col-span-1">
            <MonthlyCalendar monthCalendar={monthCalendar} />
          </div>
        </div>

        {/* 下段：週次MD詳細テーブル */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            <span className="bg-primary-500 text-white w-6 h-6 rounded flex items-center justify-center text-sm">📋</span>
            週別MD・販促詳細計画
          </h3>
          <p className="text-sm text-gray-500 mb-2 no-print">※ セルをクリックすると編集できます（保存は自動で行われます）</p>
          <WeeklyMDTable 
            monthCalendar={monthCalendar} 
            plans={weeklyPlans}
            updatePlan={updateWeeklyPlan}
          />
        </div>

        <ActionButtons />
      </main>
    </div>
  );
}

export default App;
