// 補助関数：現在の日付から相対的な日付文字列を生成 (YYYY.MM.DD)
function getRelativeDate(daysOffset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}

// モックデータ：ライフスタイルトレンドニュース
const newsData = [
    // ── 2026年3月14日（土） ──
    {
        id: 7141,
        title: "「春のデトックス」習慣が注目。白湯＋生姜ルーティンが美容感度高い層に浸透",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.14",
        summary: "朝一番の白湯とスライス生姜の組み合わせが腸活・デトックス効果として再評価。SNSで「春のリセット習慣」として拡散され、ドラッグストアでの生姜関連商品が前年比150%の伸びを記録。",
        source: "Wellness Today",
        sourceUrl: "#",
        icon: "fa-mug-hot",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 3400
    },
    {
        id: 7142,
        title: "春コレクション最速レポート：Sacaiが放つ「ハイブリッドウェア」の衝撃",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.14",
        summary: "デニムとオーガンザを融合させた新発想のレイヤードウェアが世界中のバイヤーを圧倒。「着る彫刻」とも評される立体的なシルエットが2026年春の最大のトピックに。",
        source: "Fashion Press",
        sourceUrl: "#",
        icon: "fa-shirt",
        gradient: "linear-gradient(135deg, #485563 0%, #29323c 100%)",
        viewCount: 4100
    },
    {
        id: 7143,
        title: "「ながら運動」に使えるスマートシューズ、センサーで歩き方を改善",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.03.14",
        summary: "インソールに埋め込まれた圧力センサーが歩行バランスをリアルタイム分析。専用アプリで姿勢改善のフィードバックを受けながら、日常の移動時間をトレーニングに転換できる。",
        source: "Tech Shoes Lab",
        sourceUrl: "#",
        icon: "fa-shoe-prints",
        gradient: "linear-gradient(135deg, #001e62 0%, #3498db 100%)",
        viewCount: 2800
    },
    // ── 2026年3月13日（金） ──
    {
        id: 7131,
        title: "美容医療「ハイフ」の家庭用デバイスが普及期へ。月1回で素肌が変わる",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.13",
        summary: "クリニック専売だった高周波エネルギー照射型の美肌デバイスが一般向けに普及。月1〜2回の使用でリフトアップ効果を実感できるとSNSで評判、需要が急増している。",
        source: "Beauty Digital",
        sourceUrl: "#",
        icon: "fa-spa",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 4800
    },
    {
        id: 7132,
        title: "春ニットの「チョコレートブラウン」旋風 ─ 各ブランドが競い合う新定番色",
        category: "color",
        categoryLabel: "カラー",
        date: "2026.03.13",
        summary: "深みのある濃褐色「チョコレートブラウン」が今春のキーカラーとして急浮上。温もりを感じさせながらも洗練された印象を与えるとして、ファッション各誌の表紙を席巻している。",
        source: "Color Forecast",
        sourceUrl: "#",
        icon: "fa-fill-drip",
        gradient: "linear-gradient(135deg, #3e2723 0%, #a1887f 100%)",
        viewCount: 3600
    },
    {
        id: 7133,
        title: "「仕事の合間に5分瞑想」デスクワーカーのメンタルリセット術が常識化",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.03.13",
        summary: "大手IT各社が就業中の「マインドフルネス休憩」を推奨し始めた。5分間の呼吸瞑想でafter-集中力が23%向上するというデータが内部調査で確認され、制度化の動きが加速。",
        source: "Work Style Lab",
        sourceUrl: "#",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        viewCount: 3100
    },
    // ── 2026年3月12日（木） ──
    {
        id: 7121,
        title: "TikTok「#春コーデ」投稿が1億件突破。Z世代が牽引するトレンドの最前線",
        category: "sns",
        categoryLabel: "SNS",
        date: "2026.03.12",
        summary: "春の新作コーデをTikTokで披露する「#春コーデ」が累計1億投稿に到達。AIレコメンドとの相乗効果で、「自分スタイル探し」の場としてSNSが機能し始めている。",
        source: "SNS Trend Watch",
        sourceUrl: "#",
        icon: "fa-hashtag",
        gradient: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
        viewCount: 5200
    },
    {
        id: 7122,
        title: "「グリーン系インテリア」需要が急増。バイオフィリックデザインでリラックス空間",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.12",
        summary: "観葉植物を部屋のデザインに組み込む「バイオフィリックデザイン」が住宅雑誌の特集テーマを独占。植物のグリーンと自然素材の組み合わせが、ストレス社会に対するアンチテーゼとして支持を広げている。",
        source: "Interior Plus",
        sourceUrl: "#",
        icon: "fa-seedling",
        gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        viewCount: 3700
    },
    {
        id: 7123,
        title: "限定コラボシューズが発売初日に完売。スポーツ×ラグジュアリーの融合が加速",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.03.12",
        summary: "スポーツとラグジュアリーの融合を究極まで高めた限定モデルが世界同時発売。抽選倍率は200倍を超え、フリマアプリでは定価の数倍でのやり取りが横行している。",
        source: "Sneaker News JP",
        sourceUrl: "#",
        icon: "fa-bolt",
        gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
        viewCount: 6100
    },
    // ── 2026年3月11日（水） ──
    {
        id: 7111,
        title: "腸活×美肌の新常識「ポストバイオティクス」、スキンケアに配合する新製品が続々",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.11",
        summary: "生きた菌（プロバイオティクス）ではなく、菌の代謝産物「ポストバイオティクス」をスキンケアに活用する動きが加速。肌のバリア機能を強化する効果が注目を集めている。",
        source: "Skin Science",
        sourceUrl: "#",
        icon: "fa-droplet",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 4300
    },
    {
        id: 7112,
        title: "「ジェンダーレスファッション」が小売市場を本格席巻、大手ブランドも専用ライン",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.03.11",
        summary: "性別を意識させないシルエットとカラーで構成されたコレクションが、幅広い年代に支持されている。国内外の大手ブランドが初のジェンダーフリーラインを相次ぎ発表し、市場への本格参入を宣言。",
        source: "Fashion Wire",
        sourceUrl: "#",
        icon: "fa-shirt",
        gradient: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
        viewCount: 3900
    },
    {
        id: 7113,
        title: "「働く親」を支援するミールキット、定期購読数が前年比200%に急増",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.03.11",
        summary: "調理時間を平均20分に抑えた時短ミールキットが共働き家庭を直撃。栄養バランスの管理まで行ってくれるサービスが、子育て世代の強い味方として定着しつつある。",
        source: "Meal Delivery Report",
        sourceUrl: "#",
        icon: "fa-utensils",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 2900
    },
    // ── 2026年3月10日（月） ──
    {
        id: 7101,
        title: "カーボンフットプリントを「可視化」するショッピングアプリが続々登場",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.10",
        summary: "商品スキャンで一瞬にしてCO₂排出量を算出。環境意識の高い消費者向けに、購入のたびにエコポイントを付与する仕組みが購買行動を変えつつある。",
        source: "Eco Consumer",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 3300
    },
    {
        id: 7102,
        title: "「プロテインスイーツ」市場が3年で3倍成長。パティシエ監修で本格化",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.10",
        summary: "罪悪感ゼロでスイーツ欲を満たせるプロテイン入り菓子が歯止めなく多様化。有名パティシエが監修したレシピでクオリティが向上し、ジムユーザー以外にも支持層が広がっている。",
        source: "Health Food Report",
        sourceUrl: "#",
        icon: "fa-heart-pulse",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 4000
    },
    {
        id: 7103,
        title: "「美の基準」がSNSで移行中、上品・高貴な「ロワイアルコア」が急上昇",
        category: "sns",
        categoryLabel: "SNS",
        date: "2026.03.10",
        summary: "コレクションから着想を得た高貴・上品なスタイルを指す「ロワイアルコア」がInstagramで急上昇。深みのある色彩と繊細なレース使いが注目を集めている。",
        source: "SNS Trend Watch",
        sourceUrl: "#",
        icon: "fa-hashtag",
        gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        viewCount: 5500
    },
    // ── 2026年3月9日（日） ──
    {
        id: 7091,
        title: "春靴トレンド2026：バレエシューズの「超フラット」回帰がファッションを席巻",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.03.09",
        summary: "ヒールゼロのフラットバレエシューズが、スカートからパンツまで今季最もコーデしやすいシューズとして台頭。素材のバリエーションが増え、カジュアルからドレスシーンまで活躍する。",
        source: "Shoes Trend Now",
        sourceUrl: "#",
        icon: "fa-shoe-prints",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 3800
    },
    {
        id: 7092,
        title: "「ヴィンテージデニム」ブームが第3波。古着屋への行列が全国規模に",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.09",
        summary: "90年代ハイウエストデニムを中心としたヴィンテージ古着への熱狂が再燃。週末の古着市は1000人規模の来場者を記録し、若い世代がサステナブルな消費の最前線を走っている。",
        source: "Vintage Fashion Report",
        sourceUrl: "#",
        icon: "fa-recycle",
        gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        viewCount: 4600
    },
    {
        id: 7093,
        title: "「森林浴アロマ」がリモートワーカーのデスクを席巻。生産性向上効果も実証",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.09",
        summary: "ヒノキや杉などの天然木成分を配合したアロマディフューザーが在宅ワーカーに人気爆発。森林浴の「フィトンチッド」効果をオフィスで再現できるとして、集中力維持に活用するケースが増加。",
        source: "Work From Home Magazine",
        sourceUrl: "#",
        icon: "fa-campground",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 3200
    },
    // ── 2026年3月8日（土） ──
    {
        id: 7081,
        title: "「ラベンダー」と「ミントグリーン」が2026年春モードの2大カラーに浮上",
        category: "color",
        categoryLabel: "カラー",
        date: "2026.03.08",
        summary: "パリコレとミラノコレを席巻した柔らかな紫とクールな緑。互いにリラクゼーションを連想させるこのコンビが、ファッションからインテリア・コスメまで春の色彩シーンをリードする。",
        source: "Color Forecast 2026",
        sourceUrl: "#",
        icon: "fa-fill-drip",
        gradient: "linear-gradient(135deg, #d7aefb 0%, #a8d8a8 100%)",
        viewCount: 4200
    },
    {
        id: 7082,
        title: "ユニクロ・春限定カラーが即完売。定番品のカラー戦略が加速",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.08",
        summary: "毎年完売を記録するシリーズが春限定カラーを拡充。コーラルピンクとセージグリーンが登場初日に完売し、早期予約枠の導入を検討する声が上がっている。",
        source: "UNIQLO Press",
        sourceUrl: "#",
        icon: "fa-shirt",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 5100
    },
    {
        id: 7083,
        title: "キッズシューズに「成長対応」機能。サイズアジャスター内蔵で廃棄ロスを削減",
        category: "kids",
        categoryLabel: "キッズ",
        date: "2026.03.08",
        summary: "足の成長に合わせてフィット感を調整できる子供靴が登場。廃棄ロスを減らしながら経済的な負担も軽減する、新しいサステナブルシューズが注目を集める。",
        source: "Kids Fashion News",
        sourceUrl: "#",
        icon: "fa-child",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 2900
    },
    // ── ここから既存データ ──
    {
        id: 6001,
        title: "「肌悩み」をAIが10秒診断、大手ドラッグストアが新サービス開始",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.07",
        summary: "カメラで肌を撮影するだけで、AIが現在のコンディションを分析。最適なスキンケア商品をその場で提案する次世代型什器が主要都市に導入される。",
        source: "日経MJ",
        sourceUrl: "#",
        icon: "fa-camera",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 4200
    },
    {
        id: 6002,
        title: "スリープテック最前線：脳波誘導で「最短5分」で深い眠りへ",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.07",
        summary: "特殊な周波数を用いたサウンド療法が注目。2026年モデルのイヤホン型デバイスは、入眠を劇的に早める効果が臨床データで実証され、予約が殺到している。",
        source: "Wellness Tech",
        sourceUrl: "#",
        icon: "fa-moon",
        gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        viewCount: 3800
    },
    {
        id: 6003,
        title: "2026年春、メンズコスメ市場が前年比150%。Z世代の『土台作り』が鍵",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.06",
        summary: "メイクよりも「素肌の綺麗さ」を求める男性が急増。美容医療の低価格化も重なり、20代男性のスキンケアへの月間支出額が過去最高を更新した。",
        source: "Fashion Press",
        sourceUrl: "#",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        viewCount: 3100
    },
    {
        id: 6004,
        title: "東京・渋谷に『デジタルデトックス・カフェ』。スマホ預かりでコーヒー割引",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.06",
        summary: "デジタル疲れを感じる若年層の間で、あえてオフラインを楽しむ空間がブームに。入店時にデバイスを預けることで割引されるユニークな仕組みが話題。",
        source: "渋谷経済新聞",
        sourceUrl: "#",
        icon: "fa-coffee",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 4500
    },
    {
        id: 6005,
        title: "「インドア・アウトドア」家具が30代を中心にヒット。自宅でキャンプ気分",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.05",
        summary: "ベランダや室内でも本格的な焚き火気分を味わえる照明や、キャンプ用素材を用いたソファが人気。日常の中に非日常を求める層のニーズを掴んでいる。",
        source: "PR TIMES",
        sourceUrl: "#",
        icon: "fa-campground",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 2900
    },
    {
        id: 6006,
        title: "無印良品、100%リサイクル素材の「次世代型収納ボックス」を発売",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.05",
        summary: "海洋プラスチックを再利用した、耐久性とデザイン性を両立する新シリーズ。不要になった際の回収・再資源化ルートも確立し、循環型ライフスタイルを提案。",
        source: "無印良品 ニュース",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        viewCount: 3500
    },
    {
        id: 5002,
        title: "1日8時間働けない「虚弱な私」 告白本に共感の連鎖",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.02.28",
        summary: "身体の不調を抱える女性のエッセー本「虚弱に生きる」が話題。努力しても体力がつかない著者の葛藤に、同様の悩みを持つ読者から「Me too」の連鎖が起きている。",
        source: "日経MJ",
        sourceUrl: "https://www.nikkei.com/article/DGXZQOUC307NH0Q6A130C2000000/",
        icon: "fa-book-open",
        gradient: "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
        viewCount: 4200
    },
    {
        id: 5003,
        title: "美容支出、メークよりスキンケアへ 美の「土台作り」を重視",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.28",
        summary: "美容医療の普及に伴い、対症療法的なメークよりもスキンケアへの関心が急上昇。2019年比で美容支出が増えた人の多くが「土台作り」への投資を惜しまない傾向に。",
        source: "日経MJ",
        sourceUrl: "https://www.nikkei.com/article/DGXZQOUC172VG0X10C26A2000000/",
        icon: "fa-spa",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 3800
    },
    {
        id: 5004,
        title: "サンスター文具「カセットテープメジャー」 レトロな外観でヒット",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.28",
        summary: "カセットテープを忠実に再現したメジャーが、販売計画の2.5倍を記録するヒット。レトロ・エモな外観と文具としての実用性が、若年層から大人まで幅広く支持されている。",
        source: "日経MJ",
        sourceUrl: "https://www.nikkei.com/article/DGXZQOUC30B0M0Q6A130C2000000/",
        icon: "fa-tape",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 2900
    },
    {
        id: 5005,
        title: "ペット多頭飼い専用マンションが登場 頭数制限なしで入居待ち",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.27",
        summary: "ペットの頭数・種類制限なしで入居できる複合施設が東京郊外に誕生。家賃は相場より3割高いものの、動植物との共生を求める層から入居待ちが出るほどの人気に。",
        source: "日経MJ",
        sourceUrl: "https://www.nikkei.com/article/DGXZQOCD136RS0T10C26A1000000/",
        icon: "fa-paw",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 3500
    },
    {
        id: 3001,
        title: "アットコスメショッピングの「クレンジング」売れ筋ランキング発表",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "今実際に売れているクレンジング製品の最新ランキング情報。ユーザーのリアルな支持が集まるアイテムが明らかに。",
        source: "@cosmeRanking",
        sourceUrl: "https://www.cosme.net/ranking/",
        icon: "fa-award",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 5200
    },
    {
        id: 3002,
        title: "Dior「フォーエヴァー」から進化した新ファンデーションが登場",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "すべてが進化したフォーエヴァーの新ファンデ。圧倒的な素肌感と持続力を両立した、Diorの自信作が遂に発売。",
        source: "@cosmeBrand",
        sourceUrl: "https://www.cosme.net/brands/46/tieup/00046202602-01/page.html",
        icon: "fa-magic",
        gradient: "linear-gradient(135deg, #222222 0%, #444444 100%)",
        viewCount: 4800
    },
    {
        id: 3003,
        title: "NARS「毛穴レスで透明感続く」新ファンデ体験キャンペーン開始",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "NARSの新作ファンデーションを体験できる500名様プレゼントキャンペーン。理想の肌を叶える技術をいち早く体験。",
        source: "@cosmeCampaign",
        sourceUrl: "https://www.cosme.net/brands/2213/tieup/02213202602-02/page.html",
        icon: "fa-gift",
        gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)",
        viewCount: 3900
    },
    {
        id: 3004,
        title: "dejavu「究極に美しいまつげ」を体験。500名様にプレゼント",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "dejavuの新しいまつげ製品の魅力を体験できるプレゼントキャンペーンがスタート。究極の仕上がりをその手に。",
        source: "@cosmeEvent",
        sourceUrl: "https://www.cosme.net/brands/353/tieup/00353202602-02/page.html",
        icon: "fa-eye",
        gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)",
        viewCount: 3500
    },
    {
        id: 3005,
        title: "佐賀で体験型アート展「魔法の美術館」開催。巨大な本に迷い込む体験",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.03",
        summary: "光を奏でる噴水や影と遊ぶ digital art を楽しめる体験型イベント。家族や友人と楽しめる不思議な美術館が登場。",
        source: "Fashion Press",
        sourceUrl: "https://www.fashionpress.net/news/131018",
        icon: "fa-palette",
        gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        viewCount: 2800
    },
    {
        id: 3006,
        title: "「トムとジェリー」生誕85周年記念カフェが東京・大阪・名古屋にオープン",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.03",
        summary: "生誕85周年を記念した“穴あきチーズ”バーガーなどの限定メニューが楽しめるコラボカフェ。作品の世界観を満喫。",
        source: "Fashion Press",
        sourceUrl: "https://www.fashionpress.net/news/130985",
        icon: "fa-utensils",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 4200
    },
    {
        id: 3007,
        title: "マルニの新作バッグ「パピエ」登場。折り紙から着想を得た造形美",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.03",
        summary: "バイカラーやレオパード柄のスタイリッシュな新作トートバッグ。折り紙のような構造が、日常に芸術的な彩りを添える。",
        source: "Fashion Press",
        sourceUrl: "https://www.fashionpress.net/news/131010",
        icon: "fa-shopping-bag",
        gradient: "linear-gradient(135deg, #485563 0%, #29323c 100%)",
        viewCount: 3100
    },
    {
        id: 3008,
        title: "川崎チッタデッラで「ミモザの祭典」2025開催。春を彩る黄色い街並み",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.03",
        summary: "約100本のミモザと黄色をテーマにした特別メニューが楽しめる。イタリアの春の訪れを祝う伝統的な催しが日本でも。",
        source: "Fashion Press",
        sourceUrl: "https://www.fashionpress.net/news/130972",
        icon: "fa-sun",
        gradient: "linear-gradient(135deg, #fff700 0%, #ffcc00 100%)",
        viewCount: 2600
    },
    {
        id: 3009,
        title: "イケア初、日本の家での暮らしから生まれた「JAPAN コレクション」",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.04",
        summary: "日本の限られた住環境に合わせて開発された、IKEA初の日本限定コレクション。省スペースでも豊かに暮らすヒントが満載。",
        source: "PR TIMES",
        sourceUrl: "https://prtimes.jp/main/html/rd/p/000000457.000000190.html",
        icon: "fa-couch",
        gradient: "linear-gradient(135deg, #0051ba 0%, #ffda1a 100%)",
        viewCount: 5500
    },
    {
        id: 3010,
        title: "脳波から集中度を測定「JINS MEME」の法人向けサービスが進化",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.04",
        summary: "ウェアラブルデバイスで従業員の集中度を可視化し、生産性向上を支援。データに基づいた、これからの働き方のスタンダード。",
        source: "PR TIMES",
        sourceUrl: "https://prtimes.jp/main/html/rd/p/000000010.000155000.html",
        icon: "fa-glasses",
        gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        viewCount: 3200
    },
    {
        id: 3011,
        title: "ダイソン、最新技術を駆使したヘアケア製品「Dyson Chitosan」日本上陸",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "ダイソンがヘアケアの固定観念を覆す。キトサンに着目した最新ラインが日本に初上陸、テクノロジーで理想のスタイリングへ。",
        source: "PR TIMES",
        sourceUrl: "https://prtimes.jp/main/html/rd/p/000000143.000042335.html",
        icon: "fa-wind",
        gradient: "linear-gradient(135deg, #ff00cc 0%, #3333ff 100%)",
        viewCount: 4500
    },
    {
        id: 3012,
        title: "睡眠の質を向上させる「Sleep & Health Summit 2026」オンライン開催",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.04",
        summary: "睡眠の最新知見を共有し、健康寿命の延伸を目指す大規模サミット。最新テクノロジーと専門家のアドバイスが交差する。",
        source: "PR TIMES",
        sourceUrl: "https://prtimes.jp/main/html/rd/p/000000109.000030580.html",
        icon: "fa-moon",
        gradient: "linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)",
        viewCount: 3800
    },
    {
        id: 1206,
        title: "2026年のトレンドカラー発表、静寂を象徴する『クラウドダンサー』が選出",
        category: "color",
        categoryLabel: "カラー",
        date: "2026.03.03",
        summary: "PANTONE社が発表した2026年の色は、柔らかな白色『Cloud Dancer』。情報過多なデジタル社会における「心の再起動」と「静けさ」を象徴する色が、ファッションからインテリアまで席巻する。",
        source: "Design News",
        sourceUrl: "#",
        icon: "fa-palette",
        gradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        viewCount: 5200
    },
    {
        id: 1207,
        title: "JAFCA、2026年のメッセージカラーに『ハートフェルト・ピンク』を決定",
        category: "color",
        categoryLabel: "カラー",
        date: "2026.03.03",
        summary: "日本流行色協会が選んだのは、活力を感じさせる明るいピンク。停滞から変化へ、実体験の価値を呼び覚ますようなポジティブなエネルギーが、ライフスタイルのあらゆる場面で取り入れられる。",
        source: "Color Institute",
        sourceUrl: "#",
        icon: "fa-fill-drip",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 4800
    },
    {
        id: 1201,
        title: "ZOZOTOWN、『AIサイズ推論』がさらに進化。試着不要の精度99%へ",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.03",
        summary: "数枚の写真から全身のミリ単位の数値を計測。AIがブランドごとの個体差まで計算し、購入後の「サイズ不一致」をゼロにする新サービスを開始。",
        source: "ZOZO プレス",
        sourceUrl: "https://corp.zozo.com/news/",
        icon: "fa-camera",
        gradient: "linear-gradient(135deg, #000000 0%, #434343 100%)",
        viewCount: 4500
    },
    {
        id: 1202,
        title: "IKEA、日本の狭小住宅に特化した『トランスフォーマー家具』を発表",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.03",
        summary: "日中はデスク、夜はベッドへ。AIが居住者の生活リズムを学習し、自動で家具の配置や形状を最適化する次世代の居住体験を提案。",
        source: "IKEA Japan News",
        sourceUrl: "https://www.ikea.com/jp/ja/newsroom/",
        icon: "fa-couch",
        gradient: "linear-gradient(135deg, #0051ba 0%, #ffda1a 100%)",
        viewCount: 3800
    },
    {
        id: 1203,
        title: "アシックス、疲労回復を加速させる『次世代リカバリーシューズ』発売",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.03.02",
        summary: "歩くたびに足裏をマッサージし、血流を促進する特殊素材を採用。ビジネスシーンでも違和感のないデザインで、働きながら回復を図る。",
        source: "ASICS ニュース",
        sourceUrl: "https://corp.asics.com/jp/press/",
        icon: "fa-shoe-prints",
        gradient: "linear-gradient(135deg, #001e62 0%, #3498db 100%)",
        viewCount: 3200
    },
    {
        id: 2,
        title: "『マインドフル・ネスティング』、自宅を最高の癒やし空間にする新習慣",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.02.28",
        summary: "外の世界の喧騒を断ち切り、自宅のインテリアや香りを整えることで精神的安定を図る。北欧のヒュッゲを超えた、より戦略的なセルフケアが注目される。",
        source: "Living Well",
        sourceUrl: "https://prtimes.jp/lifestyle/",
        icon: "fa-spa",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        viewCount: 1820
    },
    {
        id: 3,
        title: "生成AIによる「自分専用キャリアコーチ」が仕事の常識を変える",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.02.28",
        summary: "個人のスキルと志向を学習し、最適なネクストアクションを提案するパーソナルAI。2026年は、上司よりもAIに相談するビジネスパーソンが多数派に。",
        source: "Career Weekly",
        sourceUrl: "https://xtrend.nikkei.com/",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        viewCount: 2100
    },
    {
        id: 1101,
        title: "洋服の青山、全世代向け『みんなのスーツ』がヒット。軽さとコスパを両立",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.03.01",
        summary: "着用時の軽さと柔らかさを追求しつつ、きちんとした見た目を維持。物価高の中で圧倒的なコストパフォーマンスが全世代に支持されている。",
        source: "青山プレスリリース",
        sourceUrl: "https://www.y-aoyama.jp/news/",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
        viewCount: 3400
    },
    {
        id: 1102,
        title: "AOKI、パジャマスーツが累計販売数更新。ハイブリッドワークの定義へ",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.02.28",
        summary: "「見ためスーツ、着心地パジャマ」のコンセプトが完全に定着。自宅とオフィスを行き来する現代の多様な働き方を支える一着として選ばれ続けている。",
        source: "AOKI ニュース",
        sourceUrl: "https://www.aoki-style.com/press/",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #1d4ede 0%, #4ca1af 100%)",
        viewCount: 3100
    },
    {
        id: 1103,
        title: "はるやま、丸ごと洗える『完全ウォッシャブルスーツ』2026年モデル予約開始",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.02.27",
        summary: "家庭用洗濯機での耐久性がさらに向上。防シワ・速乾機能に加え、360度ストレッチで「ストレスフリー」な着心地を追求した最新作。",
        source: "はるやま Online",
        sourceUrl: "https://haruyama.jp/news/",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #24c6dc 0%, #514a9d 100%)",
        viewCount: 2800
    },
    {
        id: 1104,
        title: "スーツセレクト、Z世代向け『ワイドパンツスーツ』で新しいビジネス像を提案",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.03.01",
        summary: "従来のタイトなシルエットから一変、リラックス感のあるワイドシルエットが登場。ファッション性とフォーマルさを両立させ、若年層のニーズを開拓。",
        source: "SUIT SELECT News",
        sourceUrl: "https://www.suit-select.com/news/",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)",
        viewCount: 4200
    },
    {
        id: 1105,
        title: "『スーツスクエア』への屋号変更が全国で加速。4ブランド融合の新体験",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.02.28",
        summary: "ザ・スーツカンパニーが次世代型店舗へ進化。あらゆるビジネスウェアのニーズに一拠点で対応するOMO店舗が、主要都市を中心に続々とリニューアル。",
        source: "SUIT SQUARE プレス",
        sourceUrl: "https://www.uktsc.com/info/",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
        viewCount: 2950
    },
    {
        id: 5,
        title: "『スマートミラー』が実現する、美容のパーソナライズ化",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.27",
        summary: "鏡に映る肌の状態を分析し、その日の最適なスキンケアやメイクを提案。AIがコンシェルジュのように暮らしをサポートするデバイスの普及。",
        source: "Tech Lifestyle",
        sourceUrl: "https://prtimes.jp/technology/",
        icon: "fa-magic",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        viewCount: 1290
    },
    {
        id: 7,
        title: "睡眠を科学する『スリープテック』が第二フェーズへ",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.02.26",
        summary: "単なる計測から、脳波誘導による深い眠りへの能動的な介入へ。より効率的で質の高い休息がパフォーマンスの鍵を握る。",
        source: "Health Daily",
        sourceUrl: "#",
        icon: "fa-moon",
        gradient: "linear-gradient(135deg, #302b63 0%, #24243e 100%)",
        viewCount: 1980
    },
    {
        id: 210,
        title: "アダストリア『Andemiu』、土屋巴瑞季を迎え2026春夏アンバサダー就任",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.01",
        summary: "働く女性向けブランドAndemiuが春夏アンバサダーを公開。洗練されたトレンドLOOKとともに、オンオフ問わず活躍する新作コレクションを展開。",
        source: "アダストリア プレス",
        sourceUrl: "https://www.adastria.co.jp/news/",
        icon: "fa-gem",
        gradient: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
        viewCount: 3800
    },
    {
        id: 101,
        title: "テックウェアの進化：都市生活を最適化する高機能アウター",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.02.28",
        summary: "透湿防水性だけでなく、デバイスの収納や温度調節機能を備えたウェアが一般層にも普及。実用性とスタイルを高度に両立。",
        source: "Urban Mode",
        sourceUrl: "#",
        icon: "fa-person-rays",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        viewCount: 1650
    },
    {
        id: 102,
        title: "サステナブルな『おさがり』プラットフォーム、キッズ市場で急成長",
        category: "kids",
        categoryLabel: "キッズ",
        date: "2026.02.27",
        summary: "成長の早い子供服を、品質を維持したまま循環させる新サービス。親世代の環境意識の高まりを受け、リユースが当たり前の選択肢に。",
        source: "Family Tech",
        sourceUrl: "#",
        icon: "fa-child",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 1420
    },
    {
        id: 103,
        title: "オーガニックコットンと竹炭繊維、ベビー肌着の新基準",
        category: "baby",
        categoryLabel: "ベビー",
        date: "2026.03.01",
        summary: "究極の低刺激と抗菌性を求めた新素材。敏感な赤ちゃんの肌を守るだけでなく、土に還る素材としてギフト需要も独占。",
        source: "Baby Journal",
        sourceUrl: "#",
        icon: "fa-baby",
        gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        viewCount: 1300
    },
    {
        id: 201,
        title: "ユニクロ『次世代ライフウェア』、AI分析による究極のフィット感",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.03.01",
        summary: "100万人の体型データから導き出した、誰にでも似合う黄金シルエット。ベーシックの枠を超えた「機能美」の到達点。",
        source: "Uniqlo Press",
        sourceUrl: "https://www.uniqlo.com/jp/ja/news/topics/2026020601/",
        icon: "fa-shirt",
        gradient: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
        viewCount: 3200
    },
    {
        id: 202,
        title: "ユナイテッドアローズ別注、伝統技術とモダンデザインの融合",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.02.28",
        summary: "国内の老舗工場と連携した限定シリーズ。高価格帯ながら、本物志向の若年層から絶大な支持を集める。",
        source: "UA Style",
        sourceUrl: "https://store.united-arrows.co.jp/brand/ua/news/",
        icon: "fa-crown",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
        viewCount: 1800
    },
    {
        id: 203,
        title: "GU『1分で完売』、インフルエンサーとの超限定コラボが話題",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.01",
        summary: "最新トレンドを最速で具現化。アプリ予約で即完売した新作は、リセール市場でも価格が高騰するほどの人気。",
        source: "GU News",
        sourceUrl: "https://www.gu-global.com/jp/ja/feature/cms/gu-news/",
        icon: "fa-bolt",
        gradient: "linear-gradient(135deg, #1d4ede 0%, #002691 100%)",
        viewCount: 4100
    },
    {
        id: 204,
        title: "しまむら『骨格診断』対応ライン、セルフプロデュース需要を独占",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.02.27",
        summary: "自分の骨格に合わせた「着痩せ」が叶う新シリーズ。手頃な価格でセルフプロデュースが楽しめるとSNSで爆発的に拡散。",
        source: "Shimamura Life",
        sourceUrl: "https://www.shimamura.gr.jp/shimamura/flier/",
        icon: "fa-users",
        gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%)",
        viewCount: 2900
    },
    {
        id: 205,
        title: "イオン『トップバリュ』、汚れが落ちやすい機能性通学着がヒット",
        category: "kids",
        categoryLabel: "キッズ",
        date: "2026.02.28",
        summary: "泥汚れや油性ペンも洗濯で落ちやすい新素材を採用。働く親の負担を軽減する「家事ラク」アパレルとしてイオンが総力を結集。",
        source: "Aeon Living",
        sourceUrl: "https://www.topvalu.net/news/",
        icon: "fa-school",
        gradient: "linear-gradient(135deg, #8c429c 0%, #632a6f 100%)",
        viewCount: 2500
    },
    {
        id: 301,
        title: "TikTok発『10秒時短メイク』、全世代で空前のブームに",
        category: "sns",
        categoryLabel: "SNS",
        date: "2026.03.01",
        summary: "短時間で劇的な変化を生むテクニックがバズ。関連グッズの売上が前年比200%を記録するなど、購買行動に直結する現象。",
        source: "TikTok Trends",
        sourceUrl: "#",
        icon: "fa-brands fa-tiktok",
        gradient: "linear-gradient(135deg, #000000 0%, #25f4ee 50%, #fe2c55 100%)",
        viewCount: 5800
    },
    {
        id: 302,
        title: "Instagramで話題の『淡色カフェ』、全国各地で集客記録を更新",
        category: "sns",
        categoryLabel: "SNS",
        date: "2026.02.28",
        summary: "ベージュや白を基調とした内装。写真映えだけでなく、その空間での「体験」を共有することがステータスとなるカルチャーの定着。",
        source: "Insta Vibes",
        sourceUrl: "#",
        icon: "fa-brands fa-instagram",
        gradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        viewCount: 4200
    },
    {
        id: 303,
        title: "Xでバズった『究極の睡眠枕』、数分で予約枠が埋まる事態に",
        category: "sns",
        categoryLabel: "SNS",
        date: "2026.03.01",
        summary: "一個人のレビューツイートが数万リツイートされ、一夜にして完売。リアルな口コミが既存の広告を凌駕する拡散力を見せつけた。",
        source: "X Buzz",
        sourceUrl: "#",
        icon: "fa-brands fa-x-twitter",
        gradient: "linear-gradient(135deg, #000000 0%, #333333 100%)",
        viewCount: 4900
    },
    {
        id: 401,
        title: "Nike『Air Max』最新作、再生素材を50%以上使用した環境対応モデル",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.03.01",
        summary: "圧倒的なクッション性はそのままに、製造工程を見直し環境負荷を低減。機能性と持続可能性を両立させた次世代のアイコン。",
        source: "Nike News",
        sourceUrl: "https://about.nike.com/en/newsroom/",
        icon: "fa-bolt",
        gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
        viewCount: 3500
    },
    {
        id: 402,
        title: "Adidas『Stan Smith』、天然レザーを廃止しヴィーガン素材へ完全移行",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.02.28",
        summary: "不朽の名作が未来へと進化。ブランドを象徴する定番モデルが、環境への配慮を最優先した新しいスタンダードを提示する。",
        source: "Adidas Style",
        sourceUrl: "https://news.adidas.com/",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
        viewCount: 3100
    },
    {
        id: 403,
        title: "New Balance『990』シリーズ、快適性を極めたメイド・イン・USA新作",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.02.27",
        summary: "「1000点満点中990点」の伝統。卓越したサポート性とクッション性が、タウンユースから本格的なウォーキングまで幅広く支持される。",
        source: "NB Journal",
        sourceUrl: "https://shop.newbalance.jp/shop/e/eEnb-news",
        icon: "fa-shoe-prints",
        gradient: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
        viewCount: 2800
    },
    {
        id: 404,
        title: "スケッチャーズ『ハンズフリースリップインズ』、立ったまま履ける利便性が話題",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.03.01",
        summary: "靴べら不要、手を使わずに履ける。シニア層だけでなく、忙しい現役世代や子育て層からも「革命的」との口コミが殺到。",
        source: "Footwear Today",
        sourceUrl: "#",
        icon: "fa-clock",
        gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        viewCount: 4200
    },
    {
        id: 405,
        title: "ABCマート限定『VANSコラボ』、ストリートから支持される限定カラー",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.02.28",
        summary: "店舗に行かないと買えない希少性。地域密着型のABCマートが仕掛ける、特定ターゲットに向けた戦略的モデルが好調。",
        source: "Store Trends",
        sourceUrl: "https://www.abc-mart.net/shop/e/e-news/",
        icon: "fa-store",
        gradient: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
        viewCount: 2600
    },
    {
        id: 501,
        title: "BEAMS『別注アークテリクス』、即完売の兆しを見せる2026春夏の新作",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.03.01",
        summary: "独特のカラーパレットと都会的な機能美。BEAMSが仕掛ける「都会で着るアウトドア」が、ファッションギークのみならず幅広い層を魅了。",
        source: "BEAMS News",
        sourceUrl: "https://www.beams.co.jp/news/",
        icon: "fa-tshirt",
        gradient: "linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)",
        viewCount: 3800
    },
    {
        id: 502,
        title: "JOURNAL STANDARD『テック・テーラリング』、仕事と日常をシームレスに繋ぐ新定番",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.02.28",
        summary: "高機能素材を用いたセットアップ。見た目はフォーマルだが、着心地はスポーティ。多様化する働き方に寄り添うベイクルーズ流のスタンダード提案。",
        source: "Baycrew's Group",
        sourceUrl: "https://baycrews.jp/news",
        icon: "fa-briefcase",
        gradient: "linear-gradient(135deg, #485563 0%, #29323c 100%)",
        viewCount: 2950
    },
    {
        id: 503,
        title: "IENA『フレンチシック・モダン』、春を彩るパステルツイードがレディスの主役に",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.01",
        summary: "伝統的なツイードを現代的に再編集。上品でありながらも抜け感のあるスタイルが、都会で働く自立した女性から圧倒的な支持。",
        source: "Baycrew's Group",
        sourceUrl: "https://baycrews.jp/news",
        icon: "fa-gem",
        gradient: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
        viewCount: 3100
    },
    {
        id: 504,
        title: "ZARA『スタジオ・コレクション』、ハイブランド級のクオリティを誇る限定ラインが話題",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.02.28",
        summary: "マテリアルとシルエットに徹底的にこだわった特別ライン。手に取りやすい価格帯でハイファッションを体験できる「民主化」の最前線。",
        source: "ZARA Global",
        sourceUrl: "https://www.zara.com/jp/ja/",
        icon: "fa-shopping-bag",
        gradient: "linear-gradient(135deg, #000000 0%, #434343 100%)",
        viewCount: 4500
    },
    {
        id: 505,
        title: "WWDJAPAN予測『クワイエット・ラグジュアリー』から『ネオ・ビンテージ』への潮流",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.03.01",
        summary: "控えめな高級感から、個性を主張するアーカイブ再評価へ。業界最高峰の メディアが解き明かす、2026年後半のトレンドマップ。",
        source: "WWD JAPAN",
        sourceUrl: "https://www.wwdjapan.com/",
        icon: "fa-newspaper",
        gradient: "linear-gradient(135deg, #000000 0%, #ff0000 100%)",
        viewCount: 5200
    },
    {
        id: 601,
        title: "資生堂『SHISEIDO エッセンス スキングロウ』、美容液処方のファンデがベストコスメを席巻",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.01",
        summary: "メイクをしながらスキンケア。資生堂が誇る最新の皮膚科学を結集したハイブリッドファンデーションが、圧倒的な支持で上半期1位に。",
        source: "Shiseido Beauty",
        sourceUrl: "https://corp.shiseido.com/jp/releaselist/",
        icon: "fa-magic",
        gradient: "linear-gradient(135deg, #ff0000 0%, #b20000 100%)",
        viewCount: 6800
    },
    {
        id: 602,
        title: "KANEBO『ライブリースキン ウェア』、素肌化けする素肌への追求が極まる",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.28",
        summary: "「絶頂肌」を継続。カネボウが提案する、生命感あふれるツヤと、肌そのものが美しくなったかのような仕上がりが話題。",
        source: "Kanebo Global",
        sourceUrl: "https://www.kanebo-global.com/jp/ja/",
        icon: "fa-heart",
        gradient: "linear-gradient(135deg, #222222 0%, #444444 100%)",
        viewCount: 4200
    },
    {
        id: 603,
        title: "コーセー『デコルテ リポソーム』、進化し続ける保湿テクノロジーの金字塔",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.27",
        summary: "多重層リポソームが24時間、潤いを放ち続ける。コーセーを代表する名品が、時代を超えて愛される理由を再証明したヒット作。",
        source: "KOSE Beauty",
        sourceUrl: "https://www.kose.co.jp/company/ja/news/",
        icon: "fa-tint",
        gradient: "linear-gradient(135deg, #0e2a47 0%, #1c508a 100%)",
        viewCount: 5100
    },
    {
        id: 604,
        title: "CANMAKE『むにゅっとハイライター』、プチプラとは思えない繊細なツヤがバズり中",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.01",
        summary: "生レアな質感。指で塗るだけで内側から発光するようなツヤが完成。キャンメイクならではのトレンドキャッチ力が爆発。",
        source: "CANMAKE Official",
        sourceUrl: "https://www.canmake.com/news/",
        icon: "fa-star",
        gradient: "linear-gradient(135deg, #ffc0cb 0%, #ff69b4 100%)",
        viewCount: 5900
    },
    {
        id: 605,
        title: "CEZANNE『リップカラーシールド』、落ちにくさと潤いを両立した新定番が完売続出",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.28",
        summary: "セザンヌから待望の耐久リップ。色持ちの良さと、とろけるような塗り心地が評価され、バラエティショップでの欠品が相次ぐ。",
        source: "CEZANNE Lab",
        sourceUrl: "https://www.cezanne.co.jp/news/",
        icon: "fa-smile",
        gradient: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
        viewCount: 3800
    },
    {
        id: 606,
        title: "最新韓国コスメ『PDRNスキンケア』、サーモン成分による肌再生ブームが日本上陸",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.01",
        summary: "次世代のエイジングケア。美容大国・韓国から発信された「刺さない美容液」が、透明感を求めるユーザーの間で爆発的な人気に。",
        source: "K-Beauty Trends",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        viewCount: 6200
    },
    {
        id: 607,
        title: "@cosme『2026上半期ベスコス』発表。リアルな口コミが選ぶ真のヒットアイテム",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.01",
        summary: "忖度なしの評価。アットコスメユーザーの膨大なデータから算出されたランキングが、コスメ業界の最前線を映し出す。",
        source: "@cosme Media",
        sourceUrl: "https://www.cosme.net/bestcosme/",
        icon: "fa-award",
        gradient: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
        viewCount: 7500
    },
    {
        id: 608,
        title: "PLAZA・LOFT限定『先行販売』、今しか買えない注目ブランドが店頭を彩る",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.28",
        summary: "宝探しのような体験。バラエティショップならではの目利きで、アジア圏の人気ブランドやサステナブルな新作がいち早く登場。",
        source: "Variety Shop Hub",
        sourceUrl: "#",
        icon: "fa-gift",
        gradient: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
        viewCount: 4600
    },
    {
        id: 609,
        title: "2026年春の『透け感マット』リップ、指塗りで仕上げる新しい血色感",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "マットなのに透けるような新感覚のテクスチャーが春メイクの主役に。VOCEが提案する、指でポンポンと馴染ませる抜け感リップの最新トレンドを徹底解説。",
        source: "VOCE Make-up",
        sourceUrl: "https://i-voce.jp/make-up/",
        icon: "fa-magic",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 4500
    },
    {
        id: 610,
        title: "大人の肌を救う『ナイアシンアミド』進化系、最新スキンケアの選び方",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "シワ改善と美白を同時に叶える成分として定着したナイアシンアミドがさらに進化。VOCE厳選の最新成分と組み合わせた相乗効果で、揺らぎやすい春の肌を根本から立て直す方法。",
        source: "VOCE Skincare",
        sourceUrl: "https://i-voce.jp/skincare/",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        viewCount: 5200
    },
    {
        id: 611,
        title: "美的.com発『骨格別ハイライト』で小顔効果アップ。光と影を操るベースメイク術",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.03.04",
        summary: "顔の骨格に合わせてハイライトとシェーディングの位置を変えるだけで、驚くほどの小顔効果を実感。美的がプロのメイクアップアーティストと考案した最新ベースメイク理論。",
        source: "美的.com",
        sourceUrl: "https://www.biteki.com",
        icon: "fa-star",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 4800
    },
    {
        id: 701,
        title: "西川『新生活応援キャンペーン』、睡眠を科学した高機能マットレスが話題",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.03.01",
        summary: "大谷翔平選手のアドバイスから着想を得たという最新の快眠寝具群。春の新生活に向け、投資効果が最も高い健康アイテムとして注目を集める。",
        source: "西川株式会社 プレス",
        sourceUrl: "https://www.nishikawa1566.com/",
        icon: "fa-bed",
        gradient: "linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)",
        viewCount: 3200
    },
    {
        id: 702,
        title: "ニトリ『AIマットレス＆スマートベッド』、最新テクノロジーで睡眠環境を自動最適化",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.28",
        summary: "睡眠中の動きを感知して角度や硬さを自動調整。近未来の寝室体験を、ニトリならではの「お、ねだん以上。」な価格設定で実現した渾身の新商品。",
        source: "ニトリ ニュースリリース",
        sourceUrl: "https://www.nitori.co.jp/",
        icon: "fa-robot",
        gradient: "linear-gradient(135deg, #0cebeb 0%, #20e3b2 50%, #29ffc6 100%)",
        viewCount: 4500
    },
    {
        id: 703,
        title: "無印良品『猫用家具』本格展開、インテリアに溶け込むペットとの新しい暮らし",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.27",
        summary: "木製シェルフやユニット家具と完全に調和する、爪とぎや隠れ家。人間もペットも心地よい、新しい「無印良品の家」のあり方を提示している。",
        source: "無印良品 公式",
        sourceUrl: "https://www.muji.com/jp/ja/store",
        icon: "fa-cat",
        gradient: "linear-gradient(135deg, #d3cce3 0%, #e9e4f0 100%)",
        viewCount: 5200
    },
    {
        id: 704,
        title: "Francfranc 2026春夏『花と蝶のモチーフ』、スペパ重視の華やかインテリア",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.03.01",
        summary: "丸めるとブーケになるブランケットや、限られた空間を有効活用する「スペースパフォーマンス（スペパ）」アイテム。春の訪れを感じるコレクションが話題。",
        source: "Francfranc プレス",
        sourceUrl: "https://francfranc.com/",
        icon: "fa-spa",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        viewCount: 3800
    },
    {
        id: 705,
        title: "イオン・ホームコーディ『新生活900品目』、機能と価格の両立で圧倒的存在感",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.28",
        summary: "積み重ね可能なカラーボックスや、ベッドのヘッドボードを選べるカスタマイズ性。生活者の細やかなニーズに応える商品群を一挙投入。",
        source: "イオン ホームコーディ",
        sourceUrl: "https://www.topvalu.net/homecoordy/",
        icon: "fa-couch",
        gradient: "linear-gradient(135deg, #b3ffab 0%, #12fff7 100%)",
        viewCount: 2900
    },
    {
        id: 2001,
        title: "UNIQLO 2026春夏展示会レポート。キーワードは『究極の快適性』",
        category: "mens",
        categoryLabel: "メンズ",
        date: "2026.02.15",
        summary: "今シーズンのユニクロは、軽量で通気性の高い新素材を全ラインナップに採用。都市生活に馴染むシックなカラー展開が話題。",
        source: "Fashion Press",
        sourceUrl: "https://www.fashion-press.net/",
        icon: "fa-tshirt",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
        viewCount: 3100
    },
    {
        id: 2002,
        title: "春の新作コスメ、トレンドは『シアー＆メタリック』の融合",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.10",
        summary: "内側から発光するような透明感と、ポイントで効かせるメタリックな輝き。各ブランドから発表された春の新色を独断レビュー。",
        source: "Beauty Online",
        sourceUrl: "https://maquia.hpplus.jp/",
        icon: "fa-magic",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        viewCount: 4200
    },
    {
        id: 2003,
        title: "『サステナブル・ファッション・ウィーク 2026』東京で開催",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.02.05",
        summary: "再利用素材や廃棄ゼロの製造プロセス。これからのファッションに求められる「責任」と「美しさ」を両立させたデザイナーたちが集結。",
        source: "Eco Life News",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 2800
    },
    {
        id: 7001,
        title: "2026年春の気温予測。平年よりも高めで桜の開花も記録的な早さに",
        category: "temperature",
        categoryLabel: "気温予測",
        date: "2026.03.05",
        summary: "気象庁の発表によると、今年の春は全国的に平年より気温が高くなる見込み。本格的な春服への衣替えも早期化が予想される。",
        source: "Weather News",
        sourceUrl: "#",
        icon: "fa-sun",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 4500
    },
    {
        id: 7002,
        title: "2026年夏の長期予報。猛暑日日数は昨年に引き続き高水準か",
        category: "temperature",
        categoryLabel: "気温予測",
        date: "2026.03.05",
        summary: "太平洋高気圧の張り出しが強く、例年以上の厳しい暑さが予想される。熱中症対策グッズやひんやり系コスメの需要が早くも高まっている。",
        source: "Weather News",
        sourceUrl: "#",
        icon: "fa-temperature-high",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 3900
    },
    {
        id: 7003,
        title: "2026年秋の傾向。残暑が厳しく、紅葉シーズンは後ろ倒しに",
        category: "temperature",
        categoryLabel: "気温予測",
        date: "2026.03.05",
        summary: "夏からの高い気温が長引き、秋の訪れは遅れる見通し。9月・10月も半袖アイテムが活躍するなど、秋服のセールススケジュールにも影響が。",
        source: "Weather News",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 2200
    },
    {
        id: 7004,
        title: "2026年冬の寒波予測。暖冬傾向なるか、それとも急激な冷え込みか",
        category: "temperature",
        categoryLabel: "気温予測",
        date: "2026.03.05",
        summary: "エルニーニョ現象の影響で暖冬の傾向があるものの、一時的な強い寒気の南下による大雪のリスクも。防寒具だけでなく、調温アイテムが人気。",
        source: "Weather News",
        sourceUrl: "#",
        icon: "fa-snowflake",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        viewCount: 1800
    },
    // 2月の追加アーカイブ
    {
        id: 4001,
        title: "ワークマン、『超撥水・防汚オフィスシューズ』がビジネスパーソンに激刺さり",
        category: "shoes",
        categoryLabel: "シューズ",
        date: "2026.02.20",
        summary: "雨の日の通勤も怖くない。圧倒的な撥水性能と疲れにくいソールを3000円台で実現。SNSで「実用性最強」と拡散され、品薄状態に。",
        source: "Workman Press",
        sourceUrl: "https://www.workman.co.jp/news",
        icon: "fa-shoe-prints",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
        viewCount: 3800
    },
    {
        id: 4002,
        title: "『自宅サウナ』が一般家庭へ。10万円台の省スペースモデルがヒット中",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.02.18",
        summary: "サウナブームは「通う」から「自宅でも」へ。コンセント一つで設置できる小型ボックス型が、新築やリフォームの注目設備として急浮上。",
        source: "Sauna Life",
        sourceUrl: "#",
        icon: "fa-fire",
        gradient: "linear-gradient(135deg, #f83600 0%, #f9d423 100%)",
        viewCount: 2900
    },
    {
        id: 4003,
        title: "ソニー、居住者の情緒を読み取る『AIエモーショナル・リビング』を発表",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.02.12",
        summary: "カメラとセンサーで家族の「表情」や「声のトーン」を分析。落ち込んでいる時にはリラックス効果のある音楽と照明に自動で切り替える未来型システム。",
        source: "Sony Global News",
        sourceUrl: "https://www.sony.com/ja/SonyInfo/News/",
        icon: "fa-brain",
        gradient: "linear-gradient(135deg, #21d4fd 0%, #b721ff 100%)",
        viewCount: 4100
    },
    {
        id: 4004,
        title: "2026年春の新作コスメ『美容液リップ』が予約分で完売続出",
        category: "cosme",
        categoryLabel: "コスメ",
        date: "2026.02.01",
        summary: "カラーを楽しみながら、唇の微細な荒れを24時間ケア。各ブランドから発表された「インナーケア発想」の新作が、マスクオフの時代に爆発的な支持。",
        source: "Beauty Online",
        sourceUrl: "https://www.cosme.net/",
        icon: "fa-magic",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 3500
    },
    // 1月の追加アーカイブ
    {
        id: 4005,
        title: "『メタバース出社』が当たり前に。大手企業の3割が仮想空間オフィスを導入",
        category: "work",
        categoryLabel: "ワークスタイル",
        date: "2026.01.28",
        summary: "アバターによる偶発的な会話が「孤独感」を解消。従来のZoom会議よりもチームの一体感が高まると、リモートワークの課題解決策として定着。",
        source: "Tech Career",
        sourceUrl: "#",
        icon: "fa-vr-cardboard",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        viewCount: 5200
    },
    {
        id: 4006,
        title: "パステルカラーの『フェムテック・ウェア』、春を先取りする機能服が流行",
        category: "ladies",
        categoryLabel: "レディス",
        date: "2026.01.25",
        summary: "女性特有の悩みに寄り添う構造と、春らしい明るいカラーを両立。都市生活に馴染む「機能性フェミニン」がファッション界の新たな主役に。",
        source: "Style Media",
        sourceUrl: "#",
        icon: "fa-gem",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 2800
    },
    {
        id: 4007,
        title: "子どもの感性を育てる『知育VR絵本』、教育現場での導入が加速",
        category: "kids",
        categoryLabel: "キッズ",
        date: "2026.01.18",
        summary: "物語の主人公として中に入れる体験。歴史や宇宙を「体験」として学習することで、理解度と探求心が飛躍的に向上すると話題に。",
        source: "Education Today",
        sourceUrl: "#",
        icon: "fa-book-open",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 3100
    },
    {
        id: 4008,
        title: "Instagramで話題の『究極の朝食セット』、産直ECの売上が前年比2倍",
        category: "sns",
        categoryLabel: "SNS",
        date: "2026.01.15",
        summary: "「丁寧な暮らし」の再評価。地方の農家から直接届く土付き野菜や卵をSNSに投稿し、その背景にある「ストーリー」を味わう消費が一般化。",
        source: "SNS Report",
        sourceUrl: "#",
        icon: "fa-camera-retro",
        gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        viewCount: 4500
    },
    {
        id: 4009,
        title: "『スマートベビーカー』登場。自動ブレーキと温度調整機能を搭載",
        category: "baby",
        categoryLabel: "ベビー",
        date: "2026.01.08",
        summary: "AIが坂道を検知し出力をアシスト。急な手放しには自動ブレーキが作動。赤ちゃんが寝付く最適な温度をシート内部で保つなど、親の不安に寄り添う。",
        source: "Family News",
        sourceUrl: "#",
        icon: "fa-baby-carriage",
        gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        viewCount: 2300
    },
    {
        id: 4010,
        title: "新年の抱負第1位は『睡眠改善』。1月の寝具売上が過去最高を記録",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.01.02",
        summary: "「パフォーマンス向上のための休息」が共通認識に。パーソナライズ枕や高級マットレスへの投資が、20代〜30代の間でも一般的となった1月の商戦。",
        source: "Store Trends",
        sourceUrl: "#",
        icon: "fa-bed",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        viewCount: 3900
    },
    {
        id: 4011,
        title: "2026年、暮らしのキーワードは『自分回帰』。パーソナライズ化が加速",
        category: "living",
        categoryLabel: "リビング",
        date: "2026.01.01",
        summary: "年初のトレンド予測。他人の評価より「自分に合うかどうか」。インドア、健康、キャリア、あらゆる面で自分基準の選択をする傾向が強まる1年に。",
        source: "Trend Forecast",
        sourceUrl: "#",
        icon: "fa-compass",
        gradient: "linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)",
        viewCount: 5800
    },
    // 既存アーカイブ
    {
        id: 1001,
        title: "2026年、ウェルネスの新定番は『デジタル・デトックス・リトリート』",
        category: "wellness",
        categoryLabel: "ウェルネス",
        date: "2026.01.20",
        summary: "新年の抱負として注目される「切断」の重要性。スマホを預け、自然の中で五感を取り戻すプログラムが予約殺到中。",
        source: "Zen Journal",
        sourceUrl: "#",
        icon: "fa-mountain",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        viewCount: 3540
    },
    {
        id: 1002,
        title: "CES 2026報告：未来の暮らしを変える『パーソナル・ヘルス・ロボット』",
        category: "living",
        categoryLabel: "暮らし",
        date: "2026.01.12",
        summary: "ラスベガスで開催されたCESから。家族の健康を見守り、食事のアドバイスから非常時の通報までこなすAIロボットが多数登場。",
        source: "Tech Gadget",
        sourceUrl: "https://wired.jp/",
        icon: "fa-robot",
        gradient: "linear-gradient(135deg, #302b63 0%, #24243e 100%)",
        viewCount: 5100
    },
    {
        id: 1003,
        title: "伝統工芸×3Dプリント。京都発の新しい『道具』が世界で高く評価",
        category: "living",
        categoryLabel: "暮らし",
        date: "2026.01.05",
        summary: "職人の技と最新技術の融合。伝統的な文様を3Dプリントで繊細に再現した茶道具が、海外のデザイン賞を総なめに。",
        source: "Design Times",
        sourceUrl: "#",
        icon: "fa-brush",
        gradient: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        viewCount: 1980
    }
].filter(item => {
    // Fashion PressとPR TIMESの情報はコスメとレディスのみにする
    if (item.source === 'Fashion Press' || item.source === 'PR TIMES') {
        return item.category === 'cosme' || item.category === 'ladies';
    }
    return true;
});


