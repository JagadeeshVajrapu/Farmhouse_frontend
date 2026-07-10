import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/legal';
import { TERMS_CONDITIONS } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for booking and staying at Vidhaan Farm House.',
};

export default function TermsPage() {
  return <LegalPageContent data={TERMS_CONDITIONS} />;
}
