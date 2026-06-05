"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics";

export function useRouteAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the very first render — GTM fires its own initial page_view
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    analytics.pageView(pathname, searchParams.toString());
  }, [pathname, searchParams]);
}
