import Link from "next/link";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import type { Guide } from "@/lib/guides";

/**
 * Shared renderer for every guide.
 *
 * A server component on purpose: the whole value of these pages is that their
 * prose is in the initial HTML where a crawler or answer engine can read it
 * without executing anything. Only the enquiry form at the bottom is
 * interactive.
 */
export function GuidePageContent({ guide }: { guide: Guide }) {
  return (
    <main className="relative z-10 bg-bg-page">
      <article className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-32 md:px-12 lg:px-16">
        {/* Breadcrumb — visible, matching the BreadcrumbList schema */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/guides" className="hover:text-accent">
                Guides
              </Link>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="section-tag">GUIDE · {guide.readingTime} read</div>

            <h1 className="mb-8 max-w-[840px] text-3xl font-medium uppercase leading-[1.05] tracking-tighter text-text-primary md:text-5xl">
              {guide.title}
            </h1>

            {/* The answer. First prose in the DOM after the h1, deliberately
                dense, deliberately short — this is the paragraph that gets
                quoted back by an answer engine. */}
            <p className="mb-12 border-l-2 border-accent pl-5 text-lg font-medium leading-relaxed text-text-primary md:text-xl">
              {guide.answer}
            </p>

            {guide.sections.map((section) => (
              <section key={section.heading} className="mb-14">
                <h2 className="mb-5 text-2xl font-medium uppercase tracking-tighter text-text-primary md:text-3xl">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-4 leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-6 flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 leading-relaxed text-text-secondary">
                        <span aria-hidden className="mt-[10px] size-1.5 shrink-0 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {section.table && (
                  <figure className="mt-8">
                    <div className="overflow-x-auto border border-border-harsh">
                      <table className="w-full min-w-[560px] border-collapse text-sm">
                        <caption className="sr-only">{section.table.caption}</caption>
                        <thead>
                          <tr className="bg-bg-card">
                            {section.table.headers.map((header) => (
                              <th
                                key={header}
                                scope="col"
                                className="border-b border-border-harsh px-4 py-3 text-left font-pixel text-[10px] font-bold uppercase tracking-[0.18em] text-accent"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join("|")} className="border-b border-border-harsh/40 last:border-b-0">
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cell + cellIndex}
                                  className={`px-4 py-3 align-top ${
                                    cellIndex === 0
                                      ? "font-medium text-text-primary"
                                      : "text-text-secondary"
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <figcaption className="mt-2 text-xs text-text-muted">
                      {section.table.caption}
                    </figcaption>
                  </figure>
                )}
              </section>
            ))}

            {/* Sub-questions — rendered visibly and mirrored into FAQPage schema */}
            <section className="mb-14">
              <h2 className="mb-6 text-2xl font-medium uppercase tracking-tighter text-text-primary md:text-3xl">
                Common questions
              </h2>
              <dl className="border-t border-border-harsh">
                {guide.faq.map((item) => (
                  <div key={item.q} className="border-b border-border-harsh py-6">
                    <dt className="mb-3 text-base font-bold tracking-tight text-text-primary">
                      {item.q}
                    </dt>
                    <dd className="leading-relaxed text-text-secondary">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
              Last updated {guide.updated}
            </p>
          </div>

          {/* Sidebar: keep reading, then enquire without leaving the page */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="mb-8 border border-border-harsh bg-bg-card p-6">
                <h2 className="mb-4 font-pixel text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  Read next
                </h2>
                <ul className="flex flex-col gap-3">
                  {guide.related.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="link-underline text-sm font-medium text-text-primary hover:text-accent"
                      >
                        {link.label} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-border-harsh p-6">
                <h2 className="mb-2 text-xl font-medium uppercase tracking-tighter text-text-primary">
                  Want a number for your project?
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                  Tell us what you&apos;re trying to build. You get scope, price, and timeline in
                  writing — and we&apos;ll say so if you don&apos;t need us.
                </p>
                <EnquiryForm source={`guide:${guide.slug}`} tone="light" />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
