import type { Metadata } from 'next';
import { GalleryHero, GalleryMasonry, VideoGallerySection } from '@/components/gallery';
import { FinalCTASection } from '@/components/home/FinalCTASection';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Explore Vidhaan Farm House through curated photography, cinematic videos, and stunning drone aerials. Filter, zoom, and immerse yourself in luxury.',
};

export default function GalleryPage() {
  return (
    <>
      <GalleryHero />
      <GalleryMasonry />
      <VideoGallerySection />
      <FinalCTASection />
    </>
  );
}
