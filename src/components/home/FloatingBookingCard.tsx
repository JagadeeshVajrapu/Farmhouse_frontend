'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Calendar, Users, MessageCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { bookNowWhatsAppUrl } from '@/lib/cta';

export function FloatingBookingCard() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState('2');

  const handleBook = () => {
    const url = bookNowWhatsAppUrl({
      checkIn: checkIn ? format(checkIn, 'dd MMM yyyy') : undefined,
      checkOut: checkOut ? format(checkOut, 'dd MMM yyyy') : undefined,
      guests: `${guests} guest${Number(guests) > 1 ? 's' : ''}`,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="absolute bottom-8 left-1/2 z-20 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 px-4"
    >
      <GlassCard className="glass-gold overflow-hidden rounded-2xl p-1 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-2 border-b border-gold/10 px-5 py-3">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
            Reserve Your Escape
          </span>
        </div>

        <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
          {/* Check-in */}
          <div className="flex-1 border-b border-white/5 px-5 py-4 md:border-b-0 md:border-r">
            <label className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/50">
              <Calendar className="h-3 w-3" />
              Arrival
            </label>
            <Popover>
              <PopoverTrigger
                className={cn(
                  'w-full text-left text-sm text-white transition-colors hover:text-gold',
                  !checkIn && 'text-white/40'
                )}
              >
                {checkIn ? format(checkIn, 'dd MMM yyyy') : 'Select date'}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out */}
          <div className="flex-1 border-b border-white/5 px-5 py-4 md:border-b-0 md:border-r">
            <label className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/50">
              <Calendar className="h-3 w-3" />
              Departure
            </label>
            <Popover>
              <PopoverTrigger
                className={cn(
                  'w-full text-left text-sm text-white transition-colors hover:text-gold',
                  !checkOut && 'text-white/40'
                )}
              >
                {checkOut ? format(checkOut, 'dd MMM yyyy') : 'Select date'}
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date <= (checkIn || new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="flex-1 px-5 py-4">
            <label className="mb-2 flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-white/50">
              <Users className="h-3 w-3" />
              Guests
            </label>
            <Select value={guests} onValueChange={(v) => v && setGuests(v)}>
              <SelectTrigger className="h-auto border-0 bg-transparent p-0 text-sm text-white shadow-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} Guest{n > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* CTA */}
          <button
            onClick={handleBook}
            suppressHydrationWarning
            className="group flex items-center justify-center gap-2 bg-gold px-8 py-5 text-xs font-medium uppercase tracking-widest text-[#0a0a0a] transition-all duration-300 hover:bg-gold-light md:rounded-r-xl"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
            Book on WhatsApp
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
