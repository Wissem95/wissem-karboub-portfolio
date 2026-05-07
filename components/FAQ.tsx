import { faqs } from "@/lib/faqs";

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative border-t border-border bg-bg py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">
          06 — Questions fréquentes
        </p>
        <h2
          id="faq-title"
          className="mt-4 font-syne text-4xl font-extrabold md:text-5xl"
        >
          On vous explique<span className="text-accent">.</span>
        </h2>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <h3 className="font-syne text-lg font-bold text-text md:text-xl">
                  {item.q}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-block flex-shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-1 font-mono text-xs text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
