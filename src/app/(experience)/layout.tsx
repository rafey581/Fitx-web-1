import { AIChatbot } from "@/components/chatbot/ai-chatbot";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollFx } from "@/components/v2/scroll-fx";
import { SiteHeader } from "@/components/v2/site-header";
import { studio } from "@/lib/fitx/knowledge";
import { env } from "@/lib/env";
import { gymJsonLd, jsonLd, websiteJsonLd } from "@/lib/fitx/seo";
import { getHeaderLinks } from "@/lib/site/nav";
import { getSiteSettings } from "@/lib/site/settings";

const splitPhones = (value: string) => value.split(/[/·,|]/).map((n) => n.trim()).filter(Boolean);

/** Shell for the home page: same header and footer as inner pages, with the 3D hero. */
export default async function ExperienceLayout({ children }: { children: React.ReactNode }) {
  const { general } = await getSiteSettings();
  const links = await getHeaderLinks();
  return (
    <div className="site w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd([gymJsonLd(env.APP_URL, general), websiteJsonLd(env.APP_URL)]) }}
      />
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
      <WhatsAppButton number={general.whatsapp || studio.whatsapp} />
      <AIChatbot />
    </div>
  );
}
