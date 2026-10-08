import React, { useState } from 'react';
import { LEXIS_SURFACE_DATA, LexisCell } from '../data/demographicData';
import { Layers, HelpCircle, Eye, Activity, Sparkles, ArrowRight } from 'lucide-react';

export const LexisSurfaceView: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<LexisCell | null>(null);
  const [highlightedCohort, setHighlightedCohort] = useState<string | null>(null);
  const [metricMode, setMetricMode] = useState<'liters' | 'abstention'>('liters');

  const ageGroups = ['65+', '55-64', '45-54', '35-44', '25-34', '18-24']; // top to bottom
  const periods = [2000, 2006, 2012, 2018, 2024, 2026];

  // Helper to find cell
  const getCell = (ageGroup: string, year: number) => {
    return LEXIS_SURFACE_DATA.find(c => c.ageGroup === ageGroup && c.periodYear === year);
  };

  // Color mapping based on liters or abstention
  const getCellColor = (cell?: LexisCell, isHighlighted: boolean = false) => {
    if (!cell) return 'bg-slate-900 border-slate-800 text-slate-600';

    if (metricMode === 'liters') {
      // 2.9 to 10.5 L
      const val = cell.liters;
      if (val < 4.0) return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      if (val < 6.5) return 'bg-teal-950/80 text-teal-300 border-teal-700/60';
      if (val < 8.5) return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
      if (val < 9.5) return 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60';
      return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
    } else {
      // Abstention 16% to 56%
      const val = cell.abstentionRatePct;
      if (val > 45) return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      if (val > 30) return 'bg-teal-950/80 text-teal-300 border-teal-700/60';
      if (val > 22) return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
      return 'bg-slate-900 text-slate-300 border-slate-700/60';
    }
  };

  const isCellMatchingCohort = (cell?: LexisCell) => {
    if (!cell || !highlightedCohort) return false;
    return cell.cohortName.toLowerCase().includes(highlightedCohort.toLowerCase());
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Demographic Lexis Surface</span>
              <span aria-hidden="true">·</span>
              <span>Age-Period-Cohort (APC) Grid</span>
              <span aria-hidden="true">·</span>
              <span>Diagonal Generational Trajectories</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Lexis Surface: Disentangling Age, Period & Cohort
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              In demographic epidemiology, a Lexis surface plots chronological age against calendar periods, allowing birth cohorts to be tracked across diagonal contours. Notice the collapse in alcohol intake in the bottom-right corner (emerging Gen Z young adults in 2018–2026).
            </p>
          </div>

          {/* Metric Toggle & Cohort Trace */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-lg">
              <button
                onClick={() => setMetricMode('liters')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  metricMode === 'liters'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Liters Pure Ethanol
              </button>
              <button
                onClick={() => setMetricMode('abstention')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  metricMode === 'abstention'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Abstention Rate (%)
              </button>
            </div>
          </div>
        </div>

        {/* Cohort Diagonal Tracing Buttons */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-400 font-medium">Trace Cohort Diagonal:</span>
            <button
              onClick={() => setHighlightedCohort(highlightedCohort === 'Gen Z' ? null : 'Gen Z')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                highlightedCohort === 'Gen Z'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              Gen Z (1997–2012)
            </button>
            <button
              onClick={() => setHighlightedCohort(highlightedCohort === 'Millennials' ? null : 'Millennials')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                highlightedCohort === 'Millennials'
                  ? 'bg-blue-500 text-slate-950 border-blue-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              Millennials (1981–1996)
            </button>
            <button
              onClick={() => setHighlightedCohort(highlightedCohort === 'Gen X' ? null : 'Gen X')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                highlightedCohort === 'Gen X'
                  ? 'bg-purple-500 text-slate-950 border-purple-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              Gen X (1965–1980)
            </button>
            <button
              onClick={() => setHighlightedCohort(highlightedCohort === 'Boomers' ? null : 'Boomers')}
              className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                highlightedCohort === 'Boomers'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              Baby Boomers (1946–1964)
            </button>
            {highlightedCohort && (
              <button
                onClick={() => setHighlightedCohort(null)}
                className="text-slate-500 hover:text-slate-300 underline ml-2"
              >
                Clear Trace
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Color Scale:</span>
            <span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-700 inline-block" />
            <span>Low Intake / High Abstention</span>
            <span className="text-slate-600">→</span>
            <span className="w-3 h-3 rounded bg-amber-950 border border-amber-700 inline-block" />
            <span>High Intake</span>
          </div>
        </div>
      </div>

      {/* Main Lexis Surface Grid Canvas */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[680px]">
            {/* Top Period Year Column Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-mono font-semibold text-slate-400">
              <div className="text-left font-sans text-slate-500">Age Bracket</div>
              {periods.map(year => (
                <div key={year} className="py-1 bg-slate-950/80 rounded border border-slate-800/80">
                  {year}
                </div>
              ))}
            </div>

            {/* Matrix Rows (Age brackets from 65+ down to 18-24) */}
            <div className="space-y-2">
              {ageGroups.map(age => (
                <div key={age} className="grid grid-cols-7 gap-2 items-center">
                  {/* Row Age Label */}
                  <div className="text-xs font-bold text-slate-300 pr-2">
                    {age} yrs
                  </div>

                  {/* Period Cells */}
                  {periods.map(year => {
                    const cell = getCell(age, year);
                    const isCohortTracked = isCellMatchingCohort(cell);
                    const isSelected = selectedCell?.ageGroup === age && selectedCell?.periodYear === year;

                    return (
                      <button
                        key={`${age}-${year}`}
                        onClick={() => cell && setSelectedCell(cell)}
                        className={`p-3 rounded-lg border text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center min-h-[72px] ${
                          getCellColor(cell)
                        } ${
                          isCohortTracked 
                            ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-950 shadow-lg scale-102 z-10' 
                            : ''
                        } ${
                          isSelected ? 'border-white ring-1 ring-white' : ''
                        }`}
                      >
                        {cell ? (
                          <>
                            <div className="text-base font-bold font-mono tabular-nums leading-none">
                              {metricMode === 'liters' ? `${cell.liters}L` : `${cell.abstentionRatePct}%`}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-1 truncate max-w-full font-sans">
                              {cell.cohortName.split('/')[0]}
                            </div>
                            {/* Hover tooltip indicator */}
                            <span className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="w-3 h-3 text-slate-400" />
                            </span>
                          </>
                        ) : (
                          <span className="text-xs text-slate-600">—</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Cell Detailed Diagnostic Drawer */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          {selectedCell ? (
            <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <Activity className="w-4 h-4" />
                  <span>Lexis Cell Inspection</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-white">Age: {selectedCell.ageGroup} | Period: {selectedCell.periodYear}</span>
                </div>
                <div className="text-sm text-slate-200">
                  Birth Cohort: <strong>{selectedCell.cohortName}</strong> (Born circa {selectedCell.periodYear - selectedCell.ageMedian})
                </div>
              </div>

              <div className="flex items-center gap-6 font-mono text-sm tabular-nums">
                <div>
                  <div className="text-xs text-slate-500">Consumption</div>
                  <div className="text-lg font-bold text-emerald-400">{selectedCell.liters} Liters / yr</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Abstention Rate</div>
                  <div className="text-lg font-bold text-teal-300">{selectedCell.abstentionRatePct}%</div>
                </div>
              </div>

              <p className="text-xs text-slate-400 max-w-sm">
                {selectedCell.periodYear >= 2018 && selectedCell.ageGroup === '18-24'
                  ? 'Major youth abstention inflection: over half of this cohort reported zero alcohol consumption in the past 12 months.'
                  : selectedCell.ageGroup === '55-64' || selectedCell.ageGroup === '65+'
                  ? 'Historical aging pattern: older cohorts maintain consistent drinking routines established in the 1970s–1980s.'
                  : 'Typical working-age consumption bracket with gradual lifestyle moderations.'}
              </p>
            </div>
          ) : (
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-center text-xs text-slate-400">
              Click any cell in the Lexis surface above to inspect specific cohort demographics, pure ethanol volume, and abstention prevalence.
            </div>
          )}
        </div>
      </div>

      {/* Econometric Methodology: Solving Period = Age + Cohort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              The Identifiability Crisis: Period = Age + Cohort
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            In observational demography, calendar period is an exact linear function of age and birth cohort:
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-emerald-300 text-center">
            {"Period (Year) = Age + Cohort (Birth Year)"}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Standard Ordinary Least Squares (OLS) suffers from exact rank deficiency (singular matrix X^T X). Traditional econometricians forced arbitrary zero constraints (e.g. equating two arbitrary cohorts), which biased parameter estimates.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              The Solution: Yang & Land’s Hierarchical APC (HAPC)
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our blueprint deploys a <strong>Cross-Classified Random Effects Model (CCREM)</strong>:
          </p>
          <div className="p-3 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-teal-300 text-center">
            {"y_ijk = β0 + β1(Age) + β2(Age²) + X'γ + u_Period + v_Cohort + ε"}
          </div>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li><strong>Age:</strong> Modeled as fixed parametric quadratic curve (biological aging).</li>
            <li><strong>Period & Cohort:</strong> Treated as crossed random cluster effects (u_j, v_k).</li>
            <li><strong>Result:</strong> Statistically identifies that Gen Z's decline is an enduring cohort shift (v_k &lt; 0), not a temporary age phase.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
