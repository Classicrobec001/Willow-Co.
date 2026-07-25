// The single shape every brand config must follow.
// This is the contract that keeps the rest of the app brand-agnostic:
// components, pages, and API routes only ever read from a BrandConfig object,
// never hardcode a business name, color, or service.

export interface BrandColors {
  /** Primary brand color — buttons, links, active states */
  primary: string;
  /** Text/icon color placed on top of `primary` */
  primaryForeground: string;
  /** Secondary accent — used for secondary buttons, highlights */
  secondary: string;
  secondaryForeground: string;
  /** Small accents — badges, focus rings */
  accent: string;
  /** Page background */
  background: string;
  /** Default text color */
  foreground: string;
  /** Muted surfaces — cards, subtle backgrounds */
  muted: string;
  mutedForeground: string;
  /** Borders / dividers */
  border: string;
}

export interface DayHours {
  open: string; // "09:00" (24h, local to `timezone`)
  close: string; // "17:00"
}

/** Keyed 0 (Sunday) through 6 (Saturday). Omit or set to null for closed days. */
export type BusinessHours = Partial<Record<0 | 1 | 2 | 3 | 4 | 5 | 6, DayHours | null>>;

export interface BookingSettings {
  /** Granularity of bookable start times, in minutes (e.g. 15, 30, 60) */
  slotIntervalMinutes: number;
  /** Gap enforced between consecutive bookings, in minutes */
  bufferMinutes: number;
  /** Minimum lead time required before a booking's start time, in hours */
  minNoticeHours: number;
  /** Furthest a customer can book into the future, in days */
  maxAdvanceDays: number;
}

export interface ServiceDefinition {
  /** Stable slug used as the DB primary key — don't change once bookings exist */
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
}

export interface BrandConfig {
  /** Short identifier, used in the DB filename and page titles */
  slug: string;
  name: string;
  tagline: string;
  /** One or two sentences for the hero section and meta description */
  description: string;
  /** Rendered as styled text if no logoImage is provided */
  logoText: string;
  /** Optional path under /public, e.g. "/logo.svg" */
  logoImage?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social?: {
    instagram?: string;
    facebook?: string;
  };
  /** IANA timezone, e.g. "America/New_York" — all booking times are interpreted in this zone */
  timezone: string;
  /** ISO 4217 currency code, e.g. "USD" */
  currency: string;
  colors: BrandColors;
  businessHours: BusinessHours;
  bookingSettings: BookingSettings;
  services: ServiceDefinition[];
}
