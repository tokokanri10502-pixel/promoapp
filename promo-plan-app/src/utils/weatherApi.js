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
    // 全都市のデータが揃っているか確認（追加した都市に対応）
    if (parsed.hiroshima && parsed.fukuoka && parsed.takamatsu) {
      return parsed;
    }
    // 不完全なキャッシュは破棄して再取得
    localStorage.removeItem(cacheKey);
  }

  const [hiroshima, fukuoka, takamatsu] = await Promise.all([
    fetchMonthlyStats(CITIES.hiroshima.lat,  CITIES.hiroshima.lon,  targetYear, month),
    fetchMonthlyStats(CITIES.fukuoka.lat,    CITIES.fukuoka.lon,    targetYear, month),
    fetchMonthlyStats(CITIES.takamatsu.lat,  CITIES.takamatsu.lon,  targetYear, month),
  ]);

  const result = { hiroshima, fukuoka, takamatsu, year: targetYear, month };
  localStorage.setItem(cacheKey, JSON.stringify(result));
  return result;
}
