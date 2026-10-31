import { AIChatbot } from "@/components/chatbot/ai-chatbot";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollFx } from "@/components/v2/scroll-fx";
import { SiteHeader } from "@/components/v2/site-header";
import { studio } from "@/lib/fitx/knowledge";
import { env } from "@/lib/env";
import { gymJsonLd, jsonLd } from "@/lib/fitx/seo";
import { getHeaderLinks } from "@/lib/site/nav";
import { getSiteSettings } from "@/lib/site/settings";

/** Split a settings phone field ("0322-… / 0300-…") into individual numbers. */
const splitPhones = (value: string) => value.split(/[/·,|]/).map((n) => n.trim()).filter(Boolean);

/**
 * Inner pages: floating header, dark page hero, light content and the dark
 * footer. The root layout owns <html>/<body>, theme CSS and SEO defaults.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const general = settings.general;
  const links = await getHeaderLinks();

  // The studio as a local business, on every page (Google's map and knowledge panel).
  const structuredData = gymJsonLd(env.APP_URL, general);

  return (
    <div className="site w-full">
      <SiteHeader
        links={links}
        businessName={general.businessName}
        address={general.address || studio.address}
        phones={general.phone ? splitPhones(general.phone) : studio.phones}
        email={general.email}
      />
      <ScrollFx />

      <div id="main-content" className="relative">
        {children}
        <SiteFooter />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <WhatsAppButton number={general.whatsapp || studio.whatsapp} />
      <AIChatbot />
    </div>
  );
}
