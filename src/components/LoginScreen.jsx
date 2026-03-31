import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

// SHA-256 hash of "toko2026"
const HASH = '8983ee570379fd290b174487885737b384d187d605a02f16b9a8b04bb52ea8b0';

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    const hash = await sha256(password);
    if (hash === HASH) {
      localStorage.setItem('promo_auth', '1');
      onLogin();
    } else {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(145deg, #E8002D, #004EA2 60%, #0066CC)' }}>
      <div className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl text-center">
        <div className="bg-primary-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Calendar className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">月間ヒットカレンダー</h1>
        <p className="text-sm text-gray-500 mb-7">スーパーマーケット食品部・販促部向け</p>

        <label className="block text-left text-xs font-semibold text-gray-700 mb-1.5">
          パスワード
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          onKeyDown={handleKeyDown}
          placeholder="パスワードを入力"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base outline-none focus:border-primary-500 bg-gray-50 focus:bg-white transition-colors"
          autoComplete="current-password"
        />
        {error && (
          <p className="mt-2 text-xs text-red-600">パスワードが違います。もう一度お試しください。</p>
        )}
        <button
          onClick={handleLogin}
          className="w-full mt-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-base transition-colors"
        >
          ログイン
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
