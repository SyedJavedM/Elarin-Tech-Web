export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="44" height="44" rx="14" fill="#234832" />
      <path d="M8 29c5.7 0 10.8 1.5 16 4.5 5.2-3 10.3-4.5 16-4.5v8c-6.2 0-11.5 1.5-16 4.5-4.5-3-9.8-4.5-16-4.5v-8Z" fill="none" stroke="#b5ed65" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m17 11-7 6 7 6m14-12 7 6-7 6M24 28V13m-4 4 4-4 4 4" fill="none" stroke="#b5ed65" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="10" r="2" fill="#b5ed65" />
    </svg>
  );
}
