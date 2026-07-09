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

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <SectionReveal delay={0.1} className="lg:col-span-2">
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

          <SectionReveal delay={0.2} className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/15 lg:aspect-auto lg:h-full lg:min-h-[400px]">
              <iframe
                title="Vidhaan Farm House Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.123456789!2d77.1751!3d28.4962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f42b89e5c8b%3A0x1!2sChhatarpur%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
                className="absolute inset-0 h-full w-full border-0 grayscale-[30%] invert-[90%] contrast-[90%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
