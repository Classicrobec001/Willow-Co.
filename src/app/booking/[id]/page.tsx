import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookingById, getServiceById } from "@/lib/db";
import { formatDuration, formatPrice } from "@/lib/format";
import brand from "@/config/brand";

export const dynamic = "force-dynamic";

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = getBookingById(id);
  if (!booking) notFound();

  const service = getServiceById(booking.service_id);

  const whenLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: brand.timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(booking.start_time));

  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl">
        ✓
      </div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">You&rsquo;re booked!</h1>
      <p className="text-muted-foreground mb-8">
        A confirmation has been sent to {booking.customer_email}. See you then.
      </p>

      <div className="text-left rounded-xl border border-border p-6 space-y-2 mb-8">
        <Row label="Confirmation #" value={booking.id.slice(0, 8).toUpperCase()} />
        {service && <Row label="Service" value={service.name} />}
        {service && <Row label="Duration" value={formatDuration(service.duration_minutes)} />}
        {service && <Row label="Price" value={formatPrice(service.price_cents)} />}
        <Row label="When" value={whenLabel} />
        <Row label="Name" value={booking.customer_name} />
        {booking.customer_phone && <Row label="Phone" value={booking.customer_phone} />}
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Need to make a change? Contact us at{" "}
        <a href={`mailto:${brand.contact.email}`} className="underline">
          {brand.contact.email}
        </a>{" "}
        or {brand.contact.phone}.
      </p>

      <Link
        href="/"
        className="inline-flex items-center rounded-full border border-border font-medium px-6 py-3 hover:bg-muted transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium text-right">{value}</span>
    </div>
  );
}
