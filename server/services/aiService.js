/**
 * AI Assistant Service for Revenue Officers (Telugu & English)
 * Provides automated dossier auditing, inconsistency flagging,
 * explainable decision recommendations, and interactive Telugu/English Q&A.
 */

// Keyword mapping for interactive questions
const QNA_PATTERNS = [
  {
    keywordsTe: ['ఆదాయం', 'జీతం', 'డబ్బు', 'ఆదాయ'],
    keywordsEn: ['income', 'salary', 'earning', 'annual'],
    handler: (app) => {
      const declared = app.declaredDetails?.annualIncomeClaimed;
      const isBreach = app.aiAnalysis?.discrepancies?.some(
        (d) => d.includes('ఆదాయ') || d.includes('income')
      );
      return {
        te:
          `దరఖాస్తుదారుడు ప్రకటించిన వార్షిక ఆదాయం: రూ. ${declared?.toLocaleString('en-IN') || 'తెలియదు'}/-. ` +
          (isBreach
            ? `⚠️ హెచ్చరిక: దర్యాప్తులో ఆదాయ దాచివేత లేదా వ్యత్యాసం కనుగొనబడింది. ${app.aiAnalysis.discrepancies.filter((d) => d.includes('ఆదాయ'))[0] || 'వెబ్‌ల్యాండ్ అడంగల్ లేదా వాహన్ రికార్డులలో అదనపు ఆదాయం నిర్ధారణ అయింది.'}`
            : `✅ ప్రకటించిన ఆదాయం ప్రభుత్వ నిర్దేశిత పరిమితిలో ఉంది.`),
        en:
          `Declared annual income: ₹${declared?.toLocaleString('en-IN') || 'N/A'}/-. ` +
          (isBreach
            ? `⚠️ Warning: Discrepancy detected in declared income versus official databases.`
            : `✅ Income is well within statutory ceiling limit.`),
      };
    },
  },
  {
    keywordsTe: ['పత్రం', 'పత్రాలు', 'డాక్యుమెంట్', 'లోపం', 'సర్టిఫికెట్', 'అస్పష్ట', 'జతపరచలేదు'],
    keywordsEn: ['document', 'missing', 'defect', 'blurry', 'proof'],
    handler: (app) => {
      const flaggedDocs = app.documents.filter(
        (d) => d.status === 'FLAGGED' || d.status === 'MISSING'
      );
      if (flaggedDocs.length === 0) {
        return {
          te: `✅ అన్ని తప్పనిసరి పత్రాలు సమర్పించబడ్డాయి మరియు అధికారికంగా ధ్రువీకరించబడ్డాయి (ఆధార్, రైస్ కార్డు, అడంగల్). ఎలాంటి పత్రాల కొరత లేదు.`,
          en: `✅ All mandatory documents are submitted, validated, and clear. Zero missing items.`,
        };
      }
      const listTe = flaggedDocs
        .map(
          (d) =>
            `• ${d.nameTe}: ${d.status === 'MISSING' ? 'జతపరచలేదు (Missing)' : 'లోపం గుర్తించబడింది'}`
        )
        .join('\n');
      const listEn = flaggedDocs
        .map((d) => `• ${d.nameEn}: ${d.status === 'MISSING' ? 'Missing' : 'Flagged'}`)
        .join('\n');
      return {
        te: `⚠️ క్రింది పత్రాలలో లోపాలు లేదా వ్యత్యాసాలు ఉన్నాయి:\n${listTe}\nవీటిని సరిచేయడానికి దరఖాస్తుదారునికి 'పునఃసమీక్ష' (Return) ద్వారా నోటీసు పంపవచ్చు.`,
        en: `⚠️ Deficiencies found in following documents:\n${listEn}\nYou can return the application to request re-submission.`,
      };
    },
  },
  {
    keywordsTe: ['కులం', 'రిజర్వేషన్', 'వర్గం', 'కుల'],
    keywordsEn: ['caste', 'category', 'reservation'],
    handler: (app) => {
      const caste = app.declaredDetails?.casteClaimed;
      const isMismatch = app.aiAnalysis?.discrepancies?.some(
        (d) => d.includes('కుల') || d.includes('caste')
      );
      return {
        te:
          `దరఖాస్తుదారుడు కోరిన కులం/వర్గం: ${caste || 'సమాచారం లేదు'}. ` +
          (isMismatch
            ? `❌ తీవ్ర హెచ్చరిక: పాఠశాల ప్రవేశ రిజిస్టర్ మరియు దరఖాస్తులో పేర్కొన్న కులానికి తీవ్ర వ్యత్యాసం ఉంది. ${app.aiAnalysis.discrepancies.filter((d) => d.includes('కుల'))[0] || ''}`
            : `✅ పాఠశాల బదిలీ పత్రం (TC) మరియు ప్రభుత్వ గెజిట్ నోటిఫికేషన్‌తో సరిపోలింది.`),
        en:
          `Claimed Caste / Category: ${caste || 'N/A'}. ` +
          (isMismatch
            ? `❌ Critical Mismatch: Claimed category contradicts historic school records.`
            : `✅ Caste claim is verified against educational records and state gazette.`),
      };
    },
  },
  {
    keywordsTe: ['వయస్సు', 'పుట్టిన తేదీ', 'పుట్టిన', 'జన్మ'],
    keywordsEn: ['age', 'dob', 'birth'],
    handler: (app) => {
      const age = app.applicant?.age;
      const dob = app.applicant?.dob;
      const ageFlag = app.aiAnalysis?.discrepancies?.some(
        (d) => d.includes('వయస్సు') || d.includes('age')
      );
      return {
        te:
          `దరఖాస్తుదారుని వయస్సు: ${age} సంవత్సరాలు (జన్మ తేదీ: ${dob}). ` +
          (ageFlag
            ? `⚠️ వయస్సు అర్హత నిబంధన ఉల్లంఘన: పథకం కనీస వయస్సు నిబంధనను చేరుకోలేదు.`
            : `✅ వయస్సు అర్హత నిబంధనలకు అనుగుణంగా ఉంది.`),
        en:
          `Applicant Age: ${age} years (DOB: ${dob}). ` +
          (ageFlag
            ? `⚠️ Age criteria violation: Does not meet required statutory minimum.`
            : `✅ Age meets all criteria for this scheme.`),
      };
    },
  },
  {
    keywordsTe: ['సిఫార్సు', 'నిర్ణయం', 'ఏం చేయాలి', 'ఆమోదం', 'తిరస్కరణ'],
    keywordsEn: ['recommend', 'decision', 'action', 'approve', 'reject'],
    handler: (app) => {
      const decisionTe = app.aiAnalysis?.suggestedDecisionTe;
      const score = app.aiAnalysis?.confidenceScore;
      return {
        te: `AI సిఫార్సు: **${decisionTe}** (విశ్వసనీయత: ${score}%).\nకారణాలు: ${app.aiAnalysis?.reasonsTe?.join(' ') || ''}`,
        en: `AI Suggestion: **${app.aiAnalysis?.suggestedDecisionEn}** (Confidence: ${score}%).\nReasons: ${app.aiAnalysis?.reasonsEn?.join(' ') || ''}`,
      };
    },
  },
  {
    keywordsTe: ['గడువు', 'రోజులు', 'సమయం', 'sla'],
    keywordsEn: ['sla', 'deadline', 'days'],
    handler: (app) => {
      const remaining = app.slaDaysRemaining;
      const total = app.slaDaysTotal;
      if (remaining <= 0) {
        return {
          te: `🚨 తీవ్ర హెచ్చరిక: ఈ దరఖాస్తు చట్టబద్ధమైన పరిష్కార గడువు (SLA) నేటితో ముగుస్తుంది లేదా ముగిసింది! తక్షణమే పరిష్కరించకపోతే సేవా హక్కు చట్టం కింద చర్యలు ఉండే అవకాశం ఉంది.`,
          en: `🚨 Alert: Statutory SLA deadline has expired or expires today! Immediate disposal required to avoid departmental penalty.`,
        };
      }
      return {
        te: `సేవా హక్కు చట్టం కింద మొత్తం గడువు: ${total} రోజులు. పరిష్కారానికి మిగిలి ఉన్న వ్యవధి: ${remaining} రోజులు.`,
        en: `Total statutory timeline: ${total} days. Remaining time: ${remaining} days.`,
      };
    },
  },
];

