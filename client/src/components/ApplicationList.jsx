import React from 'react';
import {
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  RotateCw,
  XCircle,
  ArrowUpDown,
} from 'lucide-react';

export function ApplicationList({
  applications,
  selectedApp,
  onSelectApp,
  searchTerm,
  setSearchTerm,
  statusTab,
  setStatusTab,
  filterType,
  setFilterType,
  serviceFilter,
  setServiceFilter,
  sortBy,
  setSortBy,
  t,
  lang,
}) {
  return (
    <div className="bg-white border border-black rounded-lg shadow-sm flex flex-col h-[calc(100vh-180px)] overflow-hidden font-telugu">
      {/* Search & Main Controls */}
      <div className="p-3 border-b border-slate-200 bg-slate-50 space-y-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-black font-telugu"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-black"
            >
              ✕
            </button>
          )}
        </div>

        {/* Status Tabs (Pending, Approved, Rejected, Returned) */}
        <div className="flex border-b border-slate-200 text-xs font-bold">
          {[
            { id: 'PENDING', label: t.tabPending, color: 'text-black border-black' },
            { id: 'APPROVED', label: t.tabApproved, color: 'text-green-700 border-green-600' },
            { id: 'REJECTED', label: t.tabRejected, color: 'text-red-700 border-red-600' },
            { id: 'RETURNED', label: t.tabReturned, color: 'text-blue-700 border-blue-600' },
            { id: 'ALL', label: t.filterAll, color: 'text-slate-800 border-slate-800' },
          ].map((tab) => {
            const isActive = statusTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusTab(tab.id)}
                className={`flex-1 py-1.5 px-1 text-center font-telugu border-b-2 transition text-[11px] ${
                  isActive
                    ? `${tab.color} bg-white shadow-sm`
                    : 'border-transparent text-slate-500 hover:text-black hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Priority Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { id: 'ALL', label: t.filterAll, icon: null },
            { id: 'URGENT', label: t.filterUrgent, icon: AlertCircle, color: 'text-red-600' },
            { id: 'HIGH_RISK', label: t.filterHighRisk, icon: XCircle, color: 'text-red-600' },
            {
              id: 'AI_APPROVED',
              label: t.filterAiApproved,
              icon: CheckCircle,
              color: 'text-green-600',
            },
          ].map((filter) => {
            const isActive = filterType === filter.id;
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setFilterType(filter.id)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center space-x-1 transition font-telugu ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-black'
                }`}
              >
                {Icon && <Icon className={`w-3 h-3 ${isActive ? 'text-white' : filter.color}`} />}
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: Service & Sort */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] text-slate-700 focus:outline-none focus:border-black font-telugu max-w-[180px]"
          >
            <option value="ALL">{t.serviceAll}</option>
            <option value="CASTE_INCOME">{t.serviceCasteIncome}</option>
            <option value="SANDHYA_SURAKSHA">{t.servicePension}</option>
            <option value="CROP_LOSS_RELIEF">{t.serviceCropLoss}</option>
            <option value="LAND_MUTATION">{t.serviceMutation}</option>
            <option value="DISABILITY_PENSION">{t.serviceDisability}</option>
          </select>

          <div className="flex items-center space-x-1 text-slate-600">
            <ArrowUpDown className="w-3 h-3" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] text-slate-700 focus:outline-none focus:border-black font-telugu"
            >
              <option value="SLA_URGENT">{t.sortSla}</option>
              <option value="PRIORITY_SCORE">{t.sortPriority}</option>
              <option value="DATE_DESC">{t.sortDate}</option>
            </select>
          </div>
        </div>
      </div>

      {/* List Header Count */}
      <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px] font-bold text-slate-700 flex justify-between items-center font-telugu">
        <span>{t.queueHeading}</span>
        <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-sans">
          {applications.length}
        </span>
      </div>

      {/* Applications Cards List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-200">
        {applications.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-telugu text-xs">
            ఎలాంటి దరఖాస్తులు కనుగొనబడలేదు. ఫిల్టర్లు మార్చి ప్రయత్నించండి.
          </div>
        ) : (
          applications.map((app) => {
            const isSelected = selectedApp?.id === app.id;
            const isSlaBreached = app.slaDaysRemaining <= 0;
            const isSlaUrgent = app.slaDaysRemaining <= 2 && app.status === 'PENDING';
            const aiDecision = app.aiAnalysis?.suggestedDecision;

            return (
              <div
                key={app.id}
                onClick={() => onSelectApp(app)}
                className={`p-3 cursor-pointer transition relative border-l-4 font-telugu ${
                  isSelected
                    ? 'bg-blue-50/70 border-l-blue-600 border-black'
                    : 'hover:bg-slate-50 border-l-transparent'
                }`}
              >
                {/* Top Row: App ID & SLA Badge */}
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="font-mono text-xs font-bold text-black tracking-wide">
                    {app.applicationNumber}
                  </span>

                  {/* SLA Badge */}
                  {app.status === 'PENDING' ? (
                    isSlaBreached ? (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded animate-pulse">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{t.slaExpired}</span>
                      </span>
                    ) : isSlaUrgent ? (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold bg-red-100 text-red-700 border border-red-300 px-2 py-0.5 rounded">
                        <Clock className="w-2.5 h-2.5" />
                        <span>
                          {app.slaDaysRemaining === 0
                            ? t.slaToday
                            : `${app.slaDaysRemaining} ${t.slaRemaining}`}
                        </span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        <Clock className="w-2.5 h-2.5 text-slate-400" />
                        <span>
                          {app.slaDaysRemaining} {t.slaRemaining}
                        </span>
                      </span>
                    )
                  ) : (
                    /* Final Status Badge */
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        app.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : app.status === 'REJECTED'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                      }`}
                    >
                      {app.status === 'APPROVED' && '✓ ' + t.tabApproved}
                      {app.status === 'REJECTED' && '✕ ' + t.tabRejected}
                      {app.status === 'RETURNED' && '↺ ' + t.tabReturned}
                    </span>
                  )}
                </div>

                {/* Citizen Name & Village */}
                <div className="font-bold text-sm text-black font-telugu flex items-center justify-between">
                  <span>{lang === 'te' ? app.applicant.nameTe : app.applicant.nameEn}</span>
                  <span className="text-[11px] font-medium text-slate-500 font-sans">
                    {app.applicant.village}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 font-telugu mt-0.5 truncate">
                  {lang === 'te' ? app.serviceNameTe : app.serviceNameEn}
                </div>

                {/* AI Suggestion Indicator Bar */}
                <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-1.5">
                    {aiDecision === 'APPROVE' && (
                      <span className="flex items-center space-x-1 text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200 font-telugu">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>
                          {lang === 'te'
                            ? app.aiAnalysis.suggestedDecisionTe
                            : app.aiAnalysis.suggestedDecisionEn}
                        </span>
                      </span>
                    )}
                    {aiDecision === 'REJECT' && (
                      <span className="flex items-center space-x-1 text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200 font-telugu">
                        <XCircle className="w-3 h-3 text-red-600" />
                        <span>
                          {lang === 'te'
                            ? app.aiAnalysis.suggestedDecisionTe
                            : app.aiAnalysis.suggestedDecisionEn}
                        </span>
                      </span>
                    )}
                    {aiDecision === 'RETURN' && (
                      <span className="flex items-center space-x-1 text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-telugu">
                        <RotateCw className="w-3 h-3 text-blue-600" />
                        <span>
                          {lang === 'te'
                            ? app.aiAnalysis.suggestedDecisionTe
                            : app.aiAnalysis.suggestedDecisionEn}
                        </span>
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-semibold text-slate-500 font-mono">
                    AI {app.aiAnalysis.confidenceScore}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
