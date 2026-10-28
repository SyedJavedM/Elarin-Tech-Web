export type CurriculumPhase = {
  weeks: string;
  title: string;
  topics: string[];
  optional?: boolean;
};

export type InternshipProgram = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  duration: "13–15 Weeks";
  mode: string;
  pricePaise: number;
  outcomes: string[];
  prerequisites: string[];
  curriculum: CurriculumPhase[];
};

const sharedPhases = {
  foundation: (topics: string[]): CurriculumPhase => ({ weeks: "Weeks 1–2", title: "Orientation, fundamentals and setup", topics }),
  core: (topics: string[]): CurriculumPhase => ({ weeks: "Weeks 3–5", title: "Core concepts and guided learning", topics }),
  practice: (topics: string[]): CurriculumPhase => ({ weeks: "Weeks 6–8", title: "Intermediate concepts and practical exercises", topics }),
  advanced: (topics: string[]): CurriculumPhase => ({ weeks: "Weeks 9–11", title: "Advanced topics, specialist tools and project development", topics }),
  capstone: (topics: string[]): CurriculumPhase => ({ weeks: "Weeks 12–13", title: "Capstone completion, testing, documentation and evaluation", topics }),
  optional: (topics: string[]): CurriculumPhase => ({ weeks: "Weeks 14–15 · Optional", title: "Advanced extension and final presentation", topics, optional: true }),
};

