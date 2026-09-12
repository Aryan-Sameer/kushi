'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if already authenticated on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('authed');
    if (authStatus === 'true') {
      router.push('/notes');
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please write down the secret word.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        sessionStorage.setItem('authed', 'true');
        router.push('/notes');
      } else {
        setError(data.error || 'Incorrect secret word. Try again!');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf7f0] text-[#2c1d11]">
        <div className="text-center font-serif">
          <div className="inline-block w-8 h-8 border-4 border-[#8c6a46] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-xl italic font-serif animate-pulse">Checking lock...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden select-none">
      {/* Decorative Scrapbook Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#f3ecdb] rounded-full filter blur-xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#d8c3a5] rounded-full filter blur-2xl opacity-30 pointer-events-none" />

      {/* Main Scrapbook Login Card */}
      <div className="relative w-full max-w-md bg-white border border-[#2c1d11]/10 rounded-xl px-8 py-10 shadow-[0_10px_30px_rgba(44,29,17,0.15)] bg-[radial-gradient(#fbf9f2_1px,transparent_1px)] bg-[size:16px_16px] transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">

        {/* Tape Effect at the Top */}
        <div className="washi-tape washi-tape-pink w-32" />

        {/* Pinned / Hand-written Header */}
        <div className="text-center mb-8 mt-2">
          <h1 className="font-handwriting text-5xl md:text-6xl text-[#8c6a46] mb-2 drop-shadow-sm select-none">
            TrueShe ka Janmdin
          </h1>
        </div>

        {/* Polaroid Style Decor */}
        <div className="flex justify-center mb-8">
          <div className="bg-white border border-[#2c1d11]/10 shadow-md p-2 pb-5 rotate-[-4deg] max-w-[140px] transform hover:rotate-0 transition-transform duration-300">
            <div className="w-28 h-28 bg-[#d8c3a5]/30 flex items-center justify-center text-3xl">
              <img className="w-full h-full object-cover text-sm" src="/pictures/cover_photo.jpeg" alt="Ur face" />
            </div>
            <div className="font-handwriting text-center mt-2 text-[#8c6a46] font-bold">
              Happy Birthday 👽
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="password"
              className="block font-handwriting text-2xl text-[#8c6a46] mb-1 pl-1"
            >
              Secret Word
            </label>
            <input
              type="password"
              id="password"
              placeholder="What's the password?"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full font-serif bg-[#faf7f0]/60 border-2 border-[#8c6a46]/40 focus:border-[#8c6a46] rounded-lg px-4 py-3 text-lg text-[#2c1d11] placeholder-[#2c1d11]/40 focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Inline Error Message */}
          {error && (
            <div className="bg-[#fef2f2] border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-serif italic text-center animate-bounce">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8c6a46] hover:bg-[#765634] text-white font-serif py-3 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-[1px] active:translate-y-0 disabled:opacity-55 disabled:cursor-not-allowed select-none cursor-pointer"
          >
            {loading ? 'Opening Scrapbook...' : 'Open Scrapbook'}
          </button>
        </form>

        {/* Vintage Label on the bottom */}
        <div className="mt-8 text-center text-xs text-[#2c1d11]/40 font-serif border-t border-[#2c1d11]/5 pt-4">
          TrueShe ka janmdin © 2026. Made with ❤️
        </div>
      </div>
    </main>
  );
}
