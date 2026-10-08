import React, { useState } from 'react';
import { PYTHON_SCRIPTS, PythonScriptModule } from '../data/pythonCodeSuite';
import { 
  Code2, 
  Copy, 
  Check, 
  Download, 
  Play, 
  Terminal, 
  CheckCircle2, 
  Layers,
  FileCode2,
  Package
} from 'lucide-react';

export const PythonCodeSuiteView: React.FC = () => {
  const [selectedScriptId, setSelectedScriptId] = useState<string>('etl');
  const [copied, setCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);

  const activeScript: PythonScriptModule = 
    PYTHON_SCRIPTS.find(s => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeScript.code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeScript.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const runSimulation = () => {
    setIsRunning(true);
    setTerminalOutput('Initializing virtual Python 3.11 environment...\nInstalling packages: pandas, statsmodels, seaborn, scikit-learn...\n');

    setTimeout(() => {
      let output = '';
      if (activeScript.id === 'etl') {
        output = `[INFO] Ingesting WHO GISAH 194-country panel (2000-2026)...
[INFO] Loaded 12,480 national reporting records.
[INFO] Standardizing drinks: USA (14.0g), GBR (8.0g), DEU (11.0g), JPN (19.75g)...
[SUCCESS] Converted to Liters Pure Ethanol (L_eth = Grams / 789.24).
[INFO] Executing Stratified MICE Imputation on missing intervals (IterativeImputer, max_iter=15)...
[SUCCESS] Imputation convergence reached in 9 iterations.
Data Sample (head):
   survey_year  age  birth_year   generation  drinks_30d  liters_pure_ethanol  is_abstainer
0         2024   21        2003        Gen Z           0               0.0000             1
1         2024   22        2002        Gen Z           4               0.8616             0
2         2024   38        1986   Millennial          24               5.1693             0
3         2024   54        1970        Gen X          42               9.0463             0
4         2024   68        1956       Boomer          38               8.1847             0
Cleaned panel exported to: data/processed/harmonized_generational_panel.parquet`;
      } else if (activeScript.id === 'apc') {
        output = `[INFO] Fitting Hierarchical Age-Period-Cohort (HAPC) Model...
Cross-Classified Random Effects Specification:
Dependent Variable: liters_pure_ethanol
Fixed Effects: age_centered, age_squared, screen_time_daily_hrs, sober_curious_search_idx
Random Effects: Groups = C(cohort_5yr), Variance Component = C(survey_year)

========================================================================================
Mixed Linear Model Regression Results
========================================================================================
Model:                     MixedLM           Method:               L-BFGS
No. Observations:          48200             Scale:                1.4281
No. Groups:                16                Log-Likelihood:       -34192.4
Min. group size:           1420              Converged:            Yes
----------------------------------------------------------------------------------------
                             Coef.    Std.Err.       z      P>|z|    [0.025     0.975]
----------------------------------------------------------------------------------------
Intercept                    7.842      0.114      68.78    0.000     7.618      8.065
age_centered                 0.084      0.006      14.00    0.000     0.072      0.096
age_squared                 -0.003      0.000     -12.45    0.000    -0.003     -0.002
screen_time_daily_hrs       -0.428      0.046      -9.30    0.000    -0.518     -0.338
sober_curious_search_idx    -0.315      0.052      -6.06    0.000    -0.417     -0.213
Group Var (Cohort BLUP)      0.892      0.082
Period Var (Survey Year)     0.144      0.028
========================================================================================
[CONCLUSION] Cohort Variance accounts for 86% of total random variance.
Gen Z decline is an authentic generational shift, not an aging or transient period effect.`;
      } else {
        output = `[INFO] Executing module ${activeScript.filename}...
[INFO] Generating statistical artifacts and model diagnostics...
[SUCCESS] Pipeline executed with exit code 0.
All unit tests and model diagnostic checks passed.`;
      }

      setTerminalOutput(output);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Executable Python Implementation</span>
            <span aria-hidden="true">·</span>
            <span>pandas / statsmodels / scikit-learn</span>
            <span aria-hidden="true">·</span>
            <span>Production Portfolio Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Step-by-Step Python Code Suite
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Clean, modular, well-commented Python code modules implementing the complete data science pipeline: ingestion, ethanol standardization, Hierarchical APC modeling, Lexis surfaces, and difference-in-differences causal inference.
          </p>
        </div>
      </div>

      {/* Script Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PYTHON_SCRIPTS.map((script) => {
          const isSelected = selectedScriptId === script.id;
          return (
            <button
              key={script.id}
              onClick={() => {
                setSelectedScriptId(script.id);
                setTerminalOutput(null);
              }}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                isSelected
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>{script.filename}</span>
            </button>
          );
        })}
      </div>

      {/* Active Script Details & Actions Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-950/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-400 font-bold">
                {activeScript.filename}
              </span>
              <span className="text-slate-600">·</span>
              <h2 className="text-sm font-bold text-white">
                {activeScript.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              {activeScript.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
              title="Simulate executing this script"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Running...' : 'Run Simulation'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title="Copy entire code to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title="Download Python file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .py</span>
            </button>
          </div>
        </div>

        {/* Dependencies tag strip */}
        <div className="px-5 py-2.5 bg-slate-950/40 border-b border-slate-800/80 flex items-center gap-2 text-xs text-slate-400 flex-wrap">
          <Package className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-300">Required Dependencies:</span>
          {activeScript.dependencies.map(dep => (
            <span key={dep} className="font-mono text-[11px] text-emerald-400/90">
              {dep}
            </span>
          ))}
        </div>

        {/* Code Display Area */}
        <div className="p-4 bg-slate-950 overflow-x-auto max-h-[500px] overflow-y-auto font-mono text-xs leading-relaxed text-slate-300 selection:bg-emerald-500/30">
          <pre className="tab-4">
            <code>{activeScript.code}</code>
          </pre>
        </div>

        {/* Simulated Terminal Output Console */}
        {terminalOutput && (
          <div className="border-t border-slate-800 bg-black/90 p-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
              <Terminal className="w-4 h-4" />
              <span>Pipeline Execution Console (Simulated Stdout)</span>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {terminalOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
