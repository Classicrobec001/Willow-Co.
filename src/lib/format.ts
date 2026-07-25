import brand from "@/config/brand";

/** Formats integer cents as a localized currency string, e.g. 8500 -> "$85.00". Free services show "Free". */
export function formatPrice(priceCents: number): string {
  if (priceCents === 0) return "Free";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: brand.currency,
  }).format(priceCents / 100);
}

/** Formats a duration in minutes as "30 min" or "1 hr 30 min". */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hrs} hr` : `${hrs} hr ${rest} min`;
}
