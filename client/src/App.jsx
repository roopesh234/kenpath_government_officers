import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header.jsx';
import { StatsOverview } from './components/StatsOverview.jsx';
import { ApplicationList } from './components/ApplicationList.jsx';
import { ApplicationDetail } from './components/ApplicationDetail.jsx';
import { translations } from './i18n/translations.js';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('te'); // Default to Telugu (తెలుగు)
  const t = translations[lang];

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState('PENDING'); // 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'ALL'
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'URGENT' | 'HIGH_RISK' | 'AI_APPROVED'
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('SLA_URGENT');

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/applications/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Fetch Applications with current filters
  const fetchApplications = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusTab !== 'ALL') params.append('status', statusTab);
      if (serviceFilter !== 'ALL') params.append('service', serviceFilter);
      if (sortBy) params.append('sortBy', sortBy);
      if (searchTerm) params.append('search', searchTerm);

      const res = await fetch(`/api/applications?${params.toString()}`);
      if (res.ok) {
        let data = await res.json();

        // Apply secondary client filter pills
        if (filterType === 'URGENT') {
          data = data.filter((a) => a.slaDaysRemaining <= 2 && a.status === 'PENDING');
        } else if (filterType === 'HIGH_RISK') {
          data = data.filter((a) => a.aiAnalysis.riskLevel === 'HIGH');
        } else if (filterType === 'AI_APPROVED') {
          data = data.filter(
            (a) => a.aiAnalysis.suggestedDecision === 'APPROVE' && a.status === 'PENDING'
          );
        }

        setApplications(data);

        // Keep selection synced or select first
        if (data.length > 0) {
          setSelectedApp((prev) => {
            if (prev) {
              const matched = data.find((d) => d.id === prev.id);
              if (matched) return matched;
            }
            return data[0];
          });
        } else {
          setSelectedApp(null);
        }
      }
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  }, [statusTab, serviceFilter, sortBy, searchTerm, filterType]);

  useEffect(() => {
    fetchStats();
    fetchApplications();
  }, [fetchApplications]);

  // Handle Officer Decision
  const handleDecisionSubmit = async ({ action, officerRemarks, citizenNotification }) => {
    if (!selectedApp) return;

    try {
      const res = await fetch(`/api/applications/${selectedApp.id}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          officerName: t.officerName,
          officerRemarks,
          citizenNotification,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        showToast(lang === 'te' ? result.messageTe : result.messageEn, 'success');
        await fetchStats();
        await fetchApplications();
        // Update selected app in view
        setSelectedApp(result.application);
      }
    } catch (err) {
      console.error('Error submitting decision:', err);
      showToast('నిర్ణయం నమోదు చేయడంలో లోపం ఏర్పడింది.', 'error');
    }
  };

  // Revert / Reset Decision
  const handleRevertDecision = async (id) => {
    try {
      const res = await fetch(`/api/applications/${id}/reset`, { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        showToast('దరఖాస్తు తిరిగి పునఃపరిశీలన కొరకు తెరవబడింది (Reopened for review).', 'success');
        await fetchStats();
        await fetchApplications();
        setSelectedApp(result.application);
      }
    } catch (err) {
      console.error('Error reverting application:', err);
    }
  };

  // Reset All Demo Data
  const handleResetAll = async () => {
    if (
      !window.confirm(
        'అన్ని దరఖాస్తుల నిర్ణయాలను రద్దు చేసి ప్రారంభ స్థితికి తీసుకురావాలనుకుంటున్నారా? (Reset all to demo state?)'
      )
    ) {
      return;
    }
    try {
      const res = await fetch('/api/applications/reset-all', { method: 'POST' });
      if (res.ok) {
        showToast('అన్ని దరఖాస్తులు ప్రారంభ స్థితికి రీసెట్ చేయబడ్డాయి.', 'success');
        setStatusTab('PENDING');
        setFilterType('ALL');
        await fetchStats();
        await fetchApplications();
      }
    } catch (err) {
      console.error('Error resetting all:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-telugu text-[#0f172a]">
      {/* Top Government Navigation Header */}
      <Header lang={lang} setLang={setLang} t={t} onResetAll={handleResetAll} />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 py-4 w-full flex-1 flex flex-col">
        {/* KPI Metrics Ribbon */}
        <StatsOverview
          stats={stats}
          t={t}
          currentFilter={filterType}
          onSelectFilter={(type) => {
            setFilterType(type);
            if (
              type === 'ALL' ||
              type === 'URGENT' ||
              type === 'AI_APPROVED' ||
              type === 'HIGH_RISK'
            ) {
              setStatusTab('PENDING');
            }
          }}
        />

        {/* 2-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
          {/* Left Column: Triage List & Priority Queue (5 cols) */}
          <div className="lg:col-span-5">
            <ApplicationList
              applications={applications}
              selectedApp={selectedApp}
              onSelectApp={setSelectedApp}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusTab={statusTab}
              setStatusTab={setStatusTab}
              filterType={filterType}
              setFilterType={setFilterType}
              serviceFilter={serviceFilter}
              setServiceFilter={setServiceFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              t={t}
              lang={lang}
            />
          </div>

          {/* Right Column: Deep Dossier & Officer Decision Console (7 cols) */}
          <div className="lg:col-span-7">
            <ApplicationDetail
              application={selectedApp}
              onDecisionSubmit={handleDecisionSubmit}
              onRevertDecision={handleRevertDecision}
              lang={lang}
              t={t}
            />
          </div>
        </div>
      </main>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-black text-white px-4 py-3 rounded-lg shadow-xl border-2 border-white flex items-center space-x-2 font-telugu text-xs animate-in slide-in-from-bottom duration-200">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
