// DMS 問題集 (自動生成) - 結果送信機能付き
const QUIZ_DATA = [
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q1",
    "text": "1台のサーバー上に複数の独立した実行環境を作る、軽量な仮想化技術の代表は？",
    "options": [
      "仮想マシン（VM）",
      "コンテナ（Docker等）",
      "エミュレータ",
      "シミュレータ"
    ],
    "answerIndex": 1,
    "explanation": "OS全体を再現する仮想マシンより起動が高速で、クラウド時代のアプリ配備の標準手法になっています。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q2",
    "text": "不正な通信を遮断し、社内ネットワークを守る「防火壁」の役割を担う仕組みは？",
    "options": [
      "ファイアウォール",
      "ルーター",
      "スイッチ",
      "ハブ"
    ],
    "answerIndex": 0,
    "explanation": "内部と外部の境界で通信を監視・制御し、不正アクセスや不審なデータ送受信を防ぐ基本的な防御装置です。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q3",
    "text": "IDとパスワードに加え、SMSや認証アプリのコードでも本人確認する追加認証の総称は？",
    "options": [
      "シングルサインオン（SSO）",
      "二要素認証（多要素認証）",
      "ゼロトラスト（常時検証型防御）",
      "パスキー（FIDO準拠）"
    ],
    "answerIndex": 1,
    "explanation": "「知っているもの（パスワード）」と「持っているもの（スマホ）」を組み合わせ、パスワードが漏れても突破されにくくします。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q4",
    "text": "AWSやAzureが提供する「サーバーやストレージなどインフラ自体」を借りるクラウド形態は？",
    "options": [
      "SaaS（ソフトウェア・アズ・ア・サービス）",
      "PaaS（プラットフォーム・アズ・ア・サービス）",
      "IaaS（インフラ・アズ・ア・サービス）",
      "BaaS（バックエンド・アズ・ア・サービス）"
    ],
    "answerIndex": 2,
    "explanation": "OSやミドルウェアは利用者側で構築する、最も自由度の高いクラウド形態。サーバー機器の購入・維持費を削減できます。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q5",
    "text": "データ消失や障害に備え、別の場所に複製を保管しておく作業は？",
    "options": [
      "アーカイブ",
      "リストア",
      "レプリケーション",
      "バックアップ"
    ],
    "answerIndex": 3,
    "explanation": "ランサムウェア被害や機器故障時にデータを復旧できる「最後の砦」。世代管理と保管場所の分散がポイントです。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q6",
    "text": "大量のサーバーや通信機器をまとめて運用するための、電源・空調・防犯が整った専用施設は？",
    "options": [
      "データセンター",
      "オフィスビル",
      "オンプレミス",
      "クラウドストレージ"
    ],
    "answerIndex": 0,
    "explanation": "24時間体制で安定運用される企業システムやクラウドの基盤。地震・停電に強い設備が求められます。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q7",
    "text": "家電・センサー・自動車など、あらゆる「モノ」をインターネットに接続する技術の総称は？",
    "options": [
      "AI（人工知能）",
      "RPA（業務自動化ロボット）",
      "IoT（モノのインターネット）",
      "AR（拡張現実）"
    ],
    "answerIndex": 2,
    "explanation": "スマート家電やコネクテッドカーなど、現実世界のデータをネット経由で収集・制御する基盤技術です。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q8",
    "text": "4Gの次世代にあたる「超高速・低遅延・多数同時接続」が特徴のモバイル通信規格は？",
    "options": [
      "3G",
      "LTE",
      "Wi-Fi6",
      "5G"
    ],
    "answerIndex": 3,
    "explanation": "自動運転や遠隔医療など、リアルタイム性が必須の新サービスを支える通信規格です。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q9",
    "text": "アプリやサービスの機能を、他システムから呼び出して利用するための「窓口」となる仕組みは？",
    "options": [
      "GUI",
      "SDK",
      "CLI",
      "API"
    ],
    "answerIndex": 3,
    "explanation": "「LINEログイン」や「Google Maps連携」などはAPIを通じて実現。サービス間連携の基本技術です。"
  },
  {
    "chapter": "第6章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q10",
    "text": "データをクラウドに集約せず、現場の機器やその近くで処理することで通信遅延を減らす方式は？",
    "options": [
      "クラウドコンピューティング（集中処理）",
      "エッジコンピューティング（端末側処理）",
      "グリッドコンピューティング（分散計算）",
      "メインフレーム（汎用大型機）"
    ],
    "answerIndex": 1,
    "explanation": "IoT機器や監視カメラなど、リアルタイム性が求められる場面で、データ発生源の近くで処理することで遅延と通信量を抑えます。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q11",
    "text": "「お問い合わせはこちら」「資料請求」など、ユーザーに行動を促す目立つボタンの総称は？",
    "options": [
      "アイコン（記号画像）",
      "バナー（画像広告）",
      "CTA（コール・トゥ・アクション）",
      "リンク（テキスト誘導）"
    ],
    "answerIndex": 2,
    "explanation": "配置・色・文言で成果が大きく変わるため、Webマーケで最重要視されるパーツです。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q12",
    "text": "Webサイトを開いた瞬間、スクロールなしで最初に画面に表示される領域は？",
    "options": [
      "ファーストビュー",
      "フッター",
      "サイドバー",
      "ヒーローセクション"
    ],
    "answerIndex": 0,
    "explanation": "ここで興味を持たれないと直帰率が上がるため、訴求の中心となるデザイン領域です。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q13",
    "text": "「TOP > 商品一覧 > 詳細」のように、サイト内の現在位置を階層で示すナビゲーションは？",
    "options": [
      "グローバルナビ",
      "アンカーリンク",
      "サイトマップ",
      "パンくずリスト"
    ],
    "answerIndex": 3,
    "explanation": "童話「ヘンゼルとグレーテル」が由来。現在地把握とSEO効果の両方に役立ちます。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q14",
    "text": "スマホ表示で右上などにある「三本線アイコン」を押すと開閉するメニューは？",
    "options": [
      "ドロワー",
      "タブメニュー",
      "ハンバーガーメニュー",
      "アコーディオン"
    ],
    "answerIndex": 2,
    "explanation": "アイコン形状がハンバーガーに似ているのが由来。限られたスマホ画面を有効活用できます。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q15",
    "text": "世界中のWebサイトの4割以上で使われている、最も普及しているCMSは？",
    "options": [
      "WordPress",
      "Wix",
      "Shopify",
      "Movable Type"
    ],
    "answerIndex": 0,
    "explanation": "オープンソースで無料、プラグインで機能拡張も自由。ブログから企業サイトまで幅広く採用されています。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q16",
    "text": "ブラウザのタブやブックマーク欄に表示される、Webサイトを象徴する小さなアイコンは？",
    "options": [
      "ロゴ（ブランド象徴マーク）",
      "アバター（プロフィール画像）",
      "サムネイル（縮小プレビュー画像）",
      "ファビコン（favicon）"
    ],
    "answerIndex": 3,
    "explanation": "ブランド認知やタブ識別性を高めるWebサイトの「顔」。短辺16〜32pxの小さな画像です。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q17",
    "text": "ページ上でユーザーがよく見ている・クリックしている箇所を、色の濃淡で可視化するツールは？",
    "options": [
      "アクセス解析",
      "ヒートマップ",
      "ファネル分析",
      "A/Bテスト"
    ],
    "answerIndex": 1,
    "explanation": "「どこまで読まれているか」「どこがクリックされやすいか」を視覚的に把握し、改善に活かせます。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q18",
    "text": "高齢者や障害のある人を含め、誰もが使いやすいWebを目指す考え方は？",
    "options": [
      "ユーザビリティ",
      "アクセシビリティ",
      "インクルーシブデザイン",
      "ユニバーサルデザイン"
    ],
    "answerIndex": 1,
    "explanation": "文字サイズ変更、音声読み上げ対応、色覚配慮など、多様なユーザーへの配慮を指します。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q19",
    "text": "Webページに動きやインタラクションを加える、ブラウザで動作する代表的なプログラミング言語は？",
    "options": [
      "HTML",
      "CSS",
      "JavaScript",
      "Python"
    ],
    "answerIndex": 2,
    "explanation": "ボタン押下時の動作、フォーム検証、アニメーションなど、現代のWeb体験に欠かせない言語です。"
  },
  {
    "chapter": "第7章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q20",
    "text": "マーケティング戦略で、典型的なターゲット顧客を架空の人物像として描いたものは？",
    "options": [
      "ペルソナ",
      "ターゲット",
      "カスタマージャーニー",
      "セグメント"
    ],
    "answerIndex": 0,
    "explanation": "名前・年齢・職業・趣味まで設定することで、施策の判断軸がブレなくなります。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q21",
    "text": "広告が1000回表示されるごとに料金が発生する課金方式は？",
    "options": [
      "CPC（クリック課金）",
      "CPV（動画視聴課金）",
      "CPA（成果獲得課金）",
      "CPM（インプレッション課金）"
    ],
    "answerIndex": 3,
    "explanation": "「Cost Per Mille（Mille=1000）」の略。認知拡大目的のディスプレイ広告でよく使われます。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q22",
    "text": "投資した費用に対し、どれだけの「利益」を得られたかを示す経営指標は？",
    "options": [
      "ROAS（広告費用対効果）",
      "CPA（顧客獲得単価）",
      "ROI（投資利益率）",
      "LTV（顧客生涯価値）"
    ],
    "answerIndex": 2,
    "explanation": "ROASが「売上」基準なのに対し、ROIは「利益」基準。広告以外の投資判断にも使われます。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q23",
    "text": "1人の顧客が取引期間中にもたらす総利益を示す、サブスクで特に重視される指標は？",
    "options": [
      "ARPU（ユーザー平均単価）",
      "LTV（顧客生涯価値）",
      "CAC（顧客獲得コスト）",
      "NPS（顧客推奨度）"
    ],
    "answerIndex": 1,
    "explanation": "「Life Time Value」の略。継続率と単価が高いほど大きくなり、許容できる顧客獲得コストの目安になります。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q24",
    "text": "一定期間にサイトを訪問した「重複を除いた人数」を示す指標は？",
    "options": [
      "PV（ページビュー）",
      "セッション（訪問単位）",
      "UU（ユニークユーザー）",
      "ヒット数（リクエスト件数）"
    ],
    "answerIndex": 2,
    "explanation": "同じ人が3回訪問してもUUは1。実際にサイトに来た「人数」を把握できます。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q25",
    "text": "広告が「何人にユニークに届いたか」を示す指標は？",
    "options": [
      "リーチ",
      "フリークエンシー",
      "インプレッション",
      "クリック数"
    ],
    "answerIndex": 0,
    "explanation": "インプレッションが延べ表示回数なのに対し、リーチは重複を除いた到達人数を表します。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q26",
    "text": "「注意→興味→検索→行動→共有」というSNS時代の購買行動モデルは？",
    "options": [
      "AIDMA",
      "SIPS",
      "DECAX",
      "AISAS"
    ],
    "answerIndex": 3,
    "explanation": "Search（検索）と Share（共有）が組み込まれた、デジタル時代を象徴する行動モデルです。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q27",
    "text": "「30代女性で東京在住」のように、属性・地域・興味で配信対象を絞る広告手法は？",
    "options": [
      "ターゲティング",
      "リターゲティング",
      "ブランディング",
      "パーソナライズ"
    ],
    "answerIndex": 0,
    "explanation": "無駄打ちを減らして広告費用対効果を高める、デジタル広告の基本機能です。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q28",
    "text": "Googleが提供する、サイト訪問者の行動を計測・分析できる無料のアクセス解析ツールは？",
    "options": [
      "Search Console（検索流入分析）",
      "Google Analytics（GA4）",
      "Tag Manager（タグ統合管理）",
      "Looker Studio（BIダッシュボード）"
    ],
    "answerIndex": 1,
    "explanation": "現在の主力バージョンはGA4。イベントベースでユーザー行動を追跡できます。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q29",
    "text": "SNSで影響力を持つ人物に商品紹介を依頼するマーケティング手法は？",
    "options": [
      "アフィリエイト",
      "リファラルマーケティング",
      "バズマーケティング",
      "インフルエンサーマーケティング"
    ],
    "answerIndex": 3,
    "explanation": "ファンとの信頼関係を活用できる反面、ステマ規制（広告である旨の明示）に注意が必要です。"
  },
  {
    "chapter": "第8章：広告・分析編（数字を読み解く）",
    "id": "Q30",
    "text": "広告経由で訪問したユーザーのうち、コンバージョンに至った人の割合は？",
    "options": [
      "CTR（クリック率）",
      "CVR（コンバージョン率）",
      "CPA（顧客獲得単価）",
      "CPC（クリック単価）"
    ],
    "answerIndex": 1,
    "explanation": "「クリック後にどれだけ成果につながったか」を示し、LP改善やオファー改善で伸ばすべき指標です。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q31",
    "text": "銀行や有名サービスを装ったメールでパスワード等を盗もうとする詐欺の手口は？",
    "options": [
      "スパム",
      "なりすまし",
      "フィッシング詐欺",
      "ソーシャルエンジニアリング"
    ],
    "answerIndex": 2,
    "explanation": "偽サイトに誘導してID/パスワードを入力させる古典的かつ最も被害の多い攻撃。URLとドメインの確認が必須です。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q32",
    "text": "ファイルを暗号化して使用不能にし、復号と引き換えに金銭を要求するマルウェアは？",
    "options": [
      "スパイウェア",
      "ワーム",
      "ランサムウェア",
      "アドウェア"
    ],
    "answerIndex": 2,
    "explanation": "「Ransom（身代金）」が語源。企業の事業停止に追い込む深刻な被害が世界中で発生しています。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q33",
    "text": "推測されにくく、十分な長さがあって覚えやすい「文章のような」パスワードを何と呼ぶか？",
    "options": [
      "ワンタイムパスワード",
      "デフォルトパスワード",
      "パスフレーズ",
      "PINコード"
    ],
    "answerIndex": 2,
    "explanation": "「桜咲く春の朝10時」のような長い文章は、複雑な短い文字列より破られにくく覚えやすいのが特徴です。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q34",
    "text": "災害やシステム障害などの非常事態でも、事業を継続・早期復旧させるための計画は？",
    "options": [
      "BCP（事業継続計画）",
      "BPR（業務プロセス再設計）",
      "CSR（企業の社会的責任）",
      "SLA（サービス品質保証）"
    ],
    "answerIndex": 0,
    "explanation": "地震・パンデミック・サイバー攻撃など想定外の事態に備え、重要業務の継続方法と復旧手順をあらかじめ定めておく取り組みです。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q35",
    "text": "情報漏えいやシステム障害など、業務に影響を及ぼす出来事の総称は？",
    "options": [
      "インシデント",
      "アクシデント",
      "リスク",
      "クライシス"
    ],
    "answerIndex": 0,
    "explanation": "発生時には初動対応・記録・原因究明・再発防止までを「インシデント対応」として整理します。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q36",
    "text": "勘や経験ではなく、収集したデータの分析結果に基づいて意思決定する経営手法は？",
    "options": [
      "データドリブン経営",
      "KPI経営",
      "アジャイル経営",
      "リーン経営"
    ],
    "answerIndex": 0,
    "explanation": "BIツールやダッシュボードを活用し、客観的根拠に基づく判断を組織文化として定着させます。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q37",
    "text": "プロジェクトや事業に関わる「利害関係者（社員・顧客・取引先・株主など）」の総称は？",
    "options": [
      "ターゲット",
      "クライアント",
      "パートナー",
      "ステークホルダー"
    ],
    "answerIndex": 3,
    "explanation": "直訳は「杭を打つ人」。意思決定時には関係者の利害を漏れなく考慮することが重要です。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q38",
    "text": "法令や社内ルール、社会規範を守って企業活動を行うことを指す言葉は？",
    "options": [
      "ガバナンス",
      "コンプライアンス",
      "リスクマネジメント",
      "CSR"
    ],
    "answerIndex": 1,
    "explanation": "法令違反だけでなく、ハラスメントや個人情報の取り扱いなど企業倫理全般を含む概念です。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q39",
    "text": "自社の業務やパフォーマンスを、業界の優良企業や標準値と比較する分析手法は？",
    "options": [
      "ブレインストーミング",
      "デューデリジェンス",
      "プロトタイピング",
      "ベンチマーク"
    ],
    "answerIndex": 3,
    "explanation": "ギャップを把握し改善目標を設定する、戦略立案の基本的な手法です。"
  },
  {
    "chapter": "第9章：ビジネススキル・セキュリティ編",
    "id": "Q40",
    "text": "企業活動における「最終的に達成すべきゴール」を数値で示す指標は？",
    "options": [
      "KPI（重要業績評価指標）",
      "KGI（重要目標達成指標）",
      "OKR（目標と主要成果）",
      "ROI（投資利益率）"
    ],
    "answerIndex": 1,
    "explanation": "KPIが中間目標なのに対し、KGIは「売上◯億円」「市場シェア◯%」といった最終ゴールを表します。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q41",
    "text": "Googleが開発した、検索・Gmail・Docs等とも連携が深いマルチモーダル生成AIは？",
    "options": [
      "Gemini（ジェミニ）",
      "Bard（バード）",
      "PaLM（パーム）",
      "LaMDA（ラムダ）"
    ],
    "answerIndex": 0,
    "explanation": "旧Bardの後継。テキスト・画像・音声・動画を扱える統合AIとして提供されています。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q42",
    "text": "Anthropic社が提供する、長文読解と安全性を重視した生成AIサービスは？",
    "options": [
      "ChatGPT（チャットGPT）",
      "Copilot（コパイロット）",
      "Claude（クロード）",
      "Llama（ラマ）"
    ],
    "answerIndex": 2,
    "explanation": "長いコンテキスト処理に強く、業務文書の要約や厳密な指示への忠実な対応で評価されています。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q43",
    "text": "「夕暮れの東京、サイバーパンク風」など文章から画像を生成するAIの代表例は？",
    "options": [
      "Whisper（音声認識AI）",
      "AlphaFold（タンパク質予測AI）",
      "NotebookLM（資料分析AI）",
      "Midjourney（ミッドジャーニー）"
    ],
    "answerIndex": 3,
    "explanation": "テキストから高品質な画像を生成する代表サービス。DALL-EやStable Diffusionも同分野のAIです。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q44",
    "text": "テキスト・画像・音声・動画など複数の形式を同時に扱えるAIの特徴を何と呼ぶか？",
    "options": [
      "シングルモーダル",
      "ハイブリッドAI",
      "クロスドメイン",
      "マルチモーダル"
    ],
    "answerIndex": 3,
    "explanation": "写真を見せて質問する、グラフを読み取らせるなど、人間に近い柔軟な処理が可能になります。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q45",
    "text": "社内文書など独自データを参照させて、AIに最新かつ正確な回答をさせる仕組みは？",
    "options": [
      "ファインチューニング（追加学習）",
      "RAG（検索拡張生成）",
      "ゼロショット学習（事例なし推論）",
      "プロンプトキャッシュ（指示文の再利用）"
    ],
    "answerIndex": 1,
    "explanation": "「Retrieval-Augmented Generation」の略。社内ナレッジ活用やハルシネーション抑制に有効です。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q46",
    "text": "AIが文章を処理する単位で、課金や入力上限の基準になる「単語のかたまり」を何と呼ぶか？",
    "options": [
      "ピクセル",
      "パケット",
      "トークン",
      "ビット"
    ],
    "answerIndex": 2,
    "explanation": "英語1単語≒1トークン、日本語1文字≒1〜2トークンが目安。APIの料金や入出力上限の単位です。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q47",
    "text": "AIから狙った回答を引き出すために、指示文の書き方を工夫する技術全般を何と呼ぶか？",
    "options": [
      "プロンプトリーク",
      "プロンプトインジェクション",
      "ファインチューニング",
      "プロンプトエンジニアリング"
    ],
    "answerIndex": 3,
    "explanation": "役割付与、手順分解、例示などのテクニックを駆使し、AIの出力品質を高める実務スキルです。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q48",
    "text": "生成AIの活用で「著作権」上、最も注意すべき行為はどれか？",
    "options": [
      "自分用のメモを要約させる",
      "他人の著作物を無断で学習・生成させて公開する",
      "自社の社内文書をAIで要約する",
      "公開されたデータの傾向を分析する"
    ],
    "answerIndex": 1,
    "explanation": "既存著作物に「依拠」し「類似」した生成物の公開は、著作権侵害となる可能性があります。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q49",
    "text": "WordやExcelに統合され、文書作成や表計算をAIで支援するMicrosoftのサービスは？",
    "options": [
      "Bing Chat",
      "Microsoft Copilot",
      "Office Assistant",
      "Cortana"
    ],
    "answerIndex": 1,
    "explanation": "Word・Excel・PowerPoint・Outlook・Teams等で動作し、業務文書の自動生成・要約に活用されます。"
  },
  {
    "chapter": "第10章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q50",
    "text": "目的を伝えると、AI自身が手順を計画し複数ツールを使って自律的にタスクを実行する仕組みは？",
    "options": [
      "AIエージェント",
      "プロンプトチェーン",
      "AIアシスタント",
      "ボット"
    ],
    "answerIndex": 0,
    "explanation": "「予約を取る」「情報を集めて資料化する」など、複数ステップの業務を自走させる次世代AI活用形態です。"
  }
];
const QUIZ_VERSION = "v2";
const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbykucLUQOhYV_Nhfah2BNbG1xMUMintYRXNB-GdNBxrMWgz8basCI7i7vzzQOkW86Ll/exec";

