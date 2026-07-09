'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { TESTIMONIALS } from '@/lib/constants';
import { TESTIMONIALS_BG } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Image
        src={TESTIMONIALS_BG}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#0c0c0c]/90" />
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Guest Stories"
            title="Voices of Delight"
            description="Hear from those who have experienced the magic of Vidhaan Farm House."
            light
          />
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="mt-16">
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              spaceBetween={32}
              slidesPerView={1}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              pagination={{ clickable: true }}
              autoplay={{ delay: 7000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2, effect: 'slide' },
                1024: { slidesPerView: 3, effect: 'slide' },
              }}
              className="pb-14 !overflow-visible"
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide key={t.name}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="luxury-shadow h-full rounded-2xl border border-gold/10 bg-white/[0.03] p-8 backdrop-blur-sm"
                  >
                    <Quote className="mb-4 h-8 w-8 text-gold/30" />
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-gold/10 pt-6">
                      <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-gold/20">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="44px" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.location}</p>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
