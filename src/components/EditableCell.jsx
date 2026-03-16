import React, { useState, useEffect, useRef } from 'react';

const EditableCell = ({ value, onChange, placeholder = "入力...", className = "" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || '');
  const textareaRef = useRef(null);

  // 外部からのvalue変更を同期
  useEffect(() => {
    setCurrentValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // テキストエリアの高さを自動調整
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== currentValue) {
      onChange(currentValue);
    }
  };

  const handleKeyDown = (e) => {
    // Escキーでキャンセルして元に戻す
    if (e.key === 'Escape') {
      setCurrentValue(value || '');
      setIsEditing(false);
    }
    // Enter(修飾キーなし)の場合は、改行ではなく保存（任意設定、今回はShift+Enterで改行を許容）
  };

  const handleChange = (e) => {
    setCurrentValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  if (isEditing) {
    return (
      <textarea
        ref={textareaRef}
        value={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full min-h-[60px] p-2 text-sm border-2 border-primary-500 rounded-md shadow-sm outline-none resize-none overflow-hidden ${className}`}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={`w-full min-h-[60px] p-2 text-sm rounded-md cursor-pointer hover:bg-gray-50 border border-transparent hover:border-gray-300 transition-colors whitespace-pre-wrap flex items-start ${!currentValue ? 'text-gray-400 italic' : 'text-gray-800'} ${className}`}
    >
      {currentValue || placeholder}
    </div>
  );
};

export default EditableCell;
