import { BrandConfig } from "../brand.types";

// EXAMPLE BRAND #1 — a hair & beauty studio.
// This is the ACTIVE brand (imported by src/config/brand.ts).
// To rebrand this template for a new client, either edit this file directly
// or duplicate it and repoint src/config/brand.ts at the new file.
const brand: BrandConfig = {
  slug: "willow-hair-studio",
  name: "Willow & Co. Hair Studio",
  tagline: "Modern cuts, colour, and care.",
  description:
    "Willow & Co. is a neighbourhood hair studio specialising in precision cuts, balayage, and restorative treatments. Book your next appointment online in under a minute.",
  logoText: "Willow & Co.",
  contact: {
    email: "hello@willowhairstudio.example",
    phone: "+1 (555) 019-2288",
    address: "482 Birchwood Ave, Portland, OR",
  },
  social: {
    instagram: "https://instagram.com/willowhairstudio",
  },
  timezone: "America/Los_Angeles",
  currency: "USD",
  colors: {
    primary: "#8a5a44", // warm terracotta
    primaryForeground: "#fff8f4",
    secondary: "#6b7d5f", // sage
    secondaryForeground: "#ffffff",
    accent: "#d9a566",
    background: "#fffaf6",
    foreground: "#2c211b",
    muted: "#f3e9e1",
    mutedForeground: "#6f6259",
    border: "#e7d9cd",
  },
  businessHours: {
    1: { open: "09:00", close: "18:00" }, // Mon
    2: { open: "09:00", close: "18:00" }, // Tue
    3: { open: "09:00", close: "18:00" }, // Wed
    4: { open: "09:00", close: "20:00" }, // Thu
    5: { open: "09:00", close: "20:00" }, // Fri
    6: { open: "10:00", close: "16:00" }, // Sat
    0: null, // Sun — closed
  },
  bookingSettings: {
    slotIntervalMinutes: 30,
    bufferMinutes: 15,
    minNoticeHours: 4,
    maxAdvanceDays: 45,
  },
  services: [
    {
      id: "womens-haircut",
      name: "Women's Haircut & Style",
      description: "Consultation, shampoo, precision cut, and blow-dry finish.",
      durationMinutes: 60,
      priceCents: 8500,
    },
    {
      id: "mens-haircut",
      name: "Men's Haircut",
      description: "Classic or modern cut, includes a hot towel finish.",
      durationMinutes: 30,
      priceCents: 4500,
    },
    {
      id: "full-balayage",
      name: "Full Balayage",
      description: "Hand-painted colour with gloss and toner, includes style.",
      durationMinutes: 180,
      priceCents: 22000,
    },
    {
      id: "root-touch-up",
      name: "Root Touch-Up",
      description: "Single-process root colour matched to your base.",
      durationMinutes: 90,
      priceCents: 9500,
    },
    {
      id: "deep-conditioning",
      name: "Deep Conditioning Treatment",
      description: "Restorative mask treatment for damaged or dry hair.",
      durationMinutes: 30,
      priceCents: 3500,
    },
  ],
};

export default brand;
