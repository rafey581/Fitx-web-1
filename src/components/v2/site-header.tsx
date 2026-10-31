"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "@/lib/site/nav";

/** tel: link for a local Pakistani number (0322-… → +92322…). */
const telHref = (n: string) => `tel:${n.replace(/\D/g, "").replace(/^0/, "+92")}`;

/**
 * Floating pill header shared by every public page: logo, inline navigation
 * with dropdowns on desktop, a full-screen menu on phones. It tucks away while
 * scrolling down and returns on scroll up.
 */
export function SiteHeader({
  links,
  businessName,
  address,
  phones,
  email,
}: {
  links: NavLink[];
  businessName: string;
  address: string;
  phones: string[];
  email: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Desktop shows a short list; everything stays in the full menu.
  const primary = links.slice(0, 6);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu when the route changes
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.documentElement.classList.add("lenis-stopped");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <header className={`site-header ${hidden && !open ? "is-hidden" : ""}`} inert={open}>
        <div className="site-header-bar">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${businessName} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/fitx/3d/logo-horizontal-dark.png"
              alt="FITX"
              width={417}
              height={160}
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {primary.map((l) => (
              <div key={l.href + l.label} className="group/nav relative">
                <Link
                  href={l.href}
                  className="site-nav-link"
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                >
                  {l.label}
                  {l.children.length > 0 ? (
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" className="opacity-50">
                      <path d="M2 4l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  ) : null}
                </Link>
                {l.children.length > 0 ? (
                  <div className="site-dropdown">
                    {l.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium transition hover:bg-black/5 hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="film-btn film-btn-hot hidden min-h-[44px] sm:inline-flex">
              Book a session
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:bg-accent"
            >
              <span className="sr-only">Open menu</span>
              <svg aria-hidden="true" width="18" height="12" viewBox="0 0 18 12">
                <path d="M0 1h18M0 6h18M6 11h12" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className={`site-drawer ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" hidden={!open}>
        <div className="flex items-center justify-between px-5 py-5 sm:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/fitx/3d/logo-horizontal.png" alt="FITX" width={417} height={160} className="h-9 w-auto" />
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition hover:bg-accent hover:text-white"
          >
            <span className="sr-only">Close menu</span>
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
        <div className="grid flex-1 gap-10 overflow-y-auto px-5 pt-4 pb-10 sm:px-10 md:grid-cols-[1fr_20rem]">
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className={`site-drawer-link ${isCurrent(l.href) ? "text-accent" : ""}`}>
                  {l.label}
                </Link>
                {l.children.length > 0 ? (
                  <ul className="mt-2 mb-4 flex flex-wrap gap-2">
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="inline-block rounded-full border border-white/15 px-4 py-2 text-sm transition hover:border-accent hover:text-accent"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="space-y-6 text-[15px] text-white/80 md:border-l md:border-white/10 md:pl-8">
            <div>
              <p className="footer-label">Visit</p>
              <p className="mt-2">{address}</p>
            </div>
            <div>
              <p className="footer-label">Call</p>
              <p className="mt-2 flex flex-col gap-1">
                {phones.map((n) => (
                  <a key={n} href={telHref(n)} className="footer-link w-fit">
                    {n}
                  </a>
                ))}
              </p>
            </div>
            <div>
              <p className="footer-label">Email</p>
              <a href={`mailto:${email}`} className="footer-link mt-2">
                {email}
              </a>
            </div>
            <Link href="/contact" className="film-btn film-btn-hot w-full">
              Book a session
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
