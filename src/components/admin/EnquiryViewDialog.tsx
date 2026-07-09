'use client';

import { formatDate } from '@/lib/utils';
import { formatEventType } from '@/lib/contact-admin';
import type { ContactEnquiryFull } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CONTACT_STATUS_COLORS } from '@/lib/contact-admin';
import { Mail, Phone, Users, Calendar, MessageSquare } from 'lucide-react';

interface EnquiryViewDialogProps {
  enquiry: ContactEnquiryFull | null;
  open: boolean;
  onClose: () => void;
}

export function EnquiryViewDialog({ enquiry, open, onClose }: EnquiryViewDialogProps) {
  if (!enquiry) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-light">Enquiry Details</DialogTitle>
          <DialogDescription>Submitted on {formatDate(enquiry.createdAt)}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-2xl font-light text-foreground">{enquiry.name}</h3>
            <Badge className={CONTACT_STATUS_COLORS[enquiry.status] || ''}>{enquiry.status}</Badge>
          </div>

          <div className="grid gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-gold" />
              <a href={`tel:${enquiry.phone.replace(/\s/g, '')}`} className="hover:text-gold">
                {enquiry.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${enquiry.email}`} className="hover:text-gold">
                {enquiry.email}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-gold" />
              <span>{enquiry.guestCount} guests</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-gold" />
              <span>Preferred: {formatDate(enquiry.preferredDate)}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Event Type</p>
            <p className="mt-1 text-sm text-foreground">{formatEventType(enquiry.eventType)}</p>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              Message
            </p>
            <p className="rounded-xl border border-border bg-background/50 p-4 text-sm leading-relaxed text-muted-foreground">
              {enquiry.message}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
