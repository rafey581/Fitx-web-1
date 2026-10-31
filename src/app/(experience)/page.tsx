import type { Metadata } from "next";

import { HomeView } from "@/components/v2/home-view";
import { seoMetadata } from "@/lib/fitx/seo";
import { getFilmContent } from "@/lib/site/film";

export const dynamic = "force-dynamic";

export const metadata: Metadata = seoMetadata("/");

/**
 * Home: 3D hero (floating training equipment) followed by programs, coaching
 * approach, progress tracking, coaches, studio photos, fees and timings.
 * Copy comes from the CMS via `getFilmContent`.
 */
export default async function HomePage() {
  const content = await getFilmContent();
  return <HomeView content={content} />;
}
