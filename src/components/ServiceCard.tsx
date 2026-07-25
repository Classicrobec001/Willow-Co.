import Link from "next/link";
import { ServiceRow } from "@/lib/db";
import { formatDuration, formatPrice } from "@/lib/format";

export default function ServiceCard({ service }: { service: ServiceRow }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/40 p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
        <span className="shrink-0 text-sm font-medium text-secondary">
          {formatPrice(service.price_cents)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground flex-1">{service.description}</p>
      <div className="flex items-center justify-between pt-2">
        <span className="text-xs text-muted-foreground">
          {formatDuration(service.duration_minutes)}
        </span>
        <Link
          href={`/book?service=${service.id}`}
          className="inline-flex items-center rounded-full bg-primary text-primary-foreground text-sm font-medium px-4 py-2 hover:opacity-90 transition-opacity"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
