'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { SCHEMES, Scheme } from '@/lib/schemes-data';
import {
  ArrowLeft,
  ExternalLink,
  Bot,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Building2,
  Calendar,
  AlertCircle,
  HelpCircle,
  BookmarkCheck,
  ChevronRight
} from 'lucide-react';

export default function SchemeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { language, t } = useLanguage();

  const scheme = SCHEMES.find((s) => s.id === id || s.slug === id);
  if (!scheme) {
    notFound();
  }

  // State for interactive document checklist
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  const toggleDocCheck = (idx: number) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const isTa = language === 'ta';
  const title = isTa ? scheme.title_ta : scheme.title_en;
  const dept = isTa ? scheme.department_ta : scheme.department_en;
  const description = isTa ? scheme.short_description_ta : scheme.short_description_en;
  const objectives = isTa ? scheme.objectives_ta : scheme.objectives_en;
  const eligibility = isTa ? scheme.eligibility_ta : scheme.eligibility_en;
  const benefits = isTa ? scheme.benefits_ta : scheme.benefits_en;
  const documents = isTa ? scheme.documents_required_ta : scheme.documents_required_en;
  const steps = isTa ? scheme.application_steps_ta : scheme.application_steps_en;
  const notes = isTa ? scheme.important_notes_ta : scheme.important_notes_en;

  const totalDocsCount = documents.length;
  const completedDocsCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((completedDocsCount / totalDocsCount) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      
      {/* Back button & Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/schemes"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isTa ? 'அனைத்து திட்டங்களுக்கும் திரும்புக' : 'Back to Scheme Explorer'}</span>
        </Link>

        <Link
          href={`/chat?query=${encodeURIComponent(`Tell me about ${scheme.title_en} eligibility and application steps`)}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors"
        >
          <Bot className="w-4 h-4 text-indigo-600" />
          <span>{isTa ? 'AI சாரதியிடம் கேட்க' : 'Ask AI about this Scheme'}</span>
        </Link>
      </div>

      {/* Main Scheme Hero Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            {(t.categories as any)[scheme.category] || scheme.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {t.verifiedOfficial}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mt-2">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{dept}</span>
        </div>

        <p className="mt-5 text-sm sm:text-base text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={scheme.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all"
          >
            <span>{t.applyNow}</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <Link
            href={`/chat?query=${encodeURIComponent(`What are the documents needed for ${scheme.title_en}?`)}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm border border-indigo-200 transition-colors"
          >
            <Bot className="w-4 h-4" />
            <span>{isTa ? 'ஆவணங்கள் குறித்து கேட்க' : 'Check Eligibility with AI'}</span>
          </Link>
        </div>
      </div>

      {/* Grid of Details Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Objectives, Eligibility, Benefits, Steps */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Objectives */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full inline-block" />
              {t.schemeDetails.objectives}
            </h2>
            <ul className="space-y-3">
              {objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Eligibility Criteria */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block" />
              {t.schemeDetails.eligibility}
            </h2>
            <div className="space-y-3">
              {eligibility.map((el, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-3">
                  <span className="font-bold text-indigo-600 shrink-0">#{i + 1}</span>
                  <span>{el}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-emerald-600 rounded-full inline-block" />
              {t.schemeDetails.benefits}
            </h2>
            <ul className="space-y-3">
              {benefits.map((ben, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ₹
                  </div>
                  <span className="leading-relaxed font-medium text-slate-800">{ben}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Step-by-Step Application Steps */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-purple-600 rounded-full inline-block" />
              {t.schemeDetails.applicationSteps}
            </h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-purple-50/40 p-4 rounded-xl border border-purple-100 text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </section>

        </div>

        {/* Right 1 Col: Interactive Document Checklist, Notes, and Citations */}
        <div className="space-y-8">
          
          {/* Interactive Document Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs sticky top-24">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-blue-600" />
                {t.schemeDetails.requiredDocuments}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {completedDocsCount}/{totalDocsCount}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {t.schemeDetails.checklistHint}
            </p>

            {/* Progress bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-2.5">
              {documents.map((doc, idx) => {
                const isChecked = Boolean(checkedDocs[idx]);

                return (
                  <label
                    key={idx}
                    onClick={() => toggleDocCheck(idx)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by label onClick
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="leading-snug">{doc}</span>
                  </label>
                );
              })}
            </div>

            {completedDocsCount === totalDocsCount && totalDocsCount > 0 && (
              <div className="mt-4 p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-semibold text-center flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>
                  {isTa
                    ? 'அனைத்து ஆவணங்களும் தயார்! அதிகாரப்பூர்வ தளத்தில் விண்ணப்பிக்கலாம்.'
                    : 'All documents ready! You are prepared to apply online.'}
                </span>
              </div>
            )}

            {/* Official Source Citation Box */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                {t.schemeDetails.sourceReference}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                📄 {scheme.source_doc_name}
              </p>
              <a
                href={scheme.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-blue-800 text-xs font-semibold transition-colors"
              >
                {t.officialWebsite} →
              </a>
            </div>

            {/* Important Notes */}
            {notes.length > 0 && (
              <div className="mt-6 pt-5 border-t border-slate-200">
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  {t.schemeDetails.importantNotes}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {notes.map((n, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
