import React, { useMemo, useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import Header from './components/Header';
import PromotionBody from './components/PromotionBody';
import MonthlyCalendar from './components/MonthlyCalendar';
import WeeklyMDTable from './components/WeeklyMDTable';
import ActionButtons from './components/ActionButtons';
import WeatherBanner from './components/WeatherBanner';
import TrendPanel from './components/TrendPanel';
import LoginScreen from './components/LoginScreen';
import { generateMonthCalendar } from './utils/calendarUtils';
import { fetchLastYearWeather } from './utils/weatherApi';
import { loadPlanData, savePlanData } from './utils/firestoreApi';

function MainApp() {
  const currentDate = new Date();
  const [year, setYear] = useState(() => {
    const saved = localStorage.getItem('promo_app_current_year');
    return saved ? Number(saved) : currentDate.getFullYear();
  });
  const [month, setMonth] = useState(() => {
    const saved = localStorage.getItem('promo_app_current_month');
    return saved ? Number(saved) : currentDate.getMonth() + 1;
  });

  const monthCalendar = useMemo(() => generateMonthCalendar(year, month), [year, month]);

  // 天気データ
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

  // Firestoreから読み込むデータ
  const [themeData, setThemeData] = useState({ mainTheme: '', trends: '', lastYearRef: '', notes: '' });
  const [calendarNotes, setCalendarNotes] = useState({});
  const [weeklyPlans, setWeeklyPlans] = useState({});
  const [dataLoading, setDataLoading] = useState(false);

  // 年月が変わったらFirestoreから読み込む
  useEffect(() => {
    setDataLoading(true);
    loadPlanData(year, month)
      .then((data) => {
        if (data) {
          setThemeData(data.themeData || { mainTheme: '', trends: '', lastYearRef: '', notes: '' });
          setCalendarNotes(data.calendarNotes || {});
          setWeeklyPlans(data.weeklyPlans || {});
        } else {
          setThemeData({ mainTheme: '', trends: '', lastYearRef: '', notes: '' });
          setCalendarNotes({});
          setWeeklyPlans({});
        }
      })
      .catch(() => {
        // Firestore失敗時はlocalStorageにフォールバック
        const th = localStorage.getItem(`promo_theme_${year}_${month}`);
        const cn = localStorage.getItem(`promo_calendar_notes_${year}_${month}`);
        const wp = localStorage.getItem(`promo_plans_${year}_${month}`);
        if (th) setThemeData(JSON.parse(th));
        if (cn) setCalendarNotes(JSON.parse(cn));
        if (wp) setWeeklyPlans(JSON.parse(wp));
      })
      .finally(() => setDataLoading(false));
  }, [year, month]);

  const handleYearChange = (newYear) => {
    setYear(newYear);
    localStorage.setItem('promo_app_current_year', newYear);
  };
  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
    localStorage.setItem('promo_app_current_month', newMonth);
  };

  const handleSave = async () => {
    try {
      await savePlanData(year, month, { themeData, calendarNotes, weeklyPlans });
      alert('データを保存しました');
    } catch (e) {
      alert('保存に失敗しました。通信状況を確認してください。');
    }
  };

  const updateCalendarNote = (dateKey, note) => {
    setCalendarNotes(prev => ({ ...prev, [dateKey]: note }));
  };

  const updateWeeklyPlan = (weekKey, field, value) => {
    setWeeklyPlans(prev => ({
      ...prev,
      [weekKey]: { ...(prev[weekKey] || {}), [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans print:bg-white pb-20">
      <Header year={year} month={month} setYear={handleYearChange} setMonth={handleMonthChange} />

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
          <WeatherBanner weather={weather} loading={weatherLoading} error={weatherError} month={month} />
          <TrendPanel month={month} />
        </div>

        {dataLoading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">データを読み込み中...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 print-layout-grid items-stretch">
              <div className="print-col-main h-full">
                <PromotionBody month={month} themeData={themeData} setThemeData={setThemeData} />
              </div>
              <div className="print-col-side h-full">
                <MonthlyCalendar monthCalendar={monthCalendar} notes={calendarNotes} onNoteChange={updateCalendarNote} />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                <span className="bg-primary-500 text-white w-6 h-6 rounded flex items-center justify-center text-sm">📋</span>
                週別MD・販促詳細計画
              </h3>
              <p className="text-sm text-gray-500 mb-2 no-print">※ セルをクリックすると編集できます（編集後は上段の「データを保存」ボタンを押してください）</p>
              <WeeklyMDTable monthCalendar={monthCalendar} plans={weeklyPlans} updatePlan={updateWeeklyPlan} />
            </div>

            <ActionButtons year={year} month={month} />
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('promo_auth') === '1'
  );

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return <MainApp />;
}

export default App;