// ========================================
// コラムデータ（固定4件 ＋ ストックの中から日付で2件選択）
// ========================================
const staticColumns = [
    {
        id: 1,
        tag: "市場分析",
        title: "2026年、暮らしのキーワードは『自分回帰』",
        body: `物価高や技術の進化が加速する中、消費者の関心は「他人の評価」から「自分自身の心地よさ」へと明確にシフトしています。
        
        かつての「映え」を追求する消費から、自分の体調や精神状態に合わせたパーソナライズされた体験への投資。この『自分回帰』の流れは、住居、ワークスタイル、ウェルネスのあらゆる場面で顕在化しています。
        
        特に「家」は単なる居住スペースを超え、AIが健康管理をサポートし、心身を整えるリトリートの場としての役割を深めています。このパラダイムシフトが、2026年のビジネスとライフスタイルのあり方を根本から変えていくでしょう。`,
        author: { name: "佐藤 健二", title: "トレンドリサーチ所長", initials: "佐", color: "#34495e" },
        readTime: 6,
        headerColor: "linear-gradient(to right, #4b6cb7, #182848)"
    },
    {
        id: 2,
        tag: "テクノロジー",
        title: "AIと共創する、新しい『余白』の楽しみ方",
        body: `AIが日々のルーチンワークを代替することで生まれる、私たち自身の「余白」。2026年は、この時間をどう使うかが幸福度の鍵を握ります。
        
        単なる時短ではなく、AIをクリエイティブなパートナーとして活用し、人間特有の五感を刺激する活動に没頭する。例えば、AIが提案する栄養バランスを元に、あえて時間をかけて手料理を楽しむといった「不便さの再定義」が注目されています。
        
        効率を追求するテクノロジーの影で、私たちが人間らしさを取り戻すための新しいライフスタイルが芽吹いています。`,
        author: { name: "田中 雅也", title: "テックライフ・ジャーナリスト", initials: "田", color: "#3498db" },
        readTime: 5,
        headerColor: "linear-gradient(to right, #24c6dc, #514a9d)"
    },
    {
        id: 3,
        tag: "ワークスタイル",
        title: "『ノマド・バン』が変える、場所を選ばない働き方の終着点",
        body: `高速衛星通信と高容量バッテリーの普及により、真の意味で場所の制約がなくなりました。今、注目されているのは、居住と仕事、そして旅を完全に融合させた「ノマド・バン」によるライフスタイルです。
        
        都市の利便性を享受しながら、時には大自然の真ん中で重要な会議を開く。この柔軟性が、個人の生産性と精神的充足感を最大化させています。
        
        「定住」という従来の概念が揺らぎ、地図そのものが自分自身のオフィスであり家となる。そんな自由な働き方が、2026年の新しいスタンダードになりつつあります。`,
        author: { name: "鈴木 直樹", title: "ライフスタイル・デザイナー", initials: "鈴", color: "#27ae60" },
        readTime: 7,
        headerColor: "linear-gradient(to right, #43e97b, #38f9d7)"
    },
    {
        id: 4,
        tag: "ウェルネス",
        title: "『スリープテック』が解き明かす、究極の休息の科学",
        body: `2026年のウェルネス市場において、最も革新的な進化を遂げたのは「睡眠」です。単なる計測を超え、脳波誘導や環境の自動調整により、短時間で深い眠りを実現する技術が一般的になりました。
        
        しかし、技術以上に重要なのは「休息を投資と捉える」意識の変容です。パフォーマンス向上のために戦略的に眠る。この合理的なアプローチが、現代人のメンタルヘルスと創造性を根底から支えています。
        
        科学に基づいた休息術が、私たちのポテンシャルをどこまで引き出せるのか。最新の研究事例を紐解きます。`,
        author: { name: "小林 恵", title: "ウェルネス研究家", initials: "小", color: "#e84393" },
        readTime: 8,
        headerColor: "linear-gradient(to right, #f093fb, #f5576c)"
    }
];

