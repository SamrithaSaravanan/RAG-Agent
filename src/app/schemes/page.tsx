'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { SCHEMES, Scheme } from '@/lib/schemes-data';
import {
  Search,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Filter,
  GraduationCap,
  Tractor,
  HeartPulse,
  Baby,
  Building,
  Briefcase,
  Coins,
  Users,
  X
} from 'lucide-react';

function SchemeExplorerContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();

  const initialCat = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  const categoryOptions = [
    { key: 'all', label: t.categories.all, icon: Filter },
    { key: 'education', label: t.categories.education, icon: GraduationCap },
    { key: 'agriculture', label: t.categories.agriculture, icon: Tractor },
    { key: 'womenChild', label: t.categories.womenChild, icon: Baby },
    { key: 'healthcare', label: t.categories.healthcare, icon: HeartPulse },
    { key: 'housing', label: t.categories.housing, icon: Building },
    { key: 'employment', label: t.categories.employment, icon: Briefcase },
    { key: 'financial', label: t.categories.financial, icon: Coins },
    { key: 'social', label: t.categories.social, icon: Users },
  ];

  const filteredSchemes = SCHEMES.filter((scheme) => {
    const matchesCategory =
      selectedCategory === 'all' || scheme.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      scheme.title_en.toLowerCase().includes(q) ||
      scheme.title_ta.toLowerCase().includes(q) ||
      scheme.short_description_en.toLowerCase().includes(q) ||
      scheme.short_description_ta.toLowerCase().includes(q) ||
      scheme.department_en.toLowerCase().includes(q) ||
      scheme.department_ta.toLowerCase().includes(q) ||
      scheme.eligibility_en.some(e => e.toLowerCase().includes(q)) ||
      scheme.benefits_en.some(b => b.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {language === 'ta' ? 'அரசு நலத்திட்டங்கள் வழிகாட்டி' : 'Government Scheme Directory'}
        </h1>
        <p className="mt-3 text-base text-slate-600">
          {language === 'ta'
            ? 'அனைத்து மத்திய மற்றும் மாநில நலத்திட்டங்கள், தகுதி விதிகள் மற்றும் விண்ணப்பிக்கும் நடைமுறைகள்'
            : 'Explore official welfare schemes, eligibility rules, and step-by-step application guidance'}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white border border-slate-300 shadow-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base text-slate-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none no-scrollbar">
        {categoryOptions.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.key;

          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-600/20'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-slate-500">
        <span>
          {language === 'ta'
            ? `${filteredSchemes.length} திட்டங்கள் கண்டறியப்பட்டன`
            : `Showing ${filteredSchemes.length} government schemes`}
        </span>
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
          >
            {language === 'ta' ? 'அனைத்தையும் நீக்கு' : 'Reset Filters'}
          </button>
        )}
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    {(t.categories as any)[scheme.category] || scheme.category}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {language === 'ta' ? scheme.title_ta : scheme.title_en}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {language === 'ta' ? scheme.department_ta : scheme.department_en}
                </p>

                <p className="text-sm text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {language === 'ta' ? scheme.short_description_ta : scheme.short_description_en}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    🎯 {scheme.eligibility_en.length} {language === 'ta' ? 'தகுதிகள்' : 'Rules'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    📑 {scheme.documents_required_en.length} {language === 'ta' ? 'ஆவணங்கள்' : 'Documents'}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  href={`/schemes/${scheme.id}`}
                  className="flex-1 text-center py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>{t.viewDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={scheme.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-700 hover:bg-slate-50 transition-colors"
                  title={t.officialWebsite}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
          <p className="text-base text-slate-700 font-medium">
            {language === 'ta'
              ? 'உங்கள் தேடலுக்கு ஏற்ற திட்டங்கள் எதுவும் கிடைக்கவில்லை.'
              : 'No government schemes match your search criteria.'}
          </p>
          <p className="text-xs text-slate-500 mt-2">
            {language === 'ta'
              ? 'வேறு வார்த்தைகளை உள்ளிட்டு தேடவும் அல்லது AI அரட்டையிடம் கேட்கவும்.'
              : 'Try different search keywords or ask our AI Saarthi directly.'}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
            >
              {language === 'ta' ? 'வடிகட்டிகளை நீக்கு' : 'Clear Filters'}
            </button>
            <Link
              href="/chat"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
            >
              {t.askSaarthi}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SchemeExplorerPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading schemes...</div>}>
      <SchemeExplorerContent />
    </Suspense>
  );
}
