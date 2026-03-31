// 各都市の月別平年値（APIが失敗したときのフォールバック）
const FALLBACK_WEATHER = {
  hiroshima: {
    1:  { avg: "5.4",  max: "9.8",  min: "1.2"  },
    2:  { avg: "6.8",  max: "11.5", min: "2.4"  },
    3:  { avg: "10.2", max: "15.3", min: "5.1"  },
    4:  { avg: "15.8", max: "21.2", min: "10.4" },
    5:  { avg: "20.1", max: "25.6", min: "14.8" },
    6:  { avg: "23.5", max: "27.8", min: "19.2" },
    7:  { avg: "27.8", max: "32.5", min: "23.4" },
    8:  { avg: "28.9", max: "33.8", min: "24.6" },
    9:  { avg: "24.8", max: "29.5", min: "20.2" },
    10: { avg: "18.5", max: "23.8", min: "13.6" },
    11: { avg: "12.5", max: "17.6", min: "7.8"  },
    12: { avg: "7.1",  max: "11.8", min: "2.8"  },
  },
  fukuoka: {
    1:  { avg: "6.6",  max: "10.8", min: "2.8"  },
    2:  { avg: "7.8",  max: "12.5", min: "3.6"  },
    3:  { avg: "11.2", max: "16.2", min: "6.4"  },
    4:  { avg: "16.5", max: "21.8", min: "11.6" },
    5:  { avg: "20.8", max: "26.2", min: "15.8" },
    6:  { avg: "24.2", max: "28.4", min: "20.2" },
    7:  { avg: "28.4", max: "33.2", min: "24.6" },
    8:  { avg: "29.2", max: "34.0", min: "25.2" },
    9:  { avg: "25.4", max: "30.2", min: "21.2" },
    10: { avg: "19.6", max: "24.8", min: "14.8" },
    11: { avg: "13.8", max: "18.6", min: "9.2"  },
    12: { avg: "8.4",  max: "12.8", min: "4.2"  },
  },
  takamatsu: {
    1:  { avg: "5.8",  max: "10.2", min: "1.8"  },
    2:  { avg: "6.4",  max: "11.2", min: "2.4"  },
    3:  { avg: "10.0", max: "15.2", min: "5.2"  },
    4:  { avg: "15.4", max: "21.0", min: "10.2" },
    5:  { avg: "19.8", max: "25.4", min: "14.6" },
    6:  { avg: "23.2", max: "27.6", min: "19.0" },
    7:  { avg: "27.4", max: "32.2", min: "23.2" },
    8:  { avg: "28.6", max: "33.6", min: "24.4" },
    9:  { avg: "24.4", max: "29.2", min: "20.0" },
    10: { avg: "18.2", max: "23.4", min: "13.2" },
    11: { avg: "12.2", max: "17.2", min: "7.6"  },
    12: { avg: "7.0",  max: "11.6", min: "2.6"  },
  },
};

const CITIES = {
  hiroshima: { name: '広島市', lat: 34.3853, lon: 132.4553 },
  fukuoka:   { name: '福岡市', lat: 33.5904, lon: 130.4017 },
  takamatsu: { name: '高松市', lat: 34.3401, lon: 134.0434 },
};

async function fetchMonthlyStats(lat, lon, year, month) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endDate = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;

  const url =
    `https://archive-api.open-meteo.com/v1/archive` +
    `?latitude=${lat}&longitude=${lon}` +
    `&start_date=${startDate}&end_date=${endDate}` +
    `&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean` +
    `&timezone=Asia%2FTokyo`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  const avg = (arr) => arr.reduce((s, v) => s + v, 0) / arr.length;
  const max = (arr) => Math.max(...arr);
  const min = (arr) => Math.min(...arr);

  const means = json.daily.temperature_2m_mean;
  const maxes = json.daily.temperature_2m_max;
  const mins  = json.daily.temperature_2m_min;

  return {
    avg: avg(means).toFixed(1),
    max: max(maxes).toFixed(1),
    min: min(mins).toFixed(1),
  };
}

export async function fetchLastYearWeather(year, month) {
  const targetYear = year - 1;
  const cacheKey = `weather_${targetYear}_${month}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (parsed.hiroshima && parsed.fukuoka && parsed.takamatsu) {
      return parsed;
    }
    localStorage.removeItem(cacheKey);
  }

  try {
    const [hiroshima, fukuoka, takamatsu] = await Promise.all([
      fetchMonthlyStats(CITIES.hiroshima.lat, CITIES.hiroshima.lon, targetYear, month),
      fetchMonthlyStats(CITIES.fukuoka.lat,   CITIES.fukuoka.lon,   targetYear, month),
      fetchMonthlyStats(CITIES.takamatsu.lat, CITIES.takamatsu.lon, targetYear, month),
    ]);

    const result = { hiroshima, fukuoka, takamatsu, year: targetYear, month };
    localStorage.setItem(cacheKey, JSON.stringify(result));
    return result;
  } catch {
    // APIが失敗した場合は平年値フォールバックを返す
    return {
      hiroshima: FALLBACK_WEATHER.hiroshima[month],
      fukuoka:   FALLBACK_WEATHER.fukuoka[month],
      takamatsu: FALLBACK_WEATHER.takamatsu[month],
      year: targetYear,
      month,
      isFallback: true,
    };
  }
}
