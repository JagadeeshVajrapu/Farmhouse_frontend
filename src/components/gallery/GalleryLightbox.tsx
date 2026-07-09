'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Play, Plane,
} from 'lucide-react';
import type { GalleryItem } from '@/lib/gallery-data';
import { cn } from '@/lib/utils';

interface GalleryLightboxProps {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export function GalleryLightbox({ items, activeIndex, onClose, onNavigate }: GalleryLightboxProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  const resetZoom = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handlePrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
    resetZoom();
  }, [activeIndex, items.length, onNavigate, resetZoom]);

  const handleNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
    resetZoom();
  }, [activeIndex, items.length, onNavigate, resetZoom]);

  const zoomIn = useCallback(() => {
    setScale((s) => Math.min(s + 0.5, MAX_SCALE));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((s) => {
      const next = Math.max(s - 0.5, MIN_SCALE);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose, handlePrev, handleNext, zoomIn, zoomOut]);

  useEffect(() => {
    resetZoom();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex, resetZoom]);

  const handleWheel = (e: React.WheelEvent) => {
    if (!item || item.type === 'video') return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setScale((s) => {
      const next = Math.min(Math.max(s + delta, MIN_SCALE), MAX_SCALE);
      if (next === MIN_SCALE) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const toggleZoom = () => {
    if (scale > 1) {
      resetZoom();
    } else {
      setScale(2.5);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          {/* Top bar */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {item.category === 'drone' && <Plane className="h-4 w-4 shrink-0 text-gold" />}
                {item.type === 'video' && <Play className="h-4 w-4 shrink-0 text-gold" />}
                <h2 className="truncate font-heading text-lg font-light text-white">{item.title}</h2>
              </div>
              <p className="mt-0.5 text-xs text-white/50">
                {(activeIndex ?? 0) + 1} of {items.length} · {item.category}
              </p>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {item.type === 'image' && (
                <>
                  <button
                    type="button"
                    onClick={zoomOut}
                    disabled={scale <= MIN_SCALE}
                    suppressHydrationWarning
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="hidden w-12 text-center text-xs tabular-nums text-white/50 sm:block">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={zoomIn}
                    disabled={scale >= MAX_SCALE}
                    suppressHydrationWarning
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={resetZoom}
                    suppressHydrationWarning
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                suppressHydrationWarning
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Media area */}
          <div
            ref={containerRef}
            className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8"
            onWheel={handleWheel}
          >
            <button
              type="button"
              onClick={handlePrev}
              suppressHydrationWarning
              className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-black/70 sm:left-4 sm:h-12 sm:w-12"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                drag={item.type === 'image' && scale > 1}
                dragConstraints={containerRef}
                dragElastic={0.1}
                onDrag={(_, info) => {
                  if (scale > 1) {
                    setPosition({ x: info.offset.x, y: info.offset.y });
                  }
                }}
                className={cn(
                  'relative max-h-full max-w-full',
                  item.type === 'image' && 'cursor-grab active:cursor-grabbing'
                )}
                style={
                  item.type === 'image'
                    ? { transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)` }
                    : undefined
                }
                onDoubleClick={item.type === 'image' ? toggleZoom : undefined}
              >
                {item.type === 'video' && item.videoSrc ? (
                  <video
                    ref={videoRef}
                    src={item.videoSrc}
                    poster={item.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[75vh] max-w-full rounded-lg"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="max-h-[75vh] w-auto rounded-lg object-contain"
                    sizes="100vw"
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={handleNext}
              suppressHydrationWarning
              className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition-all hover:border-gold/30 hover:bg-black/70 sm:right-4 sm:h-12 sm:w-12"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0 border-t border-white/10 px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-1 scrollbar-none">
              {items.map((thumb, i) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => {
                    onNavigate(i);
                    resetZoom();
                  }}
                  suppressHydrationWarning
                  className={cn(
                    'relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all sm:h-16 sm:w-24',
                    i === activeIndex
                      ? 'border-gold ring-1 ring-gold/50'
                      : 'border-white/10 opacity-50 hover:opacity-100'
                  )}
                >
                  <Image
                    src={thumb.src}
                    alt={thumb.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                  {thumb.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Play className="h-3 w-3 fill-white text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
