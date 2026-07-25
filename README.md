# Booking Template

A reusable appointment-booking website: landing page, service catalog, a
multi-step booking wizard with real-time availability, a booking
confirmation page, and a lightweight password-protected admin dashboard.

The whole point of this project is that it reskins for a new client by
editing **one config file** — no component or page code changes required.
See [BRANDING.md](./BRANDING.md) for the full walkthrough.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4**, themed entirely from CSS variables driven by the
  brand config (see "Theming" below)
- **SQLite via Node's built-in `node:sqlite` module** — zero native/compiled
  dependencies, nothing to install beyond `npm install`
- **Zod** for request validation

No Prisma, no better-sqlite3, no external database required to run this
locally or deploy a small single-tenant instance. See "Scaling up" below for
when and how to swap the storage layer.

## Getting started

```bash
npm install
cp .env.example .env        # set ADMIN_PASSWORD
npm run seed                # loads services from src/config/brand.ts into SQLite
npm run dev                 # http://localhost:3000
```

Visit `/` for the landing page, `/book` for the booking flow, and `/admin`
for the bookings dashboard (protected by `ADMIN_PASSWORD`).

## Project structure

```
src/
  config/
    brand.types.ts          # the BrandConfig contract every brand file follows
    brand.ts                # <-- the ONE file you edit per client (re-exports the active brand)
    brands/
      willow-hair-studio.ts # example brand #1 (active by default)
      apex-consulting.ts    # example brand #2 (proves the reskin — different vertical entirely)
      _template.ts          # blank starter, copy this for a new client
  lib/
    db.ts                   # SQLite access layer (services, bookings)
    availability.ts         # computes bookable time slots from hours + existing bookings
    timezone.ts             # timezone-aware date/time helpers (Intl-based, no dependency)
    format.ts                # money/duration formatting
    validation.ts           # zod schema for booking submissions
    adminAuth.ts             # simple signed-cookie password gate for /admin
  components/
    Header.tsx, Footer.tsx, ServiceCard.tsx, BookingWizard.tsx, AdminLogoutButton.tsx
  app/
    page.tsx                # landing page (hero + service list)
    book/page.tsx            # booking flow (wraps BookingWizard)
    booking/[id]/page.tsx    # confirmation page
    admin/page.tsx, admin/login/page.tsx
    api/availability/route.ts
    api/bookings/route.ts
    api/admin/login/route.ts, api/admin/logout/route.ts
scripts/
  seed.ts                   # loads brand.ts's services into the DB (safe to re-run)
data/
  <brand-slug>.db           # SQLite file, one per brand slug, gitignored
```

## Theming

Every brand's colors live in `src/config/brand.ts` (`colors` object: primary,
secondary, accent, background, foreground, muted, border, and their
"foreground" pairs for text-on-color contrast). `src/app/layout.tsx` injects
those values as CSS variables (`--brand-primary`, etc.) on every request.
`src/app/globals.css` maps those into Tailwind's color namespace via
`@theme inline`, so every component just uses ordinary utility classes —
`bg-primary`, `text-secondary`, `border-border` — and never hardcodes a hex
value. Change the brand config, the whole UI re-colors itself.

## Booking logic

`src/lib/availability.ts` computes bookable start times for a given service
and date by:

1. Reading that weekday's open/close hours from `brand.businessHours`.
2. Generating candidate start times at `bookingSettings.slotIntervalMinutes`
   intervals.
3. Dropping any that violate `minNoticeHours` or `maxAdvanceDays`.
4. Dropping any that overlap an existing booking (padded by
   `bookingSettings.bufferMinutes` on each side).

The same function is re-run server-side when a booking is submitted
(`POST /api/bookings`), so a slot can't be double-booked even if two people
are looking at the same open time simultaneously — the second request gets
a 409 and the UI sends them back to the time picker.

All times are computed relative to `brand.timezone` (an IANA name), using
`Intl` — the server's own timezone doesn't matter.

## The admin dashboard

`/admin` lists upcoming bookings. It's gated by a single shared password
(`ADMIN_PASSWORD` in `.env`) and a signed httpOnly cookie — no user table,
no session store. This is intentionally minimal; if you need multiple staff
logins or roles, swap in a real auth provider (NextAuth, Clerk, etc.) —
`src/lib/adminAuth.ts` is the only file that touches auth.

## Scaling up

This template is built to run correctly with zero extra setup, which is why
it uses SQLite. When a client outgrows it:

- **Concurrent writes / multiple servers**: swap `src/lib/db.ts` for
  Prisma or Drizzle against Postgres. Every other file in the app only
  imports the functions exported from `db.ts` (`listActiveServices`,
  `getServiceById`, `listBookingsBetween`, `createBooking`, etc.), so this
  is a one-file rewrite with the same function signatures.
- **Email confirmations**: hook a transactional email call (Resend,
  Postmark, SES) into `POST /api/bookings` in
  `src/app/api/bookings/route.ts` right after `createBooking(...)` succeeds.
- **Payments**: add a Stripe (or similar) charge/hold in the same spot,
  before or after booking creation depending on your cancellation policy.
- **Multiple providers/staff calendars**: add a `provider_id` column to
  `bookings` and a `providers` table in `db.ts`, and extend
  `availability.ts` to compute slots per-provider instead of one shared
  calendar.

## Deployment

Deploys like any Next.js app (Vercel, Fly.io, a Node host, etc.). Make sure:

- `ADMIN_PASSWORD` is set in the deployment environment.
- The `data/` directory is on persistent storage (or replace SQLite with a
  hosted Postgres per "Scaling up" above) — on platforms with ephemeral
  filesystems (like many serverless deploys), SQLite data won't survive a
  redeploy, so plan for that.
- Run `npm run seed` once after first deploy (or as part of your deploy
  script) to populate the service catalog.