let currentQuestionIndex = 0;
let failCount = 0;
let correctCount = 0;
const chapterStats = {};
let userInfo = { name: '', department: '' };
let questionLog = [];
let startedAt = null;
let questionStartedAt = null;
let currentQAttempts = [];

document.addEventListener('DOMContentLoaded', () => {
    // 章ごとの初期化
    QUIZ_DATA.forEach(q => {
        if (!chapterStats[q.chapter]) {
            chapterStats[q.chapter] = { total: 0, correct: 0 };
        }
        chapterStats[q.chapter].total++;
    });

    // localStorage から名前・部署を読む。無ければ top.html にリダイレクト
    const saved = JSON.parse(localStorage.getItem('dms_quiz_user') || '{}');
    if (!saved.name || !saved.department) {
        window.location.href = 'top.html';
        return;
    }

    userInfo.name = saved.name;
    userInfo.department = saved.department;
    startedAt = new Date();
    renderQuestion(0);
});

// ========== クイズ進行 ==========
function renderQuestion(index) {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    if (index >= QUIZ_DATA.length) {
        showResult();
        return;
    }

    const q = QUIZ_DATA[index];
    failCount = 0;
    currentQAttempts = [];
    questionStartedAt = new Date();

    const card = document.createElement('div');
    card.className = 'quiz-card fade-in';

    const header = document.createElement('div');
    header.className = 'quiz-header';
    header.innerHTML = `<span class="chapter-badge">${escapeHtml(q.chapter)}</span>
                        <h2>${escapeHtml(q.id)}. ${escapeHtml(q.text)}</h2>`;
    card.appendChild(header);

    const optionsList = document.createElement('div');
    optionsList.className = 'options-list';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-number">${idx + 1}</span> ${escapeHtml(opt)}`;
        btn.onclick = () => handleAnswer(idx, q.answerIndex, btn);
        optionsList.appendChild(btn);
    });
    card.appendChild(optionsList);

    const feedback = document.createElement('div');
    feedback.id = 'feedback-area';
    feedback.className = 'feedback';
    card.appendChild(feedback);

    container.appendChild(card);
    updateProgress(index + 1, QUIZ_DATA.length);
}

