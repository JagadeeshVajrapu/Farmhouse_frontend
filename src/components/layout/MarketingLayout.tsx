import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingContactBar } from '@/components/whatsapp';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

/**
 * Public marketing layout — header + footer wrapper
 */
export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen pb-28 lg:pb-0">{children}</main>
      <Footer />
      <FloatingContactBar />
    </>
  );
}
