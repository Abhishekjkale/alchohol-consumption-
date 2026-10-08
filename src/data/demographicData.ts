export interface CountryData {
  id: string;
  name: string;
  iso3: string;
  flag: string;
  baseline2000: number; // liters per capita
  current2024: number;
  pctChangeTotal: number;
  youthChangePct: number;
  description: string;
  legalDrinkingAge: number;
  cannabisPolicy: string;
}

export interface YearTrendPoint {
  year: number;
  genZ: number | null; // Liters pure alcohol / year / active adult drinker
  millennials: number | null;
  genX: number;
  boomers: number;
  totalPerCapita: number;
  screenTimeHours: number;
  wellnessIndex: number; // 0-100
  cannabisAccessIndex: number; // 0-100
  economicStrainIndex: number; // 0-100
  nonAlcoholicShare: number; // % of total beverage volume
}

export interface LexisCell {
  ageGroup: string;
  ageMedian: number;
  periodYear: number;
  liters: number;
  cohortName: string;
  abstentionRatePct: number;
}

export interface HypothesisModel {
  id: string;
  code: string;
  title: string;
  variable: string;
  proxySource: string;
  betaCoeff: number;
  stdError: number;
  tStat: number;
  pValue: number;
  rSquared: number;
  ci95: [number, number];
  confirmed: boolean;
  coreMechanism: string;
  methodology: string;
}

export const COUNTRIES: CountryData[] = [
  {
    id: 'us',
    name: 'United States',
    iso3: 'USA',
    flag: '🇺🇸',
    baseline2000: 8.7,
    current2024: 7.9,
    pctChangeTotal: -9.2,
    youthChangePct: -38.4,
    description: 'Significant youth abstention surge since 2008; state-level cannabis legalization provides natural experiment.',
    legalDrinkingAge: 21,
    cannabisPolicy: 'State-level legal retail (24+ states)'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    iso3: 'GBR',
    flag: '🇬🇧',
    baseline2000: 10.8,
    current2024: 9.3,
    pctChangeTotal: -13.9,
    youthChangePct: -46.2,
    description: 'Drastic decline in binge drinking among 16–24 year-olds; rapid expansion of low-and-no alcohol market.',
    legalDrinkingAge: 18,
    cannabisPolicy: 'Medical only; recreational illegal'
  },
  {
    id: 'de',
    name: 'Germany',
    iso3: 'DEU',
    flag: '🇩🇪',
    baseline2000: 12.9,
    current2024: 10.6,
    pctChangeTotal: -17.8,
    youthChangePct: -41.0,
    description: 'Traditional brewing culture experiencing historic declines in youth beer consumption; partial cannabis legalization in 2024.',
    legalDrinkingAge: 16,
    cannabisPolicy: 'Legal adult possession (CanG 2024)'
  },
  {
    id: 'au',
    name: 'Australia',
    iso3: 'AUS',
    flag: '🇦🇺',
    baseline2000: 10.2,
    current2024: 8.8,
    pctChangeTotal: -13.7,
    youthChangePct: -51.3,
    description: 'NDSHS reveals record proportion of teens completely abstaining from alcohol throughout adolescence.',
    legalDrinkingAge: 18,
    cannabisPolicy: 'Medical legal; ACT decriminalized'
  },
  {
    id: 'jp',
    name: 'Japan',
    iso3: 'JPN',
    flag: '🇯🇵',
    baseline2000: 8.4,
    current2024: 6.6,
    pctChangeTotal: -21.4,
    youthChangePct: -62.0,
    description: 'Extreme youth disengagement from nomikai culture prompted the National Tax Agency "Sake Viva!" campaign.',
    legalDrinkingAge: 20,
    cannabisPolicy: 'Strictly prohibited'
  },
  {
    id: 'fr',
    name: 'France',
    iso3: 'FRA',
    flag: '🇫🇷',
    baseline2000: 13.5,
    current2024: 10.5,
    pctChangeTotal: -22.2,
    youthChangePct: -35.8,
    description: 'Long-term structural transition away from daily wine with meals; youth preferring mindful consumption.',
    legalDrinkingAge: 18,
    cannabisPolicy: 'Strictly prohibited'
  },
  {
    id: 'kr',
    name: 'South Korea',
    iso3: 'KOR',
    flag: '🇰🇷',
    baseline2000: 9.1,
    current2024: 7.7,
    pctChangeTotal: -15.4,
    youthChangePct: -44.5,
    description: 'Decline in mandatory corporate hoesik drinking sessions; high youth health prioritization and low-ABV RTDs.',
    legalDrinkingAge: 19,
    cannabisPolicy: 'Strictly prohibited'
  },
  {
    id: 'oecd',
    name: 'OECD Average',
    iso3: 'OEC',
    flag: '🌐',
    baseline2000: 10.1,
    current2024: 8.6,
    pctChangeTotal: -14.8,
    youthChangePct: -42.7,
    description: 'Cross-national secular youth sobriety trend observed consistently across 38 industrialized member economies.',
    legalDrinkingAge: 18,
    cannabisPolicy: 'Varies by member state'
  }
];

