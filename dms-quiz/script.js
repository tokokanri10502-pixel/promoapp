// DMS 問題集 (自動生成) - 結果送信機能付き
const QUIZ_DATA = [
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q1",
    "text": "Webサイトの通信を暗号化し、第三者による盗聴を防ぐ仕組み（URLがhttpsで始まるもの）は？",
    "options": [
      "SEO対策",
      "SSL/TLS通信",
      "DNSルーティング",
      "FTP転送"
    ],
    "answerIndex": 1,
    "explanation": "個人情報やパスワードを安全に送受信するための必須技術です。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q2",
    "text": "複数のシステムを、1つのIDとパスワードでログインして利用できる仕組みは？",
    "options": [
      "VPN（仮想専用線）",
      "二段階認証（2FA）",
      "エンドツーエンド暗号化（E2EE）",
      "シングルサインオン（SSO）"
    ],
    "answerIndex": 3,
    "explanation": "利便性とセキュリティを両立させる仕組みで、社内システムなどで導入が進んでいます。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q3",
    "text": "スマホやPCなど、端末の画面サイズに合わせてレイアウトが自動で最適化される手法は？",
    "options": [
      "レスポンシブデザイン",
      "パララックスデザイン",
      "フラットデザイン",
      "アクセシビリティ"
    ],
    "answerIndex": 0,
    "explanation": "デバイスごとに別々のサイトを作らず、一つのサイトで表示を切り替えます。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q4",
    "text": "インターネット上の機器を識別するために割り当てられる「ネットワーク上の住所」は？",
    "options": [
      "MACアドレス",
      "IPアドレス",
      "ドメイン名",
      "サブネットマスク"
    ],
    "answerIndex": 1,
    "explanation": "通信を行う全ての機器が持つ一意の番号です。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q5",
    "text": "次回訪問時の表示を高速化するために、ブラウザがデータを一時的に保存する仕組みは？",
    "options": [
      "Cookie",
      "アーカイブ",
      "キャッシュ",
      "バックアップ"
    ],
    "answerIndex": 2,
    "explanation": "2回目以降の表示を早めますが、古い情報が残ってしまう原因にもなります。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q6",
    "text": "テレワーク先などから安全に社内システムへ接続するための仮想専用線技術は？",
    "options": [
      "VPN",
      "FTP",
      "DNS",
      "LAN"
    ],
    "answerIndex": 0,
    "explanation": "公衆回線の中に専用の「トンネル」を作るイメージで通信を保護します。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q7",
    "text": "パソコンやスマホの土台となる「基本ソフトウェア（WindowsやiOSなど）」の総称は？",
    "options": [
      "ブラウザ（Web閲覧ソフト）",
      "ミドルウェア（OSとアプリの中間層）",
      "アンチウイルス（ウイルス対策ソフト）",
      "OS（オペレーティングシステム）"
    ],
    "answerIndex": 3,
    "explanation": "あらゆるアプリケーションを動かすための最も基礎となるソフトです。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q8",
    "text": "ブラウザ等に後から便利な機能を追加するための小さなプログラムの総称は？",
    "options": [
      "ドライバ（機器制御ソフト）",
      "パッチ（修正プログラム）",
      "プラグイン（拡張機能）",
      "ファームウェア（機器内蔵プログラム）"
    ],
    "answerIndex": 2,
    "explanation": "自分の使い勝手に合わせてツールをカスタマイズできます。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q9",
    "text": "ネット経由でソフトウェアの機能を月額課金などで利用する形態（Zoom等）は？",
    "options": [
      "SaaS（サース）",
      "オンプレミス（自社運用）",
      "ローカルホスト（自端末内）",
      "イントラネット（社内ネット）"
    ],
    "answerIndex": 0,
    "explanation": "ソフトウェアを「購入」するのではなく「利用」する、現在の主流です。"
  },
  {
    "chapter": "第1章：ITインフラ・基礎知識編（デジタルの土台）",
    "id": "Q10",
    "text": "ウイルスなど、デバイスに悪意のある動作をさせるソフトウェアの総称は？",
    "options": [
      "スパム",
      "ファイアウォール",
      "トラッキング",
      "マルウェア"
    ],
    "answerIndex": 3,
    "explanation": "コンピュータウイルスやスパイウェアなどの総称です。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q11",
    "text": "デザイン作業の前に作成する、画面のレイアウトやボタン配置を決めた「設計図」は？",
    "options": [
      "モックアップ",
      "プロトタイプ",
      "ワイヤーフレーム",
      "サイトマップ"
    ],
    "answerIndex": 2,
    "explanation": "色や写真を省き、要素の配置と機能だけを示す簡易図。デザイン作業前の認識合わせに使います。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q12",
    "text": "専門知識がなくても、管理画面からテキストを登録してWebサイトを更新できるシステムは？",
    "options": [
      "CRM（顧客管理システム）",
      "MA（マーケティング自動化）",
      "SFA（営業支援システム）",
      "CMS（コンテンツ管理システム）"
    ],
    "answerIndex": 3,
    "explanation": "WordPressが代表例。専門知識なしで更新できるため、企業サイトやブログで広く使われています。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q13",
    "text": "ユーザーが目にする画面の「見た目や操作性」を指す用語は？",
    "options": [
      "UI（ユーザーインターフェース）",
      "UX（ユーザーエクスペリエンス）",
      "CX（カスタマーエクスペリエンス）",
      "DX（デジタルトランスフォーメーション）"
    ],
    "answerIndex": 0,
    "explanation": "ユーザーが直接触れる「見た目」と「操作性」の総称。直感的で迷わない設計が良いUIです。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q14",
    "text": "ユーザーがサービスを利用して得られる「体験や満足度」の総称は？",
    "options": [
      "UI（ユーザーインターフェース）",
      "PV（ページビュー）",
      "CV（コンバージョン）",
      "UX（ユーザーエクスペリエンス）"
    ],
    "answerIndex": 3,
    "explanation": "サイト訪問前から利用後まで含む「体験全体」。UIはUXの一部分にあたります。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q15",
    "text": "ユーザーの入力内容や訪問履歴を、ブラウザに一時的に保存させる仕組み（ファイル）は？",
    "options": [
      "セッション（接続単位）",
      "Cookie（クッキー）",
      "キャッシュ（一時保存）",
      "トークン（認証情報）"
    ],
    "answerIndex": 1,
    "explanation": "ログイン状態保持や閲覧履歴記録に使用。近年プライバシー規制（GDPR等）の対象です。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q16",
    "text": "Webページの「構造」を定義するHTMLに対し、「装飾」を指定する言語は？",
    "options": [
      "CSS",
      "Java",
      "PHP",
      "SQL"
    ],
    "answerIndex": 0,
    "explanation": "文字色・サイズ・余白・配置などを指定する言語。HTMLが「骨組み」ならCSSは「服装」です。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q17",
    "text": "広告のリンク先となるページ（LP）を改善し、お問い合わせ率を高める施策は？",
    "options": [
      "SEO（検索エンジン最適化）",
      "EFO（入力フォーム最適化）",
      "LPO（ランディングページ最適化）",
      "CRO（コンバージョン率最適化）"
    ],
    "answerIndex": 2,
    "explanation": "見出し・CTA・フォームの改善などで、LPの離脱率改善やCV率向上を目指します。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q18",
    "text": "商品購入や問い合わせなど、Webサイトにおける「最終的な成果」を指す言葉は？",
    "options": [
      "インプレッション（表示回数）",
      "クリック（押下数）",
      "コンバージョン（CV）",
      "リーチ（到達人数）"
    ],
    "answerIndex": 2,
    "explanation": "サイト目的に応じた成果（購入・登録・問い合わせなど）。広告効果測定の最重要指標です。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q19",
    "text": "1つの商品を売ることに特化した、縦長のWebサイトを何と呼ぶか？",
    "options": [
      "コーポレートサイト（企業サイト）",
      "LP（ランディングページ）",
      "ポータルサイト（玄関口サイト）",
      "ECサイト（通販サイト）"
    ],
    "answerIndex": 1,
    "explanation": "1商品・1サービスに絞った縦長の専用ページ。広告のクリック先として使われます。"
  },
  {
    "chapter": "第2章：Web制作・マーケティング編（現場で使う用語）",
    "id": "Q20",
    "text": "検索結果で自社サイトを上位（目立つ場所）に表示させるための改善施策は？",
    "options": [
      "SEO（検索エンジン最適化）",
      "SEM（検索エンジンマーケティング）",
      "MEO（マップ検索最適化）",
      "LPO（ランディングページ最適化）"
    ],
    "answerIndex": 0,
    "explanation": "コンテンツ品質・サイト構造・被リンクなどを最適化し、検索順位の向上を目指します。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q21",
    "text": "広告がユーザーの画面に「表示された回数」を示す指標は？",
    "options": [
      "リーチ（到達人数）",
      "クリック（押下数）",
      "インプレッション（IMP）",
      "エンゲージメント（接触反応）"
    ],
    "answerIndex": 2,
    "explanation": "「表示された回数」を示すため、同じ人に複数回表示されてもカウントされます。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q22",
    "text": "広告を見た人のうち、実際にクリックした人の割合を示す指標は？",
    "options": [
      "CTR（クリック率）",
      "CVR（コンバージョン率）",
      "CPC（クリック単価）",
      "CPA（顧客獲得単価）"
    ],
    "answerIndex": 0,
    "explanation": "「Click Through Rate」の略。低い場合は広告クリエイティブの見直しが必要です。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q23",
    "text": "1回のコンバージョンを獲得するのにかかった広告費用のことは？",
    "options": [
      "CPC（クリック単価）",
      "CPA（顧客獲得単価）",
      "CPM（インプレッション単価）",
      "ROAS（広告費用対効果）"
    ],
    "answerIndex": 1,
    "explanation": "「Cost Per Acquisition」の略。広告効率の指標で、低いほど良いとされます。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q24",
    "text": "検索したキーワードに連動して検索結果の上部に出るテキスト広告は？",
    "options": [
      "ディスプレイ広告",
      "動画広告",
      "リスティング広告",
      "SNS広告"
    ],
    "answerIndex": 2,
    "explanation": "ユーザーの検索意図に直結するため、CV率が高い広告手法です。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q25",
    "text": "一度サイトに来たユーザーを、別のサイトでも追いかけて表示する広告は？",
    "options": [
      "リスティング広告",
      "アフィリエイト広告",
      "ネイティブ広告",
      "リターゲティング広告"
    ],
    "answerIndex": 3,
    "explanation": "一度興味を示したユーザーへの再アプローチで、CV率向上を狙います。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q26",
    "text": "サイトを訪問したユーザーが、1ページ目だけを見て帰ってしまった割合は？",
    "options": [
      "離脱率",
      "直帰率",
      "回遊率",
      "クリック率"
    ],
    "answerIndex": 1,
    "explanation": "高すぎる場合はLPの内容や速度に問題がある可能性。コンテンツ改善のヒントになります。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q27",
    "text": "サイト内のページが見られた「延べ回数」を指す指標は？",
    "options": [
      "UU（ユニークユーザー）",
      "セッション（訪問単位）",
      "PV（ページビュー）",
      "リーチ（到達人数）"
    ],
    "answerIndex": 2,
    "explanation": "同じユーザーが複数ページを閲覧すれば加算。サイト全体の活発さを示します。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q28",
    "text": "投資した広告費に対して、どれだけの「売上」を得られたかを示す指標は？",
    "options": [
      "ROI（投資利益率）",
      "CPA（顧客獲得単価）",
      "LTV（顧客生涯価値）",
      "ROAS（広告費用対効果）"
    ],
    "answerIndex": 3,
    "explanation": "「Return On Ad Spend」の略。100%以上で広告投資が回収できている状態です。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q29",
    "text": "2種類のデザインを同時に配信し、どちらが成果が出るか比較する検証は？",
    "options": [
      "ストレステスト",
      "ユーザビリティテスト",
      "A/Bテスト",
      "単体テスト"
    ],
    "answerIndex": 2,
    "explanation": "客観的データで意思決定するための基本手法。LPやメール配信などで活用されます。"
  },
  {
    "chapter": "第3章：広告・分析編（数字を読み解く）",
    "id": "Q30",
    "text": "最終目標達成のための「中間目標（チェックポイント）」となる数値は？",
    "options": [
      "KGI（重要目標達成指標）",
      "KPI（重要業績評価指標）",
      "OKR（目標と主要成果）",
      "MBO（目標管理制度）"
    ],
    "answerIndex": 1,
    "explanation": "「Key Performance Indicator」の略。日々の業務改善のためのモニタリング指標です。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q31",
    "text": "デジタルを活用してビジネスモデルを根本から変革し、競争優位を確立することは？",
    "options": [
      "デジタイゼーション（部分的IT化）",
      "DX（デジタルトランスフォーメーション）",
      "RPA（業務自動化）",
      "クラウド化（クラウド移行）"
    ],
    "answerIndex": 1,
    "explanation": "単なるIT化ではなく、デジタルでビジネスモデルや組織を変革することが本質です。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q32",
    "text": "ソフトウェアを買い切るのではなく、月額定額などで利用する課金モデルは？",
    "options": [
      "フリーミアム",
      "従量課金",
      "サブスクリプション",
      "クラウドファンディング"
    ],
    "answerIndex": 2,
    "explanation": "継続課金モデル。ユーザーは初期費用を抑えられ、企業は安定収益を得られます。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q33",
    "text": "顧客の基本情報や対応履歴を一元管理する「顧客関係管理システム」は？",
    "options": [
      "SFA",
      "MA",
      "ERP",
      "CRM"
    ],
    "answerIndex": 3,
    "explanation": "「Customer Relationship Management」の略。顧客との長期的関係構築の基盤システムです。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q34",
    "text": "短い期間で開発とテストを繰り返し、柔軟に仕様変更に対応する手法は？",
    "options": [
      "ウォーターフォール開発",
      "アジャイル開発",
      "ノーコード開発",
      "スクラッチ開発"
    ],
    "answerIndex": 1,
    "explanation": "「変化に強い」開発手法。Webサービスやスタートアップで広く採用されています。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q35",
    "text": "「内側も疑う」ことを前提とし、常に認証を行う最新のセキュリティ概念は？",
    "options": [
      "ファイアウォール",
      "ゼロトラスト",
      "エンドポイント",
      "多要素認証"
    ],
    "answerIndex": 1,
    "explanation": "従来の「境界型」防御から、内部も含め全てを検証する考え方への転換です。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q36",
    "text": "会社が許可していない個人のツールを、従業員が勝手に業務で使うリスクは？",
    "options": [
      "テレワーク",
      "BYOD",
      "アウトソーシング",
      "シャドーIT"
    ],
    "answerIndex": 3,
    "explanation": "利便性のため使われがちですが、情報漏えいやセキュリティ事故の温床になります。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q37",
    "text": "会議をスムーズに進めるための「議題・進行表」を何と呼ぶか？",
    "options": [
      "アジェンダ",
      "プロトコル",
      "ログ",
      "アーカイブ"
    ],
    "answerIndex": 0,
    "explanation": "議論の道筋を共有することで、会議の生産性が大きく向上します。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q38",
    "text": "仕事を特定の担当者に割り当てたり、任命したりすることを何と呼ぶか？",
    "options": [
      "サイン",
      "アサイン",
      "ジョイン",
      "タスク"
    ],
    "answerIndex": 1,
    "explanation": "単純な「割り当て」だけでなく、役職や責任を任せる意味でも使われます。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q39",
    "text": "言った言わないを防ぐための「客観的な証拠・裏付け」を指す言葉は？",
    "options": [
      "エビデンス",
      "ガイドライン",
      "マニュアル",
      "ログ"
    ],
    "answerIndex": 0,
    "explanation": "メール・議事録・録音など、後で確認できる形で残しておくことが重要です。"
  },
  {
    "chapter": "第4章：ビジネススキル・セキュリティ編",
    "id": "Q40",
    "text": "情報を正しく理解し、安全・効果的に使いこなす基礎能力のことは？",
    "options": [
      "プログラミング",
      "タイピング",
      "リテラシー",
      "アナリティクス"
    ],
    "answerIndex": 2,
    "explanation": "ITリテラシー、メディアリテラシーなど、現代社会で不可欠な能力です。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q41",
    "text": "Googleの「NotebookLM」の最大の特徴として、正しいものはどれか？",
    "options": [
      "ネット上の最新情報を自動で毎日要約して届けてくれる機能",
      "アップロードした「自分の資料（ソース）」に基づいた分析や回答に特化している点",
      "プログラミングコードを入力するだけで、自動でアプリを完成させる機能",
      "写真や動画をアップロードすると、自動でSNS用のバナー画像を作成する点"
    ],
    "answerIndex": 1,
    "explanation": "ハルシネーション抑制が強みで、自分の資料に基づく分析・要約・引用に特化しています。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q42",
    "text": "NotebookLMで、資料を読み込ませた後に「よくある質問」や「学習ガイド」などを自動作成してくれる機能を何と呼ぶか？",
    "options": [
      "ノートブックガイド",
      "プロンプト集",
      "ソースエディタ",
      "ナレッジグラフ"
    ],
    "answerIndex": 0,
    "explanation": "資料の要点・FAQ・学習計画などを自動生成し、内容理解を支援します。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q43",
    "text": "生成AIに対して、自分の意図した回答を引き出すために入力する「指示文」を何と呼ぶか？",
    "options": [
      "クエリ",
      "プロンプト",
      "コマンド",
      "ログ"
    ],
    "answerIndex": 1,
    "explanation": "質問内容、役割設定、制約条件などを工夫することで回答の質が大きく変わります。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q44",
    "text": "AIに指示を出す際、単に「書いて」と言うより、「あなたはプロの編集者です」と役割を与える手法を何と呼ぶか？",
    "options": [
      "ターゲティング（対象絞り込み）",
      "フィルタリング（条件除外）",
      "デバッグ（不具合修正）",
      "ロール（役割）付与"
    ],
    "answerIndex": 3,
    "explanation": "「あなたは○○の専門家です」と役割を与えることで、回答の精度と専門性が向上します。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q45",
    "text": "AIが「もっともらしい嘘」を自信満々に回答してしまう現象を指す用語はどれか？",
    "options": [
      "ハルシネーション",
      "バズ",
      "フリーズ",
      "シャドーIT"
    ],
    "answerIndex": 0,
    "explanation": "「幻覚」が語源。AIが事実と異なる内容を堂々と回答する現象。必ず人間の事実確認が必要です。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q46",
    "text": "Antigravity（アンチグラビティ）で利用できるモデル「Nano Banana」の主な得意分野はどれか？",
    "options": [
      "数時間に及ぶ長尺動画の内容をすべて正確に書き起こすこと",
      "高度な物理シミュレーションや、複雑なプログラミングの構築",
      "非常に高速なレスポンスで、短文の添削や簡単な定型業務をこなすこと",
      "プロレベルの高品質なイラストや人物写真を生成すること"
    ],
    "answerIndex": 2,
    "explanation": "軽量・高速モデルとして、即時応答が必要な定型業務向けに最適化されています。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q47",
    "text": "ChatGPT（OpenAI）において、特定の業務に合わせてカスタマイズした「自分専用のAI」を作成できる機能はどれか？",
    "options": [
      "Plug-in",
      "Advanced Voice",
      "GPTs",
      "DALL-E"
    ],
    "answerIndex": 2,
    "explanation": "特定業務専用の指示・知識・ツールを設定し、自社業務に最適化したAIを作成できます。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q48",
    "text": "ChatGPTなどの大規模言語モデル（LLM）が、膨大な文章から重要なポイントを抜き出す作業を何と呼ぶか？",
    "options": [
      "スキャン（読み取り）",
      "要約（サマリー）",
      "フィルタリング（条件抽出）",
      "アーカイブ（保管）"
    ],
    "answerIndex": 1,
    "explanation": "長文を短くまとめる能力はLLMの基本機能。会議録や論文の概要把握に活用できます。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q49",
    "text": "Antigravityのようなツールで、異なる特徴を持つ複数のAI（Pro系やFlash系など）を切り替えて使う主な理由はどれか？",
    "options": [
      "処理速度、回答精度、利用コスト（トークン）のバランスを最適化するため",
      "1つのAIでは1時間に1回しか質問ができないという制限があるため",
      "AIごとに対応している言語（日本語のみ、英語のみ等）が厳密に分かれているため",
      "パソコンのメーカー（AppleかMicrosoftか）によって使えるAIが異なるため"
    ],
    "answerIndex": 0,
    "explanation": "高精度モデルは高コスト、軽量モデルは低コスト。用途に応じた使い分けが重要です。"
  },
  {
    "chapter": "第5章：生成AI・主要ツール編（AI活用を自分ごとに）",
    "id": "Q50",
    "text": "生成AIが作成した文章を社外資料に活用する際、品質管理の観点で「最も重要」とされるプロセスはどれか？",
    "options": [
      "AIにさらに長い文章を書かせて情報を増やすこと",
      "別の複数のAIに同じ質問をして、回答を多数決で決めること",
      "印刷して、フォントの見た目が綺麗かどうかを確認すること",
      "内容に誤りがないか、人間の目による事実確認と校正を行うこと"
    ],
    "answerIndex": 3,
    "explanation": "AIは事実誤認や偏った回答を生成する可能性があり、最終確認は必ず人間が行うべきです。"
  }
];
const QUIZ_VERSION = "v1";
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
