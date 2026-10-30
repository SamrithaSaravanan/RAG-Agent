'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { SCHEMES } from '@/lib/schemes-data';
import {
  Search,
  Bot,
  GraduationCap,
  Tractor,
  HeartPulse,
  Baby,
  Building,
  Briefcase,
  Coins,
  Users,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Languages,
  CheckCircle2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/schemes?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/schemes');
    }
  };

  const categoryIcons = [
    { key: 'education', icon: GraduationCap, color: 'text-blue-600 bg-blue-100/70 border-blue-200' },
    { key: 'agriculture', icon: Tractor, color: 'text-emerald-600 bg-emerald-100/70 border-emerald-200' },
    { key: 'womenChild', icon: Baby, color: 'text-pink-600 bg-pink-100/70 border-pink-200' },
    { key: 'healthcare', icon: HeartPulse, color: 'text-rose-600 bg-rose-100/70 border-rose-200' },
    { key: 'housing', icon: Building, color: 'text-amber-600 bg-amber-100/70 border-amber-200' },
    { key: 'employment', icon: Briefcase, color: 'text-indigo-600 bg-indigo-100/70 border-indigo-200' },
    { key: 'financial', icon: Coins, color: 'text-teal-600 bg-teal-100/70 border-teal-200' },
    { key: 'social', icon: Users, color: 'text-purple-600 bg-purple-100/70 border-purple-200' },
  ];

  // Select top popular schemes
  const popularSchemes = SCHEMES.slice(0, 4);

  return (
    <div className="flex flex-col flex-1 w-full bg-linear-to-b from-blue-50/50 via-white to-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Background decorative gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-200/30 via-indigo-200/20 to-purple-200/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              {language === 'ta'
                ? 'அதிகாரப்பூர்வ அரசு ஆவணங்கள் அடிப்படையிலான AI வழிகாட்டி'
                : '100% Grounded on Official Government Gazettes & Notifications'}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            {language === 'ta' ? (
              <>
                அரசுத் திட்டங்கள் <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">எளிதாக</span>
              </>
            ) : (
              <>
                Government Schemes <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">Made Simple</span>
              </>
            )}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal">
            {t.tagline}
          </p>

          {/* Main Search Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="absolute left-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white border border-slate-300 shadow-lg shadow-blue-500/5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                {t.searchButton}
              </button>
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 hover:opacity-95 text-white font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
            >
              <Bot className="w-5 h-5" />
              {t.askSaarthi}
            </Link>

            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base shadow-xs transition-all hover:scale-[1.02]"
            >
              <span>{t.schemes}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </Link>
          </div>

          {/* Quick stats banner */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-900">100%</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Verified Sources</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-900">தமிழ் / EN</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Bilingual Support</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-900">0%</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">AI Hallucinations</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-900">₹0</p>
              <p className="text-xs text-slate-500 mt-1 font-medium">Free Citizen Service</p>
            </div>
          </div>

        </div>
      </section>

      {/* Category Explorer Grid */}
      <section className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {language === 'ta' ? 'பிரிவுகள்' : 'Explore by Category'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                {language === 'ta' ? 'அரசு நலத்திட்டப் பிரிவுகள்' : 'Government Welfare Sectors'}
              </h2>
            </div>
            <Link
              href="/schemes"
              className="mt-3 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>{language === 'ta' ? 'அனைத்து திட்டங்களையும் காண்க' : 'View all schemes'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryIcons.map((cat) => {
              const Icon = cat.icon;
              const catTitle = (t.categories as any)[cat.key] || cat.key;

              return (
                <Link
                  key={cat.key}
                  href={`/schemes?category=${cat.key}`}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/60 hover:bg-white hover:shadow-md transition-all group flex flex-col items-start"
                >
                  <div className={`p-3 rounded-xl border mb-3 group-hover:scale-110 transition-transform ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                    {catTitle}
                  </h3>
                  <span className="text-xs text-slate-700 mt-1 flex items-center gap-1">
                    {language === 'ta' ? 'விவரங்களை அறிய' : 'Explore'} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Schemes Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              {language === 'ta' ? 'பிரபலமான திட்டங்கள்' : 'Popular Schemes'}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              {language === 'ta' ? 'முக்கிய மத்திய & மாநில அரசுத் திட்டங்கள்' : 'Featured Central & State Welfare Schemes'}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {language === 'ta'
                ? 'நேரடி வங்கி பரிமாற்றம் மற்றும் விரிவான தகுதி வழிகாட்டுதல்கள்'
                : 'Direct benefit transfer with complete eligibility criteria and required documents checklists'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
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

                  <h3 className="text-xl font-bold text-slate-900">
                    {language === 'ta' ? scheme.title_ta : scheme.title_en}
                  </h3>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {language === 'ta' ? scheme.department_ta : scheme.department_en}
                  </p>

                  <p className="text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {language === 'ta' ? scheme.short_description_ta : scheme.short_description_en}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                      🎯 {language === 'ta' ? `${scheme.eligibility_ta.length} தகுதிகள்` : `${scheme.eligibility_en.length} Eligibility Rules`}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                      📑 {language === 'ta' ? `${scheme.documents_required_ta.length} ஆவணங்கள்` : `${scheme.documents_required_en.length} Documents`}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <Link
                    href={`/schemes/${scheme.id}`}
                    className="flex-1 text-center py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs sm:text-sm transition-colors"
                  >
                    {t.viewDetails}
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

          <div className="mt-10 text-center">
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
            >
              <span>{language === 'ta' ? 'அனைத்து திட்டங்களையும் காண்க' : 'Explore All Government Schemes'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {language === 'ta' ? 'செயல்முறை' : 'How It Works'}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              {language === 'ta' ? 'எளிமையான 3 படிகளில் திட்டங்களை அறியுங்கள்' : 'Get Verified Answers in 3 Simple Steps'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-4 shadow-md shadow-blue-500/20">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'ta' ? 'கேள்வி கேளுங்கள்' : 'Ask in Your Language'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {language === 'ta'
                  ? 'தமிழ் அல்லது ஆங்கிலத்தில் எளிய மொழியில் ஏதேனும் திட்டம் அல்லது உங்கள் தேவையை பதிவிடுங்கள்.'
                  : 'Enter your question in natural Tamil or English. Inquire about eligibility, benefits, or checklists.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg mb-4 shadow-md shadow-indigo-500/20">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'ta' ? 'அரசு ஆவணங்கள் மூலம் ஆய்வு' : 'RAG Vector Search'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {language === 'ta'
                  ? 'எங்கள் AI இயந்திரம் அதிகாரப்பூர்வ அரசாணை மற்றும் ஆவணங்களை உடனுக்குடன் தேடி உண்மையான தகவல்களை மட்டுமே எடுக்கும்.'
                  : 'Our pgvector engine semantic-matches official PDF gazettes and guidelines to eliminate fake info.'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-lg mb-4 shadow-md shadow-purple-500/20">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {language === 'ta' ? 'சரிபார்க்கப்பட்ட வழிகாட்டுதல்' : 'Grounded Checklists'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {language === 'ta'
                  ? 'தேவையான ஆவணப் பட்டியல், விண்ணப்பிக்கும் படிநிலைகள் மற்றும் நேரடி அரசு வலைதள இணைப்புகளைப் பெறுங்கள்.'
                  : 'Receive structured responses with document checklists, direct portal links, and exact page citations.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {language === 'ta'
              ? 'உங்களுக்கு பொருத்தமான அரசுத் திட்டத்தை உடனே அறியுங்கள்'
              : 'Find Government Schemes You Are Eligible For Today'}
          </h2>
          <p className="mt-4 text-base text-blue-200 max-w-2xl mx-auto">
            {language === 'ta'
              ? 'எங்கள் AI சாரதியிடம் பேசி கல்வி உதவித்தொகை, விவசாய மானியம், மகளிர் உரிமைத் தொகை மற்றும் மருத்துவக் காப்பீடு பற்றி தெரிந்து கொள்ளுங்கள்.'
              : 'Talk to AI Saarthi about scholarships, farmer assistance, housing subsidies, and women empowerment schemes.'}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-950 font-bold text-base hover:bg-blue-50 shadow-xl transition-all hover:scale-105"
            >
              <Bot className="w-5 h-5 text-indigo-600" />
              <span>{t.askSaarthi}</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
