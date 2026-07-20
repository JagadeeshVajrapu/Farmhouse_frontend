'use client';

import Image from 'next/image';
import { MapPin, Phone, Mail, Navigation, ExternalLink } from 'lucide-react';
import { contactConfig } from '@/config/site';
import { CONTACT_PAGE } from '@/lib/contact-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';
import { LuxuryButton } from '@/components/ui/luxury-button';

export function LocationSection() {
  return (
    <section className="bg-[#0c0c0c] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Find Us"
            title="An Oasis Near Delhi"
            description="Located in Noida Sector-135, Uttar Pradesh."
            light
          />
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2 lg:min-h-[320px]">
            {/* Left — contact + entrance */}
            <div className="relative flex flex-col justify-between bg-[#111] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
                <Image
                  src={CONTACT_PAGE.directionsImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/85 to-[#0c0c0c]/70" />
              </div>

              <div className="relative z-10 space-y-5">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold">
                    Vidhaan Farm House
                  </p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                    Noida Sector-135
                  </p>
                </div>

                <ul className="space-y-3">
                  {[
                    {
                      icon: MapPin,
                      label: 'Address',
                      value: contactConfig.address,
                    },
                    {
                      icon: Phone,
                      label: 'Phone',
                      value: contactConfig.phone,
                      href: `tel:${contactConfig.phone.replace(/\s/g, '')}`,
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      value: contactConfig.email,
                      href: `mailto:${contactConfig.email}`,
                    },
                  ].map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                        <item.icon className="h-3.5 w-3.5 text-gold" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-white/40">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="mt-0.5 block text-sm text-white/90 transition-colors hover:text-gold"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-0.5 text-sm text-white/90">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-8">
                <a href={contactConfig.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <LuxuryButton variant="outline" className="w-full gap-2 sm:w-auto">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </LuxuryButton>
                </a>
              </div>
            </div>

            {/* Right — map */}
            <div className="relative h-64 border-t border-white/10 lg:h-auto lg:border-t-0 lg:border-l lg:border-white/10">
              <iframe
                title="Vidhaan Farm House Location"
                src={contactConfig.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0 grayscale-[15%] contrast-[95%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/10" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
