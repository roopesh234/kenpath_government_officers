import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCw, AlertTriangle, Send } from 'lucide-react';

export function DecisionModal({
  isOpen,
  onClose,
  actionType,
  application,
  officerRemarks,
  onConfirm,
  lang,
  t,
}) {
  if (!isOpen || !application) return null;

  // Default citizen SMS preview in Telugu
  const defaultCitizenSms =
    actionType === 'APPROVE'
      ? application.aiAnalysis?.suggestedCitizenRemarkTe ||
        `దరఖాస్తు సంఖ్య ${application.applicationNumber} ఆమోదించబడింది. మీసేవ లేదా గ్రామ సచివాలయం పోర్టల్‌లో ఉత్తర్వు అందుబాటులో ఉంది.`
      : actionType === 'REJECT'
        ? `దరఖాస్తు సంఖ్య ${application.applicationNumber} తిరస్కరించబడింది. కారణం: ${officerRemarks || application.aiAnalysis?.suggestedCitizenRemarkTe || 'ఆదాయ పరిమితి లేదా ప్రభుత్వ నిబంధనల ఉల్లంఘన.'}`
        : `దరఖాస్తు సంఖ్య ${application.applicationNumber} పునఃసమీక్షకు పంపబడింది. లోపించిన పత్రాలను 7 రోజుల్లోగా గ్రామ సచివాలయంలో సమర్పించగలరు.`;

  const [citizenText, setCitizenText] = useState(defaultCitizenSms);

  const getTheme = () => {
    if (actionType === 'APPROVE') {
      return {
        titleTe: 'దరఖాస్తు ఆమోద నిర్ధారణ (Approve Order)',
        btnBg: 'bg-green-700 hover:bg-green-800 text-white',
        border: 'border-green-600',
        badge: 'bg-green-100 text-green-800 border-green-300',
        icon: CheckCircle2,
        btnTextTe: 'తుది మంజూరు చేయండి (Final Approve)',
      };
    }
    if (actionType === 'REJECT') {
      return {
        titleTe: 'దరఖాస్తు తిరస్కరణ నిర్ధారణ (Reject Application)',
        btnBg: 'bg-red-700 hover:bg-red-800 text-white',
        border: 'border-red-600',
        badge: 'bg-red-100 text-red-800 border-red-300',
        icon: XCircle,
        btnTextTe: 'తుది తిరస్కరణ చేయండి (Final Reject)',
      };
    }
    return {
      titleTe: 'పునఃసమీక్షకు పంపే నిర్ధారణ (Return to Citizen)',
      btnBg: 'bg-blue-700 hover:bg-blue-800 text-white',
      border: 'border-blue-600',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: RotateCw,
      btnTextTe: 'పౌరునికి పునఃసమీక్ష నోటీసు పంపండి (Send Return Notice)',
    };
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-telugu">
      <div
        className={`bg-white rounded-lg border-2 ${theme.border} shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in duration-150`}
      >
        {/* Modal Header */}
        <div className="p-4 bg-black text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-white" />
            <h3 className="font-bold text-sm font-telugu">{theme.titleTe}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 font-telugu">
          {/* Summary Box */}
          <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500 font-telugu">దరఖాస్తు సంఖ్య:</span>
              <strong className="text-black font-mono">{application.applicationNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-telugu">దరఖాస్తుదారుడు:</span>
              <strong className="text-black font-telugu">
                {application.applicant.nameTe} ({application.applicant.village})
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-telugu">సేవ:</span>
              <span className="text-slate-800 font-telugu">{application.serviceNameTe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-telugu">అధికారి గమనిక:</span>
              <span className="text-slate-800 italic font-telugu">
                {officerRemarks || 'ప్రత్యేక గమనికలు ఏవీ లేవు'}
              </span>
            </div>
          </div>

          {/* Statutory Notice */}
          <div className="flex items-start space-x-2 text-xs bg-amber-50 border border-amber-300 p-3 rounded text-amber-900 font-telugu">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>చట్టబద్ధ హెచ్చరిక:</strong> ఈ పరిష్కార ఉత్తర్వు మీ డిజిటల్ సంతకంతో ప్రభుత్వ
              అధికారిక రికార్డులలో భద్రపరచబడుతుంది మరియు పౌరునికి తక్షణ SMS రూపంలో చేరవేయబడుతుంది.
            </div>
          </div>

          {/* Citizen SMS Text Box */}
          <div className="space-y-1.5 font-telugu">
            <label className="text-xs font-bold text-black flex items-center justify-between">
              <span className="flex items-center space-x-1">
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>పౌరునికి పంపే SMS సందేశం (Citizen Notification):</span>
              </span>
              <span className="text-[10px] text-slate-500 font-sans">తెలుగు భాషలో</span>
            </label>
            <textarea
              rows={3}
              value={citizenText}
              onChange={(e) => setCitizenText(e.target.value)}
              className="w-full p-2.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-black font-telugu"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end space-x-2 font-telugu">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:border-black rounded transition font-telugu"
          >
            రద్దు చేయండి (Cancel)
          </button>
          <button
            onClick={() => onConfirm(citizenText)}
            className={`px-5 py-2 text-xs font-bold rounded transition shadow-sm font-telugu ${theme.btnBg}`}
          >
            {theme.btnTextTe}
          </button>
        </div>
      </div>
    </div>
  );
}
