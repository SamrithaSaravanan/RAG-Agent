'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldAlert, ExternalLink, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  const officialPortals = [
    { name: "National Portal of India", url: "https://www.india.gov.in/" },
    { name: "myScheme Central Portal", url: "https://www.myscheme.gov.in/" },
    { name: "National Scholarship Portal", url: "https://scholarships.gov.in/" },
    { name: "PM-KISAN Samman Nidhi", url: "https://pmkisan.gov.in/" },
    { name: "Government of Tamil Nadu", url: "https://www.tn.gov.in/" },
    { name: "National Health Authority", url: "https://pmjay.gov.in/" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Disclaimer Banner */}
      <div className="bg-slate-950/80 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              {t.disclaimerTitle}
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {t.disclaimerText}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <span className="font-bold text-lg text-white">SchemeSaarthi</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.tagline}
            </p>
            <div className="text-xs text-slate-400">
              <p>📍 AI-Powered Public Welfare RAG Engine</p>
              <p className="mt-1">🌐 High-Precision Bilingual Grounding</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {language === 'ta' ? 'விரைவு வழிகாட்டி' : 'Navigation'}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-blue-400 transition-colors">
                  {t.schemes}
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 text-indigo-400 font-medium">
                  {t.chat}
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded-sm">AI</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-400 transition-colors">
                  {t.admin}
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified Official Portals */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              {language === 'ta' ? 'அதிகாரப்பூர்வ அரசு இணையதளங்கள்' : 'Official Government Portals'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {officialPortals.map((portal) => (
                <a
                  key={portal.url}
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all text-slate-300 hover:text-white"
                >
                  <span className="truncate">{portal.name}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-2 shrink-0" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <p>
            © 2026 SchemeSaarthi. Built for Indian Citizens & Students.
          </p>
          <div className="flex items-center gap-1 text-slate-300">
            <span>Grounding on official gazettes with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>and zero hallucination</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
