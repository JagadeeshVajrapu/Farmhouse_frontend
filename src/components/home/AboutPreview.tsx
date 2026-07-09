'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { LuxuryButton } from '@/components/ui/luxury-button';

export function AboutPreview() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                    alt="Estate architecture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 300px"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                    alt="Estate gardens"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 300px"
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="relative aspect-[3/5] overflow-hidden rounded-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
                    alt="Fine dining experience"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 300px"
                  />
                </div>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-charcoal p-6 shadow-2xl md:-right-8">
              <p className="font-heading text-4xl font-light text-gold">50+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-cream/60">
                Acres of Paradise
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionHeading
              subtitle="Our Story"
              title="A Legacy of Refined Living"
              align="left"
            />
            <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Nestled within 50 acres of pristine landscape on the outskirts of New Delhi,
                Vidhaan Farm House is more than a destination — it is an experience crafted for
                those who appreciate the finer things in life.
              </p>
              <p>
                Every corner of our estate tells a story of thoughtful design, sustainable luxury,
                and heartfelt hospitality. From our heritage architecture to our award-winning
                botanical gardens, we invite you to discover a world where time slows down and
                beauty surrounds you.
              </p>
            </div>
            <Link href="/about" className="mt-8 inline-block">
              <LuxuryButton variant="outline" className="group">
                Discover Our Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </LuxuryButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
