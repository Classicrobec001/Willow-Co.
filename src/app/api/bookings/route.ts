import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { createBooking, getServiceById } from "@/lib/db";
import { getAvailableSlots } from "@/lib/availability";
import { createBookingSchema } from "@/lib/validation";
import { dateStrInTimeZone } from "@/lib/timezone";
import brand from "@/config/brand";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const input = parsed.data;

  const service = getServiceById(input.serviceId);
  if (!service || !service.active) {
    return NextResponse.json({ error: "Unknown service" }, { status: 404 });
  }

  const startDate = new Date(input.startISO);
  if (Number.isNaN(startDate.getTime())) {
    return NextResponse.json({ error: "Invalid startISO" }, { status: 400 });
  }

  // Re-derive the requested slot's local date and re-run availability to
  // (a) confirm the slot still respects business hours/notice/advance rules
  // and (b) guard against a race where someone else booked it first.
  const localDateStr = dateStrInTimeZone(startDate, brand.timezone);
  const availability = getAvailableSlots(localDateStr, input.serviceId);
  if (!availability.ok) {
    return NextResponse.json({ error: availability.reason }, { status: 400 });
  }
  const match = availability.slots.find((s) => s.startISO === startDate.toISOString());
  if (!match) {
    return NextResponse.json(
      { error: "That time is no longer available. Please pick another slot." },
      { status: 409 }
    );
  }

  const booking = createBooking({
    id: randomUUID(),
    serviceId: service.id,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    customerPhone: input.customerPhone,
    notes: input.notes,
    startISO: match.startISO,
    endISO: match.endISO,
  });

  return NextResponse.json({ booking }, { status: 201 });
}
