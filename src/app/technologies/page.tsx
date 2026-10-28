import type { Metadata } from "next";
import Link from "next/link";
import { internships } from "@/lib/internships";
import { getTechnologies } from "@/lib/catalog";
export const metadata: Metadata = { title: "Technology domains", description: "Explore technology domains and see which tools appear in current ELARIN TECH internship curricula." };
const domains = [
  { id:"programming", title:"Programming Languages", intro:"Languages used to express application, data and engineering logic.", active:["Python","JavaScript","TypeScript","C/C++ or MicroPython for embedded firmware"], explore:["Java","C","C++"], slugs:["full-stack-web-development-internship","artificial-intelligence-machine-learning-internship","data-science-business-analytics-internship","embedded-systems-internet-of-things-internship"] },
  { id:"web", title:"Web Development", intro:"Interface, application architecture and web service foundations.", active:["HTML","CSS","JavaScript","TypeScript","React","Next.js","Node.js","REST APIs","accessibility","Git and GitHub"], explore:["Express.js"], slugs:["full-stack-web-development-internship","generative-ai-ai-application-development-internship"] },
  { id:"ai-ml", title:"Artificial Intelligence and Machine Learning", intro:"Data preparation, model development, evaluation and responsible use.", active:["Python","NumPy","pandas","scikit-learn","model evaluation","deep-learning foundations","explainability and fairness"], explore:["TensorFlow","PyTorch"], slugs:["artificial-intelligence-machine-learning-internship","data-science-business-analytics-internship"] },
  { id:"gen-ai", title:"Generative AI", intro:"Language-model application design, retrieval and evaluation.", active:["LLM concepts","prompt design","model APIs","embeddings","vector search","retrieval-augmented generation","safety evaluation"], explore:["Multimodal model APIs","agentic workflows"], slugs:["generative-ai-ai-application-development-internship"] },
  { id:"data", title:"Data Science and Analytics", intro:"Query, analyse, visualise and explain data for decisions.", active:["SQL","Python notebooks","spreadsheets","descriptive statistics","dashboards","cohort and funnel analysis","forecasting fundamentals"], explore:["Power BI","Tableau","Excel automation"], slugs:["data-science-business-analytics-internship","artificial-intelligence-machine-learning-internship"] },
  { id:"databases", title:"Databases", intro:"Persistent data models and the foundations of trustworthy information systems.", active:["PostgreSQL","SQL","Prisma ORM","relational data modelling"], explore:["MySQL","MongoDB","SQLite"], slugs:["full-stack-web-development-internship","data-science-business-analytics-internship"] },
  { id:"cloud", title:"Cloud and DevOps", intro:"Version control, deployment awareness and operational reliability.", active:["Git and GitHub","deployment workflows","environment configuration","observability concepts"], explore:["AWS","Microsoft Azure","Google Cloud","Docker","GitHub Actions"], slugs:["full-stack-web-development-internship","generative-ai-ai-application-development-internship"] },
  { id:"security", title:"Cybersecurity", intro:"Defensive security, authorised practice and safe handling of systems and information.", active:["Linux command line","networking fundamentals","OWASP Top 10 concepts","safe sandbox testing","incident response","secure sessions and input handling"], explore:["Wireshark","Nmap","additional OWASP testing tools"], slugs:["cybersecurity-ethical-hacking-fundamentals-internship","full-stack-web-development-internship","generative-ai-ai-application-development-internship"] },
  { id:"embedded", title:"Embedded Systems and IoT", intro:"Firmware, sensors, device communications and reliable telemetry.", active:["C/C++ or MicroPython","GPIO","ADC and PWM","I2C/SPI/UART","sensor calibration","Wi-Fi/BLE","MQTT concepts"], explore:["Arduino","ESP32","hardware-kit extensions"], slugs:["embedded-systems-internet-of-things-internship"] },
  { id:"electronics", title:"Electronics and VLSI", intro:"Digital design, RTL verification and synthesis fundamentals.", active:["Boolean logic","finite-state machines","Verilog/SystemVerilog","testbenches","waveform inspection","synthesis reports"], explore:["Additional HDL simulators","FPGA implementation"], slugs:["digital-electronics-vlsi-design-fundamentals-internship"] },
  { id:"electrical", title:"Electrical and Renewable Energy", intro:"Electrical design concepts, industrial automation and solar system analysis.", active:["Electrical schematics","PLC ladder logic","HMI concepts","solar PV sizing","energy yield and loss analysis"], explore:["SCADA concepts","vendor-specific PLC suites"], slugs:["electrical-design-industrial-automation-internship","renewable-energy-solar-pv-system-analysis-internship"] },
  { id:"mechanical", title:"Mechanical Engineering", intro:"Product design, CAD documentation and engineering simulation workflows.", active:["Parametric CAD","assemblies and drawings","finite-element method concepts","mesh convergence","design for manufacturing"], explore:["AutoCAD","SolidWorks","Fusion"], slugs:["mechanical-cad-3d-product-design-internship","mechanical-simulation-product-engineering-internship"] },
  { id:"civil", title:"Civil Engineering and BIM", intro:"Civil drafting, coordinated building models and traceable quantity estimation.", active:["AutoCAD-style drafting","plans, sections and elevations","BIM model setup","schedules and quantity takeoff","coordination checks"], explore:["Revit","additional BIM authoring tools"], slugs:["autocad-civil-engineering-drawing-internship","bim-quantity-estimation-internship"] },
];
export default async function TechnologiesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category = "all" } = await searchParams;
  const publishedTechnologies = await getTechnologies();
  const visibleDomains = category === "all" ? domains : domains.filter((domain) => domain.id === category);

  return (
    <main className="shell technologies-page">
      <header className="page-hero technologies-hero">
        <p className="eyebrow">Technologies</p>
        <h1>Explore the Tools Behind Practical Learning.</h1>
        <p>Explore technologies referenced in current learning programs, alongside additional areas that may be explored in future programs.</p>
      </header>

      <nav className="domain-filters" aria-label="Filter technology domains">
        <Link className={`domain-filter${category === "all" ? " active" : ""}`} aria-current={category === "all" ? "page" : undefined} href="/technologies">All domains</Link>
        {domains.map((domain) => (
          <Link key={domain.id} className={`domain-filter${category === domain.id ? " active" : ""}`} aria-current={category === domain.id ? "page" : undefined} href={`/technologies?category=${domain.id}`}>
            {domain.title}
          </Link>
        ))}
      </nav>

      {visibleDomains.length ? (
        <section className="domain-grid" aria-label="Technology domains">
          {visibleDomains.map((domain) => (
            <article className="domain-card" id={domain.id} key={domain.id}>
              <header className="domain-card-header">
                <p className="eyebrow">Technology domain</p>
                <h2>{domain.title}</h2>
                <p className="domain-intro">{domain.intro}</p>
              </header>
              <section className="domain-card-section">
                <h3>Currently included in relevant curricula</h3>
                <div className="domain-tags" aria-label="Currently taught technologies">
                  {domain.active.map((item) => <span className="domain-tag domain-tag-active" key={item}>{item}</span>)}
                </div>
              </section>
              <section className="domain-card-section domain-card-exploration">
                <h3>Additional exploration areas</h3>
                <p className="domain-note">Suggested topics for further exploration; availability in future programs is not confirmed.</p>
                <div className="domain-tags" aria-label="Additional exploration areas">
                  {domain.explore.map((item) => <span className="domain-tag" key={item}>{item}</span>)}
                </div>
              </section>
              <section className="domain-card-section domain-related">
                <h3>Related programs</h3>
                <ul>
                  {domain.slugs.map((slug) => {
                    const program = internships.find((entry) => entry.slug === slug);
                    return program ? <li key={slug}><Link href={`/internships/${slug}`}>{program.title}</Link></li> : null;
                  })}
                </ul>
              </section>
              {domain.slugs.some((slug) => internships.some((program) => program.slug === slug)) ? (
                <Link className="domain-card-cta" href={`/internships/${domain.slugs.find((slug) => internships.some((program) => program.slug === slug))}`}>
                  Explore related programs <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </article>
          ))}
        </section>
      ) : (
        <p className="empty-state">No technology domains match this selection. Choose “All domains” to see every area.</p>
      )}

      {publishedTechnologies.length ? (
        <section className="section published-technologies">
          <div className="section-heading"><p className="eyebrow">Published technology profiles</p><h2>More about specific tools.</h2></div>
          <div className="card-grid">
            {publishedTechnologies.map((technology) => (
              <article className="program-card" key={technology.id}>
                <p className="eyebrow">Technology profile</p><h3>{technology.title}</h3><p>{technology.summary}</p>
                <Link href={`/technologies/${technology.slug}`}>Explore profile →</Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
