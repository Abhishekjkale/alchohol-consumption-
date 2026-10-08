/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { MacroTrendsView } from './components/MacroTrendsView';
import { LexisSurfaceView } from './components/LexisSurfaceView';
import { HypothesisEngineView } from './components/HypothesisEngineView';
import { PythonCodeSuiteView } from './components/PythonCodeSuiteView';
import { BlueprintDossierView } from './components/BlueprintDossierView';
import { BLUEPRINT_DOSSIER } from './data/blueprintDossier';
import { PYTHON_SCRIPTS } from './data/pythonCodeSuite';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('trends');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  const bannerImgPath = "/src/assets/images/demographic_cohort_banner_1791425550690.jpg";

  // Simulate pipeline run
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setNotification("Executing simulated multi-country demographic pipeline...");
    setTimeout(() => {
      setIsSimulating(false);
      setNotification("Pipeline execution complete: Cohort matrices and BLUP estimates recomputed.");
      setTimeout(() => setNotification(null), 3500);
    }, 1200);
  };

  // Export full blueprint as Markdown file
  const handleExportMarkdown = () => {
    let md = `# Global Alcohol Consumption Analysis and Reasons for Decline Across Generations (2000–Present)\n\n`;
    md += `*Comprehensive Data Science Blueprint & Econometric Cohort Analysis*\n`;
    md += `*Generated: ${new Date().toISOString().split('T')[0]}*\n\n`;
    md += `---\n\n`;

    BLUEPRINT_DOSSIER.forEach((sec) => {
      md += `## Chapter ${sec.number}: ${sec.title}\n\n`;
      md += `> ${sec.summary}\n\n`;

      sec.subsections.forEach((sub) => {
        md += `### ${sub.title}\n\n`;
        md += `${sub.content}\n\n`;
      });
      md += `---\n\n`;
    });

    md += `## Annex: Complete Executable Python Code Suite\n\n`;
    PYTHON_SCRIPTS.forEach((scr) => {
      md += `### ${scr.filename} — ${scr.title}\n\n`;
      md += `*Dependencies: ${scr.dependencies.join(', ')}*\n\n`;
      md += `\`\`\`python\n${scr.code}\n\`\`\`\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Global_Alcohol_Consumption_Decline_Blueprint.md`;
    link.click();
    URL.revokeObjectURL(url);

    setNotification("Full publication blueprint exported to Markdown file!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar (3-Zone Contract) */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportMarkdown={handleExportMarkdown}
        onRunSimulation={handleRunSimulation}
        isSimulating={isSimulating}
      />

      {/* Ephemeral Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/80 text-white text-xs px-4 py-3 rounded-lg shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Optional Editorial Hero Card with Generated Visual Asset */}
        {activeTab === 'trends' && (
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-8 p-6 sm:p-8 space-y-3 z-10">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>BEHAVIORAL DEMOGRAPHY & GLOBAL HEALTH RESEARCH</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Global Alcohol Consumption & Generational Decline (2000–Present)
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  A publication-grade data science blueprint and interactive econometric platform investigating why younger generations (Millennials and Gen Z) are consuming historically less alcohol than Gen X and Baby Boomers.
                </p>
                <div className="flex items-center gap-4 pt-2 text-xs text-slate-400 flex-wrap">
                  <span>WHO GISAH & MTF Panels</span>
                  <span aria-hidden="true">·</span>
                  <span>Age-Period-Cohort Decomposition</span>
                  <span aria-hidden="true">·</span>
                  <span>Four-Factor Causal Attribution</span>
                </div>
              </div>

              {/* Visual Slot with Resilient Fallback */}
              <div className="lg:col-span-4 h-48 lg:h-full relative min-h-[160px] overflow-hidden">
                <img
                  src={bannerImgPath}
                  alt="Demographic cohort streams visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    // Styled CSS fallback container on load error
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'trends' && <MacroTrendsView />}
        {activeTab === 'lexis' && <LexisSurfaceView />}
        {activeTab === 'hypotheses' && <HypothesisEngineView />}
        {activeTab === 'code' && <PythonCodeSuiteView />}
        {activeTab === 'blueprint' && (
          <BlueprintDossierView onExportMarkdown={handleExportMarkdown} />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>Global Alcohol Consumption & Generational Decline Blueprint</span>
            <span aria-hidden="true">·</span>
            <span>2000–Present Longitudinal Registry</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('blueprint')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Full Methodology
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Python Source
            </button>
            <button
              onClick={handleExportMarkdown}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Export Markdown
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
