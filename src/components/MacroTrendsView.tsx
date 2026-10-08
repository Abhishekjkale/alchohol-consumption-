import React, { useState } from 'react';
import { 
  COUNTRIES, 
  GENERATIONAL_TRENDS, 
  BEVERAGE_SHIFT_DATA,
  DATA_SOURCES_CATALOG,
  CountryData 
} from '../data/demographicData';
import { 
  Info, 
  TrendingDown, 
  Calendar, 
  Globe, 
  ExternalLink,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MacroTrendsViewProps {
  onSelectCohortDetail?: (cohort: string) => void;
}

export const MacroTrendsView: React.FC<MacroTrendsViewProps> = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('us');
  const [activeCohorts, setActiveCohorts] = useState<Record<string, boolean>>({
    genZ: true,
    millennials: true,
    genX: true,
    boomers: true,
    totalPerCapita: true
  });
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [showSources, setShowSources] = useState<boolean>(false);

  const country: CountryData = COUNTRIES.find(c => c.id === selectedCountryId) || COUNTRIES[0];
  const trendData = GENERATIONAL_TRENDS[selectedCountryId] || GENERATIONAL_TRENDS.us;

  // Toggle cohort lines
  const toggleCohort = (key: string) => {
    setActiveCohorts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // SVG Chart Dimensions
  const svgWidth = 860;
  const svgHeight = 360;
  const padding = { top: 30, right: 40, bottom: 40, left: 55 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const minYear = 2000;
  const maxYear = 2026;
  const minLiters = 1.5;
  const maxLiters = 13.5;

  const getX = (year: number) => padding.left + ((year - minYear) / (maxYear - minYear)) * graphWidth;
  const getY = (liters: number) => padding.top + (1 - (liters - minLiters) / (maxLiters - minLiters)) * graphHeight;

  // Generate SVG path strings
  const generatePath = (key: 'genZ' | 'millennials' | 'genX' | 'boomers' | 'totalPerCapita') => {
    const validPoints = trendData.filter(d => d[key] !== null);
    if (validPoints.length === 0) return '';
    return validPoints.reduce((acc, point, index) => {
      const x = getX(point.year);
      const y = getY(point[key] as number);
      return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  // Currently hovered data
  const currentHoverData = hoveredPoint !== null 
    ? trendData.find(d => d.year === hoveredPoint) 
    : trendData[trendData.length - 2]; // default to 2024

  return (
    <div className="space-y-8">
      {/* Editorial Header & Country Selector */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Empirical Longitudinal Panel</span>
              <span aria-hidden="true">·</span>
              <span>2000–2026 Horizon</span>
              <span aria-hidden="true">·</span>
              <span>Pure Ethanol Equivalence (Liters)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Macro Alcohol Trajectories & Youth Cohort Divergence
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              While aggregate population consumption has recorded modest declines across OECD economies, age-stratified microdata uncovers a historic collapse in alcohol volume among emerging adults (Gen Z and Millennials), defying historical life-course aging trajectories.
            </p>
          </div>

          {/* Country Selector Segmented Control */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400">Select Geographical Panel</label>
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCountryId(c.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    selectedCountryId === c.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Country Metadata Context */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span><strong>Jurisdiction:</strong> {country.name} ({country.iso3})</span>
            <span aria-hidden="true">·</span>
            <span><strong>Minimum Legal Age:</strong> {country.legalDrinkingAge} years</span>
            <span aria-hidden="true">·</span>
            <span><strong>Cannabis Policy:</strong> {country.cannabisPolicy}</span>
          </div>
          <p className="italic text-slate-400">{country.description}</p>
        </div>
      </div>

      {/* High-Level Empirical KPI Strip (Clean unboxed text & tabular figures) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">Total Per Capita (15+)</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {country.current2024} <span className="text-xs font-sans text-slate-400 font-normal">L / year</span>
          </div>
          <div className="text-xs text-rose-400 mt-1 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{country.pctChangeTotal}% since 2000</span>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">Youth Cohort Drop (18–24)</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            {country.youthChangePct}%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Structural generational collapse
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">Gen Z Abstention Rate</div>
          <div className="text-2xl font-bold font-mono text-teal-300 tabular-nums">
            52.8%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Past 12 months non-drinkers
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">Non-Alcoholic (0.0%) Share</div>
          <div className="text-2xl font-bold font-mono text-indigo-300 tabular-nums">
            7.1%
          </div>
          <div className="text-xs text-slate-400 mt-1">
            +6.3% pts vs 2000 volume
          </div>
        </div>
      </div>

      {/* Main Interactive Chart Section */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              Generational Consumption Trajectories (2000–2026)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Annual pure ethanol consumption per active drinker equivalent. Hover to inspect year points.
            </p>
          </div>

          {/* Interactive Cohort Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500 mr-1">Toggles:</span>
            <button
              onClick={() => toggleCohort('genZ')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer border flex items-center gap-1.5 ${
                activeCohorts.genZ 
                  ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Gen Z (1997–2012)</span>
            </button>

            <button
              onClick={() => toggleCohort('millennials')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer border flex items-center gap-1.5 ${
                activeCohorts.millennials 
                  ? 'bg-blue-950/60 border-blue-500/80 text-blue-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Millennials (1981–1996)</span>
            </button>

            <button
              onClick={() => toggleCohort('genX')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer border flex items-center gap-1.5 ${
                activeCohorts.genX 
                  ? 'bg-purple-950/60 border-purple-500/80 text-purple-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Gen X (1965–1980)</span>
            </button>

            <button
              onClick={() => toggleCohort('boomers')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer border flex items-center gap-1.5 ${
                activeCohorts.boomers 
                  ? 'bg-amber-950/60 border-amber-500/80 text-amber-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Boomers (1946–1964)</span>
            </button>

            <button
              onClick={() => toggleCohort('totalPerCapita')}
              className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer border flex items-center gap-1.5 ${
                activeCohorts.totalPerCapita 
                  ? 'bg-slate-800 border-slate-600 text-slate-300' 
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span className="w-2 h-0.5 bg-slate-400" />
              <span>Total Population</span>
            </button>
          </div>
        </div>

        {/* SVG Visualization Canvas */}
        <div className="relative mt-4 overflow-x-auto">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto min-w-[700px] select-none"
          >
            {/* Horizontal Grid lines */}
            {[2, 4, 6, 8, 10, 12].map((val) => {
              const y = getY(val);
              return (
                <g key={val}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={svgWidth - padding.right}
                    y2={y}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {val}L
                  </text>
                </g>
              );
            })}

            {/* Vertical Year Grid lines & Year Labels */}
            {[2000, 2004, 2008, 2012, 2016, 2020, 2024, 2026].map((yr) => {
              const x = getX(yr);
              return (
                <g key={yr}>
                  <line
                    x1={x}
                    y1={padding.top}
                    x2={x}
                    y2={svgHeight - padding.bottom}
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                  <text
                    x={x}
                    y={svgHeight - padding.bottom + 18}
                    fill="#64748b"
                    fontSize="11"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {yr}
                  </text>
                </g>
              );
            })}

            {/* Historical Macro Event Vertical Indicators */}
            {/* 2008 GFC */}
            <g>
              <line
                x1={getX(2008)}
                y1={padding.top}
                x2={getX(2008)}
                y2={svgHeight - padding.bottom}
                stroke="#475569"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
              <text x={getX(2008) + 4} y={padding.top + 14} fill="#94a3b8" fontSize="9">
                2008 GFC
              </text>
            </g>

            {/* 2012 Smartphone Inflection */}
            <g>
              <line
                x1={getX(2012)}
                y1={padding.top}
                x2={getX(2012)}
                y2={svgHeight - padding.bottom}
                stroke="#475569"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
              <text x={getX(2012) + 4} y={padding.top + 26} fill="#94a3b8" fontSize="9">
                2012 Mobile Saturation
              </text>
            </g>

            {/* 2020 Pandemic Shock */}
            <g>
              <line
                x1={getX(2020)}
                y1={padding.top}
                x2={getX(2020)}
                y2={svgHeight - padding.bottom}
                stroke="#475569"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
              <text x={getX(2020) + 4} y={padding.top + 14} fill="#94a3b8" fontSize="9">
                2020 COVID
              </text>
            </g>

            {/* Render Cohort Lines */}
            {activeCohorts.boomers && (
              <path
                d={generatePath('boomers')}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}

            {activeCohorts.genX && (
              <path
                d={generatePath('genX')}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}

            {activeCohorts.millennials && (
              <path
                d={generatePath('millennials')}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3.0"
                strokeLinecap="round"
              />
            )}

            {activeCohorts.genZ && (
              <path
                d={generatePath('genZ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            )}

            {activeCohorts.totalPerCapita && (
              <path
                d={generatePath('totalPerCapita')}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="1.8"
                strokeDasharray="5 4"
              />
            )}

            {/* Interactive Data Dots & Hover Detection */}
            {trendData.map((d) => {
              const isHovered = hoveredPoint === d.year;
              return (
                <g
                  key={d.year}
                  onMouseEnter={() => setHoveredPoint(d.year)}
                  className="cursor-pointer"
                >
                  {/* Invisible hit column */}
                  <rect
                    x={getX(d.year) - 15}
                    y={padding.top}
                    width={30}
                    height={graphHeight}
                    fill="transparent"
                  />

                  {/* Vertical highlight on hover */}
                  {isHovered && (
                    <line
                      x1={getX(d.year)}
                      y1={padding.top}
                      x2={getX(d.year)}
                      y2={svgHeight - padding.bottom}
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Gen Z marker */}
                  {activeCohorts.genZ && d.genZ !== null && (
                    <circle
                      cx={getX(d.year)}
                      cy={getY(d.genZ)}
                      r={isHovered ? 6 : 4}
                      fill="#10b981"
                      stroke="#022c22"
                      strokeWidth="2"
                    />
                  )}

                  {/* Millennial marker */}
                  {activeCohorts.millennials && d.millennials !== null && (
                    <circle
                      cx={getX(d.year)}
                      cy={getY(d.millennials)}
                      r={isHovered ? 5.5 : 3.5}
                      fill="#3b82f6"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Gen X marker */}
                  {activeCohorts.genX && (
                    <circle
                      cx={getX(d.year)}
                      cy={getY(d.genX)}
                      r={isHovered ? 5 : 3}
                      fill="#a855f7"
                      stroke="#3b0764"
                      strokeWidth="1.5"
                    />
                  )}

                  {/* Boomer marker */}
                  {activeCohorts.boomers && (
                    <circle
                      cx={getX(d.year)}
                      cy={getY(d.boomers)}
                      r={isHovered ? 5 : 3}
                      fill="#f59e0b"
                      stroke="#451a03"
                      strokeWidth="1.5"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Year Inspection Card */}
        {currentHoverData && (
          <div className="mt-4 p-4 bg-slate-950/80 border border-slate-800 rounded-lg flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white text-sm">
                Observation Year: {currentHoverData.year}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">Total Per Capita: <strong>{currentHoverData.totalPerCapita}L</strong></span>
            </div>

            <div className="flex items-center gap-6 flex-wrap font-mono tabular-nums">
              {currentHoverData.genZ !== null && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-slate-300">Gen Z:</span>
                  <span className="font-bold text-emerald-400">{currentHoverData.genZ}L</span>
                </div>
              )}
              {currentHoverData.millennials !== null && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  <span className="text-slate-300">Millennials:</span>
                  <span className="font-bold text-blue-400">{currentHoverData.millennials}L</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span className="text-slate-300">Gen X:</span>
                <span className="font-bold text-purple-400">{currentHoverData.genX}L</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-slate-300">Boomers:</span>
                <span className="font-bold text-amber-400">{currentHoverData.boomers}L</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span>Daily Screen Time: <strong>{currentHoverData.screenTimeHours}h</strong></span>
              <span>·</span>
              <span>Wellness Index: <strong>{currentHoverData.wellnessIndex}/100</strong></span>
            </div>
          </div>
        )}
      </div>

      {/* Beverage Category Shift & Youth Channel Disruption */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Beverage Category Volume Re-Allocation (2000 vs. 2024)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Historic collapse of traditional beer volume matched by the explosive growth of RTDs and non-alcoholic (0.0% ABV) alternatives.
            </p>
          </div>

          <div className="space-y-3">
            {BEVERAGE_SHIFT_DATA.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{item.category}</span>
                  <div className="flex items-center gap-3 font-mono tabular-nums text-slate-400">
                    <span>2000: {item.year2000Share}%</span>
                    <span>→</span>
                    <span className="text-white font-semibold">2024: {item.year2024Share}%</span>
                    <span className={item.change > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      ({item.change > 0 ? `+${item.change}` : item.change}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar comparison */}
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-slate-700 h-full" 
                    style={{ width: `${item.year2000Share}%` }} 
                    title="2000 share"
                  />
                  <div 
                    className={`h-full ${item.change > 0 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                    style={{ width: `${Math.abs(item.change)}%` }} 
                    title="Net change"
                  />
                </div>
                <div className="flex justify-end text-[11px] text-slate-400">
                  Gen Z preference index: {item.genZInterestPct}% positive affinity
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generational Mechanism Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Why Are Boomers & Gen X Drinking More Than Youth?
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              The paradox of modern alcohol epidemiology: older adults maintain stable or rising intake while youth abstain.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <h4 className="font-semibold text-amber-400 mb-1">1. The Habitual Social Ritual (Gen X & Boomers)</h4>
              <p className="text-slate-400">
                Older generations established alcohol consumption rituals before the digital socialization era (e.g., wine with dinner, pub socializing, corporate drinks). These habits exhibit high inertia across the life-course.
              </p>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <h4 className="font-semibold text-emerald-400 mb-1">2. Delayed Adult Milestones (Millennials & Gen Z)</h4>
              <p className="text-slate-400">
                Youth now delay key milestones (independent housing, driver\'s licenses, marriage, unchaperoned physical parties) by 4–6 years. Without physical gathering rituals, initiation windows are missed entirely.
              </p>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-lg">
              <h4 className="font-semibold text-teal-400 mb-1">3. The "Non-Initiation" Phenotype</h4>
              <p className="text-slate-400">
                Young individuals who do not initiate regular drinking before age 20 rarely develop heavy episodic patterns in their late twenties. Abstention becomes an enduring identity rather than a temporary phase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reputable Public Data Sources Drawer */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowSources(!showSources)}
          className="w-full px-6 py-4 flex items-center justify-between text-left text-sm font-semibold text-slate-200 hover:bg-slate-900/80 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Reputable Public Data Sources & Survey Microdata Repositories</span>
          </div>
          {showSources ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showSources && (
          <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4">
            <p className="text-xs text-slate-400">
              The project synthesizes multi-tier registries to overcome self-report bias and cross-national reporting discrepancies:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DATA_SOURCES_CATALOG.map((src) => (
                <div key={src.name} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-white text-xs">{src.name}</span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                      title="Open data portal"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p><strong>Metrics:</strong> {src.metrics}</p>
                    <p><strong>Coverage:</strong> {src.coverage}</p>
                    <p className="text-amber-400/90"><strong>Harmonization Challenge:</strong> {src.harmonizationChallenge}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