function handleAnswer(selectedIndex, correctIndex, btnElement) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    const q = QUIZ_DATA[currentQuestionIndex];
    currentQAttempts.push(selectedIndex);

    if (selectedIndex === correctIndex) {
        // 採点: 1回目正解=1点、2回目正解=0.5点
        if (failCount === 0) {
            correctCount += 1;
            chapterStats[q.chapter].correct += 1;
        } else if (failCount === 1) {
            correctCount += 0.5;
            chapterStats[q.chapter].correct += 0.5;
        }
        showOverlay('circle');
        btnElement.classList.add('correct-answer');
        recordQuestionLog(correctIndex, true);
        setTimeout(() => showExplanation(true, correctIndex, q.explanation, failCount), 800);
    } else {
        failCount++;
        btnElement.classList.add('wrong-answer');

        if (failCount < 2) {
            showOverlay('cross');
            const feedback = document.getElementById('feedback-area');
            const remaining = 2 - failCount;
            feedback.innerHTML = `<span class="incorrect-text">不正解！ 残り${remaining}回挑戦できます。</span>`;
            setTimeout(() => {
                buttons.forEach(btn => {
                    if (!btn.classList.contains('wrong-answer')) {
                        btn.disabled = false;
                    }
                });
            }, 1000);
        } else {
            showOverlay('cross');
            buttons[correctIndex].classList.add('correct-answer');
            recordQuestionLog(correctIndex, false);
            setTimeout(() => showExplanation(false, correctIndex, q.explanation, 2), 800);
        }
    }
}

