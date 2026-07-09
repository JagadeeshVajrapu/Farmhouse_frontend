import manifest from './manifest.json';

export type MediaTag =
  | 'hero'
  | 'pool'
  | 'rooms'
  | 'party-hall'
  | 'garden'
  | 'lawn'
  | 'outdoor-seating'
  | 'night'
  | 'entrance'
  | 'parking'
  | 'decoration'
  | 'birthday'
  | 'party'
  | 'corporate'
  | 'family'
  | 'food'
  | 'kitchen'
  | 'amenities'
  | 'speaker'
  | 'tv'
  | 'nature'
  | 'drone'
  | 'estate'
  | 'videos'
  | 'miscellaneous';

export type GalleryCategory =
  | 'pool'
  | 'rooms'
  | 'events'
  | 'garden'
  | 'night'
  | 'party'
  | 'drone'
  | 'videos';

export type GalleryFilterId = 'all' | GalleryCategory;

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  videoSrc?: string;
  title: string;
  alt: string;
  tags: string[];
  gallery: string;
  featured?: boolean;
  score?: number;
  width: number;
  height: number;
}

export interface MediaManifest {
  generatedAt: string;
  version: number;
  items: MediaItem[];
  hero: {
    video: string | null;
    poster: string;
    image: string;
  };
}

export const MEDIA_MANIFEST = manifest as MediaManifest;
export const MEDIA_ITEMS = MEDIA_MANIFEST.items;

const FALLBACK = MEDIA_ITEMS[0]?.src ?? '/media/images/hero-estate-01.jpeg';

/** Get media by tag with optional exclusion list to avoid repetition */
export function getByTag(tag: string, exclude: string[] = []): MediaItem[] {
  return MEDIA_ITEMS.filter(
    (item) => item.tags.includes(tag) && !exclude.includes(item.src)
  );
}

/** Pick best single image for a tag */
export function pickImage(tag: string, exclude: string[] = []): string {
  const items = getByTag(tag, exclude).filter((i) => i.type === 'image');
  if (items.length) return items[0].src;
  const featured = MEDIA_ITEMS.find((i) => i.type === 'image' && i.featured && !exclude.includes(i.src));
  if (featured) return featured.src;
  const any = MEDIA_ITEMS.find((i) => i.type === 'image' && !exclude.includes(i.src));
  return any?.src ?? FALLBACK;
}

/** Pick N unique images by tag */
export function pickImages(tag: string, count: number, exclude: string[] = []): string[] {
  const used = [...exclude];
  const result: string[] = [];
  const pool = getByTag(tag, used).filter((i) => i.type === 'image');
  for (const item of pool) {
    if (result.length >= count) break;
    result.push(item.src);
    used.push(item.src);
  }
  while (result.length < count) {
    const next = MEDIA_ITEMS.find(
      (i) => i.type === 'image' && !used.includes(i.src)
    );
    if (!next) break;
    result.push(next.src);
    used.push(next.src);
  }
  return result;
}

/** Featured items for homepage slider */
export function getFeaturedMedia(count = 8): MediaItem[] {
  const featured = MEDIA_ITEMS.filter((i) => i.featured);
  const rest = MEDIA_ITEMS.filter((i) => !i.featured && i.type === 'image');
  return [...featured, ...rest].slice(0, count);
}

/** Gallery items filtered by category */
export function getGalleryItems(filter: GalleryFilterId = 'all'): MediaItem[] {
  if (filter === 'all') return MEDIA_ITEMS;
  return MEDIA_ITEMS.filter((i) => i.gallery === filter || (filter === 'events' && ['events', 'kitchen'].includes(i.gallery)));
}

export function getVideos(): MediaItem[] {
  return MEDIA_ITEMS.filter((i) => i.type === 'video');
}

export const GALLERY_FILTERS: { id: GalleryFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pool', label: 'Pool' },
  { id: 'rooms', label: 'Rooms' },
  { id: 'events', label: 'Events' },
  { id: 'garden', label: 'Garden' },
  { id: 'night', label: 'Night' },
  { id: 'party', label: 'Party' },
  { id: 'drone', label: 'Drone' },
  { id: 'videos', label: 'Videos' },
];

export const HERO_MEDIA = MEDIA_MANIFEST.hero;

/** Map amenity slug to media tag */
export const AMENITY_MEDIA_MAP: Record<string, string> = {
  'swimming-pool': 'pool',
  rooms: 'rooms',
  kitchen: 'kitchen',
  parking: 'parking',
  garden: 'garden',
  speaker: 'speaker',
  'party-hall': 'party-hall',
  'outdoor-seating': 'outdoor-seating',
  'nature-area': 'nature',
  tv: 'tv',
};

/** Map service slug to media tag */
export const SERVICE_MEDIA_MAP: Record<string, string> = {
  'pool-party': 'party',
  birthday: 'party',
  'weekend-stay': 'rooms',
  corporate: 'party-hall',
  family: 'lawn',
  anniversary: 'night',
  'wedding-shoot': 'garden',
  'private-events': 'night',
};

export function getAmenityImage(slug: string, used: string[] = []): string {
  const tag = AMENITY_MEDIA_MAP[slug] ?? 'amenities';
  return pickImage(tag, used);
}

export function getServiceBanner(slug: string, used: string[] = []): string {
  const tag = SERVICE_MEDIA_MAP[slug] ?? 'estate';
  return pickImage(tag, used);
}

export function getServiceGallery(slug: string, count = 4): { src: string; alt: string }[] {
  const tag = SERVICE_MEDIA_MAP[slug] ?? 'estate';
  const images = pickImages(tag, count);
  return images.map((src) => {
    const item = MEDIA_ITEMS.find((i) => i.src === src);
    return { src, alt: item?.alt ?? 'Vidhaan Farm House' };
  });
}

/** Convert MediaItem to gallery item format */
export function toGalleryItem(item: MediaItem) {
  return {
    id: item.id,
    type: item.type,
    category: item.gallery as GalleryCategory,
    title: item.title,
    alt: item.alt,
    src: item.src,
    videoSrc: item.videoSrc,
    width: item.width,
    height: item.height,
    featured: item.featured,
  };
}

function dedupeMediaItems(items: MediaItem[]): MediaItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.type === 'video' ? item.videoSrc || item.src : item.src;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const ALL_GALLERY_ITEMS = dedupeMediaItems(MEDIA_ITEMS).map(toGalleryItem);
