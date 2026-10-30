import React, { useState, useEffect } from 'react';
import { Shield, Globe, RotateCcw, Clock, UserCheck } from 'lucide-react';

export function Header({ lang, setLang, t, onResetAll }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-black text-[#0f172a] sticky top-0 z-40 shadow-sm font-telugu">
      {/* Top Gov Ribbon */}
      <div className="bg-[#0f172a] text-white text-xs px-4 py-1.5 flex justify-between items-center font-medium">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            {t.govState} • {t.departmentName}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{timeStr} IST</span>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-emerald-400 font-semibold">
            పౌర సేవల గడువు పర్యవేక్షణ సక్రియం (SLA Online)
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-black text-white rounded-lg flex items-center justify-center font-bold text-xl border-2 border-black shadow">
            🏛️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight text-black font-telugu">
                {t.appTitle}
              </h1>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-300">
                AI Co-Pilot v1.0
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium font-telugu">{t.appSubtitle}</p>
          </div>
        </div>

        {/* Officer Profile & Controls */}
        <div className="flex items-center space-x-3">
          {/* Officer Identity Card */}
          <div className="hidden md:flex items-center space-x-2.5 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-left">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-black font-telugu">{t.officerName}</div>
              <div className="text-[11px] text-slate-600 font-telugu">{t.officeLocation}</div>
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetAll}
            title={t.resetDemo}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:border-black rounded-lg transition hover:bg-slate-50 font-telugu"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">{t.resetDemo}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'te' ? 'en' : 'te')}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-white bg-black hover:bg-slate-800 rounded-lg transition border border-black shadow-sm font-telugu"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.languageSwitch}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