const rollingColumnsStock = [
    {
        id: 5,
        tag: "サステナブル",
        title: "『循環型クローゼット』——捨てるから循環するアパレルへ",
        body: `ファッションの価値は「所有」から「循環」へと大きく舵を切りました。2026年の最先端は、AIが自分のワードローブを把握し、最適なタイミングで中古市場やアップサイクルへ誘導する仕組みです。
        
        新品を買うことが悪ではなく、それをいかに美しく使い切り、次へと繋ぐか。この意識がZ世代を中心に広がり、中古品のステータスが新品を凌駕する場面も増えています。
        
        クローゼットそのものが生きているように呼吸し、常に自分に最適な形で循環し続ける。そんな新しいお洒落の形を紹介します。`,
        author: { name: "中村 美咲", title: "サステナブル衣生活アドバイザー", initials: "中", color: "#16a085" },
        readTime: 6,
        headerColor: "linear-gradient(135deg, #a1c4fd, #c2e9fb)"
    },
    {
        id: 6,
        tag: "SNS文化",
        title: "『スロー・ソーシャル』——繋がりすぎをあえて断つ豊かさ",
        body: `常に誰かと繋がっている状態に、人々が疲れを感じ始めています。2026年のSNSトレンドは、あえて返信を求めない、あるいは限られた親しい人だけと静かに時間を共有する「スロー・ソーシャル」です。
        
        「いいね」の数に一喜一憂するのではなく、自分の感じたことを丁寧に記録し、残す。この日記のような活用法が、メンタルヘルスの安定に繋がると評価されています。
        
        デジタルな繋がりの中に、自分だけの静かな場所を確保する。そんな新しいメディアとの付き合い方を提案します。`,
        author: { name: "渡辺 裕太", title: "メディア文化論研究者", initials: "渡", color: "#f39c12" },
        readTime: 5,
        headerColor: "linear-gradient(to right, #ff9a9e, #fecfef)"
    }
];

