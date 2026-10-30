import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCw,
  Printer,
  RotateCcw,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { DecisionModal } from './DecisionModal.jsx';

export function DecisionConsole({ application, onDecisionSubmit, onRevertDecision, lang, t }) {
  const [remarks, setRemarks] = useState('');
  const [modalAction, setModalAction] = useState(null); // 'APPROVE' | 'REJECT' | 'RETURN' | null

  if (!application) return null;

  const isDecided = application.status !== 'PENDING' && application.officerDecision;

  // Preset remarks options in Telugu
  const presetRemarks = [
    {
      labelTe: 'పత్రాలు సరిపోయాయి, మంజూరు చేయడమైనది',
      labelEn: 'Records verified, approved',
      textTe:
        'గ్రామ రెవెన్యూ అధికారి క్షేత్ర నివేదిక మరియు అన్ని పత్రాలు పరిశీలించబడ్డాయి. నిబంధనలకు అనుగుణంగా ఉన్నందున దరఖాస్తును మంజూరు చేయడమైనది.',
    },
    {
      labelTe: 'ఆదాయ పరిమితి మించింది, తిరస్కరించడమైనది',
      labelEn: 'Income exceeds limit, rejected',
      textTe:
        'వెబ్‌ల్యాండ్ అడంగల్ / రవాణా డేటాబేస్ పరిశీలనలో కుటుంబ వార్షిక ఆదాయం ప్రభుత్వ నిబంధనల పరిమితిని మించి ఉన్నట్లు నిర్ధారణ అయినందున దరఖాస్తును తిరస్కరించడమైనది.',
    },
    {
      labelTe: 'పాఠశాల TC అస్పష్టం - పునఃసమీక్ష',
      labelEn: 'School TC blurry - return',
      textTe:
        'పాఠశాల బదిలీ ధ్రువీకరణ పత్రం (TC) అస్పష్టంగా ఉంది. 7 రోజుల్లోగా స్పష్టమైన ప్రతిని రీ-అప్‌లోడ్ చేయవలసిందిగా పునఃసమీక్షకు పంపడమైనది.',
    },
    {
      labelTe: 'ఉమ్మడి పట్టాదారుల NOC లోపం - పునఃసమీక్ష',
      labelEn: 'Joint NOC missing - return',
      textTe:
        'అడంగల్ రికార్డులో ఉన్న ఇతర ఉమ్మడి పట్టాదారుల నిరభ్యంతర పత్రం (NOC) జతపరచనందున సరిచేయడానికి పునఃసమీక్షకు పంపడమైనది.',
    },
  ];

  const handleOpenModal = (action) => {
    setModalAction(action);
  };

  const handleConfirmDecision = (citizenText) => {
    onDecisionSubmit({
      action: modalAction,
      officerRemarks: remarks,
      citizenNotification: citizenText,
    });
    setModalAction(null);
  };

  return (
    <div className="bg-white border-2 border-black rounded-lg shadow-md p-4 font-telugu">
      {/* Header */}
      <div className="border-b border-black pb-2.5 mb-3 flex flex-wrap justify-between items-center gap-2">
        <div>
          <h3 className="font-extrabold text-sm text-black font-telugu flex items-center space-x-2">
            <span>⚖️</span>
            <span>{t.decisionConsoleTitle}</span>
          </h3>
          <p className="text-[11px] text-slate-600 font-telugu mt-0.5">
            {t.decisionConsoleSubtitle}
          </p>
        </div>

        {/* Current Officer Stamp */}
        <div className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded border border-slate-300 font-telugu">
          OFFICER: <strong>{t.officerName}</strong> ({t.officerTitle})
        </div>
      </div>

      {/* If Already Decided -> Show Official Endorsement Order Slip */}
      {isDecided ? (
        <div
          id="printable-endorsement"
          className="bg-slate-50 border-2 border-dashed border-black rounded-lg p-5 font-telugu space-y-4"
        >
          <div className="text-center border-b border-slate-300 pb-3">
            <div className="text-sm font-black text-black font-telugu">{t.endorsementTitle}</div>
            <div className="text-xs text-slate-600 font-telugu">
              రెవెన్యూ శాఖ • భీమునిపట్నం మండలం • విశాఖపట్నం జిల్లా
            </div>
          </div>

          {/* Decision Status Stamp */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded border border-slate-300">
            <div>
              <span className="text-[11px] text-slate-500 block font-telugu">{t.orderNo}</span>
              <span className="font-mono text-sm font-bold text-black">
                {application.officerDecision.orderNumber}
              </span>
            </div>

            <div className="text-center">
              <span
                className={`inline-block text-xs font-black px-4 py-1.5 rounded uppercase tracking-wide border-2 font-telugu ${
                  application.officerDecision.decision === 'APPROVE'
                    ? 'bg-green-100 text-green-900 border-green-600'
                    : application.officerDecision.decision === 'REJECT'
                      ? 'bg-red-100 text-red-900 border-red-600'
                      : 'bg-blue-100 text-blue-900 border-blue-600'
                }`}
              >
                {application.officerDecision.decisionLabelTe}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-500 block font-telugu">{t.decisionDate}</span>
              <span className="text-xs font-semibold text-black">
                {new Date(application.officerDecision.decisionDate).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Officer Remarks on Order */}
          <div className="bg-white p-3 rounded border border-slate-300 text-xs">
            <strong className="text-black block mb-1 font-telugu">
              అధికారి అధికారిక ఉత్తర్వు వివరాలు:
            </strong>
            <p className="text-slate-800 leading-relaxed italic font-telugu">
              "
              {application.officerDecision.officerRemarks ||
                'పత్రాల పరిశీలన అనంతరం నిబంధనల మేరకు పరిష్కరించడమైనది.'}
              "
            </p>
          </div>

          {/* Citizen SMS Dispatched */}
          {application.officerDecision.citizenNotificationSent && (
            <div className="bg-white p-3 rounded border border-slate-300 text-xs">
              <strong className="text-black block mb-1 flex items-center space-x-1 font-telugu">
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>{t.citizenSmsSent}</span>
              </strong>
              <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200 font-telugu">
                {application.officerDecision.citizenNotificationSent}
              </p>
            </div>
          )}

          {/* Digital Signature Footer */}
          <div className="flex flex-wrap items-center justify-between text-xs pt-2 border-t border-slate-300 text-slate-600 font-telugu">
            <div className="flex items-center space-x-1.5 text-green-700 font-semibold">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>
                {t.officerSign}: {application.officerDecision.digitalSignatureHash}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-black hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center space-x-1.5 transition font-telugu"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.btnPrint}</span>
              </button>

              <button
                onClick={() => onRevertDecision(application.id)}
                className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-400 text-slate-800 rounded text-xs font-bold flex items-center space-x-1.5 transition font-telugu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.btnRevert}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* If Pending -> Officer Action Console */
        <div className="space-y-3 font-telugu">
          {/* Quick Remarks Template Chips */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-600 flex items-center justify-between font-telugu">
              <span>{t.quickRemarks}</span>
              <span className="text-[10px] text-slate-400">క్లిక్ చేసి నమోదు చేయండి</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetRemarks.map((pr, idx) => (
                <button
                  key={idx}
                  onClick={() => setRemarks(pr.textTe)}
                  className="text-[11px] bg-slate-100 hover:bg-black hover:text-white text-slate-800 px-2.5 py-1 rounded border border-slate-300 transition font-telugu"
                >
                  {lang === 'te' ? pr.labelTe : pr.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Remarks Textarea */}
          <div className="space-y-1 font-telugu">
            <label className="text-xs font-bold text-black flex items-center justify-between">
              <span>{t.officerRemarksLabel}</span>
              <span className="text-[10px] text-slate-400 font-sans">
                ఐచ్ఛికం, సిఫార్సు చేయబడింది
              </span>
            </label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder={t.remarksPlaceholder}
              className="w-full p-2 text-xs border border-slate-300 rounded focus:outline-none focus:border-black font-telugu"
            />
          </div>

          {/* 3 High-Contrast Core Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* 1. APPROVE Button - GREEN */}
            <button
              onClick={() => handleOpenModal('APPROVE')}
              className="py-3 px-4 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm hover:shadow font-telugu"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>{t.btnApprove}</span>
            </button>

            {/* 2. REJECT Button - RED */}
            <button
              onClick={() => handleOpenModal('REJECT')}
              className="py-3 px-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm hover:shadow font-telugu"
            >
              <XCircle className="w-4 h-4 text-white" />
              <span>{t.btnReject}</span>
            </button>

            {/* 3. RETURN Button - BLUE */}
            <button
              onClick={() => handleOpenModal('RETURN')}
              className="py-3 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm hover:shadow font-telugu"
            >
              <RotateCw className="w-4 h-4 text-white" />
              <span>{t.btnReturn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <DecisionModal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        actionType={modalAction}
        application={application}
        officerRemarks={remarks}
        onConfirm={handleConfirmDecision}
        lang={lang}
        t={t}
      />
    </div>
  );
}
