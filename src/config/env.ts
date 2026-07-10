/**
 * Centralized environment configuration.
 * NEXT_PUBLIC_* values are inlined at build time — set them before `next build`.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const env = {
  /** Public API base URL (e.g. https://your-api.com/api) */
  apiUrl: API_URL,

  /** Public site URL for SEO / OG */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',

  /** App environment */
  nodeEnv: process.env.NODE_ENV ?? 'development',

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

export type Env = typeof env;
