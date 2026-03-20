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

  // keyが変更されたときに新しくLocalStorageから読み直す
  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const save = () => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setStoredValue, save];
}