function recordQuestionLog(correctIndex, ultimatelyCorrect) {
    const q = QUIZ_DATA[currentQuestionIndex];
    const now = new Date();
    const timeSpent = questionStartedAt ? Math.round((now - questionStartedAt) / 1000) : 0;
    const firstTry = currentQAttempts[0] === correctIndex;
    let scorePoints = 0;
    if (firstTry) scorePoints = 1;
    else if (ultimatelyCorrect) scorePoints = 0.5;
    questionLog.push({
        qid: q.id,
        chapter: q.chapter,
        selectedFirst: currentQAttempts[0],
        selectedFinal: currentQAttempts[currentQAttempts.length - 1],
        correctIndex: correctIndex,
        fails: currentQAttempts.filter(a => a !== correctIndex).length,
        firstTryCorrect: firstTry,
        ultimatelyCorrect: ultimatelyCorrect,
        scorePoints: scorePoints,
        timeSpentSec: timeSpent
    });
}

function showExplanation(isCorrect, correctIndex, explanation, attemptCount) {
    const feedback = document.getElementById('feedback-area');
    let resultLabel;
    if (isCorrect && attemptCount === 0) {
        resultLabel = '<span class="correct-text">正解！（+1点）</span>';
    } else if (isCorrect && attemptCount === 1) {
        resultLabel = '<span class="correct-text">2回目で正解！（+0.5点）</span>';
    } else {
        resultLabel = `<span class="incorrect-text">不正解。正解は ${correctIndex + 1} です。（+0点）</span>`;
    }

    const explanationHtml = explanation
        ? `<div class="explanation-box">
              <span class="explanation-title">解説</span>
              <p class="explanation-text">${escapeHtml(explanation)}</p>
           </div>`
        : '';

    feedback.innerHTML = `
        <div class="result-label">${resultLabel}</div>
        ${explanationHtml}
        <button class="next-btn" onclick="goToNext()">次の問題へ →</button>
    `;
}

