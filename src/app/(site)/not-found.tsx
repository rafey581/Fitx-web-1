import Link from "next/link";

/** Branded 404 for public pages (unknown CMS slugs, services, coaches, posts). */
export default function NotFound() {
  return (
    <main>
      <section className="page-hero flex min-h-[70svh] items-end pt-36 pb-14">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-10">
          <p className="tag">Error 404</p>
          <h1 className="display mt-6 text-[clamp(5rem,16vw,13rem)] leading-[0.82]">
            Off the <span className="text-accent">plan.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            This page doesn&rsquo;t exist or has moved. Let&rsquo;s get you back to training.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="film-btn film-btn-hot">
              Back to home
            </Link>
            <Link href="/services" className="film-btn">
              See programs
            </Link>
            <Link href="/contact" className="film-btn">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
