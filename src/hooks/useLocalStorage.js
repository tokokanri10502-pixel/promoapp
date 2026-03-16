import { useState, useEffect } from 'react';

/**
 * LocalStorageと同期するステートフック
 * @param {string} key - 保存キー
 * @param {any} initialValue - 初期値
 */
export function useLocalStorage(key, initialValue) {
  // 初期値をLocalStorageから取得する関数
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // storedValueが変更されたらLocalStorageに書き込む
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
