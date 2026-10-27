export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="44" height="44" rx="14" fill="#b5ed65" />
      <path d="M9 19c5.3 0 10.5 1.6 15 4.6 4.5-3 9.7-4.6 15-4.6v12c-6.2 0-11.1 1.8-15 4.8-3.9-3-8.8-4.8-15-4.8V19Z" fill="none" stroke="#234832" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M24 22V10m-4.5 4.5L24 10l4.5 4.5" fill="none" stroke="#234832" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 25c2.6.2 4.7.8 6.5 1.8m13.5-1.8c-2.6.2-4.7.8-6.5 1.8" fill="none" stroke="#234832" strokeWidth="1.7" strokeLinecap="round" opacity=".72" />
    </svg>
  );
}
