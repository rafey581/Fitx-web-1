import Link from "next/link";

import type { FilmContent } from "@/components/experience/content";
import { approach, timings, tracking } from "@/lib/fitx/knowledge";

import { HeroCanvas } from "./hero-canvas";

/** tel: link for a local Pakistani number (0322-… → +92322…). */
const telHref = (n: string) => `tel:${n.replace(/\D/g, "").replace(/^0/, "+92")}`;
const pad = (n: number) => String(n).padStart(2, "0");

const DISCIPLINES = ["Strength", "Boxing", "Yoga", "Group training", "Nutrition", "Mobility", "Conditioning"];

function SectionHead({
  tag,
  title,
  accent,
  intro,
  dark = false,
}: {
  tag: string;
  title: string;
  accent?: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,24rem)] md:items-end" data-reveal>
      <div>
        <p className="tag">{tag}</p>
        <h2 className="display mt-5 type-title">
          {title} {accent ? <span className="text-accent">{accent}</span> : null}
        </h2>
      </div>
      {intro ? <p className={`text-base leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{intro}</p> : null}
    </div>
  );
}

/**
 * The home page: a 3D hero followed by readable, photo-led sections.
 * All copy and lists come from the CMS via `getFilmContent` (with the
 * studio's launch copy as fallback).
 */
export function HomeView({ content }: { content: FilmContent }) {
  const services = content.services.slice(0, 5);
  const coaches = content.coaches.slice(0, 4);
  const plans = content.plans.slice(0, 3);
  const whatsapp = content.whatsapp.replace(/\D/g, "").replace(/^0(?=3)/, "92");
  const gallery = content.gallery;

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="home-hero" aria-label="FITX">
        <p className="home-hero-word" aria-hidden="true">
          FITX
        </p>
        <HeroCanvas />

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[inherit] max-w-[1360px] flex-col justify-end px-5 pt-[50svh] pb-10 sm:px-8 md:justify-center md:pt-32 md:pb-24">
          <div className="pointer-events-auto max-w-2xl">
            <p className="tag bg-white/70 backdrop-blur">Personal training studio · Sahiwal</p>
            <h1 className="display mt-6 text-[clamp(3.6rem,9.5vw,9.5rem)] leading-[0.84]">
              <span className="sr-only">FITX – personal training gym in Sahiwal: </span>
              Train with
              <br />
              <span className="text-accent">intent.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              One-to-one and small-group coaching, programmed around your body, your schedule and your goals — and
              tracked every step of the way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="film-btn film-btn-hot">
                Book a consultation
              </Link>
              {whatsapp ? (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="film-btn bg-white/60 backdrop-blur">
                  WhatsApp us
                </a>
              ) : null}
            </div>
          </div>

          <dl className="pointer-events-auto mt-12 grid max-w-xl grid-cols-3 gap-3 md:mt-16">
            {[
              ["500+", "Clients trained"],
              ["10", "Years coaching"],
              ["05", "Disciplines"],
            ].map(([n, label]) => (
              <div key={label} className="rounded-2xl border border-black/10 bg-white/70 p-4 backdrop-blur">
                <dd className="display text-4xl md:text-5xl">{n}</dd>
                <dt className="label mt-1 text-[10px] text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Disciplines marquee ──────────────────────────────────────── */}
      <div className="relative z-10 -mx-4 -mt-6 -rotate-1 bg-accent py-4 text-white" aria-hidden="true">
        <div className="marquee">
          {[0, 1].map((k) => (
            <div key={k} className="marquee-track">
              {DISCIPLINES.map((d) => (
                <span key={d} className="display flex items-center gap-10 text-4xl md:text-5xl">
                  {d}
                  <svg width="22" height="22" viewBox="0 0 22 22">
                    <path d="M11 0l2.6 8.4L22 11l-8.4 2.6L11 22l-2.6-8.4L0 11l8.4-2.6z" fill="currentColor" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Programs ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-32" aria-label="Programs">
        <SectionHead
          tag="What we do"
          title="Programs built"
          accent="around you"
          intro="Every session is coached and every program is tracked, so progress is never left to chance."
        />
        <div className="mt-12 grid auto-rows-[300px] gap-4 md:grid-cols-6 md:auto-rows-[340px]">
          {services.map((s, k) => (
            <Link
              key={s.title}
              href={s.href}
              data-reveal
              className={`program-card group ${
                k === 0 ? "md:col-span-3 md:row-span-2" : k < 3 ? "md:col-span-3" : "md:col-span-3 lg:col-span-3"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between">
                  <span className="label rounded-full bg-white/15 px-3 py-1.5 text-[10px] backdrop-blur">
                    {pad(k + 1)} / {pad(services.length)}
                  </span>
                  <span className="program-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
                <div>
                  <h3 className={`display ${k === 0 ? "text-5xl md:text-7xl" : "text-4xl md:text-5xl"}`}>{s.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">{s.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Approach ─────────────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1360px] gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-2 lg:items-center" aria-label="How we coach">
        <div className="relative grid grid-cols-2 gap-4" data-reveal>
          {[gallery[1], gallery[4], gallery[6], gallery[0]].filter(Boolean).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src + i}
              src={src}
              alt="Coaching on the FITX studio floor"
              loading="lazy"
              className={`aspect-[4/5] w-full rounded-[20px] object-cover ${i % 2 ? "translate-y-10" : ""}`}
            />
          ))}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-white shadow-xl">
            <span className="label text-[11px]">
              <span className="text-accent">●</span> Coached on every rep
            </span>
          </div>
        </div>
        <div>
          <SectionHead tag="How we coach" title="A plan that" accent="adapts" />
          <ol className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {approach.map((step, i) => (
              <li key={step} className="flex gap-6 py-5" data-reveal>
                <span className="display text-3xl text-accent">{pad(i + 1)}</span>
                <p className="pt-1 text-lg leading-snug">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Progress tracking ────────────────────────────────────────── */}
      <section className="on-dark mx-2.5 overflow-hidden rounded-[28px] bg-ink" aria-label="Progress tracking">
        <div className="mx-auto grid max-w-[1360px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHead tag="Progress" title="Measured," accent="not guessed." dark />
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              Phone-based body-composition tracking with progress graphs. We review your trends weekly or about every
              10 days and adjust your plan.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {tracking.metrics.slice(0, 10).map((m) => (
                <li key={m} className="metric-pill">
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-white/45">{tracking.disclaimer}</p>
            <Link href="/transformations" className="film-link mt-8">
              See real transformations
            </Link>
          </div>

          {/* Illustrative progress card */}
          <div className="relative" data-reveal aria-hidden="true">
            <div className="absolute -inset-10 rounded-full bg-accent/25 blur-3xl" />
            <div className="relative rotate-2 rounded-[28px] border border-white/10 bg-[#1c1b21] p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="label text-[11px] text-white/60">Body fat % · 12 weeks</p>
                <p className="flex gap-1 text-[11px]">
                  {tracking.views.map((v, i) => (
                    <span key={v} className={`rounded-full px-2.5 py-1 ${i === 1 ? "bg-accent text-white" : "text-white/50"}`}>
                      {v}
                    </span>
                  ))}
                </p>
              </div>
              <p className="display mt-6 text-6xl">
                −6.4<span className="text-2xl text-white/50">%</span>
              </p>
              <div className="mt-6 flex h-40 items-end gap-2">
                {[92, 88, 85, 86, 80, 76, 74, 70, 67, 64, 60, 56].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-md ${i === 11 ? "bg-accent" : "bg-white/15"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-sm">
                {[
                  ["Muscle", "+2.1 kg"],
                  ["Weight", "−5.8 kg"],
                  ["Body age", "−4 yrs"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-white/50">{k}</p>
                    <p className="mt-1 font-semibold">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coaches ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1360px] px-5 py-24 sm:px-8 md:py-32" aria-label="Coaches">
        <SectionHead
          tag="Your coaches"
          title="People who"
          accent="show up"
          intro="Certified coaches who know your name, your goal and your last session."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coaches.map((c, k) => (
            <Link key={c.name + k} href={c.href} className="group block" data-reveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="program-arrow absolute right-4 bottom-4" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="label mt-4 text-[11px] text-accent">{c.role}</p>
              <h3 className="display mt-1 text-3xl">{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Inside FITX ──────────────────────────────────────────────── */}
      <section className="pb-24 md:pb-32" aria-label="Inside FITX">
        <div className="mx-auto max-w-[1360px] px-5 sm:px-8">
          <SectionHead tag="The studio" title="Inside" accent="FITX" intro="The studio, the sessions and the community — straight from the floor." />
        </div>
        <div className="mt-12 space-y-4">
          {[gallery.slice(0, 9), gallery.slice(9)].map((row, r) => (
            <div key={r} className={`marquee ${r ? "is-reverse" : ""}`}>
              {[0, 1].map((k) => (
                <div key={k} className="marquee-track !gap-4 !pr-4" style={{ animationDuration: "60s" }}>
                  {row.map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src + i}
                      src={src}
                      alt={k === 0 ? "Inside the FITX studio" : ""}
                      aria-hidden={k === 0 ? undefined : true}
                      loading="lazy"
                      className="h-56 w-80 shrink-0 rounded-[20px] object-cover md:h-72 md:w-[26rem]"
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/gallery" className="film-btn">
            Open the gallery
          </Link>
        </div>
      </section>

      {/* ── Fees ─────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1360px] px-5 pb-24 sm:px-8 md:pb-32" aria-label="Fees">
        <SectionHead
          tag="Fees"
          title="Two ways"
          accent="to train"
          intro="Simple monthly fees. Pay for three months together and save 10%."
        />
        <div className={`mt-12 grid gap-4 ${plans.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {plans.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              data-reveal
              className={`film-glass group flex flex-col p-8 md:p-10 ${p.highlighted ? "film-glass-hot" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="label text-xs">{p.name}</p>
                {p.highlighted ? (
                  <span className="label rounded-full bg-accent px-3 py-1 text-[10px] text-white">Most personal</span>
                ) : null}
              </div>
              <p className="display mt-8 text-6xl md:text-7xl">{p.price}</p>
              <p className={`mt-1 text-sm ${p.highlighted ? "text-white/60" : "text-muted"}`}>{p.period}</p>
              <ul className={`mt-8 flex-1 space-y-3 border-t pt-6 ${p.highlighted ? "border-white/15" : "border-black/10"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="film-link mt-8">Enquire now</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Timings & visit ──────────────────────────────────────────── */}
      <section className="mx-auto grid max-w-[1360px] gap-4 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[1.2fr_1fr]" aria-label="Timings">
        <div className="card p-8 md:p-10" data-reveal>
          <p className="tag">Session timings</p>
          <h2 className="display mt-5 type-heading">Sat – Thu · Friday closed</h2>
          <ul className="mt-8 divide-y divide-black/10">
            {timings.map((t) => (
              <li key={t.label + t.start} className="flex items-center justify-between gap-4 py-4">
                <span className="flex items-center gap-3 font-semibold">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      t.group === "Female" ? "bg-[#e0508f]" : t.group === "Family" ? "bg-accent" : "bg-ink"
                    }`}
                  />
                  {t.label}
                </span>
                <span className="text-right tabular-nums text-muted">
                  {t.start} – {t.end}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="on-dark relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-ink p-8 md:p-10" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={gallery[0]} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="relative">
            <p className="tag">Visit the studio</p>
            <p className="display mt-5 text-4xl md:text-5xl">{content.address}</p>
          </div>
          <div className="relative mt-10 flex flex-wrap gap-3">
            {content.phones.slice(0, 2).map((n) => (
              <a key={n} href={telHref(n)} className="film-btn">
                Call {n}
              </a>
            ))}
            <Link href="/contact" className="film-btn film-btn-hot">
              Directions & contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
