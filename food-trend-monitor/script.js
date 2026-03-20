// 補助関数：現在の日付から相対的な日付文字列を生成 (YYYY.MM.DD)
function getRelativeDate(daysOffset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}

// モックデータ：食品トレンドニュース
const newsData = [
    {
        id: 7001,
        title: "「オートミール」ブームが第2章へ、料理研究家監修の絶品アレンジ本が発売",
        category: "health",
        categoryLabel: "健康",
        date: "2026.03.07",
        summary: "健康食の代名詞として定着したオートミール。今や「おにぎり」「お好み焼き」「リゾット」に変化し、食感の課題を克服した新世代レシピが若い世代にも浸透しつつある。",
        source: "ヘルスケア・フード",
        sourceUrl: "#",
        icon: "fa-bowl-food",
        gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        imageColor: "#27ae60",
        viewCount: 3200
    },
    {
        id: 7002,
        title: "業務スーパーの「1kg激安シリーズ」、節約インフルエンサーが続々紹介",
        category: "saving",
        categoryLabel: "節約",
        date: "2026.03.07",
        summary: "物価高を背景に、業務スーパーの大容量かつ低価格商品を紹介するSNS投稿が急増。特に冷凍野菜や輸入バター、おにぎり具材が家計の味方として注目されている。",
        source: "家計の味方ニュース",
        sourceUrl: "#",
        icon: "fa-piggy-bank",
        gradient: "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)",
        imageColor: "#f39c12",
        viewCount: 5400
    },
    {
        id: 7003,
        title: "ノンアルコール市場が拡大、高品質「クラフトノンアル」が乾杯シーンを変える",
        category: "beverage",
        categoryLabel: "飲料",
        date: "2026.03.06",
        summary: "「飲めない人に配慮する文化」が定着し、ビール・ワイン・カクテルをリアルに再現したノンアルコール飲料が高品質化。外食産業でも専用メニューを設けるお店が急増中。",
        source: "PR TIMES",
        sourceUrl: "#",
        icon: "fa-wine-glass",
        gradient: "linear-gradient(to right, #a1c4fd 0%, #c2e9fb 100%)",
        imageColor: "#3498db",
        viewCount: 2900
    },
    {
        id: 7004,
        title: "広島「広島牛」ブランど化に本腰、県産和牛の新ブランド認定基準を策定",
        category: "hiroshima",
        categoryLabel: "広島県",
        date: "2026.03.06",
        summary: "広島県産の和牛を全国ブランドに育てるため、独自の基準と認定制度が整備へ。県内の飲食店や通販サイトでも「広島牛」表記の統一化に向けた動きが広がっている。",
        source: "中四国グルメナビ",
        sourceUrl: "#",
        icon: "fa-fire",
        gradient: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
        imageColor: "#e74c3c",
        viewCount: 1800
    },
    {
        id: 505,
        title: "「米粉ライスペーパー」の進化、揚げるだけでおつまみになる『瞬間チップス』が大流行",
        category: "sns",
        categoryLabel: "SNSトレンド",
        date: "2026.03.05",
        summary: "ライスペーパーを揚げて味付けするだけの簡単レシピがTikTokで数百万再生。ヘルシーさと食感の良さが、酒のつまみを求める層に刺さっている。",
        source: "トレンド探偵団",
        sourceUrl: "https://www.trend-tantei.jp/news/rice-paper-chips/",
        icon: "fa-hashtag",
        gradient: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
        imageColor: "#e67e22",
        viewCount: 3200
    },
    {
        id: 506,
        title: "広島産「瀬戸内レモン」を使用した『大人のクラフトクリームソーダ』が都心でヒット",
        category: "hiroshima",
        categoryLabel: "広島県",
        date: "2026.03.05",
        summary: "純喫茶ブームが進化し、本物の果汁とオーガニックハーブを使った本格派クリームソーダが登場。夜はリキュールを加える『夜のクリームソーダ』としても提供。",
        source: "瀬戸内経済Web",
        sourceUrl: "https://www.setouchi-news.jp/article/craft-cream-soda/",
        icon: "fa-glass-water",
        gradient: "linear-gradient(to top, #f6d365 0%, #fda085 100%)",
        imageColor: "#f1c40f",
        viewCount: 2800
    },
    {
        id: 507,
        title: "AIが個人の好みを学習する「スマートコーヒーメーカー」がサブスク市場を席巻",
        category: "retail",
        categoryLabel: "小売・流通",
        date: "2026.03.04",
        summary: "朝の気分や前日の睡眠データに基づき、最適な豆の配合と抽出温度を自動調整。パーソナライズされた一杯が提供できる次世代家電が単身世帯に普及。",
        source: "テックフード・デイリー",
        sourceUrl: "https://www.techfood-daily.jp/article/ai-coffee-2026/",
        icon: "fa-microchip",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        imageColor: "#3498db",
        viewCount: 1950
    },
    {
        id: 501,
        title: "「植物性ミルク」の第3波、ジャガイモ由来の『ポテトミルク』が上陸",
        category: "health",
        categoryLabel: "健康",
        date: "2026.03.04",
        summary: "オーツミルク、アーモンドミルクに続く次世代ミルクとして、環境負荷が極めて低いポテトミルクが注目。クリーミーな質感がラテに最適とカフェ業界で話題。",
        source: "プラントベース・デイリー",
        sourceUrl: "https://www.plantbased-daily.jp/news/potato-milk-2026/",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        imageColor: "#27ae60",
        viewCount: 2100
    },
    {
        id: 502,
        title: "「おにぎり専門店」の高級化、一貫1000円超えの『鮨スタイル』が人気",
        category: "gaishoku",
        categoryLabel: "外食",
        date: "2026.03.03",
        summary: "厳選された希少米と最高級の海苔、職人が目の前で握る臨場感。おにぎりを「日常食」から「ハレの日の食事」へと昇華させた新業態がインバウンド客にもヒット。",
        source: "外食トレンド報",
        sourceUrl: "https://www.gaishoku-trend.jp/article/luxury-onigiri-2026/",
        icon: "fa-bowl-rice",
        gradient: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        imageColor: "#c0392b",
        viewCount: 1850
    },
    {
        id: 503,
        title: "「透明なスイーツ」がSNSで再燃、水ゼリーを進化させた『クリスタル・和菓子』",
        category: "sweets",
        categoryLabel: "スイーツ",
        date: "2026.03.02",
        summary: "視覚的な美しさと清涼感を極めた透明スイーツ。最新技術で中に花や風景を閉じ込めたような芸術的な作品が、Z世代を中心に「食べるアート」として拡散中。",
        source: "スイーツ・タイムズ",
        sourceUrl: "https://www.sweets-times.jp/news/crystal-wagashi/",
        icon: "fa-gem",
        gradient: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        imageColor: "#f1c40f",
        viewCount: 2400
    },
    {
        id: 504,
        title: "スーパーの「自動値下げ」AIが本格導入、食品ロス削減に劇的効果",
        category: "retail",
        categoryLabel: "小売・流通",
        date: "2026.03.01",
        summary: "在庫状況と賞味期限をリアルタイムで解析し、最適なタイミングで価格を変動させるAI。閉店間際の極端な値引きを避け、利益確保とロス削減を両立。",
        source: "流通デジタル通信",
        sourceUrl: "https://www.ryutsu-digital.jp/news/ai-price-optimizer/",
        icon: "fa-robot",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        imageColor: "#9b59b6",
        viewCount: 1560
    },
    {
        id: 1,
        title: "「飲むわらび餅」が進化？ 次世代テクスチャードリンクの台頭",
        category: "beverage",
        categoryLabel: "飲料",
        date: "2026.02.26",
        summary: "タピオカブーム以降、食感を楽しむドリンクが定着。最新のトレンドは、和素材とフルーツを組み合わせた「飲むスイーツ」の進化形。",
        source: "PR TIMES",
        sourceUrl: "https://prtimes.jp/main/html/rd/p/000000030.000063255.html",
        icon: "fa-glass-water",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        imageColor: "#e74c3c",
        viewCount: 1540
    },
    {
        id: 2,
        title: "コンビニ各社、高タンパク・低糖質スイーツを拡充",
        category: "sweets",
        categoryLabel: "スイーツ",
        date: "2026.02.25",
        summary: "罪悪感なく食べられる「ギルトフリー」スイーツの需要増に対応。大豆粉やオート米を使用した新商品が続々登場。",
        source: "日本食糧新聞",
        sourceUrl: "https://nissyoku.co.jp/news/kawamura20210604085458025",
        icon: "fa-cookie-bite",
        gradient: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        imageColor: "#f1c40f",
        viewCount: 1280
    },
    {
        id: 4,
        title: "冷凍食品の高級化が進む、有名シェフ監修シリーズがヒット",
        category: "retail",
        categoryLabel: "小売・流通",
        date: "2026.02.24",
        summary: "自宅でレストランの味を楽しめる「プレミアム冷凍食品」の売上が好調。デパ地下グルメに匹敵するクオリティが支持されている。",
        source: "CREO ニュース",
        sourceUrl: "https://creo-plus.net/distribution-frozen-food-high-class/",
        icon: "fa-snowflake",
        gradient: "linear-gradient(to top, #5f72bd 0%, #9b23ea 100%)",
        imageColor: "#9b59b6",
        viewCount: 950
    },
    {
        id: 5,
        title: "ピスタチオの次はこれ！ 2026年注目のナッツフレーバー",
        category: "sweets",
        categoryLabel: "スイーツ",
        date: "2026.02.24",
        summary: "数年続いたピスタチオブームに次ぐ素材として「黒ゴマ」と「ピーカンナッツ」が急上昇中。香ばしさと健康効果がキーワード。",
        source: "スイーツ・メディア",
        sourceUrl: "https://www.sweets-media.jp/article/2026-nuts-trend/",
        icon: "fa-seedling",
        gradient: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
        imageColor: "#e67e22",
        viewCount: 420
    },
    {
        id: 6,
        title: "「ゴーストレストラン」から「実店舗回帰」へ、外食産業の揺り戻し",
        category: "gaishoku",
        categoryLabel: "外食",
        date: "2026.02.23",
        summary: "デリバリー専門店ブームが一段落し、体験価値を提供する実店舗への投資が再開。エンタメ要素を取り入れた新業態が注目される。",
        source: "外食ビジネスOnline",
        sourceUrl: "https://www.gaishoku-biz.jp/article/restaurant-trend-2026/",
        icon: "fa-store",
        gradient: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        imageColor: "#c0392b",
        viewCount: 310
    },
    {
        id: 11,
        title: "麹ブーム再燃、手軽に使える「液体塩こうじ」が人気",
        category: "health",
        categoryLabel: "健康",
        date: "2026.02.23",
        summary: "発酵食品への関心の高まりとともに、調味料としての麹が見直されている。腸活意識の高い層にヒット。",
        source: "ヘルスケア・フード",
        sourceUrl: "https://www.healthcare-food.jp/news/koji-boom-2026/",
        icon: "fa-heart-pulse",
        gradient: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        imageColor: "#e84393",
        viewCount: 560
    },
    {
        id: 13,
        title: "「昭和レトロ」喫茶がZ世代に大ウケ、クリームソーダの色を変えて推し活に",
        category: "z_gen",
        categoryLabel: "Z世代",
        date: "2026.02.23",
        summary: "純喫茶の懐かしい雰囲気が逆に新しいと若者に人気。カラフルなドリンクがSNS映えし、アイドルのメンバーカラーを楽しむファン層に刺さっている。",
        source: "トレンド探偵団",
        sourceUrl: "https://www.trend-tantei.jp/zgen-showa-retro/",
        icon: "fa-camera-retro",
        gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        imageColor: "#a29bfe",
        viewCount: 1100
    },
    {
        id: 14,
        title: "第4次韓流ブームで「ポチャ（屋台）」スタイルが定着",
        category: "asian",
        categoryLabel: "韓国・アジア",
        date: "2026.02.22",
        summary: "韓国ドラマの影響で、本場の屋台の雰囲気を再現した飲食店が増加。若者を中心にマッコリやソジュ（焼酎）の消費が伸びている。",
        source: "アジアグルメ通信",
        sourceUrl: "https://www.asia-gourmet.jp/korean-pocha-boom/",
        icon: "fa-bowl-rice",
        gradient: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
        imageColor: "#ff0099",
        viewCount: 780
    },
    {
        id: 111,
        title: "完全栄養食パン、サブスク市場でシェア拡大",
        category: "retail",
        categoryLabel: "小売・流通",
        date: "2026.02.22",
        summary: "忙しい朝の救世主として、1枚で1食分の栄養が摂れるパンの定期購入サービスが20代〜30代を中心に利用者を伸ばしている。",
        source: "日経クロストレンド",
        sourceUrl: "https://xtrend.nikkei.com/atcl/contents/casestudy/00012/1000780/",
        icon: "fa-bread-slice",
        gradient: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
        imageColor: "#2ecc71",
        viewCount: 620
    },
    {
        id: 8,
        title: "デパ地下惣菜の「個食化」進む、単身世帯ターゲット",
        category: "nakashoku",
        categoryLabel: "中食",
        date: "2026.02.21",
        summary: "ファミリー向けの大容量パックから、一人でも楽しめる少量多品種セットへ。仕事帰りの「プチ贅沢」需要を取り込む。",
        source: "デリ・ニュース",
        sourceUrl: "https://www.deli-news.jp/article/single-dish-trend/",
        icon: "fa-box-open",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        imageColor: "#16a085",
        viewCount: 450
    },
    {
        id: 12,
        title: "物価高で「訳あり商品」のEC販売が急増",
        category: "saving",
        categoryLabel: "節約",
        date: "2026.02.21",
        summary: "味は変わらないが形が不揃いな野菜や、賞味期限間近の加工食品をお得に購入できるサイトへのアクセスが増加中。",
        source: "家計の味方ニュース",
        sourceUrl: "https://www.kakei-mikata.jp/article/wakesari-ec-growth/",
        icon: "fa-piggy-bank",
        gradient: "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)",
        imageColor: "#f39c12",
        viewCount: 890
    },
    {
        id: 9,
        title: "クラフトコーラブームは地方へ、ご当地素材の活用加速",
        category: "beverage",
        categoryLabel: "飲料",
        date: "2026.02.20",
        summary: "スパイスや柑橘類など、地域特産の農産物を使用した「ご当地クラフトコーラ」が観光お土産としても人気に。",
        source: "地域創生マガジン",
        sourceUrl: "https://www.chiiki-saisei.jp/",
        icon: "fa-bottle-water",
        gradient: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
        imageColor: "#d35400",
        viewCount: 340
    },
    {
        id: 15,
        title: "台湾・ベトナムに続き「タイの屋台メシ」がブームの予感",
        category: "asian",
        categoryLabel: "韓国・アジア",
        date: "2026.02.20",
        summary: "本格的なスパイス使いとヘルシーなイメージで、タイ料理のミールキットや冷凍食品がスーパーの棚を席巻しつつある。",
        source: "ワールドフードレポート",
        sourceUrl: "https://www.world-food-report.jp/",
        icon: "fa-pepper-hot",
        gradient: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
        imageColor: "#27ae60",
        viewCount: 510
    },
    {
        id: 16,
        title: "「#究極の朝ごはん」がTiktok for Businessで話題、簡単アレンジレシピが拡散中",
        category: "sns",
        categoryLabel: "SNSトレンド",
        date: "2026.02.25",
        summary: "コンビニ食材だけで作る豪華な朝食動画が600万再生を突破。真似して投稿するユーザーが急増。",
        source: "TikTokトレンド",
        sourceUrl: "https://www.tiktok.com/",
        icon: "fa-mobile-screen",
        gradient: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
        imageColor: "#e056fd",
        viewCount: 2100
    },
    {
        id: 17,
        title: "X(旧Twitter)で「#無限ピーマン」に次ぐ「#無限ニンジン」がバズり中",
        category: "sns",
        categoryLabel: "SNSトレンド",
        date: "2026.02.24",
        summary: "大量のニンジン消費に困った農家の投稿がきっかけ。シンプルながら中毒性のある味が評判。",
        source: "X (Twitter)",
        sourceUrl: "https://x.com/",
        icon: "fa-hashtag",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        imageColor: "#3498db",
        viewCount: 1800
    },
    {
        id: 18,
        title: "広島の「汁なし担々麺」が都心でブーム、シメの『追い飯』が定番化",
        category: "hiroshima",
        categoryLabel: "広島県",
        date: "2026.02.25",
        summary: "広島のご当地グルメである汁なし担々麺。山椒の痺れと複雑なスパイスが都内のオフィス街でも人気。最後にライスを投入するスタイルが若者の胃袋を掴んでいる。",
        source: "中四国グルメナビ",
        sourceUrl: "https://www.chushikoku-gourmet.jp/",
        icon: "fa-fire",
        gradient: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
        imageColor: "#e74c3c",
        viewCount: 920
    },
    {
        id: 19,
        title: "博多の「明太フランス」が全国区に？ 冷凍販売で全国から注文殺到",
        category: "fukuoka",
        categoryLabel: "福岡県",
        date: "2026.02.26",
        summary: "福岡の人気ベーカリー発祥の明太フランス。焼き立てを急速冷凍する技術により、全国どこでも本場の味が楽しめるように。おつまみ需要としても急上昇中。",
        source: "九州食紀行",
        sourceUrl: "https://www.kyushu-food.jp/",
        icon: "fa-bread-slice",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        imageColor: "#ff4d6d",
        viewCount: 1650
    },
    {
        id: 20,
        title: "福岡「あまおう」スイーツの最高峰、有名パティスリーとのコラボが話題",
        category: "fukuoka",
        categoryLabel: "福岡県",
        date: "2026.02.24",
        summary: "ブランド苺「あまおう」を贅沢に使用した期間限定パフェがSNSで拡散。一皿3000円を超える『ご褒美スイーツ』市場の底堅さを見せている。",
        source: "スイーツ・タイムズ",
        sourceUrl: "https://www.sweets-times.jp/",
        icon: "fa-strawberry",
        gradient: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        imageColor: "#ff0000",
        viewCount: 1400
    },
    {
        id: 301,
        title: "北海道産「白いトウモロコシ」が高級スイーツ食材として人気急上昇",
        category: "hokkaido",
        categoryLabel: "北海道",
        date: "2026.02.25",
        summary: "糖度が極めて高く生でも食べられる北海道産の白いトウモロコシ「ピュアホワイト」が、パティスリーやジェラート専門店で引き合いが急増。本州への産直ECも活況を呈している。",
        source: "北海道農業新報",
        sourceUrl: "https://www.hokkaido-agri.jp/",
        icon: "fa-snowflake",
        gradient: "linear-gradient(to right, #a8edea 0%, #fed6e3 100%)",
        imageColor: "#4a90d9",
        viewCount: 1230
    },
    {
        id: 302,
        title: "函館「塩ラーメン」の洗練化が進む、出汁の多層化で新世代店舗が注目",
        category: "hokkaido",
        categoryLabel: "北海道",
        date: "2026.02.23",
        summary: "昆布・ホタテ・鶏のトリプル出汁を丁寧に重ねた新世代の塩ラーメンが、食通の間で話題に。外国人観光客が増加する函館で、新たな「食の聖地」化が加速している。",
        source: "ご当地ラーメン図鑑",
        sourceUrl: "https://www.ramen-zukan.jp/",
        icon: "fa-fire",
        gradient: "linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)",
        imageColor: "#4a90d9",
        viewCount: 970
    },
    // --- アーカイブ用データ ---
    {
        id: 303,
        title: "北海道産バター不足が再燃、業務用需要増でスーパー棚が空に",
        category: "hokkaido",
        categoryLabel: "北海道",
        date: "2026.02.08",
        summary: "インバウンド回復による菓子需要の急回復と、酪農家の減少が重なりバター不足が再発。製菓業界では代替油脂の研究が加速している。",
        source: "酪農・乳業速報",
        sourceUrl: "https://www.dairy-news.jp/",
        icon: "fa-cow",
        gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        imageColor: "#4a90d9",
        viewCount: 840
    },
    {
        id: 101,
        title: "冬の定番「おでん」に異変？ トッピングにアボカドが流行した兆し",
        category: "gaishoku",
        categoryLabel: "外食",
        date: "2026.02.16",
        summary: "昨今のヘルシー志向を受け、意外な組み合わせがヒット。変わり種おでんのブームを振り返る。",
        source: "トレンド回顧録",
        sourceUrl: "#",
        icon: "fa-bowl-food",
        gradient: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
        viewCount: 300
    },
    {
        id: 102,
        title: "2025年ヒット予測：昆虫食は「パウダー」から「姿」へ？",
        category: "health",
        categoryLabel: "健康",
        date: "2026.02.06",
        summary: "サステナブルフードとして注目された昆虫食。昨年の議論と市場の変化をアーカイブから読み解く。",
        source: "未来食通信",
        sourceUrl: "#",
        icon: "fa-bug",
        gradient: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 150
    },
    {
        id: 103,
        title: "2026年元旦：健康寿命を延ばす「最強のおせち」が話題に",
        category: "health",
        categoryLabel: "健康",
        date: "2026.01.07",
        summary: "塩分控えめながら旨味を最大限に引き出した進化形おせち。高タンパク素材をふんだんに使用し、アクティブシニア層に大ヒット。",
        source: "健康日本21ニュース",
        sourceUrl: "#",
        icon: "fa-sun",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        viewCount: 420
    },
    {
        id: 104,
        title: "「ヴィーガニュアリー」日本でも浸透、プラントベース肉の売上が1.5倍に",
        category: "health",
        categoryLabel: "健康",
        date: "2026.01.12",
        summary: "1月を菜食で過ごす世界的なキャンペーンが日本でも注目。コンビニ各社が相次いで大豆ミート商品を発表。健康と環境を意識する若年層が牽引。",
        source: "エコライフ・マガジン",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        viewCount: 580
    },
    {
        id: 105,
        title: "余ったお餅をフレンチに？ SNSで「餅リメイク」が大バズり",
        category: "sns",
        categoryLabel: "SNSトレンド",
        date: "2026.01.17",
        summary: "正月明けの定番悩み「余った餅」を解決するレシピ動画がTikTokで拡散。特に『餅ラザニア』や『餅ワッフル』など、洋風アレンジが人気。",
        source: "レシピ・パトロール",
        sourceUrl: "#",
        icon: "fa-hashtag",
        gradient: "linear-gradient(to top, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 1950
    },
    {
        id: 106,
        title: "高騰する光熱費に対抗！「非加熱レシピ」が節約層に支持される",
        category: "saving",
        categoryLabel: "節約",
        date: "2026.01.22",
        summary: "ガス・電気代の削減のため、電子レンジだけで完結する料理や、火を使わない和え物レシピが注目。カット野菜を活用した時短テクも併せて流行。",
        source: "家計の知恵袋",
        sourceUrl: "#",
        icon: "fa-bolt-slash",
        gradient: "linear-gradient(to top, #fcc5e4 0%, #fda34b 100%)",
        viewCount: 720
    },
    {
        id: 107,
        title: "「一人鍋」専用の高級家電が登場、独身世帯の『おうち外食』が加速",
        category: "retail",
        categoryLabel: "小売・流通",
        date: "2026.01.27",
        summary: "卓上で手軽に本格的な煮込み料理ができる小型調理器がヒット。デパ地下の高級鍋セットとの抱き合わせ販売も好調。",
        source: "家電トレンド報",
        sourceUrl: "#",
        icon: "fa-plug",
        gradient: "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
        viewCount: 480
    },
    {
        id: 108,
        title: "バレンタイン異変、チョコではなく「高級ナッツ」を贈るスタイルが急上昇",
        category: "sweets",
        categoryLabel: "スイーツ",
        date: "2026.02.01",
        summary: "甘いものが苦手な層や健康意識の高いパートナーへ、トリュフがけナッツや燻製ミックスナッツを贈るのが新常態に。酒のつまみ需要も。 ",
        source: "ギフトジャーナル",
        sourceUrl: "#",
        icon: "fa-heart",
        gradient: "linear-gradient(to bottom, #f77062 0%, #fe5196 100%)",
        viewCount: 1250
    },
    {
        id: 109,
        title: "AIが献立を提案するスマート冷蔵庫、普及率が10%を突破",
        category: "retail",
        categoryLabel: "小売・流通",
        date: "2026.02.11",
        summary: "庫内の食材から最適なレシピを提案し、不足分を自動発注する機能。食品ロス削減への貢献が期待され、共働き世帯からの導入が進む。",
        source: "テックフード・デイリー",
        sourceUrl: "#",
        icon: "fa-microchip",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        viewCount: 840
    },
    {
        id: 110,
        title: "広島ブランドの「牡蠣」に新展開、世界初の陸上養殖に成功か",
        category: "hiroshima",
        categoryLabel: "広島県",
        date: "2026.02.14",
        summary: "海の環境変化を受け、安定供給を目指す新プロジェクト。寄生虫リスクを抑えた『当たる心配のない牡蠣』として輸出市場も視野に。",
        source: "瀬戸内経済Web",
        sourceUrl: "#",
        icon: "fa-water",
        gradient: "linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)",
        viewCount: 660
    }
];

