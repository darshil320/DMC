"use client";

import { Suspense } from "react";
import { useRouteAnalytics } from "@/hooks/useRouteAnalytics";

function RouteAnalyticsInner() {
  useRouteAnalytics();
  return null;
}

export function RouteAnalytics() {
  return (
    <Suspense fallback={null}>
      <RouteAnalyticsInner />
    </Suspense>
  );
}