// コラム描画
function renderColumns() {
    if (!columnGrid) return;
    columnGrid.innerHTML = '';

    // 日付に基づいてローテーション枠を選択（3日周期）
    const rotationPeriod = 3 * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const sequenceIndex = Math.floor(now / rotationPeriod);

    const stockSize = rollingColumnsStock.length;
    const startIndex = (sequenceIndex * 2) % stockSize;

    const pickedRollingColumns = [];
    if (stockSize > 0) {
        pickedRollingColumns.push(rollingColumnsStock[startIndex]);
        if (stockSize > 1) {
            pickedRollingColumns.push(rollingColumnsStock[(startIndex + 1) % stockSize]);
        }
    }

    // 固定 + 動的を結合
    const displayColumns = [...staticColumns, ...pickedRollingColumns];

    displayColumns.forEach(item => {
        const card = document.createElement('article');
        card.className = 'column-card';

        // 改行を処理
        const formattedBody = item.body.replace(/\n\s+/g, '<br>');

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

        // 展開・格納イベント
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
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        columnGrid.appendChild(card);
    });
}

const newsGrid = document.getElementById('news-grid');
const rankingGrid = document.getElementById('ranking-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const columnGrid = document.getElementById('column-grid');

// 他のDOM要素
const siteLogo = document.getElementById('site-logo');
const homeLink = document.getElementById('home-link');

// 状態管理
let currentCategory = 'all';
let currentSearchTerm = '';
let favoriteIds = JSON.parse(localStorage.getItem('life_trend_favorites') || '[]');
let showFavoritesOnly = false; // お気に入り表示フラグ
let showArchive = false; // アーカイブ表示フラグ

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    injectDailyArticle(); // デイリー記事を追加（最初に行う）
    renderNews();
    renderRanking();
    renderColumns();
    setupFilters();
    setupSearch();
    setupMobileMenu();
    setupHomeButton();
    setupArchive();
    setupFavoritesNav();
    checkDailyUpdate(); // 朝7時の更新チェック
}

