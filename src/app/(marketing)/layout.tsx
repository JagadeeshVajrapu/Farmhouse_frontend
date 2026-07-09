import { MarketingLayout } from '@/components/layout';

export default function MarketingRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
