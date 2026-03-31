const CACHE_PREFIX = 'trend_';

export function getCachedTrend(year, month) {
  const key = `${CACHE_PREFIX}${year}_${month}`;
  const cached = localStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
}

function saveTrendCache(year, month, data) {
  const key = `${CACHE_PREFIX}${year}_${month}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export async function fetchTrend(apiKey, year, month) {
  const targetYear = year - 1;
  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const monthLabel = monthNames[month - 1];

  const prompt = `あなたはスーパーマーケットの販促計画を支援するアシスタントです。
${targetYear}年${monthLabel}に日本（広島・福岡・高松など西日本エリア）でよく検索された料理・食材のベスト5を推定してください。

条件：
- 季節感・旬の食材・行事（ひな祭り、お彼岸、花見など）を考慮
- スーパーで買える食材・料理に限定
- 各アイテムに一言コメントを添える（最大15文字）

必ず以下のJSON形式のみで返答してください（説明文は不要）：
{
  "items": [
    { "rank": 1, "name": "料理または食材名", "comment": "一言コメント" },
    { "rank": 2, "name": "料理または食材名", "comment": "一言コメント" },
    { "rank": 3, "name": "料理または食材名", "comment": "一言コメント" },
    { "rank": 4, "name": "料理または食材名", "comment": "一言コメント" },
    { "rank": 5, "name": "料理または食材名", "comment": "一言コメント" }
  ]
}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${res.status}`);
  }

  const json = await res.json();
  const text = json.content?.[0]?.text ?? '';
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('レスポンスのパースに失敗しました');

  const data = JSON.parse(match[0]);
  saveTrendCache(year, month, { ...data, year: targetYear, month });
  return { ...data, year: targetYear, month };
}

export function getApiKey() {
  return localStorage.getItem('claude_api_key') ?? '';
}

export function saveApiKey(key) {
  localStorage.setItem('claude_api_key', key);
}
