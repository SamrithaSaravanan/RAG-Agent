'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Bot, 
  BookOpen, 
  ShieldCheck, 
  Home, 
  Menu, 
  X, 
  Languages, 
  Sparkles 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t.home, icon: Home },
    { href: '/schemes', label: t.schemes, icon: BookOpen },
    { href: '/chat', label: t.chat, icon: Bot, highlight: true },
    { href: '/admin', label: t.admin, icon: ShieldCheck },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 bg-clip-text text-transparent">
                  SchemeSaarthi
                </span>
                <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  AI Gov RAG
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-medium hidden sm:block">
                {language === 'ta' ? 'அரசுத் திட்டங்கள் வழிகாட்டி' : 'Official Citizen Scheme Assistant'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-blue-50 text-blue-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                  } ${link.highlight && !active ? 'text-indigo-600 font-semibold bg-indigo-50/70 hover:bg-indigo-100/70' : ''}`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-700' : link.highlight ? 'text-indigo-600' : 'text-slate-700'}`} />
                  {link.label}
                  {link.highlight && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Controls */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'ta'
                    ? 'bg-white text-blue-800 shadow-xs'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                தமிழ் (Tamil)
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200"
            >
              <Languages className="w-3.5 h-3.5" />
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                  active
                    ? 'bg-blue-50 text-blue-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                } ${link.highlight ? 'bg-indigo-50/60 text-indigo-700' : ''}`}
              >
                <Icon className="w-5 h-5 text-indigo-600" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

