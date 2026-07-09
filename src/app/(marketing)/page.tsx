import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { AccommodationsSection } from '@/components/home/AccommodationsSection';
import { AmenitiesSection } from '@/components/home/AmenitiesSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { ServicesSection } from '@/components/home/ServicesSection';
import { EventsSection } from '@/components/home/EventsSection';
import { VideoTourSection } from '@/components/home/VideoTourSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { LocationSection } from '@/components/home/LocationSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <WhyChooseUsSection />
      <AccommodationsSection />
      <AmenitiesSection />
      <GalleryPreview />
      <ServicesSection />
      <EventsSection />
      <VideoTourSection />
      <TestimonialsSection />
      <FAQSection />
      <LocationSection />
      <FinalCTASection />
    </>
  );
}
