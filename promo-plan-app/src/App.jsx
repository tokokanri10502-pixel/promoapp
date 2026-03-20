import React, { useMemo, useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import Header from './components/Header';
import PromotionBody from './components/PromotionBody';
import MonthlyCalendar from './components/MonthlyCalendar';
import WeeklyMDTable from './components/WeeklyMDTable';
import ActionButtons from './components/ActionButtons';
import WeatherBanner from './components/WeatherBanner';
import TrendPanel from './components/TrendPanel';
import { generateMonthCalendar } from './utils/calendarUtils';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchLastYearWeather } from './utils/weatherApi';

function App() {
  const currentDate = new Date();
  const [year, setYear, saveYear] = useLocalStorage('promo_app_current_year', currentDate.getFullYear());
  const [month, setMonth, saveMonth] = useLocalStorage('promo_app_current_month', currentDate.getMonth() + 1);

  // 月と年が変わったときにカレンダー生成
  const monthCalendar = useMemo(() => {
    return generateMonthCalendar(year, month);
  }, [year, month]);

  // 前年同月の気温データ取得
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    setWeatherLoading(true);
    setWeatherError(false);
    fetchLastYearWeather(year, month)
      .then((data) => { setWeather(data); setWeatherLoading(false); })
      .catch(() => { setWeatherError(true); setWeatherLoading(false); });
  }, [year, month]);


  // 全体共通テーマの永続化
  const themeKey = `promo_theme_${year}_${month}`;
  const [themeData, setThemeData, saveThemeData] = useLocalStorage(themeKey, {
    mainTheme: '',
    trends: '',
    lastYearRef: '',
    notes: ''
  });

  // 月間カレンダーの各日付メモの永続化
  const notesKey = `promo_calendar_notes_${year}_${month}`;
  const [calendarNotes, setCalendarNotes, saveCalendarNotes] = useLocalStorage(notesKey, {});

  const updateCalendarNote = (dateKey, note) => {
    setCalendarNotes(prev => ({
      ...prev,
      [dateKey]: note
    }));
  };

  // 各週の詳細データ(部門別、販促など)の永続化
  const plansKey = `promo_plans_${year}_${month}`;
  const [weeklyPlans, setWeeklyPlans, saveWeeklyPlans] = useLocalStorage(plansKey, {});

  const handleSave = () => {
    saveYear();
    saveMonth();
    saveThemeData();
    saveCalendarNotes();
    saveWeeklyPlans();
    alert('データを保存しました');
  };

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
      <main id="pdf-export-content" className="w-full px-2 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto print:p-0 print:max-w-none bg-white">
        
        <div className="mb-4 border-b-2 border-primary-500 pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">
              {year}年 {month}月度 月間販促計画書
            </h2>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end no-print">
              <div className="text-sm text-gray-500 font-medium hidden sm:block">
                全社共通・部門別施策シート
              </div>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm font-bold shadow-green-600/30"
              >
                <Save className="w-5 h-5" />
                データを保存
              </button>
            </div>
          </div>
          <WeatherBanner
            weather={weather}
            loading={weatherLoading}
            error={weatherError}
            month={month}
          />
          <TrendPanel month={month} />
        </div>

        {/* 上段：プロモーションボディと月間カレンダーを並べる */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 print-layout-grid">
          <div className="lg:col-span-2 print-col-main">
            <PromotionBody month={month} themeData={themeData} setThemeData={setThemeData} />
          </div>
          <div className="lg:col-span-1 print-col-side">
            <MonthlyCalendar 
              monthCalendar={monthCalendar} 
              notes={calendarNotes}
              onNoteChange={updateCalendarNote}
            />
          </div>
        </div>

        {/* 下段：週次MD詳細テーブル */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
            <span className="bg-primary-500 text-white w-6 h-6 rounded flex items-center justify-center text-sm">📋</span>
            週別MD・販促詳細計画
          </h3>
          <p className="text-sm text-gray-500 mb-2 no-print">※ セルをクリックすると編集できます（編集後は上段の「データを保存」ボタンを押してください）</p>
          <WeeklyMDTable 
            monthCalendar={monthCalendar} 
            plans={weeklyPlans}
            updatePlan={updateWeeklyPlan}
          />
        </div>

        <ActionButtons year={year} month={month} />
      </main>
    </div>
  );
}

export default App;
