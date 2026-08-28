import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Clock, MapPin, Building, RotateCcw } from 'lucide-react';
import { parseAndPlanTrip, type AiPlanResult } from '../../lib/aiPlanner';
import { getStoredLanguage } from '../../lib/bookingStore';
import { TRANSLATIONS } from '../../data/translations';
import type { Language } from '../../types/travel';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiTripPlannerModal: React.FC<Props> = ({ isOpen, onClose, initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPlanResult | null>(null);
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    setLang(getStoredLanguage());
    if (initialPrompt) {
      handlePlan(initialPrompt);
    }
  }, [initialPrompt]);

  if (!isOpen) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const handlePlan = (customInput?: string) => {
    const textToAnalyze = customInput || prompt;
    if (!textToAnalyze.trim()) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const plan = parseAndPlanTrip(textToAnalyze);
      setResult(plan);
      setLoading(false);
    }, 450);
  };

  const handlePresetClick = (presetText: string) => {
    setPrompt(presetText);
    handlePlan(presetText);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-canvas rounded-[32px] max-w-3xl w-full border border-hairline-soft shadow-meta-modal overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 p-6 sm:p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs uppercase tracking-wider font-bold text-white/70 block mb-1">
            Trip Discovery & Recommendation
          </span>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.aiPlannerTitle}
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            {t.aiPlannerSubtitle}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Free Text Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-steel uppercase tracking-wider block">
              Tell us your travel plan in plain words
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t.aiPlaceholder}
                rows={3}
                className="w-full p-4 rounded-2xl bg-surface-soft border border-hairline-soft text-ink placeholder:text-stone focus:outline-none focus:ring-2 focus:ring-primary-cobalt text-sm resize-none font-medium"
              />
              <button
                onClick={() => handlePlan()}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-3 right-3 px-5 py-2 rounded-full bg-primary-cobalt text-white font-bold text-xs shadow-sm hover:bg-primary-deep disabled:opacity-50 transition-all flex items-center gap-1.5"
              >
                {loading ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                ) : null}
                <span>{loading ? 'Searching...' : t.aiGenerateBtn}</span>
              </button>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-steel font-medium self-center mr-1">Examples:</span>
              <button
                onClick={() => handlePresetClick('I have ₹6,000, 2 days, leaving Bengaluru with my parents. Need a peaceful scenic stay in nature.')}
                className="px-3.5 py-1 rounded-full bg-surface-soft hover:bg-neutral-200 border border-hairline-soft text-xs font-medium text-charcoal transition-colors"
              >
                {t.aiPreset1}
              </button>
              <button
                onClick={() => handlePresetClick('Solo weekend heritage trip under ₹4,000 to see ancient architecture and temples.')}
                className="px-3.5 py-1 rounded-full bg-surface-soft hover:bg-neutral-200 border border-hairline-soft text-xs font-medium text-charcoal transition-colors"
              >
                {t.aiPreset2}
              </button>
              <button
                onClick={() => handlePresetClick('3 days coastal beach holiday with friends leaving Bengaluru on Friday night.')}
                className="px-3.5 py-1 rounded-full bg-surface-soft hover:bg-neutral-200 border border-hairline-soft text-xs font-medium text-charcoal transition-colors"
              >
                {t.aiPreset3}
              </button>
            </div>
          </div>

          {/* Skeleton Loading State */}
          {loading && (
            <div className="p-6 rounded-2xl bg-surface-soft border border-hairline-soft space-y-4 animate-pulse">
              <div className="h-4 bg-hairline-soft rounded-full w-1/3" />
              <div className="h-3 bg-hairline-soft rounded-full w-3/4" />
              <div className="h-32 bg-hairline-soft rounded-2xl" />
            </div>
          )}

          {/* Structured Result */}
          {result && !loading && (
            <div className="space-y-5 pt-2 border-t border-hairline-soft">
              
              {/* Reasoning Explanation Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      {result.explanation.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      {result.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {result.explanation.whyHighlight}
                  </p>
                </div>
              </div>

              {/* Matched Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-surface-soft border border-hairline-soft text-xs">
                <div>
                  <span className="text-steel block text-[11px]">Duration</span>
                  <span className="font-bold text-ink-deep">{result.extractedParameters.durationDays} Days</span>
                </div>
                <div>
                  <span className="text-steel block text-[11px]">Budget Filter</span>
                  <span className="font-bold text-ink-deep">₹{result.extractedParameters.budgetMax?.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-steel block text-[11px]">Traveller Profile</span>
                  <span className="font-bold text-ink-deep">{result.extractedParameters.travelerType}</span>
                </div>
                <div>
                  <span className="text-steel block text-[11px]">Origin</span>
                  <span className="font-bold text-ink-deep">{result.extractedParameters.origin}</span>
                </div>
              </div>

              {/* Recommended Trip Card (DESIGN-meta card-product-feature with 24px rounding) */}
              <div className="border border-hairline-soft rounded-3xl overflow-hidden bg-canvas shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  
                  <div className="md:col-span-5 relative min-h-[180px] md:min-h-full bg-surface-soft">
                    <img
                      src={result.recommendedTrip.heroImage}
                      alt={result.recommendedTrip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold">
                        {result.recommendedTrip.badge || 'Recommended'}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-7 p-6 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-steel font-medium">
                        <MapPin className="w-3.5 h-3.5 text-primary-cobalt" />
                        <span>{result.recommendedTrip.origin} → {result.recommendedTrip.destination}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-primary-cobalt" />
                        <span>{result.recommendedTrip.durationDays} Days</span>
                      </div>

                      <h3 className="text-xl font-bold text-ink-deep">
                        {result.recommendedTrip.title}
                      </h3>
                      
                      <p className="text-xs text-steel line-clamp-2">
                        {result.recommendedTrip.tagline}
                      </p>

                      <div className="p-3 rounded-xl bg-surface-soft border border-hairline-soft text-xs text-charcoal space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-ink-deep">
                          <Building className="w-3.5 h-3.5 text-primary-cobalt shrink-0" />
                          <span>{result.recommendedTrip.hotel.name} (Deluxe AC)</span>
                        </div>
                        <p className="text-[11px] text-steel pl-5">
                          {result.explanation.pacingDetails}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-hairline-soft">
                      <div>
                        <span className="text-[11px] text-steel block">All-inclusive</span>
                        <span className="text-2xl font-bold text-ink-deep">
                          ₹{result.recommendedTrip.pricePerPerson.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-steel"> / person</span>
                        </span>
                      </div>

                      <a
                        href={`/trips/${result.recommendedTrip.slug}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary-cobalt hover:bg-primary-deep text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <span>{t.aiBookDirect}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
