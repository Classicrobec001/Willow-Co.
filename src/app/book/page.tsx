import brand from "@/config/brand";
import { listActiveServices } from "@/lib/db";
import { addDaysToDateStr, todayInTimeZone } from "@/lib/timezone";
import BookingWizard from "@/components/BookingWizard";

export const dynamic = "force-dynamic";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const services = listActiveServices();

  const today = todayInTimeZone(brand.timezone);
  const minDate = addDaysToDateStr(today, Math.ceil(brand.bookingSettings.minNoticeHours / 24));
  const maxDate = addDaysToDateStr(today, brand.bookingSettings.maxAdvanceDays);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-foreground mb-2">Book an appointment</h1>
      <p className="text-muted-foreground mb-8">
        Pick a service, choose a time that works, and confirm — {brand.name} will see you soon.
      </p>
      <BookingWizard
        services={services.map((s) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          durationMinutes: s.duration_minutes,
          priceCents: s.price_cents,
        }))}
        initialServiceId={service}
        minDate={minDate}
        maxDate={maxDate}
        timezone={brand.timezone}
      />
    </div>
  );
}
