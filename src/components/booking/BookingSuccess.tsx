'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Copy, Calendar, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate, formatPrice } from '@/lib/utils';
import { LuxuryButton } from '@/components/ui/luxury-button';
import { CONTACT } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import type { Booking } from '@/types';

interface BookingSuccessProps {
  booking: Booking;
}

export function BookingSuccess({ booking }: BookingSuccessProps) {
  const propertyName =
    typeof booking.property === 'object' ? booking.property.name : 'Vidhaan Farm House';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.bookingId || booking._id);
    toast.success('Booking ID copied!');
  };

  const whatsappUrl = buildWhatsAppUrl(
    `Hi, I just made a booking (${booking.bookingId}). Please confirm my reservation.`
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-8 text-center"
    >
      {/* Success animation */}
      <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="absolute inset-0 rounded-full bg-gold/10"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold bg-gold/20"
        >
          <motion.div
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Check className="h-10 w-10 text-gold" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Particle burst */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos((i * Math.PI * 2) / 8) * 60,
              y: Math.sin((i * Math.PI * 2) / 8) * 60,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute h-2 w-2 rounded-full bg-gold"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Confirmation</p>
        <h2 className="mt-3 font-heading text-3xl font-light text-foreground md:text-4xl">
          Booking Submitted!
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Your reservation request has been received. A confirmation email and WhatsApp notification
          have been sent. Our team will confirm within 24 hours.
        </p>

        {/* Booking ID */}
        <div className="mx-auto mt-8 max-w-sm rounded-xl border border-gold/20 bg-gold/5 p-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">Your Booking ID</p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <p className="font-mono text-2xl font-light tracking-wider text-foreground">
              {booking.bookingId || booking._id.slice(-8).toUpperCase()}
            </p>
            <button
              type="button"
              onClick={copyBookingId}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
              aria-label="Copy booking ID"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-border bg-card p-6 text-left">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Property</span>
              <span className="text-foreground">{propertyName}</span>
            </div>
            {booking.eventName && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event</span>
                <span className="text-foreground">{booking.eventName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-in</span>
              <span className="text-foreground">{formatDate(booking.checkIn)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Check-out</span>
              <span className="text-foreground">{formatDate(booking.checkOut)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Guests</span>
              <span className="text-foreground">{booking.guests}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-heading text-lg text-gold">{formatPrice(booking.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/my-bookings">
            <LuxuryButton size="lg" className="w-full gap-2 sm:w-auto">
              <Calendar className="h-4 w-4" />
              View My Bookings
            </LuxuryButton>
          </Link>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <LuxuryButton variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </LuxuryButton>
          </a>
          <a href={`mailto:${CONTACT.email}`}>
            <LuxuryButton variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
              <Mail className="h-4 w-4" />
              Email Support
            </LuxuryButton>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
