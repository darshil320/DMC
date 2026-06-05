import Link from "next/link";

const SERIF = "Georgia, 'Times New Roman', serif";
const WHATSAPP_DEMO_LINK =
  "https://wa.me/919426529230?text=Hi%20DMC%20Digital%2C%20I%20saw%20the%20AI%20Room%20Visualizer%20demo%20and%20I%27m%20interested%20in%20getting%20this%20for%20my%20furniture%20store.%20Can%20we%20talk%3F";

const PROOF_ITEMS = [
  {
    stat: "3x",
    label: "More likely to purchase",
    detail:
      "Shoppers who visualize furniture in their own space convert at 3x the rate of those who do not.",
    source: "Shopify AR Commerce Report",
  },
  {
    stat: "35%",
    label: "Fewer product returns",
    detail:
      "AI visualization sets accurate expectations so customers receive exactly what they pictured.",
    source: "IKEA Place AR Study",
  },
  {
    stat: "11x",
    label: "More time on product page",
    detail:
      "When customers can see a piece in their room, they spend dramatically longer evaluating it.",
    source: "Houzz 2023 Data",
  },
];

const FEATURE_ITEMS = [
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
      />
    ),
    title: "AI Room Placement",
    body:
      "FLUX Kontext Pro places each product with accurate perspective, scale, and lighting, so it reads like a real photograph.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-3 3.75h3"
      />
    ),
    title: "Mobile-First, No App",
    body:
      "Works instantly from any phone browser. Your customer taps, uploads their room, and sees your sofa in their living room.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    ),
    title: "WhatsApp Enquiry Loop",
    body:
      "Every visualization ends with a pre-filled WhatsApp message that includes the product and your store number.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    ),
    title: "Your Full Product Catalogue",
    body:
      "We add every product from your store: sofas, beds, wardrobes, dining sets, kitchen pieces, and more.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    ),
    title: "Conversion-Optimised Design",
    body:
      "The website is designed to sell. Every element, from hero to CTA, reduces hesitation and moves customers toward enquiry.",
  },
  {
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5A2.25 2.25 0 0 0 19.5 19.5v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    ),
    title: "Secure, Scalable, Fast",
    body:
      "Hosted on Vercel, images served from Cloudinary CDN, and built for fast mobile browsing from day one.",
  },
];

const TECH_STACK = [
  "FLUX Kontext Pro AI",
  "Cloudinary CDN",
  "Vercel Edge Network",
  "Next.js 16",
  "WhatsApp Business API",
];

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function VisualizerHeader() {
  return (
    <header className="px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between border-b border-[#2C2A26]/10">
      <Link
        href="/demo/furniture-concept-2.0"
        className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#2C2A26]/40 hover:text-[#2C2A26] transition-colors duration-200"
      >
        &larr; Furniture Concept 2.0
      </Link>
      <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#2C2A26]">
        AI Room Visualizer
      </span>
      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#2C2A26]/30 hidden sm:block">
        by DMC Tech
      </span>
    </header>
  );
}

