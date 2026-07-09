/**
 * Centralized environment configuration
 * All env vars are validated at runtime on the client via NEXT_PUBLIC_* prefix
 */

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (!value && process.env.NODE_ENV === 'production') {
    console.warn(`[env] Missing environment variable: ${key}`);
  }
  return value ?? '';
};

export const env = {
  /** Public API base URL */
  apiUrl: getEnv('NEXT_PUBLIC_API_URL', 'http://localhost:5000/api'),

  /** Public site URL for SEO / OG */
  siteUrl: getEnv('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),

  /** App environment */
  nodeEnv: getEnv('NODE_ENV', 'development'),

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

export type Env = typeof env;
