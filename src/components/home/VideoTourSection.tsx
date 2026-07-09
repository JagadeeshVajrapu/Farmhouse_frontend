'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, X } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';
import { HERO_POSTER, VIDEO_TOUR_URL } from '@/lib/home-data';

export function VideoTourSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying || !videoRef.current) return;
    const video = videoRef.current;
    video.load();
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay may be blocked; native controls remain available
      });
    }
  }, [isPlaying]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <section id="video-tour" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Cinematic Experience"
            title="Take a Virtual Tour"
            description="Step inside Vidhaan Farm House through our exclusive film — a journey through luxury, nature, and timeless elegance."
          />
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="relative mt-16 aspect-video overflow-hidden rounded-2xl border border-gold/15 bg-black shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            {!isPlaying ? (
              <>
                <Image
                  src={HERO_POSTER}
                  alt="Video tour thumbnail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-black/40" />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="group absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4"
                  aria-label="Play video tour"
                  suppressHydrationWarning
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-gold/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold/20">
                    <Play className="h-8 w-8 fill-gold text-gold" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/80">
                    Play Film
                  </span>
                </button>
              </>
            ) : (
              <div className="relative flex h-full min-h-[280px] w-full items-center justify-center bg-black">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70"
                  aria-label="Close video"
                  suppressHydrationWarning
                >
                  <X className="h-5 w-5" />
                </button>
                <video
                  ref={videoRef}
                  key={VIDEO_TOUR_URL}
                  controls
                  playsInline
                  preload="auto"
                  poster={HERO_POSTER}
                  className="h-full w-full object-contain"
                >
                  <source src={VIDEO_TOUR_URL} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
