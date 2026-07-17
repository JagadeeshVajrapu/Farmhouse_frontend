'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';
import { contactConfig } from '@/config/site';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';
import { LuxuryButton } from '@/components/ui/luxury-button';

export function LocationSection() {
  return (
    <section className="bg-[#0c0c0c] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Find Us"
            title="An Oasis Near Delhi"
            description="Nestled in Chhatarpur, just 45 minutes from Indira Gandhi International Airport."
            light
          />
        </SectionReveal>

        <div className="mt-16">
          <SectionReveal delay={0.1}>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: 'Address', value: contactConfig.address },
                { icon: Phone, label: 'Phone', value: contactConfig.phone, href: `tel:${contactConfig.phone}` },
                { icon: Mail, label: 'Email', value: contactConfig.email, href: `mailto:${contactConfig.email}` },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 text-sm text-foreground hover:text-gold">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(contactConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuxuryButton variant="outline" className="w-full gap-2">
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </LuxuryButton>
              </a>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