function goToNext() {
    currentQuestionIndex++;
    renderQuestion(currentQuestionIndex);
}

// ========== オーバーレイ・進捗 ==========
function showOverlay(type) {
    const overlay = document.getElementById('overlay');
    const circle = document.getElementById('circle-mark');
    const cross = document.getElementById('cross-mark');
    overlay.style.display = 'flex';
    circle.style.display = 'none';
    cross.style.display = 'none';
    if (type === 'circle') circle.style.display = 'block';
    else cross.style.display = 'block';
    overlay.classList.add('show-anim');
    setTimeout(() => {
        overlay.classList.remove('show-anim');
        overlay.style.display = 'none';
    }, 800);
}

function updateProgress(current, total) {
    const progressEl = document.getElementById('progress-text');
    const barEl = document.getElementById('progress-bar-fill');
    if (progressEl) progressEl.textContent = `第 ${current} 問 / 全 ${total} 問`;
    if (barEl) barEl.style.width = `${(current / total) * 100}%`;
}

// ========== 結果画面 ==========
function showResult() {
    const container = document.getElementById('quiz-container');
    const total = QUIZ_DATA.length;
    const percentage = Math.round((correctCount / total) * 100);

    const pieChartHtml = `
        <div style="display: flex; justify-content: center; margin: 1.5rem 0;">
            <div style="
                width: 140px; height: 140px; border-radius: 50%;
                background: conic-gradient(var(--correct-color) ${percentage}%, var(--border-color) 0);
                display: flex; align-items: center; justify-content: center;">
                <div style="width: 110px; height: 110px; background: var(--surface-color); border-radius: 50%;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <span style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: -0.2rem;">正解率</span>
                    <span style="font-size: 1.8rem; font-weight: 800; color: var(--text-main); line-height: 1;">${percentage}<span style="font-size: 1rem;">%</span></span>
                </div>
            </div>
        </div>`;

    let chapterHtml = '<div class="chapter-results" style="margin: 2rem 0; text-align: left;">';
    for (const [chapter, stats] of Object.entries(chapterStats)) {
        const chapPercent = Math.round((stats.correct / stats.total) * 100) || 0;
        chapterHtml += `
            <div style="margin-bottom: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
                <div>
                    <div style="font-weight: bold; margin-bottom: 0.25rem; font-size: 1.1rem; color: var(--text-main);">${escapeHtml(chapter)}</div>
                    <div style="color: var(--text-muted); font-size: 0.95rem;">
                        <span>正解数: <strong style="color: var(--text-main);">${stats.correct}</strong> / ${stats.total} 問</span>
                    </div>
                </div>
                <div style="width: 50px; height: 50px; border-radius: 50%;
                    background: conic-gradient(var(--correct-color) ${chapPercent}%, var(--border-color) 0);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: 1rem;">
                    <div style="width: 40px; height: 40px; background: var(--surface-color); border-radius: 50%;
                        display: flex; align-items: center; justify-content: center;
                        font-size: 0.8rem; font-weight: bold; color: var(--text-main);">
                        ${chapPercent}%
                    </div>
                </div>
            </div>`;
    }
    chapterHtml += '</div>';

    let message = '';
    if (percentage >= 90) message = '素晴らしい！ITの基礎知識はバッチリです！';
    else if (percentage >= 70) message = 'よくできました！あと少しで完璧です！';
    else if (percentage >= 50) message = '半分以上正解！復習してさらに伸ばしましょう！';
    else message = 'まだまだ伸びしろがあります！もう一度挑戦してみよう！';

    container.innerHTML = `
        <div class="result-card fade-in">
            <h2>お疲れ様でした！</h2>
            <div class="user-info-display">${escapeHtml(userInfo.name)} さん（${escapeHtml(userInfo.department)}）</div>
            <div class="score-display">
                <span class="score-number">${correctCount}</span>
                <span class="score-label"> / ${total} 問正解</span>
            </div>
            ${pieChartHtml}
            <p>${message}</p>
            ${chapterHtml}
            <div id="send-status" class="send-status">📤 結果を送信中...</div>
            <div id="csv-fallback-area"></div>
            <button onclick="restartQuiz()" class="restart-btn">トップへ戻る（別バージョンにもチャレンジできます）</button>
        </div>`;

    const progressContainer = document.querySelector('.progress-container');
    if (progressContainer) progressContainer.style.display = 'none';

    // 自動送信
    sendResult();
}

