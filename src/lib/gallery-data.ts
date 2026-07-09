import {
  ALL_GALLERY_ITEMS,
  GALLERY_FILTERS,
  pickImage,
  type GalleryCategory,
  type GalleryFilterId,
} from '@/lib/media/registry';

export type { GalleryCategory, GalleryFilterId };

export type GalleryMediaType = 'image' | 'video';

export interface GalleryItem {
  id: string;
  type: GalleryMediaType;
  category: GalleryCategory;
  title: string;
  alt: string;
  src: string;
  videoSrc?: string;
  width: number;
  height: number;
  featured?: boolean;
}

export { GALLERY_FILTERS };

export const GALLERY_ITEMS: GalleryItem[] = ALL_GALLERY_ITEMS as GalleryItem[];

export const GALLERY_PAGE_SIZE = 12;

export const GALLERY_PAGE = {
  subtitle: 'Visual Archive',
  title: 'The Gallery',
  titleAccent: 'Captured in Time',
  description:
    'Explore Vidhaan Farm House through curated photography, cinematic films, and breathtaking aerial perspectives.',
  banner: pickImage('pool'),
};
