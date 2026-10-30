import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, HelpCircle, Bot, User } from 'lucide-react';

export function InteractiveAiChatTab({ app, lang, t }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      textTe: `నమస్కారం అధికారులారా! దరఖాస్తు సంఖ్య ${app.applicationNumber} (${app.applicant.nameTe}) గారి దస్త్రాన్ని నేను పరిశీలించాను. ఈ దరఖాస్తు ఆదాయ పరిమితి, సమర్పించిన పత్రాలు, కులం, వెబ్‌ల్యాండ్ అడంగల్ లేదా సేవా గడువుల గురించి ఏదైనా ప్రశ్న అడగండి.`,
      textEn: `Greetings Officer! I have audited Application #${app.applicationNumber} for ${app.applicant.nameEn}. Ask me any questions regarding income thresholds, missing attachments, land holdings, or applicable regulations.`,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const presets = [
    { labelTe: 'ఆదాయ పరిమితి సరిపోతుందా?', labelEn: 'Is income within limit?', query: 'ఆదాయం' },
    { labelTe: 'ఏ పత్రాలు లోపించాయి?', labelEn: 'Which documents are missing?', query: 'పత్రాలు' },
    {
      labelTe: 'కుల వర్గీకరణ సరిగ్గా ఉందా?',
      labelEn: 'Is caste classification verified?',
      query: 'కులం',
    },
    {
      labelTe: 'సేవా గడువు (SLA) ఎప్పుడు?',
      labelEn: 'What is the statutory SLA status?',
      query: 'గడువు',
    },
  ];

  const handleAsk = async (textToSend) => {
    const q = (textToSend || query).trim();
    if (!q) return;

    // Add user message
    const userMsg = { sender: 'user', textTe: q, textEn: q };
    setMessages((prev) => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const res = await fetch(`/api/applications/${app.id}/ask-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();

      const aiMsg = {
        sender: 'ai',
        textTe: data.te || data.answerTe || 'వివరాలు అందుబాటులో లేవు.',
        textEn: data.en || data.answerEn || 'Details not available.',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          textTe: 'క్షమించండి, సమాధానం అందించడంలో లోపం ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
          textEn: 'Sorry, error processing response. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-black rounded-lg shadow-sm flex flex-col h-[480px] overflow-hidden font-telugu">
      {/* Chat Header */}
      <div className="p-3 bg-black text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-xs font-telugu">{t.aiChatTitle}</span>
        </div>
        <span className="text-[10px] text-slate-300 font-sans">
          GPT-Gov Telugu Co-Pilot Assistant
        </span>
      </div>

      {/* Preset Query Chips */}
      <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] font-bold text-slate-500 font-telugu flex items-center space-x-1">
          <HelpCircle className="w-3 h-3 text-blue-600" />
          <span>{t.presetQueriesTitle}</span>
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(p.query)}
            className="text-[11px] bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-300 hover:border-blue-500 px-2.5 py-1 rounded-full font-telugu transition shadow-2xs"
          >
            {lang === 'te' ? p.labelTe : p.labelEn}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {messages.map((m, idx) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={idx}
              className={`flex items-start space-x-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed font-telugu shadow-2xs ${
                  isUser
                    ? 'bg-black text-white rounded-br-none'
                    : 'bg-white border border-slate-300 text-black rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{lang === 'te' ? m.textTe : m.textEn}</div>
              </div>
              {isUser && (
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        {loading && (
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-telugu bg-white border border-slate-200 p-2.5 rounded-lg w-fit">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>AI దస్త్రాన్ని పరిశీలిస్తోంది...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk(query);
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2 font-telugu"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.askPlaceholder}
          className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-black font-telugu"
        />
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="px-4 py-2 bg-black hover:bg-slate-800 disabled:opacity-50 text-white rounded-md text-xs font-bold font-telugu flex items-center space-x-1.5 transition"
        >
          <Send className="w-3.5 h-3.5 text-blue-400" />
          <span>{t.btnAsk}</span>
        </button>
      </form>
    </div>
  );
}
