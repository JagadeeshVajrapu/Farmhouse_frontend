import type { Metadata } from 'next';
import {
  AboutBanner,
  OurStorySection,
  MissionVisionSection,
  JourneyTimeline,
  WhyChooseAboutSection,
  AchievementsSection,
  NatureExperienceSection,
  HospitalitySection,
} from '@/components/about';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the story behind Vidhaan Farm House — our mission, vision, journey, and commitment to luxury hospitality in nature.',
};

export default function AboutPage() {
  return (
    <>
      <AboutBanner />
      <OurStorySection />
      <MissionVisionSection />
      <JourneyTimeline />
      <WhyChooseAboutSection />
      <AchievementsSection />
      <NatureExperienceSection />
      <HospitalitySection />
      <FinalCTASection />
    </>
  );
}
