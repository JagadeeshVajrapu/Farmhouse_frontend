import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/legal';
import { PRIVACY_POLICY } from '@/lib/legal-data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Vidhaan Farm House — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return <LegalPageContent data={PRIVACY_POLICY} />;
}
