"use client";
import { useState } from "react";
export function CopyReferenceCode({ value }: { value: string | null }) {
  const [copied, setCopied] = useState(false);
  if (!value) return <span className="reference-code">Not assigned</span>;
  const code = value;
  async function copy() {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1500); }
    catch { setCopied(false); }
  }
  return <span className="reference-code"><code>{code}</code><button type="button" onClick={() => void copy()} aria-label={`Copy ${code}`}>{copied ? "Copied" : "Copy"}</button></span>;
}