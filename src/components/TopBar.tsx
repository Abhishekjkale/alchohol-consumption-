import React from 'react';
import { Download, RefreshCw, FileText } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onExportMarkdown: () => void;
  onRunSimulation: () => void;
  isSimulating: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onExportMarkdown,
  onRunSimulation,
  isSimulating
}) => {
  const navItems = [
    { id: 'trends', label: 'Macro Trends' },
    { id: 'lexis', label: 'Lexis Cohort Surface' },
    { id: 'hypotheses', label: 'Hypothesis Engine' },
    { id: 'code', label: 'Python Code Suite' },
    { id: 'blueprint', label: 'Blueprint Dossier' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Wordmark Brand Title (Single text element) */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); setActiveTab('trends'); }}
          className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap"
        >
          Global Ethanol & Generational Cohort Lab
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer relative ${
                  isActive 
                    ? 'text-emerald-400 font-semibold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRunSimulation}
            disabled={isSimulating}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
            title="Simulate cohort calculation update"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin text-emerald-400' : ''}`} />
            <span>{isSimulating ? 'Computing...' : 'Simulate Pipeline'}</span>
          </button>

          <button
            onClick={onExportMarkdown}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            title="Export full publication blueprint as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Blueprint</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 border-t border-slate-800/80 overflow-x-auto bg-slate-950/95 scrollbar-none">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 text-xs whitespace-nowrap transition-colors rounded ${
              activeTab === item.id
                ? 'text-emerald-400 font-medium bg-emerald-950/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
