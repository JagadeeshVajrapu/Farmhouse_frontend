import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/legal';
import { REFUND_POLICY } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Cancellation and refund policy for Vidhaan Farm House bookings.',
};

export default function RefundPage() {
  return <LegalPageContent data={REFUND_POLICY} />;
}
