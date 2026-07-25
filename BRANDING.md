# Launching this template for a new client

This is the "reskin for a new brand" checklist. Nothing here requires
touching a component, page, or API route — every step is either editing a
config file or a config-driven command.

## 1. Create the new brand file

Copy the blank starter:

```bash
cp src/config/brands/_template.ts src/config/brands/<client-slug>.ts
```

`src/config/brands/_template.ts` has every field pre-filled with a
placeholder and an inline comment explaining it. For a fuller real-world
example to reference, look at `src/config/brands/willow-hair-studio.ts`
(a hair salon) — same file shape, ready to copy and re-fill for any vertical.

Fill in, at minimum:

- `slug` — lowercase, no spaces. Used as the SQLite filename
  (`data/<slug>.db`), so keep it stable once you've taken real bookings.
- `name`, `tagline`, `description`, `logoText`
- `contact` (email, phone, address) and optional `social` links
- `timezone` — an IANA name (e.g. `"America/Chicago"`). This drives all
  availability math, independent of where the app is hosted.
- `currency` — ISO 4217 code (e.g. `"USD"`, `"GBP"`)
- `colors` — see "Choosing colors" below
- `businessHours` — 0 (Sunday) through 6 (Saturday); `null` for closed days
- `bookingSettings` — slot granularity, buffer between bookings, minimum
  notice, and max advance booking window
- `services` — the bookable service catalog (id, name, description,
  duration, price in **integer cents**)

## 2. Point brand.ts at the new file

Open `src/config/brand.ts` and change the one import line:

```ts
import activeBrand from "./brands/<client-slug>";
```

That's the only code file this process touches.

## 3. Load the service catalog into the database

```bash
rm -f data/*.db*      # only if you're replacing a previous brand's local data
npm run seed
```

The seed script reads `services` from the active brand config and upserts
them by `id` — safe to re-run any time you edit a service's name, price, or
duration in the brand file.

## 4. Set the admin password

```bash
cp .env.example .env
# edit .env, set ADMIN_PASSWORD to something client-specific
```

## 5. Preview it

```bash
npm run dev
```

Check `/` (landing + services), `/book` (full booking flow — actually book
a test slot), `/booking/<the-id-you-get-back>` (confirmation), and `/admin`
(log in with `ADMIN_PASSWORD`, confirm the test booking shows up).

## 6. Deploy

Deploy as a normal Next.js app. Set `ADMIN_PASSWORD` in the hosting
platform's environment variables, and run `npm run seed` once against the
deployed environment (or as a build/release step) so the service catalog
exists before the first booking comes in. See the "Deployment" section of
README.md for storage caveats if you're on a platform with an ephemeral
filesystem.

## Choosing colors

`colors` needs 5 base colors, each paired with a "foreground" color used for
text/icons placed *on top of* it (so contrast stays readable regardless of
how light or dark the base color is):

| Field | Used for |
|---|---|
| `primary` / `primaryForeground` | Main CTAs ("Book now" buttons), active states |
| `secondary` / `secondaryForeground` | Secondary accents, price highlights |
| `accent` | Small highlights, focus rings |
| `background` / `foreground` | Page background and default text |
| `muted` / `mutedForeground` | Card backgrounds, subtle text |
| `border` | Dividers, input borders |

A quick way to sanity-check contrast: `primaryForeground` on `primary`, and
`foreground` on `background`, should both be easily readable — if you're
unsure, run them through a contrast checker (search "WCAG contrast
checker") and aim for at least 4.5:1.

## Proving it works before you commit

The fastest gut-check that a new brand file is wired correctly: point
`src/config/brand.ts` at your new file, run `npm run dev`, and confirm the
whole site changes — name, colors, services, hours — with the exact same
code. If the site renders with your brand's details, the wiring is correct.
