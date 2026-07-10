import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/legal';
import { DISCLAIMER } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for information and images on the Vidhaan Farm House website.',
};

export default function DisclaimerPage() {
  return <LegalPageContent data={DISCLAIMER} />;
}
