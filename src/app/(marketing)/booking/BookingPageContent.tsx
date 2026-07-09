'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { parseISO } from 'date-fns';
import { propertyApi } from '@/lib/api';
import { FALLBACK_PROPERTIES } from '@/lib/constants';
import { SERVICES } from '@/lib/services-data';
import { SectionHeading } from '@/components/ui/section-heading';
import { MultiStepBookingForm } from '@/components/booking/MultiStepBookingForm';

export default function BookingPageContent() {
  const searchParams = useSearchParams();

  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');
  const guestsParam = searchParams.get('guests');
  const serviceSlug = searchParams.get('service');
  const propertySlug = searchParams.get('property');

  const selectedService = serviceSlug
    ? SERVICES.find((service) => service.slug === serviceSlug)
    : undefined;

  const initialCheckIn = checkInParam ? parseISO(checkInParam) : undefined;
  const initialCheckOut = checkOutParam ? parseISO(checkOutParam) : undefined;
  const initialGuests = guestsParam ? Number(guestsParam) : 2;

  const { data: properties } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      try {
        const res = await propertyApi.getAll();
        return res.data.data || FALLBACK_PROPERTIES;
      } catch {
        return FALLBACK_PROPERTIES;
      }
    },
  });

  const propertyList = properties || FALLBACK_PROPERTIES;
  const defaultProperty = propertySlug
    ? propertyList.find((p) => p.slug === propertySlug)
    : propertyList[0];

  return (
    <>
      <section className="bg-charcoal pb-12 pt-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading
            subtitle={selectedService ? 'Service Booking' : 'Reservations'}
            title={selectedService ? `Book ${selectedService.title}` : 'Reserve Your Stay'}
            description={
              selectedService
                ? selectedService.tagline
                : 'Complete your luxury booking in a few simple steps. Our team will confirm within 24 hours.'
            }
            light
            align="center"
          />
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {selectedService && (
            <div className="mb-6 rounded-xl border border-gold/20 bg-gold/5 p-4">
              <p className="text-xs uppercase tracking-wider text-gold">Selected Service</p>
              <p className="mt-1 font-heading text-lg text-foreground">{selectedService.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{selectedService.description}</p>
            </div>
          )}

          <MultiStepBookingForm
            properties={propertyList}
            defaultPropertyId={defaultProperty?._id}
            initialCheckIn={initialCheckIn}
            initialCheckOut={initialCheckOut}
            initialGuests={initialGuests}
            initialSpecialRequests={
              selectedService
                ? `Interested in: ${selectedService.title} (${selectedService.tagline})`
                : undefined
            }
            initialEventName={selectedService ? selectedService.title : undefined}
          />
        </div>
      </section>
    </>
  );
}
