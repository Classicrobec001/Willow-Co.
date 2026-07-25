import type { Metadata } from "next";
import Link from "next/link";
import brand from "@/config/brand";
import { weeklyHours } from "@/lib/hours";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: `Contact — ${brand.name}`,
  description: `Get in touch with ${brand.name} — visit, call, email, or book online.`,
};

export default function ContactPage() {
  const hours = weeklyHours();
  const mapsQuery = encodeURIComponent(`${brand.name}, ${brand.contact.address}`);

  return (
    <div>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl sm:text-5xl font-semibold tracking-tight text-foreground text-balance">
            We&apos;d love to hear from you
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
            Booking is fastest online, but for anything else — questions, special requests, or a
            quick hello — drop us a line.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Details */}
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactTile label="Visit" lines={[brand.contact.address]} href={`https://maps.google.com/?q=${mapsQuery}`} cta="Get directions" />
              <ContactTile label="Call" lines={[brand.contact.phone]} href={`tel:${brand.contact.phone}`} cta="Call now" />
              <ContactTile label="Email" lines={[brand.contact.email]} href={`mailto:${brand.contact.email}`} cta="Send email" />
              <ContactTile label="Book" lines={["Online, in under a minute"]} href="/book" cta="Book now" internal />
            </div>

            {/* Hours */}
            <div className="rounded-2xl border border-border bg-background p-6">
              <h2 className="text-sm font-semibold text-foreground">Opening hours</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {hours.map((row) => (
                  <li key={row.day} className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">{row.day}</span>
                    <span className={row.closed ? "text-muted-foreground/60" : "font-medium text-foreground"}>
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map embed (no API key required) */}
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map"
                src={`https://maps.google.com/maps?q=${mapsQuery}&output=embed`}
                className="h-56 w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactTile({
  label,
  lines,
  href,
  cta,
  internal = false,
}: {
  label: string;
  lines: string[];
  href: string;
  cta: string;
  internal?: boolean;
}) {
  const link = internal ? (
    <Link href={href} className="text-sm font-medium text-primary hover:underline">
      {cta} →
    </Link>
  ) : (
    <a href={href} className="text-sm font-medium text-primary hover:underline">
      {cta} →
    </a>
  );
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</div>
      {lines.map((l) => (
        <div key={l} className="mt-1.5 wrap-break-word text-sm font-medium text-foreground">
          {l}
        </div>
      ))}
      <div className="mt-3">{link}</div>
    </div>
  );
}