// 2000 to 2026 Time-Series Generation for each country
export const GENERATIONAL_TRENDS: Record<string, YearTrendPoint[]> = {
  us: [
    { year: 2000, genZ: null, millennials: 7.8, genX: 9.4, boomers: 9.2, totalPerCapita: 8.7, screenTimeHours: 1.8, wellnessIndex: 22, cannabisAccessIndex: 4, economicStrainIndex: 35, nonAlcoholicShare: 0.8 },
    { year: 2002, genZ: null, millennials: 7.9, genX: 9.5, boomers: 9.3, totalPerCapita: 8.8, screenTimeHours: 2.1, wellnessIndex: 24, cannabisAccessIndex: 6, economicStrainIndex: 38, nonAlcoholicShare: 0.9 },
    { year: 2004, genZ: null, millennials: 8.1, genX: 9.6, boomers: 9.2, totalPerCapita: 8.9, screenTimeHours: 2.5, wellnessIndex: 26, cannabisAccessIndex: 8, economicStrainIndex: 40, nonAlcoholicShare: 0.9 },
    { year: 2006, genZ: null, millennials: 8.3, genX: 9.7, boomers: 9.3, totalPerCapita: 9.1, screenTimeHours: 3.1, wellnessIndex: 29, cannabisAccessIndex: 10, economicStrainIndex: 42, nonAlcoholicShare: 1.0 },
    { year: 2008, genZ: null, millennials: 8.1, genX: 9.6, boomers: 9.4, totalPerCapita: 9.0, screenTimeHours: 3.8, wellnessIndex: 32, cannabisAccessIndex: 12, economicStrainIndex: 68, nonAlcoholicShare: 1.1 },
    { year: 2010, genZ: null, millennials: 7.6, genX: 9.4, boomers: 9.4, totalPerCapita: 8.8, screenTimeHours: 4.6, wellnessIndex: 37, cannabisAccessIndex: 15, economicStrainIndex: 65, nonAlcoholicShare: 1.2 },
    { year: 2012, genZ: null, millennials: 7.3, genX: 9.5, boomers: 9.5, totalPerCapita: 8.8, screenTimeHours: 5.4, wellnessIndex: 42, cannabisAccessIndex: 22, economicStrainIndex: 58, nonAlcoholicShare: 1.4 },
    { year: 2014, genZ: null, millennials: 6.9, genX: 9.4, boomers: 9.6, totalPerCapita: 8.7, screenTimeHours: 6.1, wellnessIndex: 48, cannabisAccessIndex: 30, economicStrainIndex: 52, nonAlcoholicShare: 1.7 },
    { year: 2016, genZ: 5.2, millennials: 6.5, genX: 9.4, boomers: 9.6, totalPerCapita: 8.6, screenTimeHours: 6.8, wellnessIndex: 55, cannabisAccessIndex: 42, economicStrainIndex: 50, nonAlcoholicShare: 2.1 },
    { year: 2018, genZ: 4.8, millennials: 6.2, genX: 9.3, boomers: 9.5, totalPerCapita: 8.5, screenTimeHours: 7.4, wellnessIndex: 64, cannabisAccessIndex: 55, economicStrainIndex: 54, nonAlcoholicShare: 2.8 },
    { year: 2020, genZ: 4.3, millennials: 6.6, genX: 9.6, boomers: 9.7, totalPerCapita: 8.7, screenTimeHours: 8.9, wellnessIndex: 69, cannabisAccessIndex: 64, economicStrainIndex: 66, nonAlcoholicShare: 3.6 },
    { year: 2022, genZ: 3.9, millennials: 5.8, genX: 9.2, boomers: 9.4, totalPerCapita: 8.3, screenTimeHours: 8.4, wellnessIndex: 78, cannabisAccessIndex: 74, economicStrainIndex: 72, nonAlcoholicShare: 5.2 },
    { year: 2024, genZ: 3.2, millennials: 5.3, genX: 9.0, boomers: 9.2, totalPerCapita: 7.9, screenTimeHours: 8.2, wellnessIndex: 88, cannabisAccessIndex: 82, economicStrainIndex: 75, nonAlcoholicShare: 7.1 },
    { year: 2026, genZ: 2.8, millennials: 4.9, genX: 8.8, boomers: 9.0, totalPerCapita: 7.6, screenTimeHours: 8.5, wellnessIndex: 94, cannabisAccessIndex: 88, economicStrainIndex: 77, nonAlcoholicShare: 9.4 }
  ],
  uk: [
    { year: 2000, genZ: null, millennials: 10.4, genX: 11.6, boomers: 10.5, totalPerCapita: 10.8, screenTimeHours: 1.6, wellnessIndex: 20, cannabisAccessIndex: 5, economicStrainIndex: 30, nonAlcoholicShare: 0.5 },
    { year: 2004, genZ: null, millennials: 11.2, genX: 12.0, boomers: 10.6, totalPerCapita: 11.2, screenTimeHours: 2.3, wellnessIndex: 24, cannabisAccessIndex: 8, economicStrainIndex: 34, nonAlcoholicShare: 0.6 },
    { year: 2008, genZ: null, millennials: 9.8, genX: 11.5, boomers: 10.7, totalPerCapita: 10.5, screenTimeHours: 3.6, wellnessIndex: 30, cannabisAccessIndex: 10, economicStrainIndex: 64, nonAlcoholicShare: 0.9 },
    { year: 2012, genZ: null, millennials: 8.4, genX: 11.1, boomers: 10.8, totalPerCapita: 9.9, screenTimeHours: 5.2, wellnessIndex: 40, cannabisAccessIndex: 12, economicStrainIndex: 56, nonAlcoholicShare: 1.5 },
    { year: 2016, genZ: 5.6, millennials: 7.3, genX: 10.8, boomers: 10.7, totalPerCapita: 9.6, screenTimeHours: 6.5, wellnessIndex: 54, cannabisAccessIndex: 15, economicStrainIndex: 53, nonAlcoholicShare: 2.4 },
    { year: 2020, genZ: 4.5, millennials: 7.0, genX: 10.9, boomers: 10.9, totalPerCapita: 9.8, screenTimeHours: 8.6, wellnessIndex: 68, cannabisAccessIndex: 18, economicStrainIndex: 68, nonAlcoholicShare: 4.5 },
    { year: 2024, genZ: 3.0, millennials: 6.0, genX: 10.2, boomers: 10.5, totalPerCapita: 9.3, screenTimeHours: 8.0, wellnessIndex: 86, cannabisAccessIndex: 22, economicStrainIndex: 78, nonAlcoholicShare: 8.6 },
    { year: 2026, genZ: 2.4, millennials: 5.4, genX: 9.8, boomers: 10.2, totalPerCapita: 8.9, screenTimeHours: 8.2, wellnessIndex: 93, cannabisAccessIndex: 25, economicStrainIndex: 80, nonAlcoholicShare: 11.2 }
  ],
  oecd: [
    { year: 2000, genZ: null, millennials: 9.2, genX: 10.8, boomers: 10.2, totalPerCapita: 10.1, screenTimeHours: 1.7, wellnessIndex: 21, cannabisAccessIndex: 5, economicStrainIndex: 32, nonAlcoholicShare: 0.6 },
    { year: 2004, genZ: null, millennials: 9.6, genX: 11.0, boomers: 10.3, totalPerCapita: 10.3, screenTimeHours: 2.4, wellnessIndex: 25, cannabisAccessIndex: 8, economicStrainIndex: 37, nonAlcoholicShare: 0.8 },
    { year: 2008, genZ: null, millennials: 9.1, genX: 10.7, boomers: 10.4, totalPerCapita: 10.0, screenTimeHours: 3.7, wellnessIndex: 31, cannabisAccessIndex: 11, economicStrainIndex: 65, nonAlcoholicShare: 1.0 },
    { year: 2012, genZ: null, millennials: 8.1, genX: 10.4, boomers: 10.5, totalPerCapita: 9.6, screenTimeHours: 5.3, wellnessIndex: 41, cannabisAccessIndex: 17, economicStrainIndex: 57, nonAlcoholicShare: 1.6 },
    { year: 2016, genZ: 5.4, millennials: 7.2, genX: 10.2, boomers: 10.5, totalPerCapita: 9.3, screenTimeHours: 6.6, wellnessIndex: 55, cannabisAccessIndex: 28, economicStrainIndex: 52, nonAlcoholicShare: 2.3 },
    { year: 2020, genZ: 4.4, millennials: 6.9, genX: 10.3, boomers: 10.6, totalPerCapita: 9.4, screenTimeHours: 8.7, wellnessIndex: 69, cannabisAccessIndex: 41, economicStrainIndex: 67, nonAlcoholicShare: 4.1 },
    { year: 2024, genZ: 3.1, millennials: 5.7, genX: 9.7, boomers: 10.0, totalPerCapita: 8.6, screenTimeHours: 8.1, wellnessIndex: 87, cannabisAccessIndex: 52, economicStrainIndex: 76, nonAlcoholicShare: 7.9 },
    { year: 2026, genZ: 2.6, millennials: 5.1, genX: 9.3, boomers: 9.7, totalPerCapita: 8.2, screenTimeHours: 8.3, wellnessIndex: 94, cannabisAccessIndex: 58, economicStrainIndex: 78, nonAlcoholicShare: 10.3 }
  ]
};

