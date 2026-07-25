import { BrandConfig } from "../brand.types";

// EXAMPLE BRAND #2 — a professional consulting practice.
// NOT wired in by default. This exists to prove the template reskins cleanly
// across very different verticals with zero component/code changes.
//
// To try it: open src/config/brand.ts and change the import to this file.
const brand: BrandConfig = {
  slug: "apex-consulting",
  name: "Apex Advisory Partners",
  tagline: "Strategy sessions that move the needle.",
  description:
    "Apex Advisory Partners offers focused, one-on-one strategy consultations for founders and operators. Reserve a session that fits your calendar.",
  logoText: "Apex Advisory",
  contact: {
    email: "sessions@apexadvisory.example",
    phone: "+1 (555) 402-7710",
    address: "1100 Market St, Suite 800, San Francisco, CA",
  },
  social: {
    instagram: undefined,
    facebook: "https://facebook.com/apexadvisorypartners",
  },
  timezone: "America/New_York",
  currency: "USD",
  colors: {
    primary: "#1c3d5a", // deep navy
    primaryForeground: "#f5f8fa",
    secondary: "#c98a3b", // brass
    secondaryForeground: "#20180a",
    accent: "#3f7ea6",
    background: "#f7f8fa",
    foreground: "#101820",
    muted: "#e7ebef",
    mutedForeground: "#556170",
    border: "#d7dde3",
  },
  businessHours: {
    1: { open: "08:00", close: "17:00" },
    2: { open: "08:00", close: "17:00" },
    3: { open: "08:00", close: "17:00" },
    4: { open: "08:00", close: "17:00" },
    5: { open: "08:00", close: "15:00" },
    6: null,
    0: null,
  },
  bookingSettings: {
    slotIntervalMinutes: 15,
    bufferMinutes: 15,
    minNoticeHours: 24,
    maxAdvanceDays: 30,
  },
  services: [
    {
      id: "discovery-call",
      name: "Discovery Call",
      description: "A free 20-minute call to see if we're a good fit.",
      durationMinutes: 20,
      priceCents: 0,
    },
    {
      id: "strategy-session",
      name: "1:1 Strategy Session",
      description: "A focused 60-minute working session on your top priority.",
      durationMinutes: 60,
      priceCents: 35000,
    },
    {
      id: "quarterly-review",
      name: "Quarterly Planning Review",
      description: "A 90-minute deep dive into the past quarter and the next.",
      durationMinutes: 90,
      priceCents: 55000,
    },
  ],
};

export default brand;
