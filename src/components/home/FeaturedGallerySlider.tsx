'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { FEATURED_GALLERY } from '@/lib/home-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function FeaturedGallerySlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="overflow-hidden bg-[#0c0c0c] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Gallery"
            title="A Visual Journey"
            description="Every frame captures the essence of Vidhaan Farm House — pool, gardens, celebrations, and luxury stays."
            light
          />
        </SectionReveal>
      </div>

      <SectionReveal delay={0.15}>
        <div
          className="relative mt-16"
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <Swiper
            modules={[Autoplay, EffectCoverflow, Navigation, Pagination]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop={false}
            rewind
            slidesPerView={1}
            spaceBetween={16}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 1.8,
              slideShadows: false,
            }}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1.4, spaceBetween: 20 },
              1024: { slidesPerView: 2.2, spaceBetween: 24 },
              1280: { slidesPerView: 2.6, spaceBetween: 24 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="featured-gallery-swiper !px-6 !pb-14 lg:!px-8"
          >
            {FEATURED_GALLERY.map((item, index) => (
              <SwiperSlide key={`featured-${item.id}-${index}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 90vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-white/5 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

                  {item.type === 'video' && (
                    <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-black/40 backdrop-blur-md">
                      <Play className="h-6 w-6 fill-gold text-gold" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold/80">
                      Vidhaan Farm House
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-light text-white md:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.25}>
        <div className="mt-8 text-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
          >
            Explore Full Gallery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </SectionReveal>
    </section>
  );
}
