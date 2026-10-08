import React, { useState } from 'react';
import { BLUEPRINT_DOSSIER, BlueprintSection } from '../data/blueprintDossier';
import { 
  FileText, 
  Search, 
  Download, 
  Bookmark, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface BlueprintDossierViewProps {
  onExportMarkdown: () => void;
}

export const BlueprintDossierView: React.FC<BlueprintDossierViewProps> = ({ onExportMarkdown }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('data-sourcing');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeSection = 
    BLUEPRINT_DOSSIER.find(s => s.id === activeSectionId) || BLUEPRINT_DOSSIER[0];

  // Filter sections by search query
  const filteredSections = BLUEPRINT_DOSSIER.filter(section => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(q) ||
      section.summary.toLowerCase().includes(q) ||
      section.subsections.some(sub => sub.title.toLowerCase().includes(q) || sub.content.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Technical Project Blueprint</span>
              <span aria-hidden="true">·</span>
              <span>Formal Specification Dossier</span>
              <span aria-hidden="true">·</span>
              <span>Portfolio-Ready Methodology</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Global Alcohol Consumption & Youth Decline Dossier
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Complete academic and applied data science blueprint: comprehensive data sourcing, feature engineering, Age-Period-Cohort econometrics, causal inference frameworks, and dashboard narrative.
            </p>
          </div>

          <button
            onClick={onExportMarkdown}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer shadow-sm whitespace-nowrap self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Full Dossier (Markdown)</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search blueprint methodologies, variables, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Main Dossier Layout: Sidebar Navigation + Detailed Content View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2 lg:sticky lg:top-24">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Blueprint Chapters
          </div>

          {filteredSections.map((section) => {
            const isSelected = activeSectionId === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSectionId(section.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500/80 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                  isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {section.number}
                </span>

                <div className="space-y-0.5 min-w-0">
                  <div className={`text-xs font-bold truncate ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {section.title}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {section.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 bg-slate-900/70 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-8">
          {/* Active Chapter Header */}
          <div className="space-y-2 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
              <span>Chapter {activeSection.number}</span>
              <span className="text-slate-600">·</span>
              <span>Technical Specification</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {activeSection.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {activeSection.summary}
            </p>
          </div>

          {/* Subsections */}
          <div className="space-y-8">
            {activeSection.subsections.map((sub, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-emerald-400 rounded-full" />
                  <span>{sub.title}</span>
                </h3>

                <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-normal">
                  {sub.content}
                </div>
              </section>
            ))}
          </div>

          {/* Chapter completion indicator */}
          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full methodology documented & verified</span>
            </div>

            <button
              onClick={onExportMarkdown}
              className="text-slate-400 hover:text-white underline cursor-pointer"
            >
              Export Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
