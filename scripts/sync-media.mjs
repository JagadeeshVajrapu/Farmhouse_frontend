/**
 * Scans public/media and regenerates src/lib/media/manifest.json.
 * New files are auto-categorized from filename prefixes.
 * Optional sidecar: image-name.meta.json { "title", "tags", "featured" }
 *
 * Run: node scripts/sync-media.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const MEDIA_DIR = path.join(ROOT, 'public', 'media');
const OUT = path.join(ROOT, 'src', 'lib', 'media', 'manifest.json');

const PREFIX_RULES = [
  { prefix: 'hero-', tags: ['hero', 'estate', 'garden'], gallery: 'garden', featured: true, score: 100 },
  { prefix: 'pool-villa-', tags: ['pool', 'estate'], gallery: 'pool', featured: true, score: 95 },
  { prefix: 'pool-premium-', tags: ['pool', 'outdoor-seating'], gallery: 'pool', featured: true, score: 90 },
  { prefix: 'pool-party-', tags: ['pool', 'party', 'birthday'], gallery: 'party', featured: true, score: 88 },
  { prefix: 'pool-', tags: ['pool'], gallery: 'pool', score: 85 },
  { prefix: 'night-event-', tags: ['night', 'events', 'decoration', 'lawn'], gallery: 'night', featured: true, score: 92 },
  { prefix: 'lawn-aerial-', tags: ['drone', 'lawn', 'garden'], gallery: 'drone', featured: true, score: 87 },
  { prefix: 'entrance-villa-', tags: ['entrance', 'estate', 'hero'], gallery: 'garden', featured: true, score: 93 },
  { prefix: 'entrance-directions-', tags: ['entrance', 'directions', 'parking', 'location'], gallery: 'garden', featured: true, score: 94 },
  { prefix: 'entrance-', tags: ['entrance', 'parking'], gallery: 'garden', score: 70 },
  { prefix: 'lawn-dining-', tags: ['lawn', 'events', 'party', 'food'], gallery: 'events', featured: true, score: 84 },
  { prefix: 'party-hall-', tags: ['party-hall', 'rooms', 'speaker', 'corporate'], gallery: 'events', score: 75 },
  { prefix: 'room-luxury-', tags: ['rooms'], gallery: 'rooms', featured: true, score: 80 },
  { prefix: 'room-bathroom-', tags: ['rooms', 'amenities'], gallery: 'rooms', score: 72 },
  { prefix: 'room-', tags: ['rooms'], gallery: 'rooms', score: 78 },
  { prefix: 'kitchen-', tags: ['kitchen', 'food', 'amenities'], gallery: 'events', score: 74 },
  { prefix: 'garden-', tags: ['garden', 'lawn', 'nature'], gallery: 'garden', score: 82 },
  { prefix: 'lawn-', tags: ['lawn', 'garden', 'nature', 'family'], gallery: 'garden', score: 80 },
  { prefix: 'parking-', tags: ['parking', 'entrance'], gallery: 'garden', score: 65 },
  { prefix: 'amenity-speaker-', tags: ['speaker', 'amenities', 'party'], gallery: 'party', score: 68 },
];

const VIDEO_RULES = [
  { prefix: 'estate-tour-', tags: ['hero', 'videos', 'estate', 'drone'], gallery: 'videos', featured: true, score: 100 },
  { prefix: 'pool-tour-', tags: ['videos', 'pool'], gallery: 'videos', score: 90 },
  { prefix: 'property-walk-', tags: ['videos', 'garden', 'estate'], gallery: 'videos', score: 85 },
  { prefix: 'event-highlights-', tags: ['videos', 'events', 'party', 'night'], gallery: 'videos', score: 88 },
];

function titleCase(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function matchRule(filename, rules) {
  const base = path.basename(filename, path.extname(filename));
  for (const rule of rules) {
    if (base.startsWith(rule.prefix)) return { ...rule, base };
  }
  return { prefix: '', tags: ['miscellaneous'], gallery: 'garden', score: 50, base };
}

function readSidecar(filePath) {
  const metaPath = filePath.replace(/\.[^.]+$/, '.meta.json');
  if (!fs.existsSync(metaPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  } catch {
    return null;
  }
}

function buildImageItem(file, relPath) {
  const fullPath = path.join(MEDIA_DIR, 'images', file);
  const sidecar = readSidecar(fullPath);
  const rule = matchRule(file, PREFIX_RULES);
  const id = rule.base;
  const src = `/media/images/${file}`;

  return {
    id,
    type: 'image',
    src,
    title: sidecar?.title ?? titleCase(id),
    alt: sidecar?.alt ?? `Vidhaan Farm House — ${titleCase(id)}`,
    tags: sidecar?.tags ?? rule.tags,
    gallery: sidecar?.gallery ?? rule.gallery,
    featured: sidecar?.featured ?? rule.featured ?? false,
    score: sidecar?.score ?? rule.score ?? 50,
    width: sidecar?.width ?? 1200,
    height: sidecar?.height ?? 800,
  };
}

function buildVideoItem(file, relPath) {
  const fullPath = path.join(MEDIA_DIR, 'videos', file);
  const sidecar = readSidecar(fullPath);
  const rule = matchRule(file, VIDEO_RULES);
  const id = rule.base;
  const videoSrc = `/media/videos/${file}`;
  const posterId = sidecar?.posterId ?? 'hero-estate-01';
  const posterSrc = `/media/images/${posterId}.jpeg`;

  return {
    id,
    type: 'video',
    src: posterSrc,
    videoSrc,
    title: sidecar?.title ?? titleCase(id),
    alt: sidecar?.alt ?? `Vidhaan Farm House video — ${titleCase(id)}`,
    tags: sidecar?.tags ?? rule.tags,
    gallery: 'videos',
    featured: sidecar?.featured ?? rule.featured ?? false,
    score: sidecar?.score ?? rule.score ?? 50,
    width: 1920,
    height: 1080,
  };
}

function main() {
  const imagesDir = path.join(MEDIA_DIR, 'images');
  const videosDir = path.join(MEDIA_DIR, 'videos');

  const images = fs.existsSync(imagesDir)
    ? fs.readdirSync(imagesDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    : [];
  const videos = fs.existsSync(videosDir)
    ? fs.readdirSync(videosDir).filter((f) => /\.(mp4|webm)$/i.test(f))
    : [];

  const items = [
    ...images.map((f) => buildImageItem(f)),
    ...videos.map((f) => buildVideoItem(f)),
  ].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const manifest = {
    generatedAt: new Date().toISOString(),
    version: 1,
    items,
    hero: {
      video: items.find((i) => i.type === 'video' && i.tags?.includes('hero'))?.videoSrc ?? null,
      poster: items.find((i) => i.id === 'hero-estate-01')?.src ?? items[0]?.src,
      image: items.find((i) => i.tags?.includes('hero') && i.type === 'image')?.src ?? items[0]?.src,
    },
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2));
  console.log(`✓ Generated manifest with ${items.length} items (${images.length} images, ${videos.length} videos)`);
}

main();