// DOM要素


// DOM要素
const newsGrid = document.getElementById('news-grid');
const rankingGrid = document.getElementById('ranking-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

// 状態管理
let currentCategory = 'all';
let currentSearchTerm = '';
let favoriteIds = JSON.parse(localStorage.getItem('food_trend_favorites') || '[]');
let showFavoritesOnly = false;
let showArchive = false; // アーカイブ表示フラグ

// 初期表示
document.addEventListener('DOMContentLoaded', () => {
    injectDailyArticle(); // デイリー記事をnewsDataに追加（必ず最初に実行）
    renderRanking();
    renderColumns(); // コラムセクションを描画
    applyFilters();
    setupFilters();
    setupSearch();
    checkDailyUpdate(); // 7時更新チェック
    setupMobileMenu(); // モバイルメニューの設定
    setupFavoritesNav(); // お気に入りナビの設定
    setupArchive(); // アーカイブの設定
    setupHomeButton(); // ホーム/ロゴボタンの設定
});

// ホーム/ロゴボタンの設定（状態リセットとトップ移動）
function setupHomeButton() {
    const logo = document.getElementById('site-logo');
    const homeLink = document.getElementById('home-link');

    const resetView = (e) => {
        e.preventDefault();

        // 状態のリセット
        currentCategory = 'all';
        currentSearchTerm = '';
        showFavoritesOnly = false;
        showArchive = false;

        // UIのリセット
        searchInput.value = '';
        filterBtns.forEach(b => b.classList.remove('active'));
        const allFilter = document.querySelector('.filter-btn[data-category="all"]');
        if (allFilter) allFilter.classList.add('active');

        const favoritesBtn = document.getElementById('view-favorites');
        if (favoritesBtn) {
            favoritesBtn.classList.remove('active');
            favoritesBtn.innerHTML = '<i class="fa-solid fa-heart"></i> お気に入り';
        }

        const archiveBtn = document.getElementById('load-archive-btn');
        if (archiveBtn) archiveBtn.classList.remove('active');

        // フィルタ適用と最上部へのスクロール
        applyFilters();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (logo) logo.addEventListener('click', resetView);
    if (homeLink) homeLink.addEventListener('click', resetView);
}

// モバイルメニューの設定
function setupMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = toggle.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // メニューリンククリック時に閉じる
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            toggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

// お気に入りナビの設定
function setupFavoritesNav() {
    const favoritesBtn = document.getElementById('view-favorites');
    const favoritesOnlyBtn = document.getElementById('filter-favorites-only');
    const showAllBtn = document.getElementById('filter-show-all');

    if (!favoritesBtn) return;

    // 「お気に入りのみ」を選択
    if (favoritesOnlyBtn) {
        favoritesOnlyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showFavoritesOnly = true;
            showArchive = false;
            updateFavoritesUI();
            applyFilters();

            // フィルターのリセット
            resetOtherFilters();
        });
    }

    // 「すべて表示」を選択
    if (showAllBtn) {
        showAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showFavoritesOnly = false;
            updateFavoritesUI();
            applyFilters();
        });
    }

    // 親ボタン自体のクリック（トグル動作）
    favoritesBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 従来のトグル動作（表示内容の切り替え）も継続
        showFavoritesOnly = !showFavoritesOnly;
        showArchive = false;
        updateFavoritesUI();
        applyFilters();
        if (showFavoritesOnly) resetOtherFilters();
    });
}

