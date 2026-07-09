'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Users, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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

export function BookingBar() {
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 z-20 w-[calc(100%-3rem)] max-w-4xl -translate-x-1/2"
    >
      <GlassCard className="bg-white/15 backdrop-blur-2xl" padding="sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
          {/* Check-in */}
          <div className="flex-1 border-b border-white/10 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <label className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/60">
              <Calendar className="h-3 w-3" />
              Check In
            </label>
            <Popover>
              <PopoverTrigger
                className={cn(
                  'w-full text-left text-sm text-white',
                  !checkIn && 'text-white/50'
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
          <div className="flex-1 border-b border-white/10 px-0 pb-4 md:border-b-0 md:border-r md:px-6 md:pb-0">
            <label className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/60">
              <Calendar className="h-3 w-3" />
              Check Out
            </label>
            <Popover>
              <PopoverTrigger
                className={cn(
                  'w-full text-left text-sm text-white',
                  !checkOut && 'text-white/50'
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
          <div className="flex-1 px-0 md:px-6">
            <label className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/60">
              <Users className="h-3 w-3" />
              Guests
            </label>
            <Select value={guests} onValueChange={(value) => value && setGuests(value)}>
              <SelectTrigger className="border-0 bg-transparent p-0 text-sm text-white shadow-none focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} Guest{n > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleBook}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-8 text-xs font-medium uppercase tracking-wider text-charcoal transition-all hover:bg-gold-light md:ml-4"
          >
            <MessageCircle className="h-4 w-4" />
            Book on WhatsApp
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}
