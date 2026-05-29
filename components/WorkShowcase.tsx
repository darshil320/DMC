"use client";

import React from "react";
import Image from "next/image";
import { AnimatedReveal } from "./ui/AnimatedReveal";
import { SectionLabel } from "./ui/SectionLabel";
import { LinkArrow } from "./ui/LinkArrow";
import { work } from "@/lib/content";

export function WorkShowcase() {
  return (
    <section
      id="work"
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1440px] mx-auto select-none"
    >
      <AnimatedReveal>
        <SectionLabel>Our Work</SectionLabel>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight tracking-tight max-w-[620px] mb-16 md:mb-24 mt-4">
          Selected work for brands that needed more than a pretty homepage.
        </h2>
      </AnimatedReveal>

      {/* Case studies list */}
      <div className="space-y-24 md:space-y-36">
        {work.map((project, idx) => {
          const isAlternating = idx % 2 === 1;

          return (
            <AnimatedReveal key={project.id}>
              <div
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >
                {/* Image Showcase Column (7 cols) */}
                <div
                  className={`lg:col-span-7 relative overflow-hidden rounded-2xl md:rounded-3xl border border-border-subtle aspect-[4/3] cursor-pointer group ${
                    isAlternating ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-w-768px) 100vw, 800px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Project Details Column (5 cols) */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isAlternating ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"
                  }`}
                >
                  {/* Metadata Row */}
                  <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6 text-xs uppercase font-bold tracking-widest text-text-muted">
                    <span>{project.industry}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-4 leading-tight">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <LinkArrow href="#contact" className="font-extrabold mt-2">
                    View Case Study
                  </LinkArrow>
                </div>
              </div>
            </AnimatedReveal>
          );
        })}
      </div>
    </section>
  );
}
export default WorkShowcase;