// お気に入り関連のUI表示更新
function updateFavoritesUI() {
    const favoritesBtn = document.getElementById('view-favorites');
    const favoritesOnlyBtn = document.getElementById('filter-favorites-only');
    const showAllBtn = document.getElementById('filter-show-all');
    const archiveLoadBtn = document.getElementById('load-archive-btn');

    if (showFavoritesOnly) {
        if (favoritesBtn) favoritesBtn.classList.add('active');
        if (favoritesOnlyBtn) favoritesOnlyBtn.classList.add('active');
        if (showAllBtn) showAllBtn.classList.remove('active');
        if (archiveLoadBtn) archiveLoadBtn.classList.remove('active');
    } else {
        if (favoritesBtn) favoritesBtn.classList.remove('active');
        if (favoritesOnlyBtn) favoritesOnlyBtn.classList.remove('active');
        if (showAllBtn) showAllBtn.classList.add('active');
    }
}

// お気に入り表示時の他フィルターリセット
function resetOtherFilters() {
    currentCategory = 'all';
    currentSearchTerm = '';
    searchInput.value = '';
    filterBtns.forEach(b => b.classList.remove('active'));
    const allFilter = document.querySelector('.filter-btn[data-category="all"]');
    if (allFilter) allFilter.classList.add('active');
}

// お気に入りの切り替え
function toggleFavorite(id, event) {
    if (event) {
        event.stopPropagation();
    }

    const index = favoriteIds.indexOf(id);
    if (index === -1) {
        favoriteIds.push(id);
    } else {
        favoriteIds.splice(index, 1);
    }

    localStorage.setItem('food_trend_favorites', JSON.stringify(favoriteIds));

    // UI更新
    const btns = document.querySelectorAll(`.favorite-btn[data-id="${id}"]`);
    btns.forEach(btn => {
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (icon.classList.contains('fa-solid')) {
            icon.classList.replace('fa-solid', 'fa-regular');
        } else {
            icon.classList.replace('fa-regular', 'fa-solid');
        }
    });

    // お気に入り一覧表示中の場合は再描画
    if (showFavoritesOnly) {
        applyFilters();
    }
}

