import brand from "@/config/brand";
import { getServiceById, listBookingsBetween } from "@/lib/db";
import { addDaysToDateStr, formatTimeLabel, weekdayOf, zonedTimeToUtc } from "@/lib/timezone";

export interface TimeSlot {
  startISO: string;
  endISO: string;
  label: string;
}

export type AvailabilityResult =
  | { ok: true; slots: TimeSlot[] }
  | { ok: false; reason: "unknown-service" | "closed" | "invalid-date" };

/**
 * Computes bookable start times for `serviceId` on `dateStr` ("YYYY-MM-DD"),
 * honoring the active brand's business hours, slot granularity, buffer
 * between bookings, minimum notice, and max advance window — then filters
 * out anything that overlaps an existing booking.
 */
export function getAvailableSlots(dateStr: string, serviceId: string): AvailabilityResult {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { ok: false, reason: "invalid-date" };
  }

  const service = getServiceById(serviceId);
  if (!service || !service.active) {
    return { ok: false, reason: "unknown-service" };
  }

  const weekday = weekdayOf(dateStr) as 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const hours = brand.businessHours[weekday];
  if (!hours) {
    return { ok: true, slots: [] }; // closed that day — not an error, just nothing bookable
  }

  const { slotIntervalMinutes, bufferMinutes, minNoticeHours, maxAdvanceDays } =
    brand.bookingSettings;
  const durationMs = service.duration_minutes * 60_000;
  const intervalMs = slotIntervalMinutes * 60_000;
  const bufferMs = bufferMinutes * 60_000;

  const openUTC = zonedTimeToUtc(dateStr, hours.open, brand.timezone);
  const closeUTC = zonedTimeToUtc(dateStr, hours.close, brand.timezone);

  const now = new Date();
  const earliestAllowed = new Date(now.getTime() + minNoticeHours * 3_600_000);
  const latestAllowed = new Date(now.getTime() + maxAdvanceDays * 86_400_000);

  // Pull existing bookings for the whole local day (padded) in one query.
  const dayStartUTC = zonedTimeToUtc(dateStr, "00:00", brand.timezone);
  const dayEndUTC = zonedTimeToUtc(addDaysToDateStr(dateStr, 1), "00:00", brand.timezone);
  const existing = listBookingsBetween(dayStartUTC.toISOString(), dayEndUTC.toISOString());
  const blocks = existing.map((b) => ({
    start: new Date(b.start_time).getTime() - bufferMs,
    end: new Date(b.end_time).getTime() + bufferMs,
  }));

  const slots: TimeSlot[] = [];
  for (
    let start = openUTC.getTime();
    start + durationMs <= closeUTC.getTime();
    start += intervalMs
  ) {
    const end = start + durationMs;

    if (start < earliestAllowed.getTime()) continue;
    if (start > latestAllowed.getTime()) continue;

    const overlaps = blocks.some((b) => start < b.end && end > b.start);
    if (overlaps) continue;

    const startDate = new Date(start);
    slots.push({
      startISO: startDate.toISOString(),
      endISO: new Date(end).toISOString(),
      label: formatTimeLabel(startDate, brand.timezone),
    });
  }

  return { ok: true, slots };
}
