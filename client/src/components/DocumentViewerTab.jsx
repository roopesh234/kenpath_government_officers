import React, { useState } from 'react';
import { FileText, CheckCircle, AlertTriangle, XCircle, ShieldCheck, Search } from 'lucide-react';

export function DocumentViewerTab({ documents, app, lang }) {
  const [activeDocId, setActiveDocId] = useState(documents[0]?.id || null);
  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-telugu">
      {/* Left List of Documents */}
      <div className="md:col-span-1 space-y-2">
        <div className="text-xs font-bold text-slate-700 font-telugu px-1 flex justify-between items-center">
          <span>జతపరచిన పత్రాలు ({documents.length})</span>
          <span className="text-[10px] text-slate-500 font-normal">మీసేవ / సచివాలయం</span>
        </div>
        <div className="space-y-2">
          {documents.map((doc) => {
            const isSelected = activeDoc?.id === doc.id;
            const isVerified = doc.status === 'VERIFIED';
            const isFlagged = doc.status === 'FLAGGED';
            const isMissing = doc.status === 'MISSING';

            return (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`w-full p-3 text-left rounded-lg border transition flex items-start justify-between font-telugu ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 shadow-sm'
                    : 'bg-white border-slate-300 hover:border-black'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-bold text-black font-telugu">
                      {lang === 'te' ? doc.nameTe : doc.nameEn}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-sans">
                    మూలం: {doc.verifiedVia}
                  </div>
                </div>

                {/* Status Indicator */}
                <div>
                  {isVerified && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-green-700 bg-green-100 border border-green-300 px-1.5 py-0.5 rounded">
                      <CheckCircle className="w-2.5 h-2.5" />
                      <span>ధ్రువీకరించబడింది</span>
                    </span>
                  )}
                  {isFlagged && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-red-700 bg-red-100 border border-red-300 px-1.5 py-0.5 rounded">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      <span>లోపం</span>
                    </span>
                  )}
                  {isMissing && (
                    <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-red-700 bg-red-100 border border-red-300 px-1.5 py-0.5 rounded">
                      <XCircle className="w-2.5 h-2.5" />
                      <span>కొరత</span>
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Document Dossier Inspector */}
      <div className="md:col-span-2 bg-white border border-black rounded-lg p-4 shadow-sm flex flex-col justify-between">
        {activeDoc ? (
          <div className="space-y-4">
            {/* Header of Active Doc */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm text-black font-telugu">
                    {lang === 'te' ? activeDoc.nameTe : activeDoc.nameEn}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-slate-700">
                    {activeDoc.type}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-telugu mt-0.5">
                  ధ్రువీకరణ మూలం:{' '}
                  <strong className="text-slate-800">{activeDoc.verifiedVia}</strong>
                </div>
              </div>

              {/* Status Pill */}
              <div>
                {activeDoc.status === 'VERIFIED' ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold bg-green-100 text-green-800 border border-green-300 px-2.5 py-1 rounded font-telugu">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    <span>అధికారికంగా సరిచూడబడింది</span>
                  </span>
                ) : activeDoc.status === 'MISSING' ? (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded font-telugu">
                    <XCircle className="w-3.5 h-3.5 text-red-600" />
                    <span>పత్రం జతపరచలేదు</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 text-xs font-bold bg-red-100 text-red-800 border border-red-300 px-2.5 py-1 rounded font-telugu">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>వ్యత్యాసం / లోపం గుర్తించబడింది</span>
                  </span>
                )}
              </div>
            </div>

            {/* Extracted Data Card */}
            <div className="bg-slate-50 border border-slate-300 rounded-lg p-3">
              <div className="text-xs font-bold text-black font-telugu mb-2 flex items-center space-x-1.5">
                <Search className="w-3.5 h-3.5 text-blue-600" />
                <span>డిజిటల్ డేటాబేస్ నుండి పొందిన వివరాలు (OCR / API):</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {activeDoc.extractedData &&
                  Object.entries(activeDoc.extractedData).map(([key, val]) => (
                    <div key={key} className="bg-white p-2 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[10px] uppercase font-sans">
                        {key}
                      </span>
                      <span className="font-semibold text-black break-words font-telugu">
                        {typeof val === 'boolean'
                          ? val
                            ? 'అవును (True)'
                            : 'కాదు (False)'
                          : Array.isArray(val)
                            ? val.join(', ')
                            : val}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Simulated Official Document Scan Box */}
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-5 bg-white relative min-h-[160px] flex flex-col justify-between font-telugu">
              <div className="text-center space-y-1">
                <div className="text-xs font-bold text-slate-800 font-telugu">
                  ప్రభుత్వ రెవెన్యూ శాఖ • మీసేవ / గ్రామ సచివాలయం ఇ-పత్రాల రికార్డు
                </div>
                <div className="text-[11px] text-slate-500">
                  దరఖాస్తు సంఖ్య: {app.applicationNumber} • దరఖాస్తుదారుడు: {app.applicant.nameTe}
                </div>
              </div>

              {activeDoc.status === 'MISSING' ? (
                <div className="text-center py-6 text-red-600 font-bold font-telugu text-xs">
                  ⚠️ దరఖాస్తుదారుడు ఈ తప్పనిసరి పత్రాన్ని అప్‌లోడ్ చేయలేదు.
                </div>
              ) : activeDoc.status === 'FLAGGED' ? (
                <div className="text-center py-4 bg-red-50 rounded border border-red-200 text-red-800 font-telugu text-xs">
                  <div className="font-bold">⚠️ ఈ పత్రంలో వ్యత్యాసం లేదా అస్పష్టత ఉంది:</div>
                  <div className="mt-1 text-[11px]">
                    {activeDoc.extractedData?.flag || 'పత్రం వివరాలు సరిపోలడం లేదు.'}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 bg-green-50 rounded border border-green-200 text-green-800 font-telugu text-xs">
                  <div className="font-bold">✓ అధికారిక డిజిటల్ ధ్రువీకరణ పూర్తయింది</div>
                  <div className="mt-1 text-[11px]">
                    e-Gov సర్వర్ ద్వారా స్వయంచాలకంగా సరిపోల్చబడింది.
                  </div>
                </div>
              )}

              <div className="text-[10px] text-slate-400 text-right font-mono">
                SECURE GOV HASH: {Math.random().toString(36).substring(2, 12).toUpperCase()}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-slate-400 font-telugu text-xs">
            పత్రాన్ని ఎంచుకోండి
          </div>
        )}
      </div>
    </div>
  );
}
