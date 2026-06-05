"use client";

import { useReportWebVitals } from "next/web-vitals";
import { pushGtmEvent } from "@/lib/analytics";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    pushGtmEvent({
      event: "web_vitals",
      name: metric.name,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      rating: metric.rating,
      delta: Math.round(metric.delta),
      id: metric.id,
    });
  });

  return null;
}
