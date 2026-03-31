import React from 'react';

const SEASON_ICON = (month) => {
  if (month >= 3 && month <= 5)  return '🌸';
  if (month >= 6 && month <= 8)  return '☀️';
  if (month >= 9 && month <= 11) return '🍂';
  return '❄️';
};

const CityRow = ({ name, data }) => (
  <div className="flex items-center gap-3 sm:gap-5">
    <span className="text-xs font-bold text-sky-700 w-14 shrink-0">📍 {name}</span>
    <div className="flex items-center gap-1 text-xs text-gray-600">
      <span className="text-gray-400">平均</span>
      <span className="font-bold text-gray-800 w-10 text-right">{data.avg}℃</span>
    </div>
    <div className="flex items-center gap-1 text-xs">
      <span className="text-red-400 text-[10px]">▲</span>
      <span className="text-gray-400 text-xs">最高</span>
      <span className="font-bold text-red-500 w-10 text-right">{data.max}℃</span>
    </div>
    <div className="flex items-center gap-1 text-xs">
      <span className="text-blue-400 text-[10px]">▼</span>
      <span className="text-gray-400 text-xs">最低</span>
      <span className="font-bold text-blue-500 w-10 text-right">{data.min}℃</span>
    </div>
  </div>
);

const WeatherBanner = ({ weather, loading, error, month }) => {
  const icon = SEASON_ICON(month);

  if (loading) {
    return (
      <div className="no-print mt-2 px-4 py-2 bg-sky-50 border-l-4 border-sky-200 rounded-r-lg text-xs text-sky-400 animate-pulse">
        {icon} 昨年の気温データを取得中…
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="no-print mt-2 px-4 py-2 bg-gray-50 border-l-4 border-gray-200 rounded-r-lg text-xs text-gray-400">
        気温データを取得できませんでした
      </div>
    );
  }

  return (
    <div className="no-print mt-2 px-4 py-2.5 bg-sky-50 border-l-4 border-sky-300 rounded-r-lg">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base leading-none">{icon}</span>
        <span className="text-xs font-semibold text-sky-600 tracking-wide">
          昨年（{weather.year}年{weather.month}月）の気温実績
          {weather.isFallback && <span className="ml-2 text-gray-400 font-normal">※平年値</span>}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-6 pl-1">
        <CityRow name="広島市" data={weather.hiroshima} />
        <div className="hidden sm:block w-px bg-sky-200 self-stretch" />
        <CityRow name="福岡市" data={weather.fukuoka} />
        <div className="hidden sm:block w-px bg-sky-200 self-stretch" />
        <CityRow name="高松市" data={weather.takamatsu} />
      </div>
    </div>
  );
};

export default WeatherBanner;
