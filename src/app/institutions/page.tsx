import { InquiryForm } from "@/components/inquiry-form";
import { brand } from "@/lib/brand";

export const metadata = { title: "For institutions", description: "Discuss practical internships, technical training and project-based learning with ELARIN TECH." };
const offerings = [
  ["Internship collaboration", "Discuss structured, 13–15 week internship opportunities across relevant engineering branches."],
  ["Workshops and technical sessions", "Plan sessions around AI/ML, Generative AI, web development, analytics, cybersecurity, IoT, electronics, electrical, mechanical, civil CAD or BIM."],
  ["Bootcamps and project-based learning", "Explore focused learning activities where learners practise concepts through guided technical projects."],
  ["Faculty and department collaboration", "Discuss custom sessions and learning activities shaped around a department's needs and academic calendar."],
  ["Technical events", "Explore possible collaboration on workshops, hackathons, ideathons and other technical events."],
];
const resources = ["Company brochure", "Internship catalogue", "Institutional proposal", "Workshop catalogue", "Sample schedules", "Assessment framework", "Certificate design"];
export default function InstitutionsPage() {
  return <div className="shell"><header className="page-hero"><p className="eyebrow">For institutions</p><h1>Build practical learning into campus life.</h1><p>ELARIN TECH welcomes conversations with colleges and educational institutions about internships, technical sessions and project-based learning. Share your requirements and we can discuss a suitable collaboration.</p><div className="hero-actions"><a className="button" href="#institution-enquiry">Discuss a collaboration</a><a className="button button-outline" href={`mailto:${brand.email}?subject=${encodeURIComponent("Institutional proposal enquiry")}`}>Request a proposal</a></div></header>
    <section className="section" style={{ paddingTop: 0 }}><div className="pillar-grid">{offerings.map(([title, text], index) => <article className="pillar-card" key={title}><span className="pillar-number">0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</div></section>
    <section className="section"><div className="section-heading"><p className="eyebrow">Resources</p><h2>Information for your planning.</h2><p className="section-copy">These materials are being prepared. Contact us if your institution needs a proposal, schedule or assessment outline for discussion.</p></div><div className="resource-list">{resources.map((resource) => <div className="resource-item" key={resource}><span>{resource}</span><span className="resource-status">Not yet published</span></div>)}</div></section>
    <section className="form-panel institution-panel" id="institution-enquiry"><p className="eyebrow">Start a conversation</p><h2>Tell us about your institution.</h2><p className="section-copy">A few details will help us route your enquiry to the right conversation.</p><InquiryForm kind="institution" submitLabel="Send institutional enquiry"/><p className="form-status contact-email">You can also email <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p></section>
  </div>;
}