// ホーム/ロゴボタンの設定
function setupHomeButton() {
    const resetView = (e) => {
        e.preventDefault();
        currentCategory = 'all';
        currentSearchTerm = '';
        showFavoritesOnly = false;
        showArchive = false;

        if (searchInput) searchInput.value = '';
        filterBtns.forEach(b => b.classList.remove('active'));
        const allFilter = document.querySelector('.filter-btn[data-category="all"]');
        if (allFilter) allFilter.classList.add('active');

        // ナビゲーションのactive状態をリセット
        if (homeLink) homeLink.classList.add('active');
        const navArchiveLink = document.getElementById('nav-archive');
        if (navArchiveLink) navArchiveLink.classList.remove('active');

        updateFavoritesUI(); // UI表示をリセット
        renderNews();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (siteLogo) siteLogo.addEventListener('click', resetView);
    if (homeLink) homeLink.addEventListener('click', resetView);
}

// ニュース描画
function renderNews() {
    newsGrid.innerHTML = '';

    // フィルタリング
    let filteredData = newsData.filter(item => {
        const matchesCategory = currentCategory === 'all' || item.category === currentCategory;
        const matchesSearch = item.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            item.summary.toLowerCase().includes(currentSearchTerm.toLowerCase());
        const matchesFavorites = !showFavoritesOnly || favoriteIds.includes(item.id);
        return matchesCategory && matchesSearch && matchesFavorites;
    });

    // 日付の降順（新しい順）でソート
    filteredData.sort((a, b) => b.date.localeCompare(a.date));

    // 新着とアーカイブを分ける (isArchiveDateは7日前かどうかで判定)
    const recentNews = filteredData.filter(item => !isArchiveDate(item.date));
    const archiveNews = filteredData.filter(item => isArchiveDate(item.date));

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
        // アーカイブ記事があり、かつ現在は表示していない場合にボタンを出す
        if (archiveNews.length > 0 && !showArchive) {
            archiveBtnAction.style.display = 'flex';
        } else {
            archiveBtnAction.style.display = 'none';
        }
    }

    // 検索結果がない場合の表示
    if (filteredData.length === 0) {
        newsGrid.innerHTML = '<p style="text-align:center; width:100%; color:#666; padding: 40px 0;">該当する記事が見見つかりませんでした。</p>';
    }
}