export const internships: InternshipProgram[] = [
  {
    slug: "full-stack-web-development-internship",
    title: "Full-Stack Web Development Internship",
    category: "IT · Software Development",
    summary: "Build accessible, responsive web products from interface to API and database.",
    description: "A project-led pathway through modern frontend and backend engineering, with a deployed full-stack product as the capstone.",
    duration: "13–15 Weeks", mode: "Online", pricePaise: 0,
    outcomes: ["Build responsive interfaces with reusable components", "Design and secure REST APIs with persistent data", "Test, document and deploy a production-style web application"],
    prerequisites: ["Basic computer use and internet skills", "HTML/CSS or programming experience is helpful but not required"],
    curriculum: [
      sharedPhases.foundation(["Internship orientation, Git/GitHub workflow and web architecture", "HTML, CSS, JavaScript refresh; editor, browser tools, Node.js and package setup"]),
      sharedPhases.core(["Semantic HTML, responsive CSS, accessibility and design systems", "JavaScript modules, async programming, DOM and TypeScript fundamentals", "React components, state, props, routing and form patterns"]),
      sharedPhases.practice(["Next.js App Router, layouts, server/client components and data loading", "API design, validation, authentication concepts and PostgreSQL with Prisma", "Build a feature in small increments with code review and automated checks"]),
      sharedPhases.advanced(["Authorization, secure session handling, error states and input safety", "Performance, caching, SEO, accessibility audits and responsive refinement", "Develop capstone requirements, architecture, data model and vertical slices"]),
      sharedPhases.capstone(["Complete a full-stack application with documented setup and user journeys", "Unit/integration checks, accessibility review, bug fixing and deployment", "Technical walkthrough, project report, evaluation and retrospective"]),
      sharedPhases.optional(["Add a meaningful advanced feature such as realtime updates or role-based workflows", "Refine observability, performance and deployment pipeline; present the final product"]),
    ],
  },
  {
    slug: "artificial-intelligence-machine-learning-internship",
    title: "Artificial Intelligence and Machine Learning Internship",
    category: "IT · Artificial Intelligence",
    summary: "Prepare data, train and evaluate machine-learning models, and explain results responsibly.",
    description: "A foundations-to-capstone experience in applied machine learning, covering the complete workflow from problem framing and data quality to deployment considerations.",
    duration: "13–15 Weeks", mode: "Online", pricePaise: 0,
    outcomes: ["Prepare and explore a dataset using Python", "Compare suitable supervised or unsupervised models", "Evaluate model quality, limitations and responsible-use risks"],
    prerequisites: ["Basic algebra and comfort using a computer", "Introductory Python is helpful; guided refreshers are included"],
    curriculum: [
      sharedPhases.foundation(["Orientation, problem framing, Python notebooks and environment setup", "Python, NumPy, pandas, data types, statistics refresher and responsible AI basics"]),
      sharedPhases.core(["Data cleaning, exploratory analysis, visualization and leakage prevention", "Train/validation/test splits, baselines and regression/classification metrics", "Linear models, decision trees and feature engineering with scikit-learn"]),
      sharedPhases.practice(["Ensembles, clustering, dimensionality reduction and model selection", "Cross-validation, imbalance handling, calibration and error analysis", "Reproducible experiments, pipelines and interpretable-model exercises"]),
      sharedPhases.advanced(["Neural-network foundations, embeddings and introductory deep learning", "Explainability, fairness checks, privacy, drift and deployment patterns", "Plan and implement a domain-specific ML capstone with measurable criteria"]),
      sharedPhases.capstone(["Train and compare models; record data decisions and experiment results", "Test robustness, document limitations and prepare a reproducible handoff", "Present findings, evaluation evidence and responsible-use assessment"]),
      sharedPhases.optional(["Explore a specialised model family or a small model-serving workflow", "Improve monitoring/interpretability and present a refined technical demo"]),
    ],
  },
  {
    slug: "data-science-business-analytics-internship",
    title: "Data Science and Business Analytics Internship",
    category: "IT · Data and Analytics",
    summary: "Turn business questions into trustworthy analysis, dashboards and evidence-based recommendations.",
    description: "A practical analytics internship spanning data preparation, statistical reasoning, SQL, visualization and a stakeholder-ready decision project.",
    duration: "13–15 Weeks", mode: "Online", pricePaise: 0,
    outcomes: ["Query and clean relational data", "Build clear analytical visualizations and dashboards", "Communicate recommendations with assumptions and caveats"],
    prerequisites: ["Basic spreadsheet familiarity", "No prior analytics job experience required"],
    curriculum: [
      sharedPhases.foundation(["Orientation, business-question framing, data ethics and tool setup", "Spreadsheet analysis, SQL environment, Python notebooks and descriptive statistics"]),
      sharedPhases.core(["SQL filtering, joins, aggregation, subqueries and data quality checks", "Data cleaning, missingness, outliers and exploratory data analysis", "Chart selection, dashboard principles and communicating uncertainty"]),
      sharedPhases.practice(["Hypothesis testing, confidence intervals, sampling and experiment basics", "Cohort, funnel, retention and segmentation analysis", "Build a dashboard with documented definitions and reproducible queries"]),
      sharedPhases.advanced(["Forecasting and regression for business questions; assumptions and validation", "Metric governance, privacy-aware analysis and stakeholder storytelling", "Develop a capstone analysis from a scoped business case to recommendations"]),
      sharedPhases.capstone(["Complete analysis, dashboard and concise decision brief", "Validate calculations, reconcile metrics and document data lineage", "Present insights, limitations and recommended next actions"]),
      sharedPhases.optional(["Add scenario analysis, a forecast or an automated reporting workflow", "Refine dashboard usability and deliver a stakeholder presentation"]),
    ],
  },
  {
    slug: "generative-ai-ai-application-development-internship",
    title: "Generative AI and AI Application Development Internship",
    category: "IT · Generative AI",
    summary: "Design useful LLM-powered applications with retrieval, evaluation and safety built in.",
    description: "A software-focused generative AI pathway: learners build a grounded AI application and learn to evaluate quality, protect data and handle failure modes.",
    duration: "13–15 Weeks", mode: "Online", pricePaise: 0,
    outcomes: ["Build an application using model APIs and structured outputs", "Implement retrieval-augmented generation with source grounding", "Evaluate quality, safety, latency and cost trade-offs"],
    prerequisites: ["Basic programming experience in Python or JavaScript", "Comfort with APIs and JSON is helpful"],
    curriculum: [
      sharedPhases.foundation(["Orientation, AI-use boundaries, API keys and secure environment setup", "LLM concepts, tokens, context windows, prompting and structured output basics"]),
      sharedPhases.core(["Prompt design, system instructions, templates and function/tool calling", "Model APIs, streaming responses, JSON schemas and error handling", "Embeddings, vector search and document preprocessing"]),
      sharedPhases.practice(["Build retrieval-augmented generation with citations and chunking", "Conversation state, tool workflows and application UX", "Create a small evaluation set; test relevance, faithfulness and regressions"]),
      sharedPhases.advanced(["Guardrails, prompt-injection defense, privacy and sensitive-data handling", "Model selection, caching, rate limits, latency and cost optimization", "Develop a domain-grounded AI capstone with human fallback paths"]),
      sharedPhases.capstone(["Complete the application, source-grounded responses and evaluation report", "Test edge cases, safety failures, access boundaries and deployment behavior", "Document architecture, model choices, limitations and present the demo"]),
      sharedPhases.optional(["Add an agentic tool workflow or multimodal feature with clear controls", "Expand evaluation coverage and deliver an improved final presentation"]),
    ],
  },
  {
    slug: "cybersecurity-ethical-hacking-fundamentals-internship",
    title: "Cybersecurity and Ethical Hacking Fundamentals Internship",
    category: "IT · Cybersecurity",
    summary: "Learn defensive security and authorised testing in isolated, purpose-built lab environments.",
    description: "A safety-first introduction to security operations, web risks, threat modeling and ethical assessment. All practical testing is limited to owned or explicitly authorised lab targets.",
    duration: "13–15 Weeks", mode: "Online · Controlled labs", pricePaise: 0,
    outcomes: ["Explain common network and application security risks", "Run a scoped assessment against a controlled training target", "Write actionable findings with evidence and remediation guidance"],
    prerequisites: ["Basic computer and networking familiarity", "A commitment to written scope and authorised lab-only practice"],
    curriculum: [
      sharedPhases.foundation(["Orientation, legal/ethical scope, rules of engagement and lab isolation", "Networking, Linux command line, identity/access basics and safe lab setup"]),
      sharedPhases.core(["Threat modeling, security principles, risk and incident lifecycle", "Web architecture, HTTP, authentication and common secure-design failures", "Log reading, asset inventory, patch hygiene and defensive controls"]),
      sharedPhases.practice(["OWASP Top 10 concepts in intentionally vulnerable local applications", "Safe scanning, evidence capture and vulnerability validation within scope", "Secure configuration, access control and basic detection exercises"]),
      sharedPhases.advanced(["Security testing methodology, prioritization and false-positive management", "Incident triage, containment, reporting and remediation verification", "Plan an authorised lab assessment and develop a clear findings report"]),
      sharedPhases.capstone(["Assess the provided sandbox target strictly within written scope", "Reproduce findings safely, verify fixes and document residual risks", "Present a remediation-focused report and conduct a peer review"]),
      sharedPhases.optional(["Add a defensive detection rule or secure-configuration improvement", "Retest the sandbox, refine severity reasoning and present lessons learned"]),
    ],
  },
  {
    slug: "embedded-systems-internet-of-things-internship",
    title: "Embedded Systems and Internet of Things (IoT) Internship",
    category: "ECE · Embedded Systems",
    summary: "Connect sensors, microcontrollers and reliable device-to-cloud telemetry in a tested prototype.",
    description: "A hardware-aware IoT pathway covering microcontroller programming, sensor interfaces, connectivity, device safety and a documented connected-device prototype.",
    duration: "13–15 Weeks", mode: "Online · Simulation or hardware kit", pricePaise: 0,
    outcomes: ["Interface sensors and actuators with a microcontroller", "Design a reliable telemetry path and handle device errors", "Demonstrate and document an IoT prototype"],
    prerequisites: ["Basic electronics and programming curiosity", "Simulation alternatives are available where a physical kit is unavailable"],
    curriculum: [
      sharedPhases.foundation(["Orientation, electrical safety, block diagrams and tool/simulator setup", "C/C++ or MicroPython refresh, digital/analog signals and datasheet reading"]),
      sharedPhases.core(["GPIO, timers, ADC, PWM and interrupt fundamentals", "Sensor calibration, I2C/SPI/UART buses and actuator control", "Firmware structure, state machines and serial debugging"]),
      sharedPhases.practice(["Wi-Fi/BLE connectivity, MQTT concepts and telemetry payload design", "Device provisioning, retries, offline behavior and power-aware operation", "Build a sensor node with a simple dashboard and alert thresholds"]),
      sharedPhases.advanced(["IoT threat surfaces, secure credentials and firmware-update concepts", "Reliability testing, noise, latency and data-quality troubleshooting", "Develop a capstone device with an architecture and test plan"]),
      sharedPhases.capstone(["Integrate sensing, firmware, connectivity and a useful application", "Test sensor accuracy, reconnect behavior and safe operating conditions", "Document wiring, firmware, data flow and demonstrate the device"]),
      sharedPhases.optional(["Add edge filtering, low-power improvements or an additional sensor", "Refine enclosure/interface and present a tested prototype"]),
    ],
  },
  {
    slug: "digital-electronics-vlsi-design-fundamentals-internship",
    title: "Digital Electronics and VLSI Design Fundamentals Internship",
    category: "ECE · Digital Design and VLSI",
    summary: "Move from digital logic to a simulated RTL design, verification plan and synthesis review.",
    description: "A digital design internship that connects Boolean logic, sequential systems, HDL modeling, testbenches and introductory synthesis concepts.",
    duration: "13–15 Weeks", mode: "Online · EDA simulation tools", pricePaise: 0,
    outcomes: ["Analyze combinational and sequential digital circuits", "Model and verify an RTL block using an HDL", "Interpret basic synthesis and timing reports"],
    prerequisites: ["Basic algebra and interest in digital circuits", "No prior chip fabrication experience required"],
    curriculum: [
      sharedPhases.foundation(["Orientation, EDA workflow, number systems and digital design setup", "Boolean algebra, logic gates, K-maps and combinational circuit analysis"]),
      sharedPhases.core(["Adders, comparators, multiplexers and finite-state-machine design", "Flip-flops, counters, timing concepts and synchronous design discipline", "Verilog/SystemVerilog modules, testbenches and waveform inspection"]),
      sharedPhases.practice(["RTL coding style, parameterization and reusable design blocks", "Assertions, directed/random test cases and functional coverage concepts", "Synthesis flow, constraints, area reports and critical-path interpretation"]),
      sharedPhases.advanced(["Clock-domain crossing awareness, reset strategy and timing closure basics", "Design-for-test concepts, power/area/performance trade-offs and linting", "Develop an RTL capstone with specification, verification and synthesis goals"]),
      sharedPhases.capstone(["Implement and verify the selected digital subsystem", "Run simulation, lint and synthesis; resolve functional/timing issues", "Submit RTL, testbench, waveforms, design notes and evaluation presentation"]),
      sharedPhases.optional(["Add a protocol feature or optimize area/timing within constraints", "Expand test coverage and present a revised synthesis comparison"]),
    ],
  },
  {
    slug: "electrical-design-industrial-automation-internship",
    title: "Electrical Design and Industrial Automation Internship",
    category: "EEE · Electrical Design and Automation",
    summary: "Develop safe electrical schematics and PLC-based automation logic for an industrial process.",
    description: "A practical EEE program linking electrical drawings, component selection, control logic, PLC simulation and safe commissioning documentation.",
    duration: "13–15 Weeks", mode: "Online · PLC simulation tools", pricePaise: 0,
    outcomes: ["Read and produce a basic electrical control schematic", "Create and test PLC logic for a defined process", "Document interlocks, I/O and safe operating behavior"],
    prerequisites: ["Basic circuit concepts and interest in industrial systems", "All control exercises use simulation unless approved hardware is available"],
    curriculum: [
      sharedPhases.foundation(["Orientation, electrical safety, standards awareness and CAD/simulator setup", "Electrical quantities, protection concepts, symbols and drawing conventions"]),
      sharedPhases.core(["Single-line/control schematics, load estimation and component selection", "Sensors, actuators, contactors, relays and motor-control fundamentals", "PLC scan cycle, digital I/O, ladder logic and tag organization"]),
      sharedPhases.practice(["Timers, counters, sequencing and interlocks in PLC simulation", "HMI concepts, alarms, operating modes and fault recovery", "Design a process sequence and test normal plus abnormal scenarios"]),
      sharedPhases.advanced(["VFD/motor-control concepts, energy efficiency and instrumentation", "Functional safety concepts, risk assessment and commissioning checks", "Develop a simulated automation capstone with I/O list and drawings"]),
      sharedPhases.capstone(["Complete schematics, PLC sequence, HMI mockup and operating notes", "Test interlocks, faults, recovery and documented acceptance criteria", "Present the design, test record and safety considerations"]),
      sharedPhases.optional(["Add a simulated data/energy monitor or a more complex process mode", "Refine drawings and conduct a structured design review"]),
    ],
  },
  {
    slug: "renewable-energy-solar-pv-system-analysis-internship",
    title: "Renewable Energy and Solar PV System Analysis Internship",
    category: "EEE · Renewable Energy",
    summary: "Assess solar resource, size a PV system and evaluate performance, losses and economics.",
    description: "A renewable-energy analysis pathway from solar resource and PV fundamentals through system sizing, simulation, yield estimation and a documented design case.",
    duration: "13–15 Weeks", mode: "Online · PV simulation tools", pricePaise: 0,
    outcomes: ["Estimate PV system capacity from a defined energy need", "Interpret shading, temperature, inverter and system losses", "Prepare a transparent performance and feasibility report"],
    prerequisites: ["Basic electrical quantities and spreadsheet familiarity", "No field installation is required"],
    curriculum: [
      sharedPhases.foundation(["Orientation, electrical safety, renewable-energy context and software setup", "Solar geometry, irradiance, weather data and PV cell/module fundamentals"]),
      sharedPhases.core(["PV module/inverter datasheets, string design and system components", "Load profile, energy consumption, site constraints and shading survey concepts", "DC/AC sizing, protection and grid-connected system architecture"]),
      sharedPhases.practice(["PV simulation workflow, yield, performance ratio and loss breakdown", "Temperature, soiling, mismatch, clipping and shading sensitivity", "Compare system sizes/orientations and communicate design assumptions"]),
      sharedPhases.advanced(["Battery/hybrid basics, interconnection and monitoring considerations", "Financial metrics, lifecycle assumptions and uncertainty scenarios", "Develop a site-specific capstone with sizing and energy-yield evidence"]),
      sharedPhases.capstone(["Complete system model, single-line concept and performance report", "Validate inputs, compare scenarios and document safety/approval boundaries", "Present energy, loss, cost and limitation findings"]),
      sharedPhases.optional(["Add storage or resilience scenario and sensitivity analysis", "Refine performance assumptions and present a final feasibility case"]),
    ],
  },
  {
    slug: "mechanical-cad-3d-product-design-internship",
    title: "Mechanical CAD and 3D Product Design Internship",
    category: "Mechanical · CAD and Product Design",
    summary: "Translate a product brief into parametric parts, assemblies, drawings and a design review.",
    description: "A design-focused mechanical internship covering CAD fundamentals, design intent, assembly constraints, manufacturing-aware modeling and a complete product-design portfolio artifact.",
    duration: "13–15 Weeks", mode: "Online · CAD software", pricePaise: 0,
    outcomes: ["Create parametric parts with clear design intent", "Assemble components and produce engineering drawings", "Review a design for fit, function and manufacturability"],
    prerequisites: ["Basic geometry and interest in product design", "CAD software access or a compatible learning tool"],
    curriculum: [
      sharedPhases.foundation(["Orientation, design process, file management and CAD workspace setup", "Units, sketches, constraints, dimensions and engineering drawing basics"]),
      sharedPhases.core(["Extrude/revolve, patterns, fillets and robust parametric feature trees", "Part modeling, materials, tolerances and design intent", "Assembly mates, exploded views, BOM and drawing sheets"]),
      sharedPhases.practice(["Design for manufacturing, fasteners, fits and component selection", "Surface/loft tools, sheet-metal or plastic-part considerations", "Model a product subassembly and create a controlled drawing package"]),
      sharedPhases.advanced(["Configuration management, design revisions and collaboration workflow", "DFM review, ergonomics, serviceability and basic cost trade-offs", "Develop a product capstone from brief through CAD and design review"]),
      sharedPhases.capstone(["Complete parts, assembly, drawings, BOM and design rationale", "Check constraints, interference, dimensions and manufacturing notes", "Present concept, iteration history and final CAD portfolio"]),
      sharedPhases.optional(["Add an alternate configuration or manufacturing-ready refinement", "Improve drawing package and present a final design review"]),
    ],
  },
  {
    slug: "mechanical-simulation-product-engineering-internship",
    title: "Mechanical Simulation and Product Engineering Internship",
    category: "Mechanical · Simulation and Engineering",
    summary: "Build a defensible engineering simulation workflow and use results to improve a product design.",
    description: "A simulation-led mechanical pathway in which learners prepare geometry, define loads and constraints, assess numerical results and document a product-engineering decision.",
    duration: "13–15 Weeks", mode: "Online · Simulation tools", pricePaise: 0,
    outcomes: ["Set up a basic structural simulation with justified assumptions", "Interpret stress, displacement and convergence responsibly", "Use simulation evidence to recommend a design iteration"],
    prerequisites: ["Introductory mechanics and CAD familiarity", "Simulation exercises are educational and not safety certification"],
    curriculum: [
      sharedPhases.foundation(["Orientation, simulation scope, units, CAD cleanup and solver setup", "Statics, stress/strain, material properties and boundary-condition concepts"]),
      sharedPhases.core(["Finite-element method concepts, mesh types and element quality", "Loads, constraints, contacts and linear static study workflow", "Read stress, displacement and reaction results with physical checks"]),
      sharedPhases.practice(["Mesh refinement, convergence checks and sensitivity to assumptions", "Modal/thermal analysis overview and choosing the correct study type", "Correlate simplified calculations with simulation outputs"]),
      sharedPhases.advanced(["Contact/nonlinearity awareness, fatigue concepts and failure criteria", "Design optimization, material selection and simulation report standards", "Build a product-engineering capstone around an explicit design question"]),
      sharedPhases.capstone(["Complete simulation setup, design iteration and comparison evidence", "Review mesh, units, assumptions, convergence and result plausibility", "Present engineering recommendation, limitations and reproducible report"]),
      sharedPhases.optional(["Add a thermal/modal study or sensitivity case when suitable", "Refine geometry based on evidence and present the final engineering review"]),
    ],
  },
  {
    slug: "autocad-civil-engineering-drawing-internship",
    title: "AutoCAD and Civil Engineering Drawing Internship",
    category: "Civil · Drafting and Documentation",
    summary: "Create coordinated, dimensionally clear civil drawings with layers, references and plot-ready sheets.",
    description: "A civil drafting internship focused on CAD accuracy, drawing standards, site and building plan conventions, annotations, sheet setup and quality-controlled deliverables.",
    duration: "13–15 Weeks", mode: "Online · CAD software", pricePaise: 0,
    outcomes: ["Set up a consistent drawing with units, layers and references", "Produce plans, sections, elevations and clear annotations", "Deliver a checked, plot-ready drawing package"],
    prerequisites: ["Basic geometry and spatial reasoning", "CAD software access or an equivalent drafting platform"],
    curriculum: [
      sharedPhases.foundation(["Orientation, drawing standards, coordinate systems and CAD workspace setup", "Units, scales, layers, line types, object snaps and file organization"]),
      sharedPhases.core(["Modify/draw tools, blocks, dimensions, hatches and text styles", "Site plans, grids, plans, sections, elevations and drafting conventions", "Layouts, viewports, plotting and sheet composition"]),
      sharedPhases.practice(["External references, layer states, title blocks and revision control", "Civil plan reading, levels, contours and annotation consistency", "Develop a coordinated small-site drawing set with cross-checks"]),
      sharedPhases.advanced(["Quantity takeoff support, drawing coordination and clash awareness", "Quality assurance, plotting standards and issue/approval workflows", "Develop a civil-drawing capstone with a documented brief"]),
      sharedPhases.capstone(["Complete plan/section/detail sheets and plot-ready PDF set", "Check dimensions, layers, scales, references and drawing consistency", "Present drawing package, revision notes and quality checklist"]),
      sharedPhases.optional(["Add a detail sheet or alternate design option and revise references", "Refine sheet presentation and deliver a final drawing review"]),
    ],
  },
  {
    slug: "bim-quantity-estimation-internship",
    title: "Building Information Modelling (BIM) and Quantity Estimation Internship",
    category: "Civil · BIM and Quantity Estimation",
    summary: "Create a coordinated BIM model and derive traceable quantities for a small building project.",
    description: "A BIM-based civil learning pathway covering model setup, architectural/structural elements, information quality, coordination, schedules and transparent quantity estimation.",
    duration: "13–15 Weeks", mode: "Online · BIM software", pricePaise: 0,
    outcomes: ["Build a structured model using levels, grids and element properties", "Create schedules and trace quantities to model elements", "Review coordination issues and document quantity assumptions"],
    prerequisites: ["Basic building drawing literacy and spatial reasoning", "BIM software access or a compatible educational platform"],
    curriculum: [
      sharedPhases.foundation(["Orientation, BIM roles, model standards and project template setup", "Levels, grids, coordinates, views and building-information fundamentals"]),
      sharedPhases.core(["Walls, floors, roofs, doors, windows and type/instance properties", "Structural framing, columns, foundations and model organization", "View templates, sheets, annotations and model documentation"]),
      sharedPhases.practice(["Schedules, material quantities, filters and parameter management", "Model coordination, linked files, issue tracking and change awareness", "Extract quantities and compare with drawing-based takeoff assumptions"]),
      sharedPhases.advanced(["LOD/LOI, naming conventions, model checks and coordination workflows", "Quantity classification, measurement rules, waste factors and traceability", "Develop a BIM/estimation capstone from a scoped building brief"]),
      sharedPhases.capstone(["Complete coordinated model, views, schedules and quantity summary", "Check model completeness, assumptions, exclusions and schedule consistency", "Present coordination findings and a traceable estimate"]),
      sharedPhases.optional(["Add a design-change comparison or 4D/5D concept where suitable", "Refine model data and present the final BIM handover"]),
    ],
  },
];

export const internshipDuration = "13–15 Weeks" as const;
export const internshipDurationFaq = {
  question: "How long are ELARIN TECH internships?",
  answer: "All 13 engineering internship programs are designed for 13–15 weeks. Weeks 1–13 form the core pathway; weeks 14–15 are optional advanced modules, project refinement and final presentation when the program scope calls for them.",
};
