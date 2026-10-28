"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, Search } from "lucide-react";
import { brand } from "@/lib/brand";

const learn = [
  ["Internships", "/internships"],
  ["Workshops", "/workshops"],
  ["Webinars", "/webinars"],
  ["Bootcamps", "/bootcamps"],
  ["Courses", "/courses"],
  ["Certifications", "/certifications"],
];

const companyLinks = [
  ["Technologies", "/technologies"],
  ["Services", "/services"],
  ["Institutions", "/institutions"],
  ["Contact", "/contact"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-row">
        <Link href="/" className="brand-lockup" aria-label={`${brand.name}, home`}>
          <Image src="/elarin-tech-brand.png" alt="ELARIN TECH" width={480} height={320} priority className="brand-lockup-image" />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/about">About</Link>
          <details className="learn-menu">
            <summary>Learn <ChevronDown size={14} aria-hidden="true" /></summary>
            <nav className="learn-menu-panel" aria-label="Learning programs">
              {learn.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
          </details>
          {companyLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>

        <div className="header-actions">
          <Link className="search-action" href="/search" aria-label="Search"><Search size={18} /></Link>
          <Link className="text-link hide-small" href="/login">Sign in</Link>
          <Link className="button button-small project-action" href="/start-project" aria-label="Start a project">Start a project <ArrowUpRight size={15} /></Link>
          <details className="mobile-menu">
            <summary aria-label="Open navigation"><Menu size={21} /><span className="sr-only">Menu</span></summary>
            <nav className="mobile-menu-panel" aria-label="Mobile navigation">
              <Link href="/about">About</Link>
              <details className="mobile-learn-menu">
                <summary>Learn <ChevronDown size={15} aria-hidden="true" /></summary>
                <div className="mobile-learn-links">
                  {learn.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
                </div>
              </details>
              {companyLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
              <Link href="/verify-certificate">Verify certificate</Link>
              <Link href="/login">Sign in</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
