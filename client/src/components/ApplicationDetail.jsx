import React, { useState } from 'react';
import { Sparkles, FileText, UserCheck, MessageSquare, Clock } from 'lucide-react';
import { AiCoPilotTab } from './AiCoPilotTab.jsx';
import { DocumentViewerTab } from './DocumentViewerTab.jsx';
import { FieldReportTab } from './FieldReportTab.jsx';
import { InteractiveAiChatTab } from './InteractiveAiChatTab.jsx';
import { DecisionConsole } from './DecisionConsole.jsx';

export function ApplicationDetail({ application, onDecisionSubmit, onRevertDecision, lang, t }) {
  const [activeTab, setActiveTab] = useState('AI_COPILOT'); // 'AI_COPILOT' | 'DOSSIER' | 'FIELD_REPORT' | 'AI_CHAT'

  if (!application) {
    return (
      <div className="bg-white border border-black rounded-lg p-12 text-center h-[calc(100vh-180px)] flex flex-col items-center justify-center space-y-3 shadow-sm font-telugu">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl border border-slate-300">
          📋
        </div>
        <h3 className="font-bold text-base text-black font-telugu">{t.selectApplicationPrompt}</h3>
        <p className="text-xs text-slate-500 max-w-sm font-telugu">
          ఎడమవైపు జాబితాలోని ఏదైనా దరఖాస్తుపై క్లిక్ చేసి AI విశ్లేషణ, పత్రాల సరిపోలిక మరియు నిర్ణయ
          వేదికను వీక్షించండి.
        </p>
      </div>
    );
  }

  // Calculate SLA percentage
  const slaRemaining = Math.max(0, application.slaDaysRemaining);
  const slaTotal = application.slaDaysTotal || 14;
  const slaElapsed = Math.max(0, slaTotal - slaRemaining);
  const slaPercentage = Math.min(100, Math.round((slaElapsed / slaTotal) * 100));
  const isSlaCritical = slaRemaining <= 2 && application.status === 'PENDING';

  return (
    <div className="space-y-4 font-telugu">
      {/* Top Profile & SLA Summary Card */}
      <div className="bg-white border border-black rounded-lg p-4 shadow-sm">
        {/* Top Header Row */}
        <div className="flex flex-wrap items-start justify-between border-b border-slate-200 pb-3 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-extrabold text-black bg-slate-100 px-2 py-0.5 rounded border border-slate-300">
                {application.applicationNumber}
              </span>
              <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-telugu">
                {lang === 'te' ? application.serviceNameTe : application.serviceNameEn}
              </span>
            </div>

            <h2 className="text-lg font-black text-black font-telugu mt-1.5 flex items-center space-x-2">
              <span>
                {lang === 'te' ? application.applicant.nameTe : application.applicant.nameEn}
              </span>
              <span className="text-xs font-normal text-slate-500 font-sans">
                ({application.applicant.gender}, {application.applicant.age} Yrs)
              </span>
            </h2>
          </div>

          {/* Status Badge */}
          <div>
            {application.status === 'PENDING' ? (
              <span className="inline-block text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded font-telugu">
                ⏳ {t.tabPending}
              </span>
            ) : application.status === 'APPROVED' ? (
              <span className="inline-block text-xs font-bold bg-green-100 text-green-900 border border-green-400 px-3 py-1 rounded font-telugu">
                ✓ {t.tabApproved}
              </span>
            ) : application.status === 'REJECTED' ? (
              <span className="inline-block text-xs font-bold bg-red-100 text-red-900 border border-red-400 px-3 py-1 rounded font-telugu">
                ✕ {t.tabRejected}
              </span>
            ) : (
              <span className="inline-block text-xs font-bold bg-blue-100 text-blue-900 border border-blue-400 px-3 py-1 rounded font-telugu">
                ↺ {t.tabReturned}
              </span>
            )}
          </div>
        </div>

        {/* Citizen Quick Metadata Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-3 text-xs font-telugu border-b border-slate-200">
          <div>
            <span className="text-[11px] text-slate-500 block font-telugu">
              {t.fatherHusbandName}:
            </span>
            <strong className="text-black font-telugu">
              {application.applicant.fatherNameTe || application.applicant.husbandNameTe}
            </strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block font-telugu">{t.aadhaarNo}:</span>
            <strong className="text-black font-mono">{application.applicant.aadhaar}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block font-telugu">{t.mobileNo}:</span>
            <strong className="text-black font-mono">{application.applicant.mobile}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-500 block font-telugu">{t.villageHobli}:</span>
            <strong className="text-black font-telugu">
              {application.applicant.village}, {application.applicant.hobli}
            </strong>
          </div>
        </div>

        {/* SLA Progress Indicator */}
        <div className="pt-3 font-telugu">
          <div className="flex items-center justify-between text-xs mb-1 font-telugu">
            <span className="font-bold text-slate-700 flex items-center space-x-1.5">
              <Clock
                className={`w-3.5 h-3.5 ${isSlaCritical ? 'text-red-600' : 'text-slate-500'}`}
              />
              <span>పౌర సేవల చట్టబద్ధ గడువు (MeeSeva / Citizen SLA Guarantee):</span>
            </span>
            <span className={`font-bold ${isSlaCritical ? 'text-red-600' : 'text-slate-700'}`}>
              {application.slaDaysRemaining <= 0
                ? '⚠️ గడువు ముగిసింది! (SLA Breached)'
                : `${application.slaDaysRemaining} ${t.slaRemaining} (${slaTotal} రోజులలో)`}
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isSlaCritical ? 'bg-red-600' : 'bg-black'
              }`}
              style={{ width: `${slaPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b-2 border-black bg-white rounded-t-lg overflow-hidden shadow-xs font-telugu">
        {[
          { id: 'AI_COPILOT', label: t.tabAiCoPilot, icon: Sparkles, color: 'text-blue-600' },
          { id: 'DOSSIER', label: t.tabDossier, icon: FileText, color: 'text-slate-700' },
          { id: 'FIELD_REPORT', label: t.tabFieldReport, icon: UserCheck, color: 'text-slate-700' },
          {
            id: 'AI_CHAT',
            label: t.tabInteractiveAi,
            icon: MessageSquare,
            color: 'text-purple-600',
          },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-3 text-center text-xs font-bold font-telugu transition flex items-center justify-center space-x-1.5 border-r border-slate-200 last:border-r-0 ${
                isActive ? 'bg-black text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'AI_COPILOT' && <AiCoPilotTab app={application} lang={lang} t={t} />}
        {activeTab === 'DOSSIER' && (
          <DocumentViewerTab documents={application.documents} app={application} lang={lang} />
        )}
        {activeTab === 'FIELD_REPORT' && (
          <FieldReportTab
            fieldInspection={application.fieldInspection}
            app={application}
            lang={lang}
          />
        )}
        {activeTab === 'AI_CHAT' && <InteractiveAiChatTab app={application} lang={lang} t={t} />}
      </div>

      {/* Bottom Sticky Decision Console */}
      <DecisionConsole
        application={application}
        onDecisionSubmit={onDecisionSubmit}
        onRevertDecision={onRevertDecision}
        lang={lang}
        t={t}
      />
    </div>
  );
}
