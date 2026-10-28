"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
export function EventRegistrationForm({ slug, kind }: { slug: string; kind: "workshop" | "webinar" }) {
  const [state, setState] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setState("");
    const form = event.currentTarget;
    try {
      const response = await fetch(`/api/programs/${encodeURIComponent(slug)}/register`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Registration could not be completed.");
      form.reset(); setState("Your registration has been received.");
    } catch (error) { setState(error instanceof Error ? error.message : "Registration could not be completed."); }
    finally { setBusy(false); }
  }
  return <form className="form-stack" onSubmit={submit}><h3>Register for this {kind}</h3><label>Full name<input name="fullName" required minLength={2} maxLength={120} autoComplete="name"/></label><label>Email<input name="email" type="email" required autoComplete="email"/></label><label>Phone <span className="muted-label">optional</span><input name="phone" type="tel" maxLength={40} autoComplete="tel"/></label><button className="button" disabled={busy}>{busy?"Registering…":"Register"}</button><p className="form-status" role="status" aria-live="polite">{state||"Registrations are stored against this published program."}</p></form>;
}
export function EnrollmentAction({ slug, pricePaise }: { slug: string; pricePaise: number }) {
  const [state, setState] = useState(""); const [busy, setBusy] = useState(false);
  async function enroll() { setBusy(true); setState(""); try { const response = await fetch(`/api/programs/${encodeURIComponent(slug)}/enroll`, { method: "POST" }); const result = await response.json().catch(() => ({})); if (response.status === 401) { setState("Sign in to enroll in this program."); return; } if (!response.ok) throw new Error(result.error || "Enrollment could not be completed."); setState("You are enrolled. Find this program in your learner dashboard."); } catch (error) { setState(error instanceof Error ? error.message : "Enrollment could not be completed."); } finally { setBusy(false); } }
  if (pricePaise > 0) return <div><Link className="button" href="/contact">Ask about enrollment</Link><p className="form-status">Secure checkout is not configured yet.</p></div>;
  return <div><button className="button" onClick={()=>void enroll()} disabled={busy}>{busy?"Enrolling…":"Enroll in this program"}</button>{state?<p className="form-status" role="status" aria-live="polite">{state}{state.startsWith("Sign in")?< > <Link href="/login">Sign in</Link>.</>:null}</p>:null}</div>;
}