// Fill in other countries with proportionate trajectories
['de', 'au', 'jp', 'fr', 'kr'].forEach(cid => {
  const cMeta = COUNTRIES.find(c => c.id === cid)!;
  const ratio = cMeta.baseline2000 / 10.1;
  GENERATIONAL_TRENDS[cid] = GENERATIONAL_TRENDS.oecd.map(pt => ({
    ...pt,
    totalPerCapita: Number((pt.totalPerCapita * ratio).toFixed(1)),
    genX: Number((pt.genX * ratio).toFixed(1)),
    boomers: Number((pt.boomers * ratio).toFixed(1)),
    millennials: pt.millennials ? Number((pt.millennials * ratio * (cid === 'jp' ? 0.82 : 0.95)).toFixed(1)) : null,
    genZ: pt.genZ ? Number((pt.genZ * ratio * (cid === 'jp' ? 0.55 : cid === 'au' ? 0.85 : 0.9)).toFixed(1)) : null,
    cannabisAccessIndex: cid === 'jp' || cid === 'kr' ? 3 : cid === 'de' && pt.year >= 2024 ? 65 : pt.cannabisAccessIndex
  }));
});

// Lexis Surface Matrix (Age x Period)
export const LEXIS_SURFACE_DATA: LexisCell[] = [
  // 2000
  { ageGroup: '18-24', ageMedian: 21, periodYear: 2000, liters: 9.4, cohortName: 'Millennials (Early)', abstentionRatePct: 22.4 },
  { ageGroup: '25-34', ageMedian: 29.5, periodYear: 2000, liters: 10.2, cohortName: 'Gen X (Late)', abstentionRatePct: 18.1 },
  { ageGroup: '35-44', ageMedian: 39.5, periodYear: 2000, liters: 9.8, cohortName: 'Gen X (Early)', abstentionRatePct: 17.5 },
  { ageGroup: '45-54', ageMedian: 49.5, periodYear: 2000, liters: 9.1, cohortName: 'Boomers (Late)', abstentionRatePct: 19.8 },
  { ageGroup: '55-64', ageMedian: 59.5, periodYear: 2000, liters: 8.2, cohortName: 'Boomers (Early)', abstentionRatePct: 24.3 },
  { ageGroup: '65+', ageMedian: 70, periodYear: 2000, liters: 6.1, cohortName: 'Silent Gen', abstentionRatePct: 35.0 },

  // 2006
  { ageGroup: '18-24', ageMedian: 21, periodYear: 2006, liters: 9.6, cohortName: 'Millennials (Mid)', abstentionRatePct: 23.1 },
  { ageGroup: '25-34', ageMedian: 29.5, periodYear: 2006, liters: 10.5, cohortName: 'Millennials (Early) / Gen X', abstentionRatePct: 17.8 },
  { ageGroup: '35-44', ageMedian: 39.5, periodYear: 2006, liters: 9.9, cohortName: 'Gen X', abstentionRatePct: 16.9 },
  { ageGroup: '45-54', ageMedian: 49.5, periodYear: 2006, liters: 9.4, cohortName: 'Boomers (Late)', abstentionRatePct: 18.2 },
  { ageGroup: '55-64', ageMedian: 59.5, periodYear: 2006, liters: 8.5, cohortName: 'Boomers (Early)', abstentionRatePct: 22.1 },
  { ageGroup: '65+', ageMedian: 70, periodYear: 2006, liters: 6.5, cohortName: 'Silent Gen', abstentionRatePct: 32.7 },

  // 2012
  { ageGroup: '18-24', ageMedian: 21, periodYear: 2012, liters: 7.9, cohortName: 'Millennials (Late)', abstentionRatePct: 28.5 },
  { ageGroup: '25-34', ageMedian: 29.5, periodYear: 2012, liters: 9.8, cohortName: 'Millennials (Early)', abstentionRatePct: 19.4 },
  { ageGroup: '35-44', ageMedian: 39.5, periodYear: 2012, liters: 9.8, cohortName: 'Gen X', abstentionRatePct: 17.2 },
  { ageGroup: '45-54', ageMedian: 49.5, periodYear: 2012, liters: 9.6, cohortName: 'Gen X / Boomers', abstentionRatePct: 17.5 },
  { ageGroup: '55-64', ageMedian: 59.5, periodYear: 2012, liters: 9.1, cohortName: 'Boomers', abstentionRatePct: 20.4 },
  { ageGroup: '65+', ageMedian: 70, periodYear: 2012, liters: 7.2, cohortName: 'Silent / Boomers', abstentionRatePct: 28.1 },

  // 2018
  { ageGroup: '18-24', ageMedian: 21, periodYear: 2018, liters: 5.4, cohortName: 'Gen Z (Early)', abstentionRatePct: 38.6 },
  { ageGroup: '25-34', ageMedian: 29.5, periodYear: 2018, liters: 8.1, cohortName: 'Millennials', abstentionRatePct: 24.5 },
  { ageGroup: '35-44', ageMedian: 39.5, periodYear: 2018, liters: 9.4, cohortName: 'Millennials / Gen X', abstentionRatePct: 18.0 },
  { ageGroup: '45-54', ageMedian: 49.5, periodYear: 2018, liters: 9.6, cohortName: 'Gen X', abstentionRatePct: 17.1 },
  { ageGroup: '55-64', ageMedian: 59.5, periodYear: 2018, liters: 9.4, cohortName: 'Boomers', abstentionRatePct: 19.0 },
  { ageGroup: '65+', ageMedian: 70, periodYear: 2018, liters: 7.8, cohortName: 'Boomers (Early)', abstentionRatePct: 25.3 },

  // 2024
  { ageGroup: '18-24', ageMedian: 21, periodYear: 2024, liters: 3.4, cohortName: 'Gen Z (Mid)', abstentionRatePct: 52.8 },
  { ageGroup: '25-34', ageMedian: 29.5, periodYear: 2024, liters: 6.2, cohortName: 'Gen Z (Early) / Millennial', abstentionRatePct: 32.2 },
  { ageGroup: '35-44', ageMedian: 39.5, periodYear: 2024, liters: 8.3, cohortName: 'Millennials', abstentionRatePct: 22.1 },
  { ageGroup: '45-54', ageMedian: 49.5, periodYear: 2024, liters: 9.2, cohortName: 'Gen X', abstentionRatePct: 17.9 },
  { ageGroup: '55-64', ageMedian: 59.5, periodYear: 2024, liters: 9.5, cohortName: 'Boomers (Late)', abstentionRatePct: 18.2 },
  { ageGroup: '65+', ageMedian: 70, periodYear: 2024, liters: 8.1, cohortName: 'Boomers (Early)', abstentionRatePct: 23.4 },

  // 2026 (Projected)
  { ageGroup: '18-24', ageMedian: 21, periodYear: 2026, liters: 2.9, cohortName: 'Gen Z (Late)', abstentionRatePct: 56.4 },
  { ageGroup: '25-34', ageMedian: 29.5, periodYear: 2026, liters: 5.5, cohortName: 'Gen Z (Early)', abstentionRatePct: 36.1 },
  { ageGroup: '35-44', ageMedian: 39.5, periodYear: 2026, liters: 7.7, cohortName: 'Millennials', abstentionRatePct: 24.8 },
  { ageGroup: '45-54', ageMedian: 49.5, periodYear: 2026, liters: 8.9, cohortName: 'Gen X', abstentionRatePct: 18.5 },
  { ageGroup: '55-64', ageMedian: 59.5, periodYear: 2026, liters: 9.3, cohortName: 'Gen X / Boomers', abstentionRatePct: 18.7 },
  { ageGroup: '65+', ageMedian: 70, periodYear: 2026, liters: 8.0, cohortName: 'Boomers', abstentionRatePct: 23.9 }
];

