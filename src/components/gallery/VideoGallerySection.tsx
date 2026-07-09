'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { getVideos } from '@/lib/media/registry';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from '@/components/home/SectionReveal';

export function VideoGallerySection() {
  const videos = getVideos();
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[0] | null>(null);

  return (
    <section className="border-t border-border/50 bg-[#0c0c0c] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Cinematic Collection"
            title="Video Gallery"
            description="Experience Vidhaan Farm House through our exclusive films and property tours."
            light
          />
        </SectionReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, i) => (
            <SectionReveal key={video.id} delay={i * 0.08}>
              <motion.button
                type="button"
                whileHover={{ y: -6 }}
                onClick={() => setActiveVideo(video)}
                suppressHydrationWarning
                className="group relative w-full overflow-hidden rounded-2xl border border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                <div className="relative aspect-video">
                  <Image
                    src={video.src}
                    alt={video.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-black/50 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                      <Play className="h-6 w-6 fill-gold text-gold" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-heading text-base font-light text-white">{video.title}</p>
                </div>
              </motion.button>
            </SectionReveal>
          ))}
        </div>
      </div>

      {activeVideo?.videoSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal
          aria-label={activeVideo.title}
        >
          <button
            type="button"
            onClick={() => setActiveVideo(null)}
            suppressHydrationWarning
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            key={activeVideo.id}
            src={activeVideo.videoSrc}
            poster={activeVideo.src}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] w-full max-w-5xl rounded-xl"
          />
        </motion.div>
      )}
    </section>
  );
}
