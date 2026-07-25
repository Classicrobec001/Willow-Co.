import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") ?? "";
  const serviceId = searchParams.get("serviceId") ?? "";

  if (!date || !serviceId) {
    return NextResponse.json(
      { error: "Both 'date' (YYYY-MM-DD) and 'serviceId' query params are required." },
      { status: 400 }
    );
  }

  const result = getAvailableSlots(date, serviceId);

  if (!result.ok) {
    const status = result.reason === "unknown-service" ? 404 : 400;
    return NextResponse.json({ error: result.reason }, { status });
  }

  return NextResponse.json({ slots: result.slots });
}
