"use client";
import { useState, type FormEvent } from "react";
type Option = { id: string; name: string; email: string };
export function CertificateIssueForm({ programs, users }: { programs: { id: string; title: string }[]; users: Option[] }) {
  const [message, setMessage] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage(""); const form = e.currentTarget; const fd = new FormData(form);
    const body = { userId: fd.get("userId"), programId: fd.get("programId"), completionCriteria: fd.get("completionCriteria"), completionConfirmed: fd.get("completionConfirmed") === "on" };
    try { const r = await fetch("/api/admin/certificates", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }); const d = await r.json(); if (!r.ok) throw new Error(d.error); setMessage(`Issued ${d.certificateId}. Verification URL: ${location.origin}${d.verifyUrl}`); form.reset(); }
    catch (error) { setMessage(error instanceof Error ? error.message : "Issuance failed."); } finally { setBusy(false); }
  }
  return <form className="form-panel form-stack" onSubmit={submit}><h2>Issue a certificate</h2><p>Issuance records an administrator attestation of completion. The learner, program, completion evidence and certificate are linked in the database and audit log.</p><label>Learner<select name="userId" required defaultValue=""><option value="" disabled>Select a learner</option>{users.map(u=><option key={u.id} value={u.id}>{u.name} · {u.email}</option>)}</select></label><label>Program<select name="programId" required defaultValue=""><option value="" disabled>Select a program</option>{programs.map(p=><option key={p.id} value={p.id}>{p.title}</option>)}</select></label><label>Completion criteria and evidence<textarea name="completionCriteria" required minLength={20} maxLength={2000} rows={4} placeholder="Record the criteria reviewed and the evidence checked." /></label><label className="consent-field"><input type="checkbox" name="completionConfirmed" required/> I confirm I reviewed the completion evidence and am authorised to issue this certificate.</label><button className="button" disabled={busy}>{busy ? "Issuing…" : "Issue certificate"}</button><p role="status" aria-live="polite">{message}</p></form>;
}