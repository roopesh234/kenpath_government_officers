import React from 'react';
import { Clock, AlertTriangle, CheckCircle2, RotateCw } from 'lucide-react';

export function StatsOverview({ stats, t, currentFilter, onSelectFilter }) {
  if (!stats) return null;

  const cards = [
    {
      id: 'TOTAL_PENDING',
      label: t.metricTotalPending,
      count: stats.pending,
      subtext: `${stats.total} మొత్తం నమోదైనవి (Total Registered)`,
      icon: Clock,
      theme: 'black',
      borderColor:
        currentFilter === 'ALL'
          ? 'border-black ring-2 ring-black'
          : 'border-slate-300 hover:border-black',
      bgColor: 'bg-white',
      textColor: 'text-black',
      badgeColor: 'bg-slate-100 text-slate-800',
    },
    {
      id: 'URGENT_SLA',
      label: t.metricUrgentSla,
      count: stats.urgentSla,
      subtext: 'పరిష్కార గడువు 2 రోజుల కంటే తక్కువ (SLA ≤ 2 Days)',
      icon: AlertTriangle,
      theme: 'red',
      borderColor:
        currentFilter === 'URGENT'
          ? 'border-red-600 ring-2 ring-red-600'
          : 'border-red-200 hover:border-red-600',
      bgColor: 'bg-red-50/50',
      textColor: 'text-red-600',
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      id: 'AI_READY',
      label: t.metricAiReady,
      count: stats.aiReadyApproval,
      subtext: 'అన్ని పత్రాలు సరిపోయాయి (Verified Clear)',
      icon: CheckCircle2,
      theme: 'green',
      borderColor:
        currentFilter === 'AI_APPROVED'
          ? 'border-green-600 ring-2 ring-green-600'
          : 'border-green-200 hover:border-green-600',
      bgColor: 'bg-green-50/50',
      textColor: 'text-green-600',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      id: 'DISCREPANCY',
      label: t.metricDiscrepancy,
      count: stats.highRisk + stats.returned,
      subtext: 'పత్రాల లోపాలు / పునఃసమీక్ష అవసరం',
      icon: RotateCw,
      theme: 'blue',
      borderColor:
        currentFilter === 'HIGH_RISK'
          ? 'border-blue-600 ring-2 ring-blue-600'
          : 'border-blue-200 hover:border-blue-600',
      bgColor: 'bg-blue-50/50',
      textColor: 'text-blue-600',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4 font-telugu">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={() => {
              if (card.id === 'TOTAL_PENDING') onSelectFilter('ALL');
              else if (card.id === 'URGENT_SLA') onSelectFilter('URGENT');
              else if (card.id === 'AI_READY') onSelectFilter('AI_APPROVED');
              else if (card.id === 'DISCREPANCY') onSelectFilter('HIGH_RISK');
            }}
            className={`p-3.5 rounded-lg border text-left transition-all bg-white shadow-sm hover:shadow ${card.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 font-telugu line-clamp-1">
                {card.label}
              </span>
              <Icon className={`w-4 h-4 ${card.textColor}`} />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className={`text-2xl font-black ${card.textColor}`}>{card.count}</span>
              <span className="text-[11px] text-slate-500 font-medium font-telugu">దరఖాస్తులు</span>
            </div>
            <div className="mt-1 text-[11px] text-slate-600 font-telugu truncate">
              {card.subtext}
            </div>
          </button>
        );
      })}
    </div>
  );
}
