import Link from 'next/link';
import type { LegalPageData } from '@/lib/legal-data';
import { siteConfig } from '@/config/site';

interface LegalPageContentProps {
  data: LegalPageData;
}

export function LegalPageContent({ data }: LegalPageContentProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
      <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold">Legal</p>
      <h1 className="mt-4 font-heading text-3xl font-light text-foreground md:text-4xl">
        {data.title}
      </h1>
      {data.lastUpdated && (
        <p className="mt-3 text-sm text-muted-foreground">Last Updated: {data.lastUpdated}</p>
      )}
      {data.intro && (
        <p className="mt-8 text-base leading-relaxed text-muted-foreground">{data.intro}</p>
      )}

      <div className="mt-10 space-y-10">
        {data.sections.map((section, index) => (
          <section key={section.heading ?? `section-${index}`}>
            {section.heading && (
              <h2 className="font-heading text-xl font-light text-foreground md:text-2xl">
                {section.heading}
              </h2>
            )}
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className={`text-base leading-relaxed text-muted-foreground ${section.heading ? 'mt-4' : 'mt-0'}`}
              >
                {paragraph}
              </p>
            ))}
            {section.bullets && section.bullets.length > 0 && (
              <ul
                className={`space-y-2 ${section.heading || section.paragraphs?.length ? 'mt-4' : 'mt-0'}`}
              >
                {section.bullets.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {data.contact && (
        <div className="mt-12 rounded-2xl border border-gold/15 bg-card/50 p-6">
          <h2 className="font-heading text-lg text-foreground">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {data.contact.phone && (
              <li>
                <a href={`tel:${data.contact.phone.replace(/\s/g, '')}`} className="hover:text-gold">
                  {data.contact.phone}
                </a>
              </li>
            )}
            {data.contact.email && (
              <li>
                <a href={`mailto:${data.contact.email}`} className="hover:text-gold">
                  {data.contact.email}
                </a>
              </li>
            )}
            {data.contact.address && <li>{data.contact.address}</li>}
          </ul>
        </div>
      )}

      <div className="mt-12 flex flex-wrap gap-4 border-t border-border/60 pt-8 text-sm">
        <Link href="/privacy" className="text-muted-foreground hover:text-gold">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-muted-foreground hover:text-gold">
          Terms & Conditions
        </Link>
        <Link href="/refund" className="text-muted-foreground hover:text-gold">
          Refund Policy
        </Link>
        <Link href="/disclaimer" className="text-muted-foreground hover:text-gold">
          Disclaimer
        </Link>
        <Link href="/contact" className="text-muted-foreground hover:text-gold">
          Contact {siteConfig.name}
        </Link>
      </div>
    </article>
  );
}
