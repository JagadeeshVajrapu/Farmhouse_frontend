import { FALLBACK_PROPERTIES } from '@/lib/constants';
import { pickImage, pickImages } from '@/lib/media/registry';
import type { Property } from '@/types';

/** Use API list when non-empty; otherwise local fallbacks */
export function resolveProperties(list: Property[] | null | undefined): Property[] {
  if (list && list.length > 0) return list;
  return FALLBACK_PROPERTIES;
}

export function getFallbackProperty(slug: string): Property | undefined {
  return FALLBACK_PROPERTIES.find((p) => p.slug === slug);
}

const SLUG_IMAGE_TAGS: Record<string, string[]> = {
  'grand-vidhaan-villa': ['rooms', 'pool', 'hero', 'garden'],
  'serenity-cottage': ['rooms', 'garden', 'lawn', 'night'],
  'royal-farmhouse-suite': ['hero', 'rooms', 'pool', 'estate'],
  'garden-view-suite': ['garden', 'rooms', 'lawn', 'pool'],
};

/** Ensure property has valid images for display */
export function enrichProperty(property: Property, slug?: string): Property {
  const key = slug || property.slug;
  const fallback = getFallbackProperty(key);
  const tags = SLUG_IMAGE_TAGS[key] || ['rooms', 'pool', 'garden'];

  let images = property.images?.filter((img) => img?.url) ?? [];
  if (images.length === 0) {
    images = fallback?.images?.length ? [...fallback.images] : [];
  }

  if (images.length < 3) {
    const used = images.map((i) => i.url);
    for (const tag of tags) {
      const src = pickImage(tag, used);
      if (!used.includes(src)) {
        images.push({ url: src, alt: `${property.name} — ${tag}` });
        used.push(src);
      }
      if (images.length >= 4) break;
    }
  }

  const heroUrl = images[0]?.url || pickImage(tags[0] || 'rooms');

  return {
    ...property,
    images: images.length ? images : [{ url: heroUrl, alt: property.name }],
  };
}

export function resolveProperty(data: Property | null | undefined, slug: string): Property | undefined {
  if (data) return enrichProperty(data, slug);
  const fallback = getFallbackProperty(slug);
  return fallback ? enrichProperty(fallback, slug) : undefined;
}