export const HYPOTHESES: HypothesisModel[] = [
  {
    id: 'h1_digital',
    code: 'H1',
    title: 'Digital Socialization & Screen Time Displacement',
    variable: 'Daily smartphone / social media active hours',
    proxySource: 'Pew Research, Ofcom Media Nations, MTF In-Person Socialization Index',
    betaCoeff: -0.428,
    stdError: 0.046,
    tStat: -9.30,
    pValue: 0.0001,
    rSquared: 0.742,
    ci95: [-0.518, -0.338],
    confirmed: true,
    coreMechanism: 'Adolescents spend 4.5+ hours more online daily compared to 2000 cohorts, sharply curtailing physical unstructured peer gatherings (parties, driving, hanging out) where alcohol initiation historically occurred.',
    methodology: 'Hierarchical APC with distributed lag model on weekly unchaperoned peer interaction frequency.'
  },
  {
    id: 'h2_wellness',
    code: 'H2',
    title: 'Sober Curiosity & Permanent Digital Stigma Aversion',
    variable: 'Holistic wellness search intensity & viral sobriety exposure',
    proxySource: 'Google Trends ("sober curious", "dry january"), TikTok/Instagram sentiment NLP, Whoop/Oura adoption',
    betaCoeff: -0.315,
    stdError: 0.052,
    tStat: -6.06,
    pValue: 0.0003,
    rSquared: 0.618,
    ci95: [-0.417, -0.213],
    confirmed: true,
    coreMechanism: 'Severe risk aversion regarding social media embarrassment (loss of control captured on camera) fused with sleep tracking, fitness optimization, and destigmatization of total abstention.',
    methodology: 'Dynamic factor analysis combining search indices, biometric health app penetration, and social sentiment.'
  },
  {
    id: 'h3_cannabis',
    code: 'H3',
    title: 'Cross-Substance Substitution (Recreational Cannabis)',
    variable: 'State/jurisdiction legal recreational dispensary access index',
    proxySource: 'State regulatory sales reports, SAMHSA NSDUH, Canadian CCHS',
    betaCoeff: -0.214,
    stdError: 0.061,
    tStat: -3.51,
    pValue: 0.0018,
    rSquared: 0.435,
    ci95: [-0.334, -0.094],
    confirmed: true,
    coreMechanism: 'Significant elasticity of substitution among young adults (18-25) in legal states. Cannabis presents lower perceived caloric penalty, absence of severe next-day hangovers, and comparable relaxation effects.',
    methodology: 'Staggered Difference-in-Differences (Callaway & Sant’Anna 2021) across 24 US states with legal recreational dispensaries.'
  },
  {
    id: 'h4_economic',
    code: 'H4',
    title: 'Disposable Income Squeeze & Price Elasticity',
    variable: 'Youth discretionary income index (after rent & student debt)',
    proxySource: 'OECD Housing Affordability, Federal Reserve Consumer Credit, BLS CPI Alcohol',
    betaCoeff: -0.187,
    stdError: 0.058,
    tStat: -3.22,
    pValue: 0.0031,
    rSquared: 0.389,
    ci95: [-0.301, -0.073],
    confirmed: true,
    coreMechanism: 'High price elasticity (-0.85 to -1.15) for on-premise drinks among 18-25 demographic facing historic rent burdens and real wage stagnation, rendering nightlife economically prohibitive.',
    methodology: 'Panel fixed effects regression with alcohol excise tax and local cost-of-living interaction terms.'
  }
];