// カテゴリに応じた色を返す
function getCategoryColor(category) {
    switch (category) {
        case 'wellness': return '#27ae60';
        case 'work': return '#2c3e50';
        case 'living': return '#f39c12';
        case 'ladies': return '#e84393';
        case 'mens': return '#3498db';
        case 'kids': return '#f1c40f';
        case 'baby': return '#9b59b6';
        case 'sns': return '#e056fd';
        case 'shoes': return '#d35400';
        case 'cosme': return '#ff4d6d';
        case 'color': return '#ff6b81'; // ハートフェルト・ピンク
        case 'temperature': return '#1abc9c';
        default: return '#333';
    }
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

    localStorage.setItem('life_trend_favorites', JSON.stringify(favoriteIds));

    // 全ての該当カードのUI更新
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

    if (showFavoritesOnly) {
        renderNews();
    }
}

// ニュース記事へのスクロール
function scrollToArticle(articleId) {
    const article = newsData.find(item => item.id === articleId);
    if (!article) return;

    currentSearchTerm = '';
    currentCategory = 'all';
    showFavoritesOnly = false;

    // もし記事がアーカイブなら、アーカイブを広げる
    if (isArchiveDate(article.date)) {
        showArchive = true;
    }

    searchInput.value = '';
    filterBtns.forEach(b => b.classList.remove('active'));
    const allFilter = document.querySelector('.filter-btn[data-category="all"]');
    if (allFilter) allFilter.classList.add('active');

    renderNews();

    setTimeout(() => {
        const targetCard = newsGrid.querySelector(`.news-card[data-id="${articleId}"]`);
        if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.transition = 'background-color 0.5s';
            const originalBg = targetCard.style.backgroundColor;
            targetCard.style.backgroundColor = '#fff9c4';
            setTimeout(() => {
                targetCard.style.backgroundColor = originalBg;
            }, 1000);
        }
    }, 100);
}