function restartQuiz() {
    // トップページに戻る（名前・部署はlocalStorageに残っているので再入力不要）
    window.location.href = 'top.html';
}

// ========== 送信処理 ==========
function buildPayload() {
    const finishedAt = new Date();
    return {
        version: QUIZ_VERSION,
        name: userInfo.name,
        department: userInfo.department,
        startedAt: startedAt ? startedAt.toISOString() : '',
        finishedAt: finishedAt.toISOString(),
        durationSec: startedAt ? Math.round((finishedAt - startedAt) / 1000) : 0,
        totalScore: correctCount,
        totalQuestions: QUIZ_DATA.length,
        chapterScores: Object.entries(chapterStats).map(([c, s]) => ({
            chapter: c, correct: s.correct, total: s.total
        })),
        questionLog: questionLog
    };
}

async function sendResult() {
    const statusEl = document.getElementById('send-status');
    const fallbackEl = document.getElementById('csv-fallback-area');
    const payload = buildPayload();

    if (!WEBHOOK_URL || WEBHOOK_URL === '__WEBHOOK_URL_PLACEHOLDER__' || WEBHOOK_URL === '') {
        statusEl.className = 'send-status warn';
        statusEl.innerHTML = '⚠ 送信先が未設定です。下のボタンから結果ファイルをダウンロードして管理者にメールでお送りください。';
        renderFallback(fallbackEl, payload);
        return;
    }

    try {
        const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
        const json = await res.json();
        if (json.success) {
            statusEl.className = 'send-status ok';
            statusEl.innerHTML = '✓ 結果を送信しました（管理者に集計されます）';
        } else {
            throw new Error(json.error || 'unknown');
        }
    } catch (err) {
        console.error('送信失敗:', err);
        statusEl.className = 'send-status warn';
        statusEl.innerHTML = '⚠ 送信に失敗しました（' + escapeHtml(String(err.message || err)) + '）<br>下のボタンから結果ファイルをダウンロードして管理者にメールでお送りください。';
        renderFallback(fallbackEl, payload);
    }
}

function renderFallback(el, payload) {
    el.innerHTML = `
        <button class="fallback-btn" onclick="downloadResult()">📥 結果ファイル（JSON）をダウンロード</button>
    `;
    window.__lastPayload = payload;
}

function downloadResult() {
    const payload = window.__lastPayload || buildPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeName = (payload.name || 'unknown').replace(/[^\w\u3040-\u30ff\u4e00-\u9fffa-zA-Z0-9-]/g, '_');
    a.href = url;
    a.download = `dms-quiz-${payload.version}-${safeName}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ========== ユーティリティ ==========
function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
