import { BrandConfig } from "../brand.types";

// BLANK STARTER — copy this file to e.g. "acme-clinic.ts", fill in every
// field below, then point src/config/brand.ts at your new file.
//
// Every field is documented in src/config/brand.types.ts. Nothing outside
// this file (and its sibling brand files) should ever need to change to
// reskin the app for a new client.
const brand: BrandConfig = {
  slug: "my-new-brand", // lowercase, no spaces — used in the DB filename
  name: "My Business Name",
  tagline: "A short, punchy line for the hero section.",
  description:
    "One or two sentences describing the business. Used in the hero copy and page meta description.",
  logoText: "My Business Name", // shown as styled text unless logoImage is set
  // logoImage: "/logo.svg", // optional — place the file in /public first

  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 000-0000",
    address: "123 Main St, Anytown, ST",
  },

  social: {
    // instagram: "https://instagram.com/yourhandle",
    // facebook: "https://facebook.com/yourpage",
  },

  timezone: "America/New_York", // IANA name — controls all availability math
  currency: "USD",

  colors: {
    primary: "#111111",
    primaryForeground: "#ffffff",
    secondary: "#555555",
    secondaryForeground: "#ffffff",
    accent: "#888888",
    background: "#ffffff",
    foreground: "#111111",
    muted: "#f2f2f2",
    mutedForeground: "#666666",
    border: "#e2e2e2",
  },

  // 0 = Sunday ... 6 = Saturday. Use `null` (or omit) for closed days.
  businessHours: {
    1: { open: "09:00", close: "17:00" },
    2: { open: "09:00", close: "17:00" },
    3: { open: "09:00", close: "17:00" },
    4: { open: "09:00", close: "17:00" },
    5: { open: "09:00", close: "17:00" },
    6: null,
    0: null,
  },

  bookingSettings: {
    slotIntervalMinutes: 30, // how granular start times are (15/30/60 typical)
    bufferMinutes: 0, // gap enforced between back-to-back bookings
    minNoticeHours: 2, // can't book less than this many hours ahead
    maxAdvanceDays: 60, // can't book further out than this many days
  },

  services: [
    {
      id: "example-service",
      name: "Example Service",
      description: "Replace with a real service.",
      durationMinutes: 30,
      priceCents: 5000, // $50.00 — always store money as integer cents
    },
  ],
};

export default brand;