// アーカイブの設定
function setupArchive() {
    const archiveBtn = document.getElementById('load-archive-btn');
    const navArchiveLink = document.getElementById('nav-archive');

    const expandArchive = () => {
        showArchive = true;
        renderNews();

        // 描画完了を待ってから、アーカイブ開始地点までスクロール
        setTimeout(() => {
            const divider = document.querySelector('.archive-divider');
            if (divider) {
                // CSSのscroll-margin-topと連携して、最適な位置に表示
                divider.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    };

    if (archiveBtn) {
        archiveBtn.addEventListener('click', expandArchive);
    }

    if (navArchiveLink) {
        navArchiveLink.addEventListener('click', (e) => {
            e.preventDefault();

            // フィルター状態を完全にリセットしてからアーカイブを表示
            currentCategory = 'all';
            currentSearchTerm = '';
            if (searchInput) searchInput.value = '';
            showFavoritesOnly = false;

            // UI表示のリセット
            filterBtns.forEach(b => b.classList.remove('active'));
            const allFilter = document.querySelector('.filter-btn[data-category="all"]');
            if (allFilter) allFilter.classList.add('active');

            // ナビゲーションのactive状態を更新
            if (homeLink) homeLink.classList.remove('active');
            updateFavoritesUI(); // お気に入り表示をリセット
            navArchiveLink.classList.add('active');

            expandArchive();
        });
    }
}

// アーカイブ判定 (7日以上前)
function isArchiveDate(dateStr) {
    // getRelativeDateから渡されるようなフォーマット "YYYY.MM.DD" を想定
    // ただしlife-trend-monitorの初期データはJS内部で生成されている
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const parts = dateStr.split('.');
    if (parts.length !== 3) return false;
    const itemDate = new Date(parts[0], parts[1] - 1, parts[2]);

    const diffTime = today - itemDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 7;
}

// トレンドスコアの計算
function calculateTrendScore(item) {
    const base = item.viewCount || 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const parts = item.date.split('.');
    const articleDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const ageDays = Math.max(0, Math.floor((today - articleDate) / (1000 * 60 * 60 * 24)));
    const recencyBoost = Math.max(1.0, 2.0 - ageDays * (1.0 / 7));

    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    const dateSeed = Number(`${y}${m}${d}`);

    const seed = (dateSeed * 31 + item.id * 1000003) % 2147483647;
    const lcg = ((seed * 1664525 + 1013904223) & 0xffffffff) >>> 0;
    const dailyFactor = 0.5 + (lcg / 0xffffffff);

    return base * recencyBoost * dailyFactor;
}

// ニュースカード作成
function createNewsCard(item, isRanking = false, rank = 0) {
    const card = document.createElement('div');
    card.setAttribute('data-id', item.id);

    const isFavorite = favoriteIds.includes(item.id);
    const favIconClass = isFavorite ? 'fa-solid' : 'fa-regular';
    const favActiveClass = isFavorite ? 'active' : '';

    if (isRanking) {
        card.className = 'ranking-card';
        card.style.cursor = 'pointer';
        card.onclick = () => scrollToArticle(item.id);

        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        const icon = rank === 1 ? '<i class="fa-solid fa-crown"></i>' : rank;
        const badgeHtml = `<div class="rank-badge ${rankClass}">${icon}</div>`;

        const sourceHtml = item.sourceUrl && item.sourceUrl !== '#'
            ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link" onclick="event.stopPropagation()"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${item.source}</a>`
            : `<i class="fa-solid fa-link"></i> ${item.source}`;

        card.innerHTML = `
            ${badgeHtml}
            <div class="ranking-card-content">
                <h3>${item.title}</h3>
                <div class="ranking-meta">
                    <span class="news-category" style="background-color: ${getCategoryColor(item.category)}; position: static; padding: 2px 8px; font-size: 0.7rem;">${item.categoryLabel}</span>
                    <span class="news-source">${sourceHtml}</span>
                </div>
            </div>
            <button class="favorite-btn ${favActiveClass}" data-id="${item.id}" onclick="toggleFavorite(${item.id}, event)">
                <i class="${favIconClass} fa-heart"></i>
            </button>
        `;
    } else {
        const sourceHtml = item.sourceUrl && item.sourceUrl !== '#'
            ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link" onclick="event.stopPropagation()"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${item.source}</a>`
            : `<i class="fa-solid fa-link"></i> ${item.source}`;

        card.className = 'news-card';
        card.innerHTML = `
            <div class="news-image" style="background: ${item.gradient}">
                <div class="img-content">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <span class="news-category" style="background-color: ${getCategoryColor(item.category)}">${item.categoryLabel}</span>
            </div>
            <div class="news-content">
                <div class="news-meta">
                    <span class="news-source">${sourceHtml}</span>
                    <span class="news-date">${item.date}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <button class="favorite-btn ${favActiveClass}" data-id="${item.id}" onclick="toggleFavorite(${item.id}, event)">
                    <i class="${favIconClass} fa-heart"></i>
                </button>
            </div>
        `;
    }

    return card;
}

// ランキング描写 (Top 3)
function renderRanking() {
    rankingGrid.innerHTML = '';

    // スコア計算とフィルタリング
    const rankingData = newsData
        .filter(item => item.viewCount && !isArchiveDate(item.date))
        .sort((a, b) => calculateTrendScore(b) - calculateTrendScore(a))
        .slice(0, 3);

    rankingData.forEach((item, index) => {
        const card = createNewsCard(item, true, index + 1);
        rankingGrid.appendChild(card);
    });
}



// フィルター設定
function setupFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-category');
            renderNews();
        });
    });
}

// 検索機能の設定
function setupSearch() {
    if (!searchInput) return;
    const handleSearch = () => {
        currentSearchTerm = searchInput.value.trim().toLowerCase();
        renderNews();
    };
    searchInput.addEventListener('input', handleSearch);
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
            renderNews();

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
            renderNews();
        });
    }

    // 親ボタン自体のクリック（トグル動作）
    favoritesBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // 従来のトグル動作（表示内容の切り替え）も継続
        showFavoritesOnly = !showFavoritesOnly;
        showArchive = false;
        updateFavoritesUI();
        renderNews();
        if (showFavoritesOnly) resetOtherFilters();
    });
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
            const icon = toggle.querySelector('i');
            if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
        });
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
    if (searchInput) searchInput.value = '';
    filterBtns.forEach(b => b.classList.remove('active'));
    const allFilter = document.querySelector('.filter-btn[data-category="all"]');
    if (allFilter) allFilter.classList.add('active');
}