export function VisualizerIntro() {
  return (
    <>
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-16 border-b border-[#2C2A26]/10">
        <div>
          <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#2C2A26]/40 mb-7">
            Powered by AI &middot; Demo by DMC Tech
          </p>
          <h1
            className="text-[clamp(2.2rem,6.5vw,5rem)] font-normal leading-[1.05] text-[#2C2A26] mb-6 max-w-3xl"
            style={{ fontFamily: SERIF }}
          >
            See it in your home.
            <br />
            <span className="text-[#2C2A26]/35">Before you buy.</span>
          </h1>
          <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#2C2A26]/55 max-w-lg">
            Upload a photo of your room. Pick a piece of furniture. See it placed in your space instantly.
          </p>
        </div>
      </section>

      <section className="border-b border-[#2C2A26]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2C2A26]/10">
            {PROOF_ITEMS.map((item) => (
              <div key={item.stat} className="py-10 md:py-14 px-0 md:px-10 first:pl-0 last:pr-0">
                <p
                  className="text-[44px] md:text-[52px] font-normal text-[#2C2A26] leading-none mb-2"
                  style={{ fontFamily: SERIF }}
                >
                  {item.stat}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#2C2A26] mb-3">
                  {item.label}
                </p>
                <p className="text-[13px] leading-[1.7] text-[#2C2A26]/50 mb-3 max-w-xs">
                  {item.detail}
                </p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#2C2A26]/25 font-medium">
                  {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function VisualizerMarketing() {
  return (
    <>
      <section className="bg-[#1C1A17] text-[#F4F1ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-16 border-b border-[#F4F1ED]/8">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A84C] mb-6 font-medium">
                For furniture store owners
              </p>
              <h2
                className="text-[clamp(2rem,5.5vw,4rem)] font-normal leading-[1.08] text-[#F4F1ED] mb-6"
                style={{ fontFamily: SERIF }}
              >
                Your customers deserve
                <br />
                <span className="text-[#F4F1ED]/40">this experience.</span>
              </h2>
              <p className="text-[15px] leading-[1.85] text-[#F4F1ED]/50 max-w-lg">
                DMC Tech builds AI-powered websites for furniture stores across Surat and Gujarat.
                This visualizer, product catalogue, WhatsApp integration, and premium brand experience can be live on your domain in weeks.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href={WHATSAPP_DEMO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#C9A84C] text-[#1C1A17] text-[10px] font-bold tracking-[0.22em] uppercase px-8 py-4 hover:bg-[#d4af5a] transition-colors duration-200"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                Get this for my store
              </a>
              <Link
                href="/demo/furniture-concept-2.0"
                className="inline-flex items-center justify-center gap-2 border border-[#F4F1ED]/15 text-[#F4F1ED]/60 text-[10px] font-medium tracking-[0.18em] uppercase px-8 py-4 hover:border-[#F4F1ED]/35 hover:text-[#F4F1ED]/90 transition-colors duration-200"
              >
                See full website demo
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#F4F1ED]/30 mb-12 font-medium">
            What&apos;s built into your website
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#F4F1ED]/6">
            {FEATURE_ITEMS.map((feat) => (
              <div key={feat.title} className="bg-[#1C1A17] p-8 md:p-10 group hover:bg-[#242220] transition-colors duration-200">
                <div className="w-9 h-9 border border-[#F4F1ED]/12 flex items-center justify-center mb-6 text-[#C9A84C] group-hover:border-[#C9A84C]/30 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {feat.icon}
                  </svg>
                </div>
                <p
                  className="text-[15px] font-normal text-[#F4F1ED]/90 mb-3 leading-snug"
                  style={{ fontFamily: SERIF }}
                >
                  {feat.title}
                </p>
                <p className="text-[12px] leading-[1.75] text-[#F4F1ED]/38">
                  {feat.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-[#F4F1ED]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#F4F1ED]/25 font-medium">
              Built with
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="text-[10px] tracking-[0.18em] uppercase text-[#F4F1ED]/30 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#F4F1ED]/8">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[18px] md:text-[22px] font-normal text-[#F4F1ED]/80 mb-1" style={{ fontFamily: SERIF }}>
                Ready to offer this to your customers?
              </p>
              <p className="text-[12px] text-[#F4F1ED]/35 tracking-wide">
                We build, host, and maintain it. You just sell furniture.
              </p>
            </div>
            <a
              href={WHATSAPP_DEMO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2.5 bg-[#C9A84C] text-[#1C1A17] text-[10px] font-bold tracking-[0.22em] uppercase px-8 py-4 hover:bg-[#d4af5a] transition-colors duration-200"
            >
              <WhatsAppIcon />
              Talk to DMC Tech &rarr;
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#1C1A17] text-[#F4F1ED]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-[#F4F1ED]/8">
          <p
            className="text-[20px] md:text-[26px] font-normal italic text-[#F4F1ED]/70 max-w-sm leading-relaxed"
            style={{ fontFamily: SERIF }}
          >
            &quot;See every piece in your space before it arrives.&quot;
          </p>
          <div className="text-right">
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#F4F1ED]/30 mb-2">A demo by</p>
            <a
              href="https://www.dmctech.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium tracking-[0.18em] uppercase text-[#F4F1ED] hover:text-[#C9A84C] transition-colors duration-200"
            >
              DMC Tech
            </a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-[#F4F1ED]/20 tracking-widest uppercase">
            &copy; 2026 DMC Tech &mdash; AI Room Visualizer
          </span>
          <Link
            href="/demo/furniture-concept-2.0"
            className="text-[10px] text-[#F4F1ED]/25 tracking-[0.18em] uppercase hover:text-[#F4F1ED]/50 transition-colors duration-200"
          >
            &larr; Back to Furniture Concept 2.0
          </Link>
        </div>
      </footer>
    </>
  );
}
