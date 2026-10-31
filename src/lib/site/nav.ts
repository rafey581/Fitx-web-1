import "server-only";

import { MenuLocation } from "@/generated/prisma/enums";
import { getMenuLinks } from "@/lib/site/settings";

export type NavLink = { label: string; href: string; children: { label: string; href: string }[] };

/** Header links from the CMS menu, plus code-defined pages the menu doesn't know about. */
export async function getHeaderLinks(): Promise<NavLink[]> {
  const header = await getMenuLinks(MenuLocation.HEADER);
  const links: NavLink[] = header.map((l) => ({
    label: l.label,
    href: l.href,
    children: l.children.map((c) => ({ label: c.label, href: c.href })),
  }));
  for (const extra of [
    { label: "Transformations", href: "/transformations" },
    { label: "Blog", href: "/blog" },
  ]) {
    if (!links.some((l) => l.href === extra.href)) links.push({ ...extra, children: [] });
  }
  return links;
}
