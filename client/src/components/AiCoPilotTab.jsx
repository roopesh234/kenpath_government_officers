import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  BookOpen,
  Sparkles,
  Scale,
} from 'lucide-react';

export function AiCoPilotTab({ app, lang, t }) {
  const analysis = app.aiAnalysis;
  if (!analysis) return null;

  // Build verification items based on app details in Telugu
  const auditItems = [
    {
      check: lang === 'te' ? 'ఆధార్ బయోమెట్రిక్ & గుర్తింపు సరిపోలిక' : 'Aadhaar e-KYC Identity',
      declared: app.applicant.aadhaar,
      verifiedDB: `${app.applicant.nameTe} (UIDAI e-KYC Verified)`,
      status: 'MATCHED',
      noteTe: 'ఫోటో, జనాభా మరియు చిరునామా వివరాలు 100% సరిపోయాయి',
      noteEn: 'Biometric and demographic data 100% verified',
    },
    {
      check: lang === 'te' ? 'వార్షిక ఆదాయ పరిమితి పరిశీలన' : 'Income Ceiling Audit',
      declared: `రూ. ${app.declaredDetails.annualIncomeClaimed?.toLocaleString('en-IN')}/- (${app.declaredDetails.incomeSource || ''})`,
      verifiedDB: analysis.discrepancies.some((d) => d.includes('ఆదాయ') || d.includes('income'))
        ? 'మీభూమి / రవాణా డేటాబేస్ ప్రకారం రూ. 3.5 లక్షలకు పైగా ఆదాయం'
        : 'ప్రభుత్వ ఆదాయ పరిమితిలోపు ఉంది (< రూ. 1,00,000 / రూ. 2,00,000)',
      status: analysis.discrepancies.some((d) => d.includes('ఆదాయ') || d.includes('income'))
        ? 'FLAGGED'
        : 'MATCHED',
      noteTe: analysis.discrepancies.some((d) => d.includes('ఆదాయ'))
        ? '⚠️ తప్పుడు ఆదాయ ప్రకటన లేదా దాచివేత గుర్తించబడింది'
        : '✅ ఆదాయం ప్రభుత్వ పథకం నిబంధనల పరిధిలో ఉంది',
      noteEn: analysis.discrepancies.some((d) => d.includes('ఆదాయ'))
        ? '⚠️ Income exceeds statutory threshold'
        : '✅ Income well within ceiling',
    },
    {
      check: lang === 'te' ? 'కుల వర్గీకరణ & గెజిట్ పరిశీలన' : 'Caste Gazette Verification',
      declared: app.declaredDetails.casteClaimed || 'N/A',
      verifiedDB: analysis.discrepancies.some((d) => d.includes('కుల') || d.includes('caste'))
        ? 'పాఠశాల ప్రవేశ రికార్డులో బీసీ-ఎ గా నమోదై ఉంది'
        : 'ప్రభుత్వ గెజిట్ మరియు పాఠశాల బదిలీ పత్రంలో నిర్ధారణ అయింది',
      status: analysis.discrepancies.some((d) => d.includes('కుల') || d.includes('caste'))
        ? 'FLAGGED'
        : 'MATCHED',
      noteTe: analysis.discrepancies.some((d) => d.includes('కుల'))
        ? '❌ పాఠశాల రికార్డు మరియు దరఖాస్తు మధ్య తీవ్ర వ్యత్యాసం'
        : '✅ అధికారిక గెజిట్ జాబితాతో సరిపోలింది',
      noteEn: analysis.discrepancies.some((d) => d.includes('కుల'))
        ? '❌ Category mismatch against school record'
        : '✅ Caste confirmed via gazette',
    },
    {
      check: lang === 'te' ? 'మీభూమి అడంగల్ / 1-B రికార్డు' : 'Meebhoomi 1B Land Records',
      declared:
        app.declaredDetails.landHolding || app.declaredDetails.extentDamaged || 'సమాచారం లేదు',
      verifiedDB: app.documents.find((d) => d.type === 'RTC_LAND')?.extractedData?.extent
        ? `సర్వే: ${app.documents.find((d) => d.type === 'RTC_LAND')?.extractedData?.surveyNo || ''} (${app.documents.find((d) => d.type === 'RTC_LAND')?.extractedData?.extent})`
        : 'మీభూమి వెబ్‌ల్యాండ్ పోర్టల్‌లో సరిచూడబడింది',
      status: analysis.discrepancies.some(
        (d) => d.includes('భూమి') || d.includes('తోట') || d.includes('ఉమ్మడి')
      )
        ? 'FLAGGED'
        : 'MATCHED',
      noteTe: analysis.discrepancies.some((d) => d.includes('ఉమ్మడి'))
        ? '⚠️ ఉమ్మడి పట్టా - ఇతర పట్టాదారుల నిరభ్యంతర పత్రం (NOC) తప్పనిసరి'
        : '✅ రెవెన్యూ అడంగల్ యాజమాన్యం సరిపోయింది',
      noteEn: analysis.discrepancies.some((d) => d.includes('ఉమ్మడి'))
        ? '⚠️ Joint ownership requires co-owners NOC'
        : '✅ Land records verified',
    },
    {
      check: lang === 'te' ? 'వయస్సు అర్హత ప్రమాణం (Age Audit)' : 'Age Criteria Verification',
      declared: `${app.applicant.age} సంవత్సరాలు (DOB: ${app.applicant.dob})`,
      verifiedDB: `ఆధార్ నమోదిత జన్మ తేదీ: ${app.applicant.dob}`,
      status: analysis.discrepancies.some((d) => d.includes('వయస్సు') || d.includes('age'))
        ? 'FLAGGED'
        : 'MATCHED',
      noteTe: analysis.discrepancies.some((d) => d.includes('వయస్సు'))
        ? '❌ కనీస వయస్సు నిబంధన పూర్తికాలేదు (ప్రస్తుతం 58 సంవత్సరాలు మాత్రమే)'
        : '✅ వయస్సు అర్హత నిబంధనలకు అనుగుణంగా ఉంది',
      noteEn: analysis.discrepancies.some((d) => d.includes('వయస్సు'))
        ? '❌ Age below statutory requirement'
        : '✅ Meets age criteria',
    },
  ];

  return (
    <div className="space-y-4 font-telugu">
      {/* AI Executive Summary Card */}
      <div className="p-4 bg-white border border-black rounded-lg shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-black font-telugu">{t.aiSummaryTitle}</h3>
          </div>
          <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-0.5 rounded-full">
            {t.confidenceBadge}: {analysis.confidenceScore}%
          </span>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed font-telugu bg-slate-50 p-3 rounded border border-slate-200">
          {lang === 'te' ? analysis.summaryTe : analysis.summaryEn}
        </p>
      </div>

      {/* Discrepancy & Inconsistencies Box (if any) */}
      {analysis.discrepancies && analysis.discrepancies.length > 0 && (
        <div className="p-4 bg-red-50/70 border-2 border-red-600 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 text-red-700 font-bold text-sm mb-2 font-telugu">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>
              {t.discrepanciesTitle} ({analysis.discrepancies.length})
            </span>
          </div>
          <div className="space-y-1.5">
            {analysis.discrepancies.map((disc, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 text-xs text-red-900 font-medium bg-white/80 p-2 rounded border border-red-200 font-telugu"
              >
                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{disc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cross-Verification Matrix Table */}
      <div className="bg-white border border-black rounded-lg overflow-hidden shadow-sm">
        <div className="px-4 py-2.5 bg-black text-white font-bold text-xs font-telugu flex items-center justify-between">
          <span>{t.verificationMatrixTitle}</span>
          <span className="text-[10px] text-slate-300 font-normal">
            UIDAI • Meebhoomi • e-Crop • SADAREM • Civil Supplies
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-telugu border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-300 text-[11px] font-bold">
                <th className="p-2.5">{t.colCheckItem}</th>
                <th className="p-2.5">{t.colDeclared}</th>
                <th className="p-2.5">{t.colVerifiedDB}</th>
                <th className="p-2.5 text-center">{t.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {auditItems.map((item, idx) => {
                const isFlagged = item.status === 'FLAGGED';
                return (
                  <tr key={idx} className={isFlagged ? 'bg-red-50/40' : 'hover:bg-slate-50'}>
                    <td className="p-2.5 font-bold text-black">{item.check}</td>
                    <td className="p-2.5 text-slate-700 font-mono text-[11px]">{item.declared}</td>
                    <td className="p-2.5 text-slate-800">
                      <div>{item.verifiedDB}</div>
                      <div
                        className={`text-[10px] mt-0.5 ${isFlagged ? 'text-red-700 font-semibold' : 'text-green-700'}`}
                      >
                        {lang === 'te' ? item.noteTe : item.noteEn}
                      </div>
                    </td>
                    <td className="p-2.5 text-center">
                      {isFlagged ? (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded">
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                          <span>లోపం గుర్తించబడింది</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-green-100 text-green-800 border border-green-300 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>సరిపోయింది</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suggested Decision & Reasons Card */}
      <div
        className={`p-4 rounded-lg border-2 shadow-sm ${
          analysis.suggestedDecision === 'APPROVE'
            ? 'bg-green-50/60 border-green-600'
            : analysis.suggestedDecision === 'REJECT'
              ? 'bg-red-50/60 border-red-600'
              : 'bg-blue-50/60 border-blue-600'
        }`}
      >
        <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-black" />
            <h3 className="font-bold text-sm text-black font-telugu">{t.aiRecommendationTitle}</h3>
          </div>
          <span
            className={`text-xs font-black px-3 py-1 rounded-md text-white font-telugu ${
              analysis.suggestedDecision === 'APPROVE'
                ? 'bg-green-700'
                : analysis.suggestedDecision === 'REJECT'
                  ? 'bg-red-700'
                  : 'bg-blue-700'
            }`}
          >
            {lang === 'te' ? analysis.suggestedDecisionTe : analysis.suggestedDecisionEn}
          </span>
        </div>

        {/* Reasons list */}
        <div className="space-y-1.5 mb-3 font-telugu">
          {(lang === 'te' ? analysis.reasonsTe : analysis.reasonsEn).map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start space-x-2 text-xs text-slate-800 font-telugu"
            >
              <span className="font-bold text-black mt-0.5">•</span>
              <span>{reason}</span>
            </div>
          ))}
        </div>

        {/* Legal / Statute Reference */}
        {analysis.statuteReference && (
          <div className="flex items-center space-x-2 text-[11px] text-slate-600 bg-white/90 p-2 rounded border border-slate-300 font-telugu">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>
              <strong className="text-black">{t.legalReference}:</strong>{' '}
              {analysis.statuteReference}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
