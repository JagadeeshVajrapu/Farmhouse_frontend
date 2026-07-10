'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { SectionReveal } from './SectionReveal';
import { HOME_VIDEO_ORDER } from '@/lib/home-data';
import { getVideos, type MediaItem } from '@/lib/media/registry';
import { cn } from '@/lib/utils';

function sortHomeVideos(videos: MediaItem[]): MediaItem[] {
  return [...videos].sort(
    (a, b) => HOME_VIDEO_ORDER.indexOf(a.id as (typeof HOME_VIDEO_ORDER)[number]) -
      HOME_VIDEO_ORDER.indexOf(b.id as (typeof HOME_VIDEO_ORDER)[number])
  );
}

export function VideoTourSection() {
  const videos = useMemo(() => sortHomeVideos(getVideos()), []);
  const [activeId, setActiveId] = useState(videos[0]?.id ?? 'event-highlights-01');
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = videos.find((v) => v.id === activeId) ?? videos[0];

  const handleSelect = (id: string) => {
    setActiveId(id);
    requestAnimationFrame(() => {
      const video = videoRef.current;
      if (!video) return;
      video.load();
      video.play().catch(() => {
        // User can press play if autoplay is blocked
      });
    });
  };

  if (!activeVideo?.videoSrc) return null;

  return (
    <section id="video-tour" className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <SectionHeading
            subtitle="Cinematic Experience"
            title="Take a Virtual Tour"
            description="Watch our property films — from pool and estate views to the complete Vidhaan Farm House highlights."
          />
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-gold/15 bg-black shadow-[0_32px_80px_rgba(0,0,0,0.5)] sm:mt-16">
            <video
              key={activeVideo.id}
              ref={videoRef}
              src={activeVideo.videoSrc}
              poster={activeVideo.src}
              controls
              playsInline
              preload="metadata"
              className="aspect-video h-auto w-full bg-black object-contain"
            >
              <source src={activeVideo.videoSrc} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {videos.map((video) => {
              const isActive = video.id === activeId;
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => handleSelect(video.id)}
                  suppressHydrationWarning
                  className={cn(
                    'group relative overflow-hidden rounded-xl border text-left transition-all duration-300',
                    isActive
                      ? 'border-gold/50 ring-2 ring-gold/30'
                      : 'border-border/50 hover:border-gold/30'
                  )}
                >
                  <div className="relative aspect-video">
                    <Image
                      src={video.src}
                      alt={video.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-black/50 backdrop-blur-sm">
                        <Play className="h-4 w-4 fill-gold text-gold" />
                      </div>
                    </div>
                  </div>
                  <p className="px-3 py-2.5 text-xs font-medium text-foreground sm:text-sm">
                    {video.title}
                  </p>
                </button>
              );
            })}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
