import type { BrandConfig } from "./brand.types";
import activeBrand from "./brands/willow-hair-studio";

// ============================================================================
// THIS is the one file a new client deployment needs to change.
//
// Everything else in the app (colors, copy, services, hours, DB filename)
// derives from the object exported here. To launch this template for a new
// brand:
//
//   1. Duplicate src/config/brands/willow-hair-studio.ts to a new file
//      (or copy src/config/brands/_template.ts, which has empty/placeholder
//      values and inline comments for every field).
//   2. Fill in the new brand's name, colors, contact info, hours, services.
//   3. Point the import below at the new file.
//   4. Delete data/*.db (if present) and run `npm run seed` to load the new
//      service catalog into a fresh database.
//   5. Set ADMIN_PASSWORD in .env and deploy.
//
// See BRANDING.md for the full walkthrough.
// ============================================================================

const brand: BrandConfig = activeBrand;

export default brand;
export type { BrandConfig };
