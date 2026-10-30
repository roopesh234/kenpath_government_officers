import React from 'react';
import { UserCheck, CheckCircle2, XCircle, MapPin, Calendar, FileText } from 'lucide-react';

export function FieldReportTab({ fieldInspection, app, lang }) {
  if (!fieldInspection) {
    return (
      <div className="p-8 text-center text-slate-500 font-telugu text-xs bg-white border border-black rounded-lg">
        క్షేత్ర పరిశీలన నివేదిక అందుబాటులో లేదు.
      </div>
    );
  }

  return (
    <div className="bg-white border border-black rounded-lg p-5 shadow-sm space-y-4 font-telugu">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 gap-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-700">
            <UserCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-black font-telugu">
              {fieldInspection.inspectedBy}
            </div>
            <div className="text-[11px] text-slate-500 font-telugu flex items-center space-x-3 mt-0.5">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>విచారణ తేదీ: {fieldInspection.inspectionDate}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>గ్రామం: {app.applicant.village}</span>
              </span>
            </div>
          </div>
        </div>

        {/* VRO Recommendation Badge */}
        <div>
          {fieldInspection.recommended ? (
            <span className="inline-flex items-center space-x-1 text-xs font-bold bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-md font-telugu">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>వీఆర్వో సిఫార్సు: ఆమోదించవచ్చును</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 text-xs font-bold bg-red-100 text-red-800 border border-red-300 px-3 py-1 rounded-md font-telugu">
              <XCircle className="w-4 h-4 text-red-600" />
              <span>వీఆర్వో గమనిక: లోపం / సిఫార్సు చేయలేదు</span>
            </span>
          )}
        </div>
      </div>

      {/* Field Inspection Detailed Remarks */}
      <div className="space-y-2 font-telugu">
        <div className="text-xs font-bold text-black font-telugu flex items-center space-x-1.5">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>క్షేత్రస్థాయి పంచనామా మరియు విచారణ నివేదిక (Field Mahazar Findings):</span>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-relaxed text-slate-800 font-telugu">
          {lang === 'te' ? fieldInspection.remarksTe : fieldInspection.remarksEn}
        </div>
      </div>

      {/* Official Signatory Note */}
      <div className="p-3 bg-white border border-slate-200 rounded text-[11px] text-slate-600 font-telugu flex items-center justify-between">
        <span>గ్రామ సచివాలయ స్థాయి క్షేత్ర విచారణ పూర్తయింది.</span>
        <span className="font-mono text-slate-500">DIGITALLY SIGNED BY VRO</span>
      </div>
    </div>
  );
}
