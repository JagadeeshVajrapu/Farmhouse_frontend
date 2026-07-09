export { useQuery } from '@tanstack/react-query';
export { propertyApi } from '@/lib/api/property.api';
export { FALLBACK_PROPERTIES } from '@/lib/constants';

import { useQuery } from '@tanstack/react-query';
import { propertyApi } from '@/lib/api/property.api';
import { resolveProperties, resolveProperty } from '@/lib/properties';

export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      try {
        const res = await propertyApi.getAll();
        return resolveProperties(res.data.data);
      } catch {
        return resolveProperties(null);
      }
    },
  });
}

export function useFeaturedProperties() {
  return useQuery({
    queryKey: ['featured-properties'],
    queryFn: async () => {
      try {
        const res = await propertyApi.getFeatured();
        return resolveProperties(res.data.data);
      } catch {
        return resolveProperties(null);
      }
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProperty(slug: string) {
  return useQuery({
    queryKey: ['property', slug],
    queryFn: async () => {
      try {
        const res = await propertyApi.getBySlug(slug);
        return resolveProperty(res.data.data, slug);
      } catch {
        return resolveProperty(undefined, slug);
      }
    },
    enabled: !!slug,
    placeholderData: () => resolveProperty(undefined, slug),
  });
}
