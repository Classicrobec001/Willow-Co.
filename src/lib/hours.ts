import brand from "@/config/brand";
import type { DayHours } from "@/config/brand.types";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Formats "09:00" as "9:00 AM". */
function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export interface HoursRow {
  day: string;
  hours: string; // "9:00 AM – 6:00 PM" or "Closed"
  closed: boolean;
}

/** Returns Mon→Sun ordered rows for display. */
export function weeklyHours(): HoursRow[] {
  const order = [1, 2, 3, 4, 5, 6, 0] as const;
  return order.map((d) => {
    const h = brand.businessHours[d] as DayHours | null | undefined;
    return {
      day: DAY_NAMES[d],
      hours: h ? `${to12h(h.open)} – ${to12h(h.close)}` : "Closed",
      closed: !h,
    };
  });
}