// ========================================
// デイリー記事プール（ライフスタイル・トレンド）
// 毎日1件ずつローテーションで選択される
// ========================================
const dailyArticlePool = [
    {
        id: 3001,
        title: "睡眠を最適化する『AIスマートアイマスク』、脳波に合わせて音響調整",
        category: "wellness",
        categoryLabel: "ウェルネス",
        summary: "リアルタイムで脳波を測定し、深い眠りへ誘うホワイトノイズや高周波を自動調整。起床時には最もスッキリ目覚められるタイミングで光を放つ最新デバイス。",
        source: "Tech Health",
        sourceUrl: "#",
        icon: "fa-moon",
        gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        viewCount: 2800
    },
    {
        id: 3003,
        title: "自宅で収穫『全自動インドア菜園』、水耕栽培とAIが植物を管理",
        category: "living",
        categoryLabel: "リビング",
        summary: "室内に置くだけでハーブや野菜が育つ。水分や栄養、LED光量をAIが24時間管理。初心者でも失敗せず、常に新鮮な食材をキッチンに提供できる。",
        source: "Green Life",
        sourceUrl: "#",
        icon: "fa-seedling",
        gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        viewCount: 2200
    },
    {
        id: 3006,
        title: "『エコ・モジュラーキッチン』、廃棄ロスを減らす新しい調理空間の提案",
        category: "living",
        categoryLabel: "リビング",
        summary: "ライフスタイルの変化に合わせてパーツを組み替え可能。リサイクル素材を使用し、エネルギー消費を最小限に抑えるスマート家電が統合された次世代のキッチン。",
        source: "Interior Design",
        sourceUrl: "#",
        icon: "fa-utensils",
        gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
        viewCount: 1980
    },
    {
        id: 3009,
        title: "洗浄不要？『サステナブル・セルフクリーニングボトル』がエコ民に大ヒット",
        category: "living",
        categoryLabel: "リビング",
        summary: "内蔵されたUV-C LEDが数分おきに自動点滅し、水とボトル内を殺菌。常に清潔を保てるため、洗う手間を減らしつつペットボトルの消費を削減できる。",
        source: "Sustainable Goods",
        sourceUrl: "#",
        icon: "fa-bottle-water",
        gradient: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
        viewCount: 3800
    },
    {
        id: 3010,
        title: "パーソナライズ美容液『スキン・マエストロ』、自宅でAIが当日配合",
        category: "cosme",
        categoryLabel: "コスメ",
        summary: "その日の気温、湿度、肌のコンディションに合わせて有効成分の配合比をAIが決定。専用デバイスがその場で1回分の美容液を精製する、究極の個別最適化ケア。",
        source: "Cosme Tech Now",
        sourceUrl: "#",
        icon: "fa-droplet",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        viewCount: 3100
    },
    {
        id: 3011,
        title: "次世代UVケア『透明ヴェール・フィルム』、塗るのではなく「纏う」日焼け止め",
        category: "cosme",
        categoryLabel: "コスメ",
        summary: "超微細繊維を肌に吹き付け、目に見えない薄膜を形成。従来の塗るタイプと異なり、擦れに強く、石鹸で簡単にオフできる画期的なUV遮断技術が注目を集める。",
        source: "Skincare Journal",
        sourceUrl: "#",
        icon: "fa-shield-halved",
        gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
        viewCount: 2900
    },
    {
        id: 3012,
        title: "ヴィーガン・マスカラ『プラント・パワー』、植物由来成分100%でボリューム実現",
        category: "cosme",
        categoryLabel: "コスメ",
        summary: "石油系成分を一切排除し、お米のワックスと炭の成分だけで驚異のロング・ボリューム効果を実現。目元への優しさと環境配慮を両立した新世代マスカラ。",
        source: "Eco Beauty",
        sourceUrl: "#",
        icon: "fa-eye",
        gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        viewCount: 2450
    },
    {
        id: 3013,
        title: "『ナイトリペア・リップバーム』、ハチミツと発酵成分で翌朝の唇が劇変",
        category: "cosme",
        categoryLabel: "コスメ",
        summary: "寝ている間に集中的に角質層まで浸透。古くなった角質を優しく整え、翌朝には「縦じわが目立たない」プルプルな状態へ導く。SNSでの口コミから即完売が続く。",
        source: "Lip Trend",
        sourceUrl: "#",
        icon: "fa-face-kiss",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        viewCount: 4100
    },
    {
        id: 3101,
        title: "マルニの新作バッグ「パピエ」登場。折り紙から着想を得た造形美",
        category: "ladies",
        categoryLabel: "レディス",
        summary: "バイカラーやレオパード柄のスタイリッシュな新作トートバッグ。折り紙のような構造が、日常に芸術的な彩りを添える。",
        source: "Fashion Press",
        sourceUrl: "#",
        icon: "fa-shopping-bag",
        gradient: "linear-gradient(135deg, #485563 0%, #29323c 100%)",
        viewCount: 3100
    },
    {
        id: 3102,
        title: "Nike『Air Max』最新作、再生素材を使用した環境対応モデル",
        category: "shoes",
        categoryLabel: "シューズ",
        summary: "圧倒的なクッション性はそのままに、製造工程を見直し環境負荷を低減。機能性と持続可能性を両立させた次世代のアイコン。",
        source: "Nike News",
        sourceUrl: "#",
        icon: "fa-bolt",
        gradient: "linear-gradient(135deg, #f39c12 0%, #d35400 100%)",
        viewCount: 3500
    },
    {
        id: 3103,
        title: "生成AIによる「自分専用キャリアコーチ」が仕事の常識を変える",
        category: "work",
        categoryLabel: "ワークスタイル",
        summary: "個人のスキルと志向を学習し、最適なネクストアクションを提案するパーソナルAI。2026年は、AIに相談するビジネスパーソンが多数派に。",
        source: "Career Weekly",
        sourceUrl: "#",
        icon: "fa-user-tie",
        gradient: "linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)",
        viewCount: 2100
    },
    {
        id: 3104,
        title: "サステナブルな『おさがり』プラットフォーム、キッズ市場で急成長",
        category: "kids",
        categoryLabel: "キッズ",
        summary: "成長の早い子供服を、品質を維持したまま循環させる新サービス。親世代の環境意識の高まりを受け、リユースが当たり前の選択肢に。",
        source: "Family Tech",
        sourceUrl: "#",
        icon: "fa-child",
        gradient: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        viewCount: 1420
    },
    {
        id: 3105,
        title: "Instagramで話題の『淡色カフェ』、全国各地で集客記録を更新",
        category: "sns",
        categoryLabel: "SNS",
        summary: "ベージュや白を基調とした内装。写真映えだけでなく、その空間での「体験」を共有することがステータスとなるカルチャーの定着。",
        source: "Insta Vibes",
        sourceUrl: "#",
        icon: "fa-brands fa-instagram",
        gradient: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        viewCount: 4200
    },
    {
        id: 3106,
        title: "ユニクロ『次世代ライフウェア』、AI分析による究極のフィット感",
        category: "mens",
        categoryLabel: "メンズ",
        summary: "100万人の体型データから導き出した、誰にでも似合う黄金シルエット。ベーシックの枠を超えた「機能美」の到達点。",
        source: "Uniqlo Press",
        sourceUrl: "#",
        icon: "fa-shirt",
        gradient: "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
        viewCount: 3200
    },
    {
        id: 3107,
        title: "TikTok発『#今日のコーデ』、10億再生超えで街のファッションを変える",
        category: "sns",
        categoryLabel: "SNS",
        summary: "毎朝の着こなしを15秒動画でシェアするトレンドが爆発的拡散。ハイブランドとプチプラの組み合わせが評価される「民主化ファッション」の象徴となっている。",
        source: "TikTok Trends",
        sourceUrl: "#",
        icon: "fa-brands fa-tiktok",
        gradient: "linear-gradient(135deg, #010101 0%, #69c9d0 50%, #ee1d52 100%)",
        viewCount: 5100
    },
    {
        id: 3108,
        title: "X（旧Twitter）で急拡散『スキンケアルーティン』、専門家解説が100万RT",
        category: "sns",
        categoryLabel: "SNS",
        summary: "皮膚科医によるシンプルケア解説スレッドが爆発的に拡散。「引き算スキンケア」への支持が高まり、多機能コスメより単機能アイテムの売上を押し上げている。",
        source: "X Trend Watch",
        sourceUrl: "#",
        icon: "fa-brands fa-x-twitter",
        gradient: "linear-gradient(135deg, #141414 0%, #434343 100%)",
        viewCount: 4600
    },
    {
        id: 3109,
        title: "Pinterest急上昇『クワイエットラグジュアリー』、シンプル上質が検索1位に",
        category: "sns",
        categoryLabel: "SNS",
        summary: "ロゴ・装飾を排した上質素材コーデが国内外で急増。過剰なトレンド消費からの反動として「長く着られる一枚」への関心が高まり、購買行動にも変化が生まれている。",
        source: "Pinterest Japan",
        sourceUrl: "#",
        icon: "fa-brands fa-pinterest",
        gradient: "linear-gradient(135deg, #e60023 0%, #ad081b 100%)",
        viewCount: 3900
    },
    {
        id: 3110,
        title: "YouTubeで人気急上昇『プチプラ＆ハイブランドMIXコーデ』術",
        category: "sns",
        categoryLabel: "SNS",
        summary: "1万円以下アイテムとブランドバッグを組み合わせる「リアルクローゼット」動画が急増。視聴者の共感を呼び、紹介商品がその日のうちに売り切れる現象が続く。",
        source: "YouTube Fashion",
        sourceUrl: "#",
        icon: "fa-brands fa-youtube",
        gradient: "linear-gradient(135deg, #ff0000 0%, #ff6b6b 100%)",
        viewCount: 4300
    },
    {
        id: 3111,
        title: "2026春夏注目トレンド『ボタニカルプリント』、花柄が新世代へアップデート",
        category: "ladies",
        categoryLabel: "レディス",
        summary: "デジタル加工でリアルな質感を持つ植物柄が登場。淡いトーンのワンピースやシャツへの展開が相次ぎ、オフィス〜カジュアルまで幅広いシーンで採用されている。",
        source: "Vogue Japan",
        sourceUrl: "#",
        icon: "fa-leaf",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        viewCount: 3600
    },
    {
        id: 3112,
        title: "『バレエコアスタイル』がSNSから路上へ、リボン＆チュールが主役",
        category: "ladies",
        categoryLabel: "レディス",
        summary: "バレエシューズ、チュールスカート、リボンアクセサリーを取り入れたガーリーなスタイルが若年層を中心に急拡散。フェミニンの再解釈として各ブランドが続々展開。",
        source: "ELLE Japan",
        sourceUrl: "#",
        icon: "fa-star",
        gradient: "linear-gradient(135deg, #fbc2eb 0%, #f7a8d2 100%)",
        viewCount: 4000
    },
    {
        id: 3113,
        title: "大人女性に人気『ニュートラルベーシック』、色を引き算するコーデ術",
        category: "ladies",
        categoryLabel: "レディス",
        summary: "ベージュ・アイボリー・グレージュのワントーンコーデが30〜40代に支持拡大。アクセサリー1点だけで印象を変える「シンプル×上質」スタイルがSNSで共感を集める。",
        source: "Oggi Style",
        sourceUrl: "#",
        icon: "fa-circle-half-stroke",
        gradient: "linear-gradient(135deg, #e0e0e0 0%, #c9b99a 100%)",
        viewCount: 3300
    },
    {
        id: 3114,
        title: "メンズに広がる『スキンケアファースト』、グルーミング市場が過去最高を更新",
        category: "mens",
        categoryLabel: "メンズ",
        summary: "洗顔・美容液・日焼け止めを毎日のルーティンに取り入れる男性が急増。コンビニでも男性向けスキンケアコーナーが拡大し、セルフケアへの意識変化が数字に表れている。",
        source: "Men's Beauty",
        sourceUrl: "#",
        icon: "fa-spa",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        viewCount: 3700
    },
    {
        id: 3115,
        title: "『Y2Kメンズファッション』復活、低腰デニム＆ロゴTが20代を席巻",
        category: "mens",
        categoryLabel: "メンズ",
        summary: "2000年代初頭のストリートスタイルが現代解釈で再登場。ビンテージ感のあるロゴTシャツ、バギーシルエット、チェーンアクセサリーがZ世代男性の定番スタイルに。",
        source: "Street Snap",
        sourceUrl: "#",
        icon: "fa-denim",
        gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        viewCount: 3400
    },
];

// 1日あたりの追加記事数
const ITEMS_PER_DAY = 7;

// ========================================
// 指定した日付に対応するデイリー記事インデックス配列を取得
// 毎日指定された数（ITEMS_PER_DAY）の異なる記事を選択
// 2日間で重複しないように、日付をベースにしたローテーションを強化
// ========================================
function getDailyArticleIndicesForDate(dateStr) {
    const baseDate = new Date(2026, 0, 1);
    const parts = dateStr.split('.');
    const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
    targetDate.setHours(0, 0, 0, 0);

    const elapsedDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    const dayOffset = Math.abs(elapsedDays);
    
    const cosmeIndices = [];
    const snsIndices = [];
    const otherIndices = [];
    dailyArticlePool.forEach((article, index) => {
        if (article.category === 'cosme') {
            cosmeIndices.push(index);
        } else if (article.category === 'sns') {
            snsIndices.push(index);
        } else {
            otherIndices.push(index);
        }
    });

    const indices = [];

    // コスメ記事を必ず3つ選ぶ
    for (let i = 0; i < 3; i++) {
        if (cosmeIndices.length > 0) {
            indices.push(cosmeIndices[(dayOffset * 3 + i) % cosmeIndices.length]);
        }
    }

    // SNS記事を必ず1つ選ぶ
    if (snsIndices.length > 0) {
        indices.push(snsIndices[dayOffset % snsIndices.length]);
    }

    // 残りをその他の記事から選ぶ
    const remainingCount = ITEMS_PER_DAY - indices.length;
    for (let i = 0; i < remainingCount; i++) {
        if (otherIndices.length > 0) {
            indices.push(otherIndices[(dayOffset * remainingCount + i) % otherIndices.length]);
        }
    }

    return indices;
}

// ========================================
// ユニークIDを日付とインデックスから生成
// ========================================
function getDailyUniqueId(dateStr, indexOffset) {
    const baseDate = new Date(2026, 0, 1);
    const parts = dateStr.split('.');
    const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);
    targetDate.setHours(0, 0, 0, 0);
    const elapsedDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
    // IDの衝突を防ぐため係数は10を維持（1日最大7件）
    return 90000 + Math.abs(elapsedDays) * 10 + indexOffset;
}

// ========================================
// デイリー記事をnewsDataへ追加（蓄積型）
// 毎日最低10つのトレンドを収集するように変更
// localStorage に履歴配列を保存し最大30日分を維持する
// ========================================
function injectDailyArticle() {
    const STORAGE_KEY = 'life_trend_daily_history';
    const MAX_DAYS = 30;
    const todayStr = getRelativeDate(0);

    // ── 履歴の読み込み ──
    let history = [];
    try {
        history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch (e) {
        history = [];
    }

    // ── 今日のエントリが未追加なら追加 ──
    const todayEntries = history.filter(entry => entry.date === todayStr);
    if (todayEntries.length < ITEMS_PER_DAY) {
        // 足りない分を追加
        const indices = getDailyArticleIndicesForDate(todayStr);
        for (let i = todayEntries.length; i < ITEMS_PER_DAY; i++) {
            const poolIndex = indices[i];
            const uniqueId = getDailyUniqueId(todayStr, i);
            
            // 既に同じIDが存在しないかチェック
            if (!history.find(entry => entry.uniqueId === uniqueId)) {
                history.push({ date: todayStr, uniqueId, poolIndex });
            }
        }

        // 上限を超えた古い記事を削除（記事単位で管理。30日分）
        if (history.length > MAX_DAYS * ITEMS_PER_DAY) {
            history = history.slice(-(MAX_DAYS * ITEMS_PER_DAY));
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

// 朝7時の更新チェック
function checkDailyUpdate() {
    const now = new Date();
    const currentHour = now.getHours();
    const todayStr = getRelativeDate(0);

    // ローカルストレージで最後に更新通知を出した日を記録
    const lastUpdateDate = localStorage.getItem('life_trend_last_daily_update_notified');

    // 7時以降かつ、今日まだ通知を出していない場合
    if (currentHour >= 7 && lastUpdateDate !== todayStr) {
        showUpdateNotification();
        localStorage.setItem('life_trend_last_daily_update_notified', todayStr);
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

