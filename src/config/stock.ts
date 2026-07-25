// ============================================================================
// Stock imagery for the marketing site.
//
// All photos are hosted on Unsplash's image CDN. To rebrand, swap the photo
// IDs below (grab any Unsplash photo, copy the "photo-..." segment from its
// images.unsplash.com URL) — every page reads from this one map, so imagery
// is a data change, not a code change. Same philosophy as src/config/brand.ts.
//
// `img(id, w, h?)` builds a correctly-sized, auto-formatted CDN URL.
// ============================================================================

export function img(id: string, w: number, h?: number): string {
  const dims = h ? `&w=${w}&h=${h}` : `&w=${w}`;
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80${dims}`;
}

export const stock = {
  // Hero — warm portrait, matches the terracotta palette
  hero: "photo-1519699047748-de8e457a634e",
  // Interior / story shots
  interiorLight: "photo-1633681926022-84c23e8cb2d6",
  interiorMono: "photo-1560066984-138dadb4c035",
  stylistAtWork: "photo-1562322140-8baeececf3df",
  // Gallery grid (6)
  gallery: [
    { id: "photo-1521590832167-7bcbfaa6381f", caption: "The studio floor" },
    { id: "photo-1580618672591-eb180b1a973f", caption: "Blow-dry & finish" },
    { id: "photo-1503951914875-452162b0f3f1", caption: "The grooming chair" },
    { id: "photo-1470259078422-826894b933aa", caption: "Colour, unleashed" },
    { id: "photo-1560066984-138dadb4c035", caption: "Where it happens" },
    { id: "photo-1600948836101-f9ffda59d250", caption: "Details matter" },
  ],
  // CTA band background
  ctaBand: "photo-1470259078422-826894b933aa",
} as const;