// アーカイブの設定
function setupArchive() {
    const archiveBtn = document.getElementById('load-archive-btn');
    const navArchiveLink = document.getElementById('nav-archive');

    const expandArchive = () => {
        showArchive = true;
        if (archiveBtn) archiveBtn.classList.add('active');
        applyFilters();

        // 少し遅らせて描画を待ってからスクロール
        setTimeout(() => {
            const divider = document.querySelector('.archive-divider');
            if (divider) {
                divider.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    if (archiveBtn) {
        archiveBtn.addEventListener('click', expandArchive);
    }

    if (navArchiveLink) {
        navArchiveLink.addEventListener('click', (e) => {
            e.preventDefault();
            // お気に入り表示中の場合は解除
            if (showFavoritesOnly) {
                const favoritesBtn = document.getElementById('view-favorites');
                showFavoritesOnly = false;
                if (favoritesBtn) {
                    favoritesBtn.classList.remove('active');
                    favoritesBtn.innerHTML = '<i class="fa-solid fa-heart"></i> お気に入り';
                }
            }
            expandArchive();
        });
    }
}

// 日付が7日以上前かチェックするヘルパー
function isArchiveDate(dateStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // dateStr "YYYY.MM.DD" を Date オブジェクトに変換
    const parts = dateStr.split('.');
    const itemDate = new Date(parts[0], parts[1] - 1, parts[2]);

    const diffTime = today - itemDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 7;
}


// 共通：記事へのスクロールとハイライト
function scrollToArticle(articleId) {
    // 検索とカテゴリをリセットして全表示
    searchInput.value = '';
    currentSearchTerm = '';
    currentCategory = 'all';

    // ボタンの表示もリセット
    filterBtns.forEach(b => b.classList.remove('active'));
    const allFilter = document.querySelector('.filter-btn[data-category="all"]');
    if (allFilter) allFilter.classList.add('active');

    applyFilters();

    // 該当記事を探して詳細までスクロール
    const targetCard = newsGrid.querySelector(`.news-card[data-id="${articleId}"]`);
    if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.animation = "none"; // アニメーションリセット
        setTimeout(() => {
            targetCard.style.animation = "flash 1s";
        }, 10);
    }
}

// 朝7時の更新チェック
function checkDailyUpdate() {
    const now = new Date();
    const currentHour = now.getHours();
    const todayStr = getRelativeDate(0);

    // ローカルストレージで最後に更新通知を出した日を記録
    const lastUpdateDate = localStorage.getItem('last_daily_update_notified');

    // 7時以降かつ、今日まだ通知を出していない場合
    if (currentHour >= 7 && lastUpdateDate !== todayStr) {
        showUpdateNotification();
        localStorage.setItem('last_daily_update_notified', todayStr);
    }
}

// 更新通知の表示
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.id = 'daily-update-notification';
    notification.innerHTML = `
        <div class="notif-content">
            <i class="fa-solid fa-bell"></i>
            <span>本日のトレンド情報をピックアップしました（07:00更新）</span>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(notification);

    // 10秒後に自動消去
    setTimeout(() => {
        if (notification.parentElement) notification.remove();
    }, 10000);
}

/* simulateNewArticle and showNotification removed */

// ========================================
// トレンドスコアの計算（毎日変動する急上昇ランキング用）
// 3要素を合成：
//   1. ベーススコア  : viewCount（基本人気度）
//   2. 新着ブースト  : 記事が新しいほど高い（最大2倍、7日で減衰）
//   3. 日次変動係数  : 「今日の日付 × 記事ID」を元にした擬似乱数（0.5〜1.5倍）
//                      ⇒ 日が変わるごとに各記事の係数が変わり順位が入れ替わる
// ========================================
function calculateTrendScore(item) {
    // --- 1. ベーススコア ---
    const base = item.viewCount || 0;

    // --- 2. 新着ブースト（最大2倍、日数に応じて線形減衰）---
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parts = item.date.split('.');
    const articleDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const ageDays = Math.max(0, Math.floor((today - articleDate) / (1000 * 60 * 60 * 24)));
    const recencyBoost = Math.max(1.0, 2.0 - ageDays * (1.0 / 7)); // 0〜7日で2.0→1.0

    // --- 3. 日次変動係数（シード付き擬似乱数）---
    // 今日の日付を整数に変換（YYYYMMDD形式）してシードとして使う
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    const dateSeed = Number(`${y}${m}${d}`);

    // LCG（線形合同法）による擬似乱数生成（記事IDとdateSeedを組み合わせ）
    const seed = (dateSeed * 31 + item.id * 1000003) % 2147483647;
    const lcg = ((seed * 1664525 + 1013904223) & 0xffffffff) >>> 0;
    // 0.5〜1.5の範囲に正規化
    const dailyFactor = 0.5 + (lcg / 0xffffffff);

    return base * recencyBoost * dailyFactor;
}

// ランキング表示（トップ3）
function renderRanking() {
    // トレンドスコアで毎日変動するランキングを生成（アーカイブ除外）
    const rankingData = newsData
        .filter(item => item.viewCount && !isArchiveDate(item.date))
        .sort((a, b) => calculateTrendScore(b) - calculateTrendScore(a))
        .slice(0, 3);

    rankingGrid.innerHTML = '';

    rankingData.forEach((item, index) => {
        const card = createNewsCard(item, true, index + 1); // index + 1 = 実際の順位

        // クリックでその記事に飛ぶ
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            scrollToArticle(item.id);
        });

        rankingGrid.appendChild(card);
    });
}

// ニュース記事の描画
function renderNews(data) {
    newsGrid.innerHTML = '';

    // 新着とアーカイブを分ける（もしアーカイブ表示モードなら）
    const recentNews = data.filter(item => !isArchiveDate(item.date));
    const archiveNews = data.filter(item => isArchiveDate(item.date));

    // 新着の描画
    recentNews.forEach(item => {
        const card = createNewsCard(item);
        newsGrid.appendChild(card);
    });

    // アーカイブ表示中かつアーカイブ記事がある場合、区切り線を入れて描画
    if (showArchive && archiveNews.length > 0) {
        const divider = document.createElement('div');
        divider.className = 'archive-divider';
        divider.innerHTML = '<span>ここから過去の記事</span>';
        newsGrid.appendChild(divider);

        // 日付の降順（新しい順）でソート
        archiveNews.sort((a, b) => b.date.localeCompare(a.date));

        let lastMonth = "";
        archiveNews.forEach(item => {
            // "YYYY.MM.DD" から "YYYY.MM" を抽出
            const currentMonth = item.date.substring(0, 7);

            if (currentMonth !== lastMonth) {
                const monthHeader = document.createElement('div');
                monthHeader.className = 'month-divider';
                const parts = currentMonth.split('.');
                monthHeader.innerText = `${parts[0]}年 ${parseInt(parts[1])}月`;
                newsGrid.appendChild(monthHeader);
                lastMonth = currentMonth;
            }

            const card = createNewsCard(item);
            newsGrid.appendChild(card);
        });
    }

    // アーカイブボタンの表示制御
    const archiveBtnAction = document.getElementById('archive-action');
    if (archiveBtnAction) {
        // アーカイブ記事があり、かつまだ表示していない場合にボタンを出す
        if (archiveNews.length > 0 && !showArchive) {
            archiveBtnAction.style.display = 'block';
        } else {
            archiveBtnAction.style.display = 'none';
        }
    }
}

// ニュースカードの作成
function createNewsCard(item, isRanking = false, rank = 0) {
    const article = document.createElement('article');
    // IDを付与（枠外検索用）
    article.setAttribute('data-id', item.id);

    if (isRanking) {
        // ランキング用（テキストのみ）
        article.className = 'ranking-card';

        // バッジ（実際の順位を使用）
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        const icon = rank === 1 ? '<i class="fa-solid fa-crown"></i>' : rank;
        const badgeHtml = `<div class="rank-badge ${rankClass}">${icon}</div>`;

        // お気に入りボタンの生成
        const isFavorite = favoriteIds.includes(item.id);
        const favIconClass = isFavorite ? 'fa-solid' : 'fa-regular';
        const favActiveClass = isFavorite ? 'active' : '';
        const favBtnHtml = `
            <button class="favorite-btn ${favActiveClass}" data-id="${item.id}" onclick="toggleFavorite(${item.id}, event)">
                <i class="${favIconClass} fa-heart"></i>
            </button>
        `;

        // ランキングカードの情報源リンク生成
        const rankingSourceHtml = item.sourceUrl
            ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${item.source}</a>`
            : `<i class="fa-solid fa-link"></i> ${item.source}`;

        article.innerHTML = `
            ${badgeHtml}
            <h3>${item.title}</h3>
            <div class="ranking-meta">
                <span class="news-category" style="background-color: ${getCategoryColor(item.category)}; position: static; padding: 3px 8px;">${item.categoryLabel}</span>
                <span class="news-source">${rankingSourceHtml}</span>
            </div>
            ${favBtnHtml}
        `;
    } else {
        // 通常ニュースカード（画像あり）
        article.className = 'news-card';

        // 通常カードにはバッジを表示しない（重複を避けるため、またはデザイン上）
        // アイコンとグラデーションを使用
        const imageStyle = `background: ${item.gradient || item.imageColor};`;
        const iconClass = item.icon || 'fa-image';

        // お気に入りボタンの生成
        const isFavorite = favoriteIds.includes(item.id);
        const favIconClass = isFavorite ? 'fa-solid' : 'fa-regular';
        const favActiveClass = isFavorite ? 'active' : '';
        const favBtnHtml = `
            <button class="favorite-btn ${favActiveClass}" data-id="${item.id}" onclick="toggleFavorite(${item.id}, event)">
                <i class="${favIconClass} fa-heart"></i>
            </button>
        `;

        // 通常カードの情報源リンク生成
        const sourceHtml = item.sourceUrl
            ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${item.source}</a>`
            : `<i class="fa-solid fa-link"></i> ${item.source}`;

        article.innerHTML = `
            <div class="news-image" style="${imageStyle}">
                <div class="img-content">
                    <i class="fa-solid ${iconClass} fa-3x"></i>
                </div>
                <span class="news-category" style="background-color: ${getCategoryColor(item.category)}">${item.categoryLabel}</span>
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-date">${item.date}</span>
                    <span class="news-source">${sourceHtml}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                ${favBtnHtml}
            </div>
        `;
    }

    return article;
}

// カテゴリに応じた色を返す
function getCategoryColor(category) {
    switch (category) {
        case 'sweets': return '#f1c40f'; // 黄色
        case 'retail': return '#9b59b6'; // 紫
        case 'gaishoku': return '#c0392b'; // 濃い赤
        case 'nakashoku': return '#16a085'; // ティールグリーン
        case 'health': return '#e84393'; // ピンク
        case 'saving': return '#f39c12'; // オレンジ
        case 'z_gen': return '#a29bfe'; // 紫（淡い）
        case 'asian': return '#ff0099'; // ビビッドピンク
        case 'sns': return '#e056fd'; // ネオンパープル
        case 'hiroshima': return '#c0392b'; // 深い赤（もみじ色）
        case 'fukuoka': return '#ff4d6d'; // 明太ピンク
        case 'hokkaido': return '#4a90d9'; // 北海道ブルー（雪原・空）
        default: return '#333';
    }
}

// フィルター機能の設定
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // アクティブクラスの切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // カテゴリ更新とフィルタ適用
            currentCategory = btn.getAttribute('data-category');
            applyFilters();
        });
    });
}

// 検索機能の設定
function setupSearch() {
    const handleSearch = () => {
        currentSearchTerm = searchInput.value.trim().toLowerCase();
        applyFilters();
    };

    searchInput.addEventListener('input', handleSearch);
}

// フィルタリングロジック（カテゴリ＋検索）
function applyFilters() {
    let filteredData = newsData;

    // お気に入りフィルタ
    if (showFavoritesOnly) {
        filteredData = filteredData.filter(item => favoriteIds.includes(item.id));
    }

    // カテゴリフィルタ
    if (currentCategory !== 'all') {
        filteredData = filteredData.filter(item => item.category === currentCategory);
    }

    // 検索フィルタ
    if (currentSearchTerm) {
        filteredData = filteredData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(currentSearchTerm);
            const summaryMatch = item.summary.toLowerCase().includes(currentSearchTerm);
            const sourceMatch = item.source && item.source.toLowerCase().includes(currentSearchTerm);
            return titleMatch || summaryMatch || sourceMatch;
        });
    }

    // 日付の降順（新しい順）でソート
    filteredData.sort((a, b) => b.date.localeCompare(a.date));

    renderNews(filteredData);

    // 検索結果がない場合の表示
    if (filteredData.length === 0) {
        newsGrid.innerHTML = '<p style="text-align:center; width:100%; color:#666;">該当する記事が見つかりませんでした。</p>';
    }
}

// ========================================
// コラムデータ（固定4件 ＋ ストックの中から日付で2件選択）
// ========================================
const staticColumns = [
    {
        id: 1,
        tag: "市場分析",
        title: "2026年の食品市場を動かす「5つのメガトレンド」とは",
        body: `物価高・健康志向・Z世代の台頭・サステナビリティ・デジタル化。この5つのキーワードが今年の食品業界を根底から変えようとしている。

特にZ世代の価値観は、単なる栄養摂取を超え「社会への貢献」や「自己表現」としての食を求めており、これにどう応えるかが企業の命運を握る。かつてのような大量生産・大量消費のモデルは、もはや通用しない。

具体的なトレンドの一つとして、「機能性の可視化」がある。消費者は自分の体調や目的に合わせ、どの栄養素をどれだけ摂取すべきかを明確にすることを求めている。また、デジタル化は配送の効率化だけでなく、個々の嗜好に基づいた「パーソナライズ・ド・メニュー」の提案をも可能にした。

サステナビリティにおいては、単に「環境にやさしい」だけでなく、それがどのように美味しいのか、どう食卓を豊かにするのかという情緒的価値との融合が必須となる。

各トレンドの相互作用を分析し、これからの時代に企業が取るべき生存戦略と、具体的なアクションプランを専門家の視点から徹底解説する。変化を恐れるのではなく、このパラダイムシフトをいかに自社のチャンスへと昇華させるかが問われている。`,
        author: { name: "田中 誠一", title: "食品マーケティングアナリスト", initials: "田", color: "#e67e22" },
        readTime: 8,
        headerColor: "linear-gradient(to right, #f6d365, #fda085)"
    },
    {
        id: 2,
        tag: "消費者行動",
        title: "「節約」と「プチ贅沢」が共存する矛盾した消費者心理",
        body: `物価上昇が続く中、消費者は日常品を徹底的に節約しながら、特別な体験には惜しみなく投資する「メリハリ消費」を加速させている。

かつての「安ければ良い」という一律のデフレマインドから、価値を感じるものには対価を払うという選択的消費へのシフト。この背景には、日々の生活の中でのストレス解消や、自己肯定感を高めるための「精神的報酬」としての食の役割が大きくなっている。

調査によれば、週に一度の「自分へのご褒美」として高級アイスや銘店監修のデリを購入する割合が、単身世帯を中心に急増している。一方で、主菜以外の副菜については、冷凍食品やプライベートブランドを活用した徹底的なコストカットが行われている。

この複雑で二極化した消費者心理の裏側にある根本的な動機を読み解く。企業は単なる価格競争から脱却し、どの部分で『贅沢感』を演出すべきか、その境界線を考える必要がある。ブランドが提供すべきは「安さ」か、それとも「至福の一時」か。そのポジショニングがかつてないほど重要になっている。`,
        author: { name: "佐藤 美咲", title: "消費者行動研究家", initials: "佐", color: "#27ae60" },
        readTime: 6,
        headerColor: "linear-gradient(to right, #43e97b, #38f9d7)"
    },
    {
        id: 3,
        tag: "SNS戦略",
        title: "TikTok・Instagramで「バズる」食品ブランドの共通点",
        body: `もはやフォロワー数だけが指標ではない。現代のSNSマーケティングで最も重要なのは「共感」と「ユーザー参加型」の設計だ。

ユーザーが思わずカメラを向けたくなる『シズル感』の演出から、UGC（ユーザー生成コンテンツ）を生み出すための仕掛けまで、成功事例には明確な共通項がある。その鍵となるのは「意外性」と「再現性」だ。

例えば、馴染みのある定番商品に少しの工夫を加えて新しい食べ方を提案する投稿は、ユーザーが自分でも試してみたいという欲求を刺激する。また、ブランドの「中の人」の人間味溢れる発信が、企業の透明性を高め、ファンとの直接的なつながりを生んでいる。

マイクロインフルエンサーを巧みに活用し、消費者を共創パートナーとして巻き込む手法。ブランドに対する信頼 and 愛着を育むための、最新SNS戦略のステップを分析・公開する。デジタル上の「バズ」を一過性で終わらせず、いかにしてCRM（顧客関係管理）へと繋げ、ブランドの資産にするかが勝負の分かれ目となる。`,
        author: { name: "鈴木 健太", title: "フードSNSコンサルタント", initials: "鈴", color: "#9b59b6" },
        readTime: 5,
        headerColor: "linear-gradient(to right, #a18cd1, #fbc2eb)"
    },
    {
        id: 4,
        tag: "サステナビリティ",
        title: "「フードロス削減」は義務から競争優位へ",
        body: `環境への配慮が企業イメージ向上だけでなく、実際のコスト削減と新たな収益源の創出につながる時代が来た。

訳あり商品のEC販売や余剰食材を活用したアップサイクルメニュー開発など、先進企業はすでに利益を生むモデルへと昇華させている。以前は「廃棄」として処理されていたものが、新たな付加価値を持つ「商品」へと生まれ変わるプロセスは、サーキュラーエコノミーの実現に向けた大きな一歩だ。

特に注目すべきは、AIを活用した高度な需要予測システムである。これにより、製造段階での無駄を極限まで減らし、かつ販売チャンスを逃さないという相反する課題を解決している企業が増えている。

単なる社会貢献（CSR）に留まらず、いかにしてサステナビリティを事業の核（コアビジネス）に組み込むか。業界全体が取り組むべき食品リサイクルやロス削減の最新テクノロジー、そして成功している中小企業の優れた知恵を紹介する。これは「守り」の施策ではなく、次世代に選ばれるブランドになるための「攻め」の戦略である。`,
        author: { name: "山田 花子", title: "サステナブルフード研究者", initials: "山", color: "#16a085" },
        readTime: 7,
        headerColor: "linear-gradient(to right, #0ba360, #3cba92)"
    }
];

const rollingColumnsStock = [
    {
        id: 5,
        tag: "外食産業",
        title: "「体験型外食」が生き残る理由——デリバリー全盛時代の逆説",
        body: `コロナ禍を経てデリバリーが生活に定着した今だからこそ、あえて『その場でしか味わえない体験』を提供する実店舗の価値が再評価されている。

プロの技を目の前で楽しむ演出や、店舗独自のコミュニティ形成、さらには香りや温度といった五感をフルに使った訴求。これらは画面越しでは決して得られない価値だ。デジタルが浸透すればするほど、人々は本物のアナログな体験を希求する傾向にある。

最近の成功店舗に共通しているのは、「目的性」の高さだ。単にお腹を満たすだけでなく、「あそこの、あのサービスを体験しに行こう」と思わせる強い引力が備わっている。内装のこだわりや、スタッフとの対話、顧客自身が料理の仕上げに参加する仕掛けなどが、その体験価値を最大化させている。

デジタルが浸透すればするほど、アナログな対面サービスの希少性が高まる。次世代の外食店が差別化すべきポイントと、生き残るための店舗設計の極意を説く。実店舗はもはや「食事を提供する場所」から「体験の劇場」へと進化しなければならない。`,
        author: { name: "中村 大輔", title: "外食産業コンサルタント", initials: "中", color: "#c0392b" },
        readTime: 9,
        headerColor: "linear-gradient(to right, #f093fb, #f5576c)"
    },
    {
        id: 6,
        tag: "Z世代",
        title: "Z世代が「昭和レトロ」に惹かれる深層心理",
        body: `デジタルネイティブであるZ世代が、なぜ昭和の喫茶店文化や不便なほどアナログなパッケージに熱狂するのか。

そこには効率重視の社会が生み出した『本物体験』への強烈な渇望がある。スマホの中の完璧な美しさよりも、あえてノイズのあるものや『エモい』ストーリー性に救いを求める心理状態。また、不便さや手間が、彼らにとっては「自分らしさ」を表現するための新鮮な要素として映っている。

レコードの音、フィルムカメラの質感、そして喫茶店の分厚いナポリタン。これらは単なる過去の遺物ではなく、Z世代にとっては「未知の新しい価値」なのである。このトレンドから読み解けるのは、テクノロジーが進歩すればするほど、人間は五感に訴える根源的な温もりを求めるという普遍的な法則だ。

単なるブームで片付けず、この世代が食に求める『意味』の本質を突くことが、次世代のヒット商品開発の鍵となる。最新のリサーチ結果から見えた、Z世代の心に刺さるアプローチ手法を紐解く。`,
        author: { name: "小林 さくら", title: "Z世代トレンドリサーチャー", initials: "小", color: "#a29bfe" },
        readTime: 6,
        headerColor: "linear-gradient(135deg, #f5f7fa, #c3cfe2)"
    },
    {
        id: 7,
        tag: "フードテック",
        title: "3Dフードプリンターが変える「介護食」の未来",
        body: `見た目と食感、そして正確な栄養管理。3Dフードプリンティング技術が、これまでの「ペースト状」だった介護食の概念を覆そうとしている。

食材を分子レベルで再構築することで、飲み込みやすさを維持したまま、本物のステーキや温野菜に見える料理を再現。視覚的な喜びが食欲を刺激し、高齢者のQOL（生活の質）向上に直結している事例が増えている。

単なる効率化ではなく、「食べる喜び」をテクノロジーでいかに支えるか。最新の導入事例から、その可能性を探る。`,
        author: { name: "田中 健一", title: "フードテック専門家", initials: "田", color: "#3498db" },
        readTime: 5,
        headerColor: "linear-gradient(to right, #acb6e5, #86fde8)"
    },
    {
        id: 8,
        tag: "広島・食文化",
        title: "新サッカースタジアムと連動する「広島ナイトグルメ」の商機",
        body: `2024年開業の新スタジアムを核に、広島の夜の街が変わりつつある。試合観戦後の「ハシゴ酒」需要をターゲットにした新業態が続々誕生。

お好み焼きだけではない、地産地消のバルや、瀬戸内の魚介を洋風にアレンジしたビストロなど。スポーツと食を掛け合わせた新しい都市回遊モデル。地域の飲食店がいかにしてこの巨大な波を自覚し、活かしていくべきか。`,
        author: { name: "広島 太郎", title: "地域経済アナリスト", initials: "広", color: "#e74c3c" },
        readTime: 7,
        headerColor: "linear-gradient(to right, #ff5f6d, #ffc371)"
    }
];

// ========================================
// コラムカードのレンダリング
// ========================================
function renderColumns() {
    const columnGrid = document.getElementById('column-grid');
    if (!columnGrid) return;

    columnGrid.innerHTML = '';

    // 日付に基づいてローテーション枠を選択（3日周期 = 259,200,000ミリ秒）
    const rotationPeriod = 3 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const sequenceIndex = Math.floor(now / rotationPeriod);

    // ストックから2つ選ぶための計算 (簡単な剰余計算でインデックスを決定)
    const stockSize = rollingColumnsStock.length;
    const startIndex = (sequenceIndex * 2) % stockSize;

    const pickedRollingColumns = [];
    pickedRollingColumns.push(rollingColumnsStock[startIndex]);
    pickedRollingColumns.push(rollingColumnsStock[(startIndex + 1) % stockSize]);

    // 固定4件 + 動的2件を結合
    const displayColumns = [...staticColumns, ...pickedRollingColumns];

    displayColumns.forEach(item => {
        const card = document.createElement('article');
        card.className = 'column-card';

        // 改行を<br>に変換して表示
        const formattedBody = item.body.replace(/\n/g, '<br>');

        card.innerHTML = `
            <div class="column-card-header" style="background: ${item.headerColor};"></div>
            <div class="column-card-body">
                <span class="column-tag"># ${item.tag}</span>
                <h3>${item.title}</h3>
                <p class="column-text-content">${formattedBody}</p>
                
                <div class="column-action">
                    <button class="btn-column-toggle">
                        <span class="btn-label">全文を詳しく読む</span> <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>

                <div class="column-card-footer">
                    <div class="column-author">
                        <div class="author-avatar" style="background-color: ${item.author.color};">${item.author.initials}</div>
                        <div class="author-info">
                            <span class="author-name">${item.author.name}</span>
                            <span class="author-title">${item.author.title}</span>
                        </div>
                    </div>
                    <span class="column-read-time">
                        <i class="fa-regular fa-clock"></i> 約${item.readTime}分
                    </span>
                </div>
            </div>
        `;

        // 展開・格納イベントの設定
        const toggleBtn = card.querySelector('.btn-column-toggle');

        toggleBtn.addEventListener('click', () => {
            const isExpanded = card.classList.toggle('expanded');
            const icon = toggleBtn.querySelector('i');
            const label = toggleBtn.querySelector('.btn-label');

            if (isExpanded) {
                label.textContent = '内容を閉じる';
                icon.className = 'fa-solid fa-chevron-up';
            } else {
                label.textContent = '全文を詳しく読む';
                icon.className = 'fa-solid fa-chevron-down';
                // 閉じたときにカードの頭までスクロール（UX向上）
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        columnGrid.appendChild(card);
    });
}

// ========================================
// デイリー記事プール（約1か月分のストック）
// 毎日1件ずつローテーションで選択される
// ========================================
const dailyArticlePool = [
    {
        id: 201,
        title: "「発酵バター」ブームが本格到来、国産ブランドが相次ぎ登場",
        category: "sweets",
        categoryLabel: "スイーツ",
        summary: "欧州輸入品が主流だった発酵バターに、国産の新ブランドが参入。乳酸菌の風味と濃厚なコクが、パンやスイーツ好きの間で話題を集めている。",
        source: "フード・ジャーナル",
        sourceUrl: "https://www.food-journal.jp/",
        icon: "fa-star",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        imageColor: "#f1c40f",
        viewCount: 870
    },
    {
        id: 202,
        title: "コンビニ「おにぎり」に革命、具材が内側から広がる新形状が登場",
        category: "retail",
        categoryLabel: "小売・流通",
        summary: "海苔とご飯の境界を取り払った新発想の形状。食べ進めるごとに具材が口に広がるデザインで、大手コンビニが特許を取得し話題に。",
        source: "コンビニ・ウォッチャー",
        sourceUrl: "https://www.convenience-watcher.jp/",
        icon: "fa-circle-dot",
        gradient: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
        imageColor: "#27ae60",
        viewCount: 1320
    },
    {
        id: 203,
        title: "「ノンアルスパークリング」市場が急拡大、健康志向の20代が牽引",
        category: "beverage",
        categoryLabel: "飲料",
        summary: "飲酒機会を選べる「ソバーキュリアス」トレンドが浸透。ワインのような複雑な風味を持つノンアルコールスパークリングが外食シーンでも定番化しつつある。",
        source: "ドリンク・トレンドラボ",
        sourceUrl: "https://www.drink-trendlab.jp/",
        icon: "fa-champagne-glasses",
        gradient: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
        imageColor: "#8e44ad",
        viewCount: 1050
    },
    {
        id: 204,
        title: "「スープカレー」が全国区へ、札幌発のチェーン店が首都圏に急展開",
        category: "gaishoku",
        categoryLabel: "外食",
        summary: "スパイスの奥深さとボリューム感が支持され、北海道以外での認知度が急上昇。オープン初日に行列が絶えない店舗が続出している。",
        source: "グルメログ・プレス",
        sourceUrl: "https://www.gourmet-log.net/",
        icon: "fa-bowl-food",
        gradient: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        imageColor: "#16a085",
        viewCount: 960
    },
    {
        id: 205,
        title: "食べる「美容液」、コラーゲン配合の高機能スナックが台頭",
        category: "health",
        categoryLabel: "健康",
        summary: "スキンケアと食事を一体化させる「インナービューティー」トレンドが加速。コラーゲンやビタミンCを贅沢に配合したグミやチップスが美容感度の高い層に刺さる。",
        source: "ビューティー・フード通信",
        sourceUrl: "https://www.beauty-food.jp/",
        icon: "fa-heart-pulse",
        gradient: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%)",
        imageColor: "#e84393",
        viewCount: 1180
    },
    {
        id: 206,
        title: "「100円均一」の業務用食材店が人気、プロの味を家庭で再現",
        category: "saving",
        categoryLabel: "節約",
        summary: "飲食店向けの業務用スパイスや調味料を小売り販売する店舗が都市部を中心に増加。少量から買えるため、節約しながら本格的な味を楽しめると主婦層に支持。",
        source: "節約生活マガジン",
        sourceUrl: "https://www.setsuyaku-mag.jp/",
        icon: "fa-piggy-bank",
        gradient: "linear-gradient(to top, #fcc5e4 0%, #fda34b 100%)",
        imageColor: "#f39c12",
        viewCount: 790
    },
    {
        id: 207,
        title: "「#ぼっち飯」投稿が1,000万件突破、おひとり様グルメ文化が成熟",
        category: "sns",
        categoryLabel: "SNSトレンド",
        summary: "一人での外食・テイクアウトを積極的に楽しむ投稿がSNSで爆増。孤食を「楽しみ」として発信するポジティブなムーブメントが、外食業界の一人客対応を後押ししている。",
        source: "SNSフードレポート",
        sourceUrl: "https://www.sns-food-report.jp/",
        icon: "fa-hashtag",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        imageColor: "#3498db",
        viewCount: 2400
    },
    {
        id: 208,
        title: "宮島の「もみじ饅頭」進化系、黒トリュフ入り高級版が話題に",
        category: "hiroshima",
        categoryLabel: "広島県",
        summary: "老舗和菓子メーカーが異業種とコラボし、フランス産黒トリュフを餡に練り込んだご当地プレミアムスイーツを限定販売。土産品のイメージを刷新している。",
        source: "広島フードニュース",
        sourceUrl: "https://www.hiroshima-food-news.jp/",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #FF512F 0%, #DD2476 100%)",
        imageColor: "#e74c3c",
        viewCount: 1120
    },
    {
        id: 209,
        title: "博多の「一蘭」スタイルが輸出モデルに、海外で日本式ラーメン体験が急増",
        category: "fukuoka",
        categoryLabel: "福岡県",
        summary: "個室仕切り・禁会話のコンセプトが欧米で「瞑想ラーメン体験」として再解釈される。没入感を重視した食のスタイルが海外で高級志向の顧客に受け入れられつつある。",
        source: "グローバル・フードビジネス",
        sourceUrl: "https://www.global-food-biz.jp/",
        icon: "fa-fire",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        imageColor: "#ff4d6d",
        viewCount: 1450
    },
    {
        id: 210,
        title: "「腸活グミ」市場が急成長、プロバイオティクス入りのお菓子が棚を席巻",
        category: "health",
        categoryLabel: "健康",
        summary: "ヨーグルトやサプリではなく、お菓子感覚で腸内環境を整えられるグミが特に若い女性に支持。大手製菓メーカーも相次いで機能性表示食品の申請を進めている。",
        source: "機能性食品ニュース",
        sourceUrl: "https://www.functional-food-news.jp/",
        icon: "fa-capsules",
        gradient: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        imageColor: "#27ae60",
        viewCount: 980
    },
    {
        id: 211,
        title: "「サブスク弁当」サービスが拡大、月額定額でオフィスに届く時代",
        category: "nakashoku",
        categoryLabel: "中食",
        summary: "管理栄養士監修の日替わり弁当を職場に届けるサービスが急増。毎日の昼食費と買いに行く手間を削減できる利便性が、特にテレワーク解除後の会社員に響いている。",
        source: "宅食ウィークリー",
        sourceUrl: "https://www.takushoku-weekly.jp/",
        icon: "fa-box-open",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        imageColor: "#9b59b6",
        viewCount: 860
    },
    {
        id: 212,
        title: "「韓国チキン」の多様化が加速、甘辛以外のフレーバー競争が激化",
        category: "asian",
        categoryLabel: "韓国・アジア",
        summary: "ガンジャンケジャン（醤油漬けカニ）やマラ風味チキンなど、より本格的な韓国フレーバーへの移行が進む。単なる「辛い＝韓国」から脱却した細分化が始まっている。",
        source: "アジアフードレポート",
        sourceUrl: "https://www.asia-food-report.jp/",
        icon: "fa-bowl-rice",
        gradient: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
        imageColor: "#ff0099",
        viewCount: 1250
    },
    {
        id: 213,
        title: "Z世代狙い「ブラインドボックス」型食品が登場、何が入っているかわからないお菓子",
        category: "z_gen",
        categoryLabel: "Z世代",
        summary: "フィギュアのガチャ文化を取り入れた、中身が見えない箱入りスナックセット。SNS開封動画との相性が抜群で、コレクション性と共有欲を同時に刺激する新型態。",
        source: "Z世代マーケティングメモ",
        sourceUrl: "https://www.zgen-marketing.jp/",
        icon: "fa-gift",
        gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        imageColor: "#a29bfe",
        viewCount: 1780
    },
    {
        id: 214,
        title: "「タンパク質争奪戦」スーパーフードとしてテンペが再注目",
        category: "health",
        categoryLabel: "健康",
        summary: "インドネシア発の大豆発酵食品「テンペ」が、高タンパク・低脂肪・腸活の三拍子で健康意識の高い消費者に再評価。国内製造メーカーが生産能力を増強中。",
        source: "スーパーフード・ダイジェスト",
        sourceUrl: "https://www.superfood-digest.jp/",
        icon: "fa-seedling",
        gradient: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        imageColor: "#e67e22",
        viewCount: 670
    },
    {
        id: 215,
        title: "「AIメニュー開発」食品メーカーが導入拡大、ヒット商品の再現性が向上",
        category: "retail",
        categoryLabel: "小売・流通",
        summary: "SNS投稿データと店舗POSデータをAIが解析し、次のトレンド商品を予測する仕組みが普及。人間の勘と経験に依存していた開発プロセスに変革が起きつつある。",
        source: "フードテック・フォーカス",
        sourceUrl: "https://www.foodtech-focus.jp/",
        icon: "fa-microchip",
        gradient: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
        imageColor: "#3498db",
        viewCount: 830
    },
    {
        id: 216,
        title: "「コーヒーナップ」習慣が広まる、カフェインと仮眠の科学的組み合わせ",
        category: "beverage",
        categoryLabel: "飲料",
        summary: "コーヒーを飲んですぐ20分の仮眠を取る「コーヒーナップ」がビジネスパーソンの間でトレンドに。仮眠前に飲むエスプレッソ専用ブレンドコーヒーが新市場を形成。",
        source: "コーヒー・カルチャー誌",
        sourceUrl: "https://www.coffee-culture.jp/",
        icon: "fa-mug-hot",
        gradient: "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
        imageColor: "#d35400",
        viewCount: 910
    },
    {
        id: 217,
        title: "「スパイス自家調合」ブームが到来、量り売り専門店が全国に拡大",
        category: "retail",
        categoryLabel: "小売・流通",
        summary: "カレーやバーベキューのスパイスを自分でブレンドできる量り売り専門店がEC・実店舗両方で急増。食の「DIY化」が調味料カテゴリにも波及している。",
        source: "スパイス・マーケット通信",
        sourceUrl: "https://www.spice-market.jp/",
        icon: "fa-pepper-hot",
        gradient: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
        imageColor: "#e67e22",
        viewCount: 680
    },
    {
        id: 218,
        title: "「宅飲みプレミアム化」が加速、ワインペアリング家飲みセットが好調",
        category: "nakashoku",
        categoryLabel: "中食",
        summary: "高級レストランのソムリエが選んだワインと料理のペアリングセットをオンラインで注文する新サービスが登場。外食を超えるクオリティの宅飲み体験が新市場を形成。",
        source: "ホームダイニング・タイムス",
        sourceUrl: "https://www.home-dining-times.jp/",
        icon: "fa-wine-glass",
        gradient: "linear-gradient(to top, #5f72bd 0%, #9b23ea 100%)",
        imageColor: "#9b59b6",
        viewCount: 1090
    },
    {
        id: 219,
        title: "「メープルサップ」が新しい机上の春の飲み物として注目",
        category: "beverage",
        categoryLabel: "飲料",
        summary: "砂糖を作る前の未精製のカエデの樹液「メープルサップ」が、天然電解質飲料として健康志向の消費者にアピール。カナダ産の輸入品がオーガニック系食料品店に登場。",
        source: "ネイチャー・フード・ニュース",
        sourceUrl: "https://www.nature-food-news.jp/",
        icon: "fa-droplet",
        gradient: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
        imageColor: "#d35400",
        viewCount: 540
    },
    {
        id: 220,
        title: "「ドライエイジング肉」が家庭に、専用冷蔵庫の低価格帯が登場",
        category: "gaishoku",
        categoryLabel: "外食",
        summary: "レストラン専用だった熟成肉技術を家庭で楽しめる小型専用冷蔵庫が3万円台から登場。肉愛好者がSNSで熟成記録を投稿するコンテンツ消費との相性も抜群。",
        source: "ミート・トレンド・ジャーナル",
        sourceUrl: "https://www.meat-trend.jp/",
        icon: "fa-fire",
        gradient: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
        imageColor: "#c0392b",
        viewCount: 770
    },
    {
        id: 221,
        title: "「食育×ゲーミフィケーション」子ども向けアプリ食品が新市場を創造",
        category: "retail",
        categoryLabel: "小retail・流通",
        summary: "スマホアプリと連動し、食べながらキャラクターを育てる仕組みを持つ子ども向けスナックが登場。食育と娯楽を結びつけた次世代食品の先駆けとして注目を集める。",
        source: "ファミリー・フードテック",
        sourceUrl: "https://www.family-foodtech.jp/",
        icon: "fa-gamepad",
        gradient: "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
        imageColor: "#2ecc71",
        viewCount: 620
    },
    {
        id: 222,
        title: "広島「因島みかん」ハチミツ漬けがギフト市場で急成長",
        category: "hiroshima",
        categoryLabel: "広島県",
        summary: "しまなみ海道の恵みを受けた因島産みかんと地元養蜂場のハチミツを組み合わせたプレミアムギフトセットが贈答品として人気急上昇。EC週間売上が前年比3倍に。",
        source: "瀬戸内ギフト通信",
        sourceUrl: "https://www.setouchi-gift.jp/",
        icon: "fa-sun",
        gradient: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
        imageColor: "#e67e22",
        viewCount: 880
    },
    {
        id: 223,
        title: "福岡「糸島野菜」のブランド化が加速、都心の高級スーパーへ進出",
        category: "fukuoka",
        categoryLabel: "福岡県",
        summary: "九州屈指のブランド産地・糸島エリアの農産物が、有名百貨店の食品売場に並び始めた。土壌にこだわったミネラル豊富な野菜として、食の目利きに支持される。",
        source: "九州農業新報",
        sourceUrl: "https://www.kyushu-agri-news.jp/",
        icon: "fa-seedling",
        gradient: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        imageColor: "#27ae60",
        viewCount: 730
    },
    {
        id: 224,
        title: "「フードバンク2.0」アプリが普及、余剰食品のリアルタイムマッチングが可能に",
        category: "saving",
        categoryLabel: "節約",
        summary: "閉店間近の飲食店がアプリ上で値引き販売し、消費者が超特価で購入できる仕組みが広まっている。食品ロス削減と節約が同時に実現するため、社会的関心も高い。",
        source: "サステナブル・フード・ジャーナル",
        sourceUrl: "https://www.sustainable-food-journal.jp/",
        icon: "fa-mobile-screen",
        gradient: "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
        imageColor: "#e056fd",
        viewCount: 1550
    },
    {
        id: 225,
        title: "「茶道×スペシャルティコーヒー」融合カフェが都心に増殖中",
        category: "gaishoku",
        categoryLabel: "外食",
        summary: "抹茶の点て方にインスパイアされた手法でコーヒーを淹れるカフェが人気化。「間」を楽しむ和の哲学を取り入れた空間設計が、外国人観光客と日本人双方を惹きつける。",
        source: "カフェ・ビジネス・ニュース",
        sourceUrl: "https://www.cafe-biz-news.jp/",
        icon: "fa-mug-hot",
        gradient: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
        imageColor: "#16a085",
        viewCount: 1340
    },
    {
        id: 226,
        title: "「#今日の定食」ハッシュタグが急増、日常食がSNSコンテンツに変身",
        category: "sns",
        categoryLabel: "SNSトレンド",
        summary: "豪華グルメだけでなく、普段の手作り定食を投稿する文化が浸透。食べることへの感謝と日常の豊かさを発信するポジティブなコミュニティが形成されている。",
        source: "ソーシャル・フード・ウォッチ",
        sourceUrl: "https://www.social-food-watch.jp/",
        icon: "fa-camera-retro",
        gradient: "linear-gradient(to right, #43e97b 0%, #38f9d7 100%)",
        imageColor: "#27ae60",
        viewCount: 1680
    },
    {
        id: 227,
        title: "「高タンパクアイス」が次のブームへ、プロテイン含有量が話題に",
        category: "sweets",
        categoryLabel: "スイーツ",
        summary: "1カップ20g以上のタンパク質を含み、かつアイスクリームの食べ応えを実現した新商品がフィットネス層を超えて一般にも波及。夏の新定番になる可能性大。",
        source: "スイーツ・フューチャー",
        sourceUrl: "https://www.sweets-future.jp/",
        icon: "fa-ice-cream",
        gradient: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%)",
        imageColor: "#e84393",
        viewCount: 1160
    },
    {
        id: 228,
        title: "「クリーンラベル」食品への移行が本格化、添加物表示見直しの動き",
        category: "health",
        categoryLabel: "健康",
        summary: "原材料名がシンプルで添加物の少ない「クリーンラベル」食品への消費者ニーズが高まり、メーカー各社がレシピ見直しを加速。透明性の高い情報開示が購買決定の鍵に。",
        source: "ヘルシーフード・ウィークリー",
        sourceUrl: "https://www.healthy-food-weekly.jp/",
        icon: "fa-leaf",
        gradient: "linear-gradient(to right, #d4fc79 0%, #96e6a1 100%)",
        imageColor: "#27ae60",
        viewCount: 920
    },
    {
        id: 229,
        title: "「メキシコ料理」の本格派ブーム到来、タコスバーが都心を席巻",
        category: "asian",
        categoryLabel: "韓国・アジア",
        summary: "韓国料理に続くアジア・ラテン融合グルメとして、本格的なメキシカン料理が注目。コリアンタコスなどの融合料理も登場し、多様なカルチャーを取り込んだ新業態が急増中。",
        source: "グローバル・ダイニング・ウォッチ",
        sourceUrl: "https://www.global-dining-watch.jp/",
        icon: "fa-pepper-hot",
        gradient: "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
        imageColor: "#e74c3c",
        viewCount: 1040
    },
    {
        id: 230,
        title: "Z世代が支持する「フードウェイスト」ファッション、食品廃材活用の小物が人気",
        category: "z_gen",
        categoryLabel: "Z世代",
        summary: "コーヒーかすや食品廃材を再利用したバッグや食器がZ世代の支持を集める。食べることと持続可能なライフスタイルを結びつけた新しい消費価値観が生まれている。",
        source: "Z世代ライフスタイル・ウォッチ",
        sourceUrl: "https://www.zgen-lifestyle.jp/",
        icon: "fa-recycle",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        imageColor: "#a29bfe",
        viewCount: 870
    },
    {
        id: 231,
        title: "北海道「ジンギスカン」が全国チェーン化、羊肉ブームに乗り急拡大",
        category: "hokkaido",
        categoryLabel: "北海道",
        summary: "ラム肉の栄養価の高さと独特の風味が再評価され、北海道のソウルフード「ジンギスカン」の専門チェーンが全国展開を加速。一人鍋スタイルで若年層の取り込みにも成功している。",
        source: "北海道グルメ通信",
        sourceUrl: "https://www.hokkaido-gourmet.jp/",
        icon: "fa-fire",
        gradient: "linear-gradient(to right, #48c6ef 0%, #6f86d6 100%)",
        imageColor: "#4a90d9",
        viewCount: 1050
    },
    {
        id: 232,
        title: "十勝乳製品ブランドが躍進、「チーズの聖地」化で欧州品を逆輸入",
        category: "hokkaido",
        categoryLabel: "北海道",
        summary: "北海道十勝エリアの本格ナチュラルチーズが、ヨーロッパのコンクールで受賞相次ぐ。国内はもとより海外から「北海道チーズ」を目当てに訪れる食ツーリズムが活発化している。",
        source: "乳業産業新報",
        sourceUrl: "https://www.dairy-industry.jp/",
        icon: "fa-cow",
        gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        imageColor: "#4a90d9",
        viewCount: 890
    },
    {
        id: 233,
        title: "「フードロス削減」の新兵器、賞味期限をスマホに通知するスマートコンテナ",
        category: "retail",
        categoryLabel: "小売・流通",
        summary: "内蔵センサーで中身の鮮度を感知し、期限が近づくと自動的にレシピを提案する保存容器がヒット。使い忘れによる廃棄を家庭レベルで防ぐ画期的なデバイス。",
        source: "テックライフ・マガジン",
        sourceUrl: "https://www.techlife-mag.jp/",
        icon: "fa-sensor",
        gradient: "linear-gradient(to right, #92fe9d 0%, #00c9ff 100%)",
        imageColor: "#2ecc71",
        viewCount: 710
    },
    {
        id: 234,
        title: "「昆虫プロテイン」がプロアスリートの間で定着、環境負荷の低さが支持の決め手",
        category: "health",
        categoryLabel: "健康",
        summary: "従来のホエイやソイに代わる第3の選択肢として、コオロギ由来のプロテインが五輪選手たちのトレーニングキャンプで採用。消化吸収の良さと栄養価の高さが証明された。",
        source: "スポーツ栄養学・ダイジェスト",
        sourceUrl: "https://www.sports-nutrition.jp/",
        icon: "fa-bug",
        gradient: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
        imageColor: "#e67e22",
        viewCount: 650
    },
    {
        id: 235,
        title: "「江戸前ハーブ」が高級レストランのトレンドに、在来種のハーブが再発見",
        category: "gaishoku",
        categoryLabel: "外食",
        summary: "これまで雑草として扱われてきた日本在来の野草を、フレンチやイタリアンの香り付けに活用するシェフが急増。日本独自のテロワールを表現する新たな要素として注目。",
        source: "ガストロノミー・リサーチ",
        sourceUrl: "https://www.gastronomy-research.jp/",
        icon: "fa-seedling",
        gradient: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
        imageColor: "#16a085",
        viewCount: 520
    }
];

// ========================================
// 指定した日付に対応するデイリー記事のプールインデックスを取得
// subIndex を指定することで1日に複数の異なる記事を取得可能
// ========================================
function getDailyArticleForDate(dateStr, subIndex = 0) {
    const baseDate = new Date(2026, 0, 1);
    const parts = dateStr.split('.');
    const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
    targetDate.setHours(0, 0, 0, 0);

    const elapsedDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    // 日付ごとに異なるオフセット（subIndex を加味）を加えてバリエーションを出す
    // 1日5件に変更したため、係数を5以上に設定して重複を避ける
    return Math.abs(elapsedDays * 5 + subIndex) % dailyArticlePool.length;
}

// ========================================
// ユニークIDを日付から生成（衝突を避けるため95000番台を使用）
// ========================================
function getDailyUniqueId(dateStr, subIndex = 0) {
    const baseDate = new Date(2026, 0, 1);
    const parts = dateStr.split('.');
    const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
    targetDate.setHours(0, 0, 0, 0);
    const elapsedDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    // 1日あたり最大5件（0-4）を想定してIDを割り振る
    return 95000 + Math.abs(elapsedDays) * 10 + subIndex;
}

// ========================================
// デイリー記事をnewsDataへ追加（蓄積型）
// localStorage に履歴配列を保存し最大30日分を維持する
// 1日最低5件追加されるようにアップデート
// ========================================
function injectDailyArticle() {
    const STORAGE_KEY = 'food_trend_daily_history';
    const MAX_DAYS = 30;
    const ITEMS_PER_DAY = 5; // 1日あたりの追加件数を5に変更
    const todayStr = getRelativeDate(0);

    // ── 旧形式キーからのマイグレーション ──
    const legacyDate = localStorage.getItem('daily_article_injected_date');
    const legacyId = localStorage.getItem('daily_article_injected_id');
    if (legacyDate && legacyId && !localStorage.getItem(STORAGE_KEY)) {
        const legacyPoolIndex = getDailyArticleForDate(legacyDate, 0);
        const migratedHistory = [{
            date: legacyDate,
            uniqueId: Number(legacyId),
            poolIndex: legacyPoolIndex
        }];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedHistory));
    }
    localStorage.removeItem('daily_article_injected_date');
    localStorage.removeItem('daily_article_injected_id');

    // ── 履歴の読み込み ──
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
        history = [];
    }

    // ── 過去7日分をチェックして、未追加なら追加（ユーザーが数日アクセスしなかった場合の欠落を防ぐ） ──
    let isUpdated = false;
    for (let i = 7; i >= 0; i--) {
        const dateStr = getRelativeDate(-i);
        // その日のエントリが規定数(ITEMS_PER_DAY)あるかチェック
        const dailyEntries = history.filter(entry => entry.date === dateStr);
        
        if (dailyEntries.length < ITEMS_PER_DAY) {
            // 足りない分を追加
            for (let sub = dailyEntries.length; sub < ITEMS_PER_DAY; sub++) {
                const poolIndex = getDailyArticleForDate(dateStr, sub);
                const uniqueId = getDailyUniqueId(dateStr, sub);
                
                // 既に同じIDが存在しないか二重チェック（マイグレーション済みデータなど）
                if (!history.find(entry => entry.uniqueId === uniqueId)) {
                    history.push({ date: dateStr, uniqueId, poolIndex });
                    isUpdated = true;
                }
            }
        }
    }

    if (isUpdated) {
        // 日付順（昇順）、同じ日付ならID順でソート
        history.sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return a.uniqueId - b.uniqueId;
        });
        
        // 保持件数上限（日数ベースで計算）
        const maxEntries = MAX_DAYS * ITEMS_PER_DAY;
        if (history.length > maxEntries) {
            history = history.slice(-maxEntries);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }

    // ── 履歴の全エントリを newsData へ注入 ──
    history.forEach(entry => {
        const exists = newsData.some(item => item.id === entry.uniqueId);
        if (!exists) {
            const template = dailyArticlePool[entry.poolIndex];
            if (template) {
                const article = { ...template, id: entry.uniqueId, date: entry.date };
                newsData.push(article);
            }
        }
    });
}