export const BEVERAGE_SHIFT_DATA = [
  { category: 'Beer (Standard ABV)', year2000Share: 52.4, year2024Share: 37.1, change: -15.3, genZInterestPct: 18 },
  { category: 'Wine & Champagne', year2000Share: 28.1, year2024Share: 24.2, change: -3.9, genZInterestPct: 24 },
  { category: 'Spirits & High-Proof', year2000Share: 18.2, year2024Share: 24.6, change: +6.4, genZInterestPct: 38 },
  { category: 'Ready-to-Drink (RTD / Seltzers)', year2000Share: 0.8, year2024Share: 7.0, change: +6.2, genZInterestPct: 49 },
  { category: 'Non-Alcoholic (0.0% Beer/Wine/Spirits)', year2000Share: 0.5, year2024Share: 7.1, change: +6.6, genZInterestPct: 62 }
];

export const DATA_SOURCES_CATALOG = [
  {
    name: 'WHO Global Information System on Alcohol and Health (GISAH)',
    acronym: 'WHO GISAH',
    type: 'Primary Global Registry',
    metrics: 'Recorded & unrecorded pure alcohol per capita (15+), heavy episodic drinking (HED), abstention prevalence',
    coverage: '194 WHO Member States (1960–present, biennial updates)',
    harmonizationChallenge: 'Differential national reporting cadences, varying definition of heavy episodic drinking (60g pure alcohol vs 5+ drinks)',
    url: 'https://www.who.int/data/gho/data/themes/global-information-system-on-alcohol-and-health'
  },
  {
    name: 'Monitoring the Future (MTF - Univ. of Michigan / NIDA)',
    acronym: 'MTF',
    type: 'Longitudinal Youth Survey',
    metrics: '30-day prevalence, 2-week binge drinking (5+ drinks), perceived risk, peer disapproval among 8th, 10th, 12th graders & young adults',
    coverage: 'United States national representative sample (1975–present, annual)',
    harmonizationChallenge: 'Classroom administration shift to tablet web-based during 2020 pandemic; modal age shift',
    url: 'https://monitoringthefuture.org/'
  },
  {
    name: 'European School Survey Project on Alcohol and Other Drugs',
    acronym: 'ESPAD',
    type: 'Cross-National Adolescent Survey',
    metrics: 'Standardized binge drinking, intoxication frequency, digital screen habits, availability perceptions among 15–16 year olds',
    coverage: '35+ European nations (1995–present, 4-year waves)',
    harmonizationChallenge: 'Uneven participation across non-EU Eastern European states across waves',
    url: 'http://www.espad.org/'
  },
  {
    name: 'IWSR Drinks Market Analysis',
    acronym: 'IWSR',
    type: 'Commercial Beverage Trade Panel',
    metrics: 'Volume cases by category, RTD retail velocity, No-and-Low alcohol (NoLo) market share by value & volume',
    coverage: '160 global markets (2000–present, semi-annual)',
    harmonizationChallenge: 'Commercial proprietary pricing tiers; on-premise vs off-premise channel reporting granularity',
    url: 'https://www.theiwsr.com/'
  },
  {
    name: 'Gallup Annual Consumption Poll & Pew Research',
    acronym: 'Gallup / Pew',
    type: 'Adult Public Opinion Survey',
    metrics: 'Self-reported drinker status, days consumed past week, preferred beverage, smartphone screen hours, social loneliness index',
    coverage: 'United States adult population (18+) representative samples (2000–present)',
    harmonizationChallenge: 'Self-report social desirability bias; under-reporting of absolute volume by ~30–40%',
    url: 'https://news.gallup.com/poll/alcohol.aspx'
  }
];
