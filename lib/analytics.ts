type GtmEventName =
  | "page_view"
  | "contact_form_submit"
  | "whatsapp_click"
  | "pricing_tier_view"
  | "demo_click"
  | "ai_visualizer_generate"
  | "checkout_initiated"
  | "nav_link_click"
  | "web_vitals";

interface GtmEvent {
  event: GtmEventName;
  [key: string]: unknown;
}

export function pushGtmEvent(payload: GtmEvent): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export const analytics = {
  pageView: (pagePath: string, pageSearch?: string) =>
    pushGtmEvent({ event: "page_view", page_path: pagePath, page_search: pageSearch ?? "" }),

  contactFormSubmit: () =>
    pushGtmEvent({ event: "contact_form_submit", method: "email" }),

  whatsappClick: () =>
    pushGtmEvent({ event: "whatsapp_click", method: "whatsapp" }),

  pricingTierView: (tier: string) =>
    pushGtmEvent({ event: "pricing_tier_view", tier }),

  demoClick: (demo: string) =>
    pushGtmEvent({ event: "demo_click", demo }),

  aiVisualizerGenerate: (success: boolean) =>
    pushGtmEvent({ event: "ai_visualizer_generate", success }),

  checkoutInitiated: (productName: string, price: number) =>
    pushGtmEvent({ event: "checkout_initiated", product_name: productName, price }),

  navLinkClick: (label: string) =>
    pushGtmEvent({ event: "nav_link_click", label }),
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
