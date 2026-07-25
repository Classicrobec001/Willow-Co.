// Small timezone helpers built on Intl only (no extra dependency), so a
// brand's `timezone` field just works regardless of what timezone the
// server itself runs in.

/** Ahead-of-UTC offset (ms) for `timeZone` at the instant `date`. */
function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const asUTC = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour === "24" ? "0" : map.hour),
    Number(map.minute),
    Number(map.second)
  );
  return asUTC - date.getTime();
}

/**
 * Converts a wall-clock date + time expressed *in* `timeZone` into the
 * corresponding UTC Date instant. e.g. ("2026-07-24", "09:00", "America/New_York")
 * -> the Date representing 9am US Eastern on that day.
 */
export function zonedTimeToUtc(dateStr: string, timeStr: string, timeZone: string): Date {
  const guess = new Date(`${dateStr}T${timeStr}:00.000Z`);
  const offset1 = getTimeZoneOffsetMs(guess, timeZone);
  const utcGuess1 = new Date(guess.getTime() - offset1);
  // One more iteration handles DST-boundary edge cases.
  const offset2 = getTimeZoneOffsetMs(utcGuess1, timeZone);
  return new Date(guess.getTime() - offset2);
}

/** The Gregorian calendar weekday (0 = Sunday) for a "YYYY-MM-DD" string — timezone independent. */
export function weekdayOf(dateStr: string): number {
  return new Date(`${dateStr}T00:00:00Z`).getUTCDay();
}

/** Adds `days` to a "YYYY-MM-DD" string and returns a new "YYYY-MM-DD" string. */
export function addDaysToDateStr(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Today's date, as a "YYYY-MM-DD" string local to `timeZone`. */
export function todayInTimeZone(timeZone: string): string {
  return dateStrInTimeZone(new Date(), timeZone);
}

/** Formats any Date as a "YYYY-MM-DD" string local to `timeZone`. */
export function dateStrInTimeZone(date: Date, timeZone: string): string {
  const dtf = new Intl.DateTimeFormat("en-CA", { timeZone }); // en-CA gives YYYY-MM-DD
  return dtf.format(date);
}

/** Formats a UTC instant as a human time label ("9:00 AM") local to `timeZone`. */
export function formatTimeLabel(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/** Formats a UTC instant as a human date label ("Friday, July 24, 2026") local to `timeZone`. */
export function formatDateLabel(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
