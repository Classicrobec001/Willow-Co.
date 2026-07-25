/**
 * Loads the active brand's service catalog (src/config/brand.ts) into the
 * database. Safe to re-run — services are upserted by id, so editing a
 * service's name/price/duration in brand.ts and re-running this script
 * updates the existing row rather than duplicating it.
 *
 * Usage: npm run seed
 */
import brand from "../src/config/brand";
import { upsertService } from "../src/lib/db";

function main() {
  console.log(`Seeding services for brand "${brand.name}" (${brand.slug})...`);
  for (const service of brand.services) {
    upsertService({
      id: service.id,
      name: service.name,
      description: service.description,
      durationMinutes: service.durationMinutes,
      priceCents: service.priceCents,
    });
    console.log(`  ✓ ${service.name}`);
  }
  console.log(`Done. ${brand.services.length} service(s) seeded to data/${brand.slug}.db`);
}

main();
