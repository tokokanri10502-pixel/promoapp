import React, { useState } from 'react';
import trendData from '../data/trendData';

const FoodItem = ({ item }) => (
  <div className="flex items-center gap-1.5 py-0.5">
    <span className="text-[10px] font-bold text-violet-400 w-3 shrink-0">{item.rank}</span>
    <span className="text-xs text-gray-700">{item.name}</span>
    <span className="text-[10px] text-gray-400 hidden lg:inline">— {item.comment}</span>
  </div>
);

const RisingWordItem = ({ item }) => (
  <div className="flex items-center gap-1.5 py-0.5">
    <span className="text-[10px] font-bold text-orange-400 w-3 shrink-0">{item.rank}</span>
    <span className="text-orange-400 text-[10px] shrink-0">↑</span>
    <span className="text-xs text-gray-700">{item.word}</span>
  </div>
);

const SnsItem = ({ item }) => (
  <div className="flex items-center gap-1.5 py-0.5">
    <span className="text-sm leading-none shrink-0">{item.emoji}</span>
    <span className="text-xs text-sky-600 font-medium">{item.tag}</span>
  </div>
);

const Divider = () => (
  <>
    <div className="hidden sm:block w-px bg-violet-200 self-stretch mx-1" />
    <div className="block sm:hidden h-px bg-violet-200 w-full my-1" />
  </>
);

const TrendPanel = ({ month }) => {
  const data = trendData[month];
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return null;

  return (
    <div className="no-print mt-2 px-4 py-2.5 bg-violet-50 border-l-4 border-violet-300 rounded-r-lg">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-2 w-full text-left"
      >
        <span className="text-base leading-none">🔍</span>
        <span className="text-xs font-semibold text-violet-600 tracking-wide">
          昨年{month}月のトレンド（AI推定）
        </span>
        <span className="ml-auto text-violet-400 text-xs">{isOpen ? '▲ 閉じる' : '▼ 開く'}</span>
      </button>

      {isOpen && <div className="flex flex-col sm:flex-row sm:items-start sm:divide-x sm:divide-violet-200 gap-3 sm:gap-0 mt-2">

        {/* 食材TOP5：モバイル全幅 / タブレット左半分 / デスクトップ38% */}
        <div className="sm:pr-4 sm:w-1/2 lg:w-[38%]">
          <p className="text-[10px] font-bold text-violet-400 tracking-widest mb-1.5">よく検索された料理・食材 TOP5</p>
          <div className="flex flex-col">
            {data.items.map((item) => <FoodItem key={item.rank} item={item} />)}
          </div>
        </div>

        {/* 急上昇ワード＋SNS：タブレットは右半分に縦積み / デスクトップは2列に分割 */}
        <div className="sm:pl-4 sm:w-1/2 lg:w-[62%] flex flex-col lg:flex-row lg:divide-x lg:divide-violet-200 gap-3 lg:gap-0">

          <div className="lg:pr-4 lg:w-[52%]">
            <p className="text-[10px] font-bold text-orange-400 tracking-widest mb-1.5">急上昇ワード 🔥</p>
            <div className="flex flex-col">
              {data.risingWords.map((item) => <RisingWordItem key={item.rank} item={item} />)}
            </div>
          </div>

          <div className="lg:pl-4 lg:w-[48%]">
            <p className="text-[10px] font-bold text-sky-400 tracking-widest mb-1.5">SNSトレンド予測 📱</p>
            <div className="flex flex-col">
              {data.snsTopics.map((item) => <SnsItem key={item.tag} item={item} />)}
            </div>
          </div>

        </div>

      </div>}

      {isOpen && <p className="text-[10px] text-gray-300 text-right mt-1.5">✨ AI推定データ</p>}
    </div>
  );
};

export default TrendPanel;
