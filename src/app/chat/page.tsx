'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Send,
  Bot,
  User,
  Trash2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Languages,
  CheckCircle2,
  FileText,
  CornerDownLeft
} from 'lucide-react';

interface Citation {
  documentName: string;
  page?: number;
  url?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: Citation[];
  grounded?: boolean;
  timestamp: string;
}

function ChatContent() {
  const { language, setLanguage, t } = useLanguage();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('query') || '';

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions in English and Tamil
  const suggestedQuestions = language === 'ta'
    ? [
        "பிரதமர் கிசான் திட்டத்திற்கு யார் தகுதியானவர்கள்?",
        "கல்வி உதவித்தொகைக்கு என்னென்ன ஆவணங்கள் தேவை?",
        "கலைஞர் மகளிர் உரிமைத் திட்டத்திற்கு விண்ணப்பிப்பது எப்படி?",
        "ஆயுஷ்மான் பாரத் இலவச மருத்துவக் காப்பீடு எவ்வாறு பெறுவது?",
        "செல்வமகள் சேமிப்புத் திட்டத்தின் நன்மைகள் என்ன?",
      ]
    : [
        "What is PM Kisan Samman Nidhi and who is eligible?",
        "Who is eligible for the PM Scholarship Scheme?",
        "What documents are required for National Scholarships?",
        "How to apply for Ayushman Bharat PM-JAY health card?",
        "What are the benefits of Sukanya Samriddhi Yojana?",
      ];

  // Initialize initial greeting if empty
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome-1',
          sender: 'assistant',
          text:
            language === 'ta'
              ? `வணக்கம்! நான் உங்கள் **திட்டம்சாரதி (SchemeSaarthi)** AI வழிகாட்டி.\n\nஇந்திய அரசின் நலத்திட்டங்கள், தகுதி வரம்புகள், தேவையான ஆவணங்கள் மற்றும் விண்ணப்பிக்கும் நடைமுறைகள் குறித்து நீங்கள் எந்த கேள்வியையும் என்னிடம் தமிழில் அல்லது ஆங்கிலத்தில் கேட்கலாம்.\n\nகீழே உள்ள மாதிரி வினாக்களை தேர்வு செய்யலாம் அல்லது உங்கள் கேள்வியை நேரடியாக தட்டச்சு செய்யவும்.`
              : `Hello! I am **SchemeSaarthi**, your AI Government Welfare Assistant.\n\nAsk me any question in simple English or தமிழ் about Indian Government schemes, eligibility criteria, required document checklists, and application steps.\n\nEvery answer is strictly grounded in official government gazettes and notifications.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [language]);

  // Handle query parameter on load
  useEffect(() => {
    if (initialQuery && messages.length === 1) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        citations: data.citations || [],
        grounded: data.grounded,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          text:
            language === 'ta'
              ? 'மன்னிக்கவும், தகவலைப் பெறும்போது சிறிய பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.'
              : 'Sorry, I encountered an issue retrieving the official document answer. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'ta'
            ? 'அரட்டை அழிக்கப்பட்டது. உங்கள் புதிய கேள்வியை கேட்கவும்.'
            : 'Conversation cleared. How can I assist you with government schemes today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col h-[calc(100vh-140px)]">
      
      {/* Chat Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Bot className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <span>{t.chat}</span>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                Official RAG
              </span>
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              {language === 'ta' ? 'அரசு ஆவணங்கள் அடிப்படையிலான AI விடை' : 'Strictly Grounded on Government Notifications'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                language === 'ta'
                  ? 'bg-white text-blue-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Clear button */}
          <button
            onClick={clearChat}
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title={t.clearChat}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs overflow-y-auto space-y-6">
        
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                }`}
              >
                {/* Formatted Message Content */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.text}
                </div>

                {/* Official Citations Box */}
                {!isUser && msg.citations && msg.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span>{t.sourcesCited}:</span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.citations.map((cite, i) => (
                        <div
                          key={i}
                          className="flex flex-wrap items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                        >
                          <div className="flex items-center gap-1.5 text-slate-700 font-medium truncate max-w-sm">
                            <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span className="truncate">{cite.documentName}</span>
                            {cite.page && (
                              <span className="text-[10px] text-slate-500">
                                ({t.pageNumber} {cite.page})
                              </span>
                            )}
                          </div>

                          {cite.url && (
                            <a
                              href={cite.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-semibold ml-2"
                            >
                              <span>Official Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`mt-2 text-[10px] text-right ${
                    isUser ? 'text-blue-100' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-amber-300 animate-spin" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-600 flex items-center gap-3 shadow-xs">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>
                {language === 'ta'
                  ? 'அரசு ஆவணங்களில் சரிபார்க்கப்பட்ட தகவல்களை தேடுகிறது...'
                  : 'Retrieving official government records and synthesizing response...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="my-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        <span className="text-xs font-semibold text-slate-500 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          {t.suggestedQuestions}
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200/80 whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="bg-white rounded-2xl border border-slate-300 p-2 shadow-lg shadow-blue-500/5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t.typeYourQuestion}
            className="flex-1 px-4 py-2.5 bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/20 cursor-pointer"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading AI Saarthi Chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}
