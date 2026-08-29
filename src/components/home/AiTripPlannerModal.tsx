import React, { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Clock, MapPin, Building, RotateCcw, Sparkles } from 'lucide-react';
import { parseAndPlanTrip, type AiPlanResult } from '../../lib/aiPlanner';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiTripPlannerModal: React.FC<Props> = ({ isOpen, onClose, initialPrompt = '' }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiPlanResult | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      handlePlan(initialPrompt);
    }
  }, [initialPrompt]);

  if (!isOpen) return null;

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
      <div className="bg-white dark:bg-slate-900 rounded-[32px] max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 animate-fade-in">
        
        {/* Header */}
        <div className="bg-slate-950 p-6 sm:p-8 text-white relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs uppercase tracking-wider font-bold text-blue-400">
              Trip Discovery & Recommendation
            </span>
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            AI Trip Planner
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Describe your travel plans in plain words. We match your request against verified KSTDC routes and Mayura stays.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Free Text Input */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Tell us your travel plan in plain words
            </label>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="For example: I have 2 days from Bengaluru with my parents and a budget of ₹6,000. Looking for a peaceful nature escape."
                rows={3}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm resize-none font-medium"
              />
              <button
                onClick={() => handlePlan()}
                disabled={loading || !prompt.trim()}
                className="absolute bottom-3 right-3 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm disabled:opacity-50 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {loading ? (
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                ) : null}
                <span>{loading ? 'Searching...' : 'Find Matching Trips'}</span>
              </button>
            </div>

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium self-center mr-1">Examples:</span>
              <button
                type="button"
                onClick={() => handlePresetClick('I have ₹6,000, 2 days, leaving Bengaluru with my parents. Need a peaceful scenic stay in nature.')}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                2 Days from Bengaluru with parents · Nature & calm
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('Solo weekend heritage trip under ₹4,000 to see ancient architecture and temples.')}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Weekend heritage tour · Architecture & temples
              </button>
              <button
                type="button"
                onClick={() => handlePresetClick('3 days coastal beach holiday with friends leaving Bengaluru on Friday night.')}
                className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                3-day coastal escape · Beaches & coastal heritage
              </button>
            </div>
          </div>

          {/* Skeleton Loading State */}
          {loading && (
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-full w-1/3" />
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full w-3/4" />
              <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
            </div>
          )}

          {/* Structured Result */}
          {result && !loading && (
            <div className="space-y-5 pt-2 border-t border-slate-200 dark:border-slate-800">
              
              {/* Reasoning Explanation Box */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                      {result.explanation.title}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[11px] font-bold">
                      {result.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                    {result.explanation.whyHighlight}
                  </p>
                </div>
              </div>

              {/* Matched Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Duration</span>
                  <span className="font-bold text-slate-900 dark:text-white">{result.extractedParameters.durationDays} Days</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Budget Filter</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹{result.extractedParameters.budgetMax?.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Traveller Profile</span>
                  <span className="font-bold text-slate-900 dark:text-white">{result.extractedParameters.travelerType}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Origin</span>
                  <span className="font-bold text-slate-900 dark:text-white">{result.extractedParameters.origin}</span>
                </div>
              </div>

              {/* Recommended Trip Card */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-800/90 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  
                  <div className="md:col-span-5 relative min-h-[180px] md:min-h-full bg-slate-100 dark:bg-slate-700">
                    <img
                      src={result.recommendedTrip.heroImage}
                      alt={result.recommendedTrip.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-black/80 text-white text-[11px] font-bold">
                        {result.recommendedTrip.badge || 'Recommended'}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-7 p-6 flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{result.recommendedTrip.origin} → {result.recommendedTrip.destination}</span>
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{result.recommendedTrip.durationDays} Days</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {result.recommendedTrip.title}
                      </h3>
                      
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {result.recommendedTrip.tagline}
                      </p>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <Building className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{result.recommendedTrip.hotel.name} (Deluxe AC)</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-5">
                          {result.explanation.pacingDetails}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                      <div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">All-inclusive</span>
                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                          ₹{result.recommendedTrip.pricePerPerson.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> / person</span>
                        </span>
                      </div>

                      <a
                        href={`/trips/${result.recommendedTrip.slug}`}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        <span>View & Book Recommended Trip</span>
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
