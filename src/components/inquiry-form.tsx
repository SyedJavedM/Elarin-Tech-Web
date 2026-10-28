"use client";
import { useState, type FormEvent } from "react";

const interests = ["Internships", "AI and machine learning", "Generative AI", "Web development", "Data analytics", "Cybersecurity", "IoT and embedded systems", "Electronics and VLSI", "Electrical engineering", "Mechanical CAD", "Civil CAD and BIM", "Other technical sessions"];

export function InquiryForm({ kind, submitLabel = "Send enquiry" }: { kind: "project" | "institution" | "corporate" | "contact"; submitLabel?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setState("sending");
    setError("");
    const data = Object.fromEntries(formData.entries()) as Record<string, FormDataEntryValue>;
    if (kind === "institution") {
      data.areasOfInterest = formData.getAll("areasOfInterest").map(String) as unknown as FormDataEntryValue;
      data.consent = formData.has("consent") as unknown as FormDataEntryValue;
    }
    try {
      const response = await fetch(`/api/inquiries/${kind === "institution" ? "institutions" : kind}`, {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Could not send this right now. Please try again.");
      form.reset();
      setState("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send this right now. Please try again.");
      setState("error");
    }
  }

  if (kind === "institution") return <form className="form-stack" onSubmit={submit}>
    <div className="form-grid">
      <label>Institution name<input name="institutionName" required minLength={2} maxLength={180} autoComplete="organization"/></label>
      <label>Institution type<select name="institutionType" required defaultValue=""><option value="" disabled>Select type</option>{["College","University","Polytechnic","Training institute","Other"].map((type)=><option key={type}>{type}</option>)}</select></label>
      <label>Contact person&apos;s name<input name="contactName" required minLength={2} maxLength={120} autoComplete="name"/></label>
      <label>Official email<input name="officialEmail" type="email" required maxLength={254} autoComplete="email"/></label>
      <label>Designation or department<input name="designation" required minLength={2} maxLength={120}/></label>
      <label>Phone number<input name="phone" type="tel" required minLength={7} maxLength={40} autoComplete="tel"/></label>
      <label>Institution location<input name="location" required minLength={2} maxLength={180} autoComplete="address-level2"/></label>
      <label>Approximate student count <span className="muted-label">optional</span><input name="approximateStudents" type="number" min="1" max="100000" inputMode="numeric"/></label>
    </div>
    <fieldset className="interest-options"><legend>Areas of interest</legend><div className="interest-grid">{interests.map((interest)=><label key={interest}><input type="checkbox" name="areasOfInterest" value={interest}/><span>{interest}</span></label>)}</div></fieldset>
    <label>Preferred dates or semester <span className="muted-label">optional</span><input name="preferredDates" maxLength={180} placeholder="For example, next semester"/></label>
    <label>Message and requirements<textarea name="message" required minLength={10} maxLength={8000} rows={5}/></label>
    <label className="consent-field"><input type="checkbox" name="consent" required/><span>I agree that ELARIN TECH may contact me about this institutional enquiry.</span></label>
    <div className="form-footer"><button className="button" disabled={state === "sending"}>{state === "sending" ? "Sending…" : submitLabel}</button><span className="form-status" role="status" aria-live="polite">{state === "sent" ? "Thank you. Your institutional enquiry has been received." : error || "We’ll use these details only to respond to your collaboration enquiry."}</span></div>
  </form>;

  return <form className="form-stack" onSubmit={submit}><div className="form-grid"><label>Your name<input name="name" required minLength={2} maxLength={120} autoComplete="name"/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Organization <span className="muted-label">optional</span><input name="organization" maxLength={180} autoComplete="organization"/></label><label>Phone <span className="muted-label">optional</span><input name="phone" type="tel" maxLength={40} autoComplete="tel"/></label></div><label>What would you like to discuss?<textarea name="message" required minLength={10} maxLength={8000} rows={5}/></label><div className="form-footer"><button className="button" disabled={state === "sending"}>{state === "sending" ? "Sending…" : submitLabel}</button><span className="form-status" role="status" aria-live="polite">{state === "sent" ? "Thanks — your enquiry has been received." : error || "We’ll only use these details to respond to your enquiry."}</span></div></form>;
}