export function answerOfficerQuestion(application, query) {
  if (!query || !query.trim()) {
    return {
      answerTe: 'దయచేసి దరఖాస్తుకు సంబంధించిన నిర్దిష్ట ప్రశ్నను నమోదు చేయండి.',
      answerEn: 'Please enter a specific question regarding this application.',
    };
  }

  const normalized = query.toLowerCase();

  for (const pattern of QNA_PATTERNS) {
    const matchesTe = pattern.keywordsTe.some((kw) => normalized.includes(kw));
    const matchesEn = pattern.keywordsEn.some((kw) => normalized.includes(kw));
    if (matchesTe || matchesEn) {
      return pattern.handler(application);
    }
  }

  // Fallback comprehensive answer synthesized from the app data
  return {
    te:
      `దరఖాస్తు సంఖ్య ${application.applicationNumber} పరిశీలన:\n` +
      `• దరఖాస్తుదారు: ${application.applicant.nameTe} (${application.applicant.village})\n` +
      `• సేవ: ${application.serviceNameTe}\n` +
      `• AI సిఫార్సు: ${application.aiAnalysis.suggestedDecisionTe} (${application.aiAnalysis.confidenceScore}%)\n` +
      `• ముఖ్య సారాంశం: ${application.aiAnalysis.summaryTe}`,
    en:
      `Application #${application.applicationNumber} Dossier Review:\n` +
      `• Applicant: ${application.applicant.nameEn} (${application.applicant.village})\n` +
      `• Service: ${application.serviceNameEn}\n` +
      `• AI Recommendation: ${application.aiAnalysis.suggestedDecisionEn} (${application.aiAnalysis.confidenceScore}%)\n` +
      `• Core Finding: ${application.aiAnalysis.summaryEn}`,
  };
}
