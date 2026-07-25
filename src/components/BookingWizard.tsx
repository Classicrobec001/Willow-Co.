"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDuration, formatPrice } from "@/lib/format";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceCents: number;
}

interface Slot {
  startISO: string;
  endISO: string;
  label: string;
}

const STEPS = ["Service", "Date & time", "Your details", "Confirm"] as const;

export default function BookingWizard({
  services,
  initialServiceId,
  minDate,
  maxDate,
  timezone,
}: {
  services: ServiceOption[];
  initialServiceId?: string;
  minDate: string;
  maxDate: string;
  timezone: string;
}) {
  const router = useRouter();

  const preselected =
    !!initialServiceId && services.some((s) => s.id === initialServiceId);
  // Jump straight to the date step if a service was preselected via ?service=
  const [step, setStep] = useState(preselected ? 1 : 0);
  const [serviceId, setServiceId] = useState<string | undefined>(
    preselected ? initialServiceId : undefined
  );
  const [date, setDate] = useState(minDate);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const service = useMemo(() => services.find((s) => s.id === serviceId), [services, serviceId]);

  useEffect(() => {
    if (step !== 1 || !serviceId) return;
    let cancelled = false;
    // This effect fetches on service/date change; the resets below are
    // intentional (new fetch in flight), not derived-state mirroring.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlotsLoading(true);
    setSlotsError(null);
    setSelectedSlot(null);
    fetch(`/api/availability?date=${date}&serviceId=${serviceId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error ?? "Failed to load availability");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setSlots(data.slots ?? []);
      })
      .catch((err) => {
        if (cancelled) return;
        setSlotsError(err.message ?? "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setSlotsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [step, serviceId, date]);

  async function handleSubmit() {
    if (!serviceId || !selectedSlot) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          startISO: selectedSlot.startISO,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Could not complete booking. Please try again.");
        // A 409 means someone took the slot — bounce back to the time picker.
        if (res.status === 409) setStep(1);
        return;
      }
      router.push(`/booking/${data.booking.id}`);
    } catch {
      setSubmitError("Network error — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <ol className="flex items-center gap-2 mb-10 text-xs font-medium text-muted-foreground">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                i <= step
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border"
              }`}
            >
              {i + 1}
            </span>
            <span className={i === step ? "text-foreground" : ""}>{label}</span>
            {i < STEPS.length - 1 && <span className="w-6 h-px bg-border mx-1" />}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className="space-y-3">
          {services.map((s) => (
            <label
              key={s.id}
              className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
                serviceId === s.id ? "border-primary bg-muted/60" : "border-border"
              }`}
            >
              <input
                type="radio"
                name="service"
                className="mt-1"
                checked={serviceId === s.id}
                onChange={() => setServiceId(s.id)}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-sm text-secondary">{formatPrice(s.priceCents)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{s.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDuration(s.durationMinutes)}
                </p>
              </div>
            </label>
          ))}
          <div className="pt-4">
            <button
              disabled={!serviceId}
              onClick={() => setStep(1)}
              className="rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 1 && service && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date</label>
            <input
              type="date"
              value={date}
              min={minDate}
              max={maxDate}
              onChange={(e) => setDate(e.target.value)}
              className="rounded-lg border border-border px-3 py-2 bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">Times shown in {timezone}.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Available times
            </label>
            {slotsLoading && <p className="text-sm text-muted-foreground">Loading times…</p>}
            {slotsError && <p className="text-sm text-red-600">{slotsError}</p>}
            {!slotsLoading && !slotsError && slots.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No times available that day — try another date.
              </p>
            )}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.startISO}
                  onClick={() => setSelectedSlot(slot)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    selectedSlot?.startISO === slot.startISO
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(0)}
              className="rounded-full border border-border font-medium px-6 py-3 hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button
              disabled={!selectedSlot}
              onClick={() => setStep(2)}
              className="rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 bg-background text-foreground"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 bg-background text-foreground"
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone (optional)
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 bg-background text-foreground"
              placeholder="(555) 000-0000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-border px-3 py-2 bg-background text-foreground"
              placeholder="Anything we should know before your appointment?"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="rounded-full border border-border font-medium px-6 py-3 hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button
              disabled={!name.trim() || !email.trim()}
              onClick={() => setStep(3)}
              className="rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              Review booking
            </button>
          </div>
        </div>
      )}

      {step === 3 && service && selectedSlot && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border p-5 space-y-2">
            <Row label="Service" value={service.name} />
            <Row label="Duration" value={formatDuration(service.durationMinutes)} />
            <Row label="Price" value={formatPrice(service.priceCents)} />
            <Row
              label="When"
              value={new Intl.DateTimeFormat("en-US", {
                timeZone: timezone,
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }).format(new Date(selectedSlot.startISO))}
            />
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            {phone && <Row label="Phone" value={phone} />}
            {notes && <Row label="Notes" value={notes} />}
          </div>

          {submitError && <p className="text-sm text-red-600">{submitError}</p>}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="rounded-full border border-border font-medium px-6 py-3 hover:bg-muted transition-colors"
            >
              Back
            </button>
            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="rounded-full bg-primary text-primary-foreground font-medium px-6 py-3 disabled:opacity-40 hover:opacity-90 transition-opacity"
            >
              {submitting ? "Booking…" : "Confirm booking"}
            </button>
          </div>
        </div>
      )}
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
