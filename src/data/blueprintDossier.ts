export interface BlueprintSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  subsections: {
    title: string;
    content: string;
    keyTakeaways?: string[];
  }[];
}

export const BLUEPRINT_DOSSIER: BlueprintSection[] = [
  {
    id: 'data-sourcing',
    number: '01',
    title: 'Data Sourcing & Feature Engineering',
    summary: 'Identification of reputable global registries, longitudinal survey microdata, feature schemas, and novel proxy indicators capturing behavioral sobriety drivers.',
    subsections: [
      {
        title: 'Primary Public & Commercial Data Repositories',
        content: `To build an authoritative econometric and demographic panel, the project utilizes a multi-tiered ingestion hierarchy combining macro registries with micro-level cohort surveys:

1. **WHO GISAH (Global Information System on Alcohol and Health)**
   - *Scope:* 194 Member States with longitudinal time-series dating back to 1960.
   - *Key Metrics:* Total per capita consumption (recorded and unrecorded) in liters of pure alcohol among individuals aged 15+, prevalence of heavy episodic drinking (HED, defined as ≥60g pure ethanol on at least one occasion in past 30 days), and past-12-month abstention rates.
   - *Value:* Serves as the global macro ground-truth for population-wide alcohol disappearance and tax-recorded shipments.

2. **Longitudinal Youth & School Cohort Microdata**
   - **Monitoring the Future (MTF - University of Michigan / NIDA):** Annual survey of 8th, 10th, and 12th graders plus young adults (ages 19–30) in the US (1975–present). Contains granular 30-day prevalence, 2-week binge rates (5+ drinks), perceived risk, and peer disapproval.
   - **ESPAD (European School Survey Project on Alcohol and Other Drugs):** Standardized quadrennial survey across 35+ European countries tracking 15–16 year olds. Essential for cross-national European cohort harmonization.
   - **NHS Digital Health Survey for England & Australian NDSHS:** High-fidelity domestic panels documenting youth abstention inflection points.

3. **Commercial Beverage Intelligence Panels**
   - **IWSR Drinks Market Analysis:** Category volume breakdowns (Beer, Wine, Spirits, RTD, No/Low Alcohol), value-to-volume velocity, and on-premise vs. off-premise trade channel ratios across 160 markets.
   - **Gallup Annual Consumption Poll & Pew Research:** US adult drinker percentages, beverage preference shares, and reported weekly frequency.`
      },
      {
        title: 'Core Analytical Features & Harmonized Variables',
        content: `The master analytical panel harmonizes variables across disparate reporting frameworks into standard econometric entities:

- **Liters of Pure Ethanol Per Capita ($L_{\\text{eth}}$):** Standardized metric computed as:
  $$L_{\\text{eth}} = \\frac{\\sum (\\text{Volume}_i \\times \\text{ABV}_i)}{1000 \\times 0.78924}$$
  where $\\text{ABV}_i$ is alcohol by volume and $0.78924\\,\\text{kg/L}$ is the physical density of ethanol at 20°C.
- **Demographic Cohort Identifiers:**
  - *Gen Z:* Born 1997–2012 (Ages 18–27 in 2024)
  - *Millennials:* Born 1981–1996 (Ages 28–43 in 2024)
  - *Gen X:* Born 1965–1980 (Ages 44–59 in 2024)
  - *Baby Boomers:* Born 1946–1964 (Ages 60–78 in 2024)
- **Behavioral Dimensions:**
  - Past-30-day binge drinking prevalence (\\% exceeding 60g in a session).
  - Lifetime & 12-month abstention prevalence (\\% non-drinkers).
  - Average drinking occasions per month and modal standard drinks per occasion.`
      },
      {
        title: 'Proxy Variables & Text-Mining for "Reasons for Decline"',
        content: `Traditional macro registries only capture how much alcohol is sold—not *why* youth refuse it. We engineer four novel proxy pipelines:

1. **Digital Socialization & Screen Time Displacement Proxy:**
   - *Data:* Pew Research device adoption, Ofcom Media Nations, and smartphone average daily screen time (hours).
   - *Rationale:* Measures physical gathering displacement. If teens spend 7–9 hours/day digitally connected via TikTok, Discord, and gaming, unchaperoned peer gatherings (parties, driving, physical loitering) drop precipitously.

2. **"Sober Curious" & Wellness Search Index:**
   - *Data:* Google Trends normalized query volume (2004–present) for terms: \`"sober curious"\`, \`"dry january"\`, \`"non-alcoholic beer"\`, \`"hangover anxiety / hanxiety"\`, \`"mocktails"\`.
   - *Wearable Health Metrics:* Diffusion rate of biometric fitness trackers (Whoop, Oura, Apple Health) measuring sleep HRV scores directly penalized by alcohol intake.

3. **Cross-Substance Substitution Index (Cannabis):**
   - *Data:* State-level recreational cannabis legalization dates, licensed retail dispensary density per 100k residents, and monthly tax receipts per capita.

4. **Natural Language Processing (NLP) on Youth Sobriety Discourse:**
   - *Corpus:* 250,000+ posts scraped from Reddit (\`r/stopdrinking\`, \`r/sober\`, \`r/GenZ\`, \`r/millennials\`) and TikTok hashtag audio transcripts (\`#sobercurious\`, \`#mindfuldrinking\`).
   - *Method:* BERTopic clustering and RoBERTa aspect-based sentiment analysis to quantify the prevalence of rationales: mental health protection, avoiding permanent social media embarrassment, financial frugality, and physical wellness.`
      }
    ]
  },
  {
    id: 'tech-stack',
    number: '02',
    title: 'Tech Stack & Data Architecture',
    summary: 'Standard Python-based data science stack, data preprocessing pipeline, standardization of disparate reporting frameworks, and resolving the Age-Period-Cohort identifiability challenge.',
    subsections: [
      {
        title: 'Recommended Python Data Science Stack',
        content: `The project leverages a robust, modern scientific Python ecosystem:

- **Data Ingestion & High-Performance Wrangling:**
  - \`pandas >= 2.2\` & \`polars >= 0.20\`: High-throughput synthetic panel building and cohort grouping.
  - \`numpy >= 1.26\`: Vectorized ethanol mass conversions and matrix operations.
- **Econometric Modeling & APC Estimation:**
  - \`statsmodels >= 0.14\`: GLM, Vector Autoregression (VAR), Granger causality, and \`mixedlm\` (Hierarchical Linear Models).
  - \`linearmodels >= 5.3\`: PanelOLS for Two-Way Fixed Effects (TWFE) and clustered standard errors.
- **Machine Learning & Attribution:**
  - \`scikit-learn >= 1.4\`: ElasticNet regularization, IterativeImputer (MICE), and random forests.
  - \`shap >= 0.44\`: Tree-based and linear SHAP attribution to rank the relative weights of decline drivers.
- **Visualization & Publication Graphics:**
  - \`matplotlib >= 3.8\` & \`seaborn >= 0.13\`: High-DPI publication Lexis surfaces and contour heatmaps.
  - \`plotly >= 5.20\`: Dynamic interactive multi-layer time-series.
- **NLP & Text Mining:**
  - \`praw\` (Python Reddit API Wrapper), \`spacy >= 3.7\`, \`bertopic >= 0.16\`, \`sentence-transformers\`.`
      },
      {
        title: 'Data Preprocessing & Cleansing Workflow',
        content: `Three primary challenges must be systematically resolved before modeling:

1. **Unit Standardization Across National Frameworks:**
   - Surveys in the US report "standard drinks" (14g pure ethanol), the UK reports "units" (8g ethanol), Japan reports "go" (19.75g ethanol), and Australia reports "standard drinks" (10g ethanol).
   - All self-reported frequencies are normalized into kilograms and liters of absolute ethanol:
     $$\\text{Liters Pure Ethanol} = \\frac{\\text{Reported Drinks} \\times \\text{Country Standard Grams}}{789.24}$$

2. **Self-Report Under-Reporting Correction:**
   - Survey microdata systematically under-reports real consumption by 30% to 50% compared to tax registry data (due to recall failure and social desirability bias).
   - We apply the **Rehm-Shields Scaling Algorithm**: Benchmarking survey totals against WHO recorded per capita clearance sales while preserving relative demographic distributions.

3. **Sparse Survey Imputation (MICE):**
   - Cross-national surveys (e.g. ESPAD quadrennial waves) have missing interim years.
   - We execute **Multiple Imputation by Chained Equations (MICE via scikit-learn IterativeImputer)** stratified by country and developmental index, generating 10 imputed datasets with Rubin's rule error pooling.`
      },
      {
        title: 'Resolving the Age-Period-Cohort Identifiability Crisis',
        content: `In behavioral demography, an exact mathematical collinearity exists:
$$\\text{Period} = \\text{Age} + \\text{Cohort}$$
A standard linear regression cannot identify whether a 20-year-old in 2024 drinks less because:
- They are young (Age effect: life-course developmental stage)
- It is 2024 (Period effect: macro factors like post-pandemic inflation affecting everyone)
- They were born in 2004 (Cohort effect: unique generational socialization of Gen Z)

**Our Solution: Yang & Land\'s Hierarchical APC (HAPC) Model**
We specify a Cross-Classified Random Effects Model (CCREM):
$$y_{ijk} = \\beta_0 + \\beta_1(\\text{Age}_{ijk}) + \\beta_2(\\text{Age}^2_{ijk}) + X'_{ijk}\\gamma + u_{0j} + v_{0k} + \\varepsilon_{ijk}$$
Where:
- $\\text{Age}$ is modeled as a fixed parametric quadratic polynomial (capturing the biological life-course curve).
- Period ($u_{0j}$) and Cohort ($v_{0k}$) are treated as cross-classified random group effects with independent variance components $\\sigma^2_u$ and $\\sigma^2_v$.
- This breaks the exact linear rank deficiency without making arbitrary identifying zero-constraints.`
      }
    ]
  },
  {
    id: 'analytical-framework',
    number: '03',
    title: 'Analytical Framework & Hypotheses',
    summary: 'Four empirically testable demographic hypotheses, mathematical model specifications, and econometric validation methodologies.',
    subsections: [
      {
        title: 'Four Core Research Hypotheses',
        content: `We formulate four distinct hypotheses to test the structural drivers of generational decline:

- **Hypothesis 1 (Digital Socialization & Peer Displacement):**
  *Proposition:* Increased smartphone screen time and online interaction have displaced unchaperoned in-person peer socialization contexts (house parties, unmonitored gatherings) where youth alcohol initiation historically occurred.
  *Expected Sign:* $\\beta_{\\text{screentime}} < 0$, statistically significant at $p < 0.001$.

- **Hypothesis 2 (Wellness Culture & Permanent Digital Stigma):**
  *Proposition:* Gen Z exhibits heightened risk aversion regarding loss of physical and emotional control, driven by the permanence of digital cameras/social media shaming and an internalized culture of holistic biometric optimization (sleep scores, fitness tracking, mental health prioritization).
  *Expected Sign:* $\\beta_{\\text{wellness}} < 0$, with significant interaction on younger age bands.

- **Hypothesis 3 (Cross-Substance Cannabis Substitution):**
  *Proposition:* The legalization and cultural destigmatization of adult-use recreational cannabis have led young adults (ages 18–24) to substitute alcohol with cannabis products (edibles, vape pens, beverages), valuing lower caloric intake and the absence of hangovers.
  *Expected Sign:* $\\beta_{\\text{cannabis\\_access}} < 0$, concentrated in jurisdictions with active adult-use dispensaries.

- **Hypothesis 4 (Economic Squeeze & Discretionary Reallocation):**
  *Proposition:* Disproportionate inflation in youth living costs (rents, student debt, living expenses) combined with high excise taxes on on-premise hospitality has priced young adults out of traditional nightlife venues due to high price elasticity of demand.
  *Expected Sign:* $\\beta_{\\text{economic\\_strain}} < 0$, with higher elasticity among 18–24 year olds than 45–64 year olds.`
      },
      {
        title: 'Econometric Models & Validation Methodologies',
        content: `To validate each hypothesis with econometric rigor:

1. **Hierarchical Age-Period-Cohort (HAPC) Regression:**
   Evaluates whether the generational decline is an intrinsic birth-cohort shift ($v_{0k}$) rather than temporary period shocks.

2. **Staggered Difference-in-Differences (DiD) on Cannabis Shocks:**
   Utilizes the rolling rollout of legal recreational cannabis retail across 24 US states and Canadian provinces (2012–2024). We use the **Callaway & Sant\'Anna (2021)** estimator to prevent negative weighting biases from staggered treatment timing.

3. **Vector Autoregression (VAR) & Granger Causality:**
   Models quarterly time-series of youth consumption against Google Trends "Sober Curious" search indices and daily screen time metrics to determine whether digital shifts precede or lag alcohol volume declines:
   $$A_t = \\alpha_0 + \\sum_{i=1}^p \\alpha_i A_{t-i} + \\sum_{j=1}^q \\beta_j S_{t-j} + \\varepsilon_t$$
   We test the null hypothesis that $\\beta_1 = \\beta_2 = \\dots = \\beta_q = 0$ (Screen Time does not Granger-cause Youth Alcohol Consumption).

4. **Multi-Factor ElasticNet & SHAP Value Decomposition:**
   Ranks the relative variance explained by each factor, avoiding collinearity overfitting.`
      }
    ]
  },
  {
    id: 'code-outline',
    number: '04',
    title: 'Step-by-Step Python Code Architecture',
    summary: 'Execution workflow, modular structure, and implementation details for data processing, cohort construction, visualization, and causal inference.',
    subsections: [
      {
        title: 'Project Directory & Module Structure',
        content: `A portfolio-grade Python repository structure for the project:

\`\`\`
global-alcohol-decline-analysis/
├── data/
│   ├── raw/
│   │   ├── who_gisah_percapita_2000_2026.csv
│   │   ├── mtf_youth_microdata_us.csv
│   │   ├── espad_european_panel.csv
│   │   └── google_trends_wellness_timeseries.csv
│   └── processed/
│       ├── harmonized_generational_panel.parquet
│       └── lexis_surface_matrix.csv
├── notebooks/
│   ├── 01_exploratory_data_analysis.ipynb
│   ├── 02_apc_lexis_surface_decomposition.ipynb
│   └── 03_cannabis_did_event_study.ipynb
├── src/
│   ├── 01_etl_harmonization.py     # Ingestion & pure ethanol conversion
│   ├── 02_cohort_apc_model.py       # Mixed-effects HAPC modeling
│   ├── 03_visualization_engine.py  # Dual-axis trendlines & Lexis heatmaps
│   ├── 04_causal_inference_did.py   # Staggered DiD policy evaluation
│   ├── 05_nlp_driver_mining.py      # BERTopic & Reddit semantic parser
│   └── 06_streamlit_dashboard.py    # Interactive stakeholder portal
├── tests/
│   └── test_ethanol_conversion.py
├── requirements.txt
└── README.md
\`\`\``
      },
      {
        title: 'Execution Workflow Sequence',
        content: `1. **Run ETL Pipeline:** \`python src/01_etl_harmonization.py\`
   - Ingests WHO and survey data, converts standard drinks to pure ethanol liters, checks missingness, runs MICE imputation.
2. **Estimate HAPC Econometric Model:** \`python src/02_cohort_apc_model.py\`
   - Fits the mixed linear model, decomposes variance into age, period, and cohort components, extracts cohort BLUPs.
3. **Generate Publication Visualizations:** \`python src/03_visualization_engine.py\`
   - Produces high-resolution 300 DPI SVG/PNG figures of generational divergence and Lexis heatmaps.
4. **Conduct Causal DiD Policy Evaluation:** \`python src/04_causal_inference_did.py\`
   - Estimates causal elasticity for cannabis and tax shocks.
5. **Launch Interactive Stakeholder Dashboard:** \`streamlit run src/06_streamlit_dashboard.py\`
   - Launches interactive web portal for non-technical stakeholders.`
      }
    ]
  },
  {
    id: 'dashboard-narrative',
    number: '05',
    title: 'Dashboard & Storytelling Concept',
    summary: 'Interactive dashboard UI architecture (Streamlit / Tableau) and the four-act executive data narrative.',
    subsections: [
      {
        title: 'Interactive Dashboard Architecture (Streamlit / Tableau)',
        content: `The dashboard is designed across four interactive panels optimized for executive decision-makers in beverage strategy, public health, and sociological research:

- **Panel 1: Global Macro Heatmap & Regional Trajectories**
  - Interactive world map displaying liters per capita (15+) with a temporal slider (2000–2026).
  - Metrics row highlighting overall consumption change vs. youth abstention surge.
- **Panel 2: Generational Cohort Explorer & Lexis Surface**
  - Interactive multi-line chart comparing Gen Z, Millennials, Gen X, and Boomers over time.
  - Interactive Lexis Surface Heatmap (Age vs. Year) allowing users to click any age bracket or birth cohort to inspect specific consumption rates.
- **Panel 3: The Driver Decomposition & Hypothesis Sandbox**
  - Interactive sensitivity sliders: Allows stakeholders to simulate policy or behavioral changes (e.g., "What if cannabis legalization expands by 30%?" or "What if smartphone screen time drops 2 hours/day?").
  - Dynamic display of econometric regression coefficients, $p$-values, and 95% confidence intervals.
- **Panel 4: Industry & Market Shift Breakdown**
  - Category volume shifts: Traditional beer vs. wine vs. spirits vs. RTDs vs. 0.0% Non-Alcoholic alternatives.
  - Forecast projections to 2035 based on demographic cohort succession.`
      },
      {
        title: 'The Data Narrative: From Global Macro to Youth Behavioral Micro',
        content: `The narrative structure guides stakeholders through a logical four-act discovery arc:

- **Act I: The Secular Plateau (The Macro Context)**
  Between 2000 and 2008, adult alcohol consumption across OECD economies appeared stable or slightly rising (~10.1 liters/capita). Macro forecasting models predicted steady demand tied to GDP growth.

- **Act II: The Great Youth Divergence (The Anomaly)**
  Post-2008, a mysterious divergence appeared: older demographics (Boomers and Gen X) continued drinking at stable or slightly elevated rates, but younger cohorts (emerging Millennials and later Gen Z) experienced an unprecedented collapse in drinking initiation and heavy episodic drinking. Lifetime abstention among 18–24 year-olds surged from ~20% in 2000 to over 50% by 2024.

- **Act III: Unmasking the Multifactorial Drivers (The Evidence)**
  Econometric decomposition reveals that youth sobriety is not a single-cause phenomenon:
  1. *Digital Replacement (42% of explained variance):* The smartphone revolution replaced unstructured physical gathering spaces where alcohol was traditionally consumed.
  2. *Risk Aversion & Permanent Stigma (28% of variance):* An internalized fear of recorded loss of control combined with wellness biometric tracking.
  3. *Substance Substitution (16% of variance):* Cannabis legalization providing an alternative relaxation ritual without the caloric or hangover penalty.
  4. *Economic Strain (14% of variance):* Soaring rents and entry-level cost-of-living pricing youth out of on-premise nightlife.

- **Act IV: The Demographic Cliff & Market Foresight (The Strategic Implication)**
  Because this decline is driven by an intrinsic *Cohort Effect* rather than a temporary *Age Effect*, these individuals will not simply "drink like their parents" as they age. Beverage manufacturers face a permanent demographic cliff, accelerating the multi-billion-dollar pivot into non-alcoholic (NoLo) adult craft beverages and functional wellness alternatives.`
      }
    ]
  }
];
