import type { Metadata } from "next";
import Link from "next/link";
import brand from "@/config/brand";
import { listActiveServices } from "@/lib/db";
import { formatDuration, formatPrice } from "@/lib/format";
import { faqs } from "@/config/content";
import { img, stock } from "@/config/stock";
import SectionHeading from "@/components/SectionHeading";
import FaqList from "@/components/FaqList";
import CTASection from "@/components/CTASection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Services & Pricing — ${brand.name}`,
  description: `Cuts, colour, and treatments at ${brand.name}, each priced clearly and bookable online.`,
};

export default function ServicesPage() {
  const services = listActiveServices();

  return (
    <div>
      {/* Page hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-foreground text-balance">
              Everything we offer, priced up front
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground text-pretty">
              No hidden fees, no surprises at the register. Pick what you need, see the price and
              time, and book it online in seconds.
            </p>
            <Link
              href="/book"
              className="mt-7 inline-flex items-center rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
            >
              Book now
            </Link>
          </div>
          <div className="hidden overflow-hidden rounded-3xl border border-border lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(stock.gallery[1].id, 800, 600)}
              alt="A service in progress"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Service list */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        {services.length === 0 ? (
          <p className="text-muted-foreground">
            No services yet — run <code className="font-mono">npm run seed</code> to load them.
          </p>
        ) : (
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
            {services.map((service) => (
              <li
                key={service.id}
                className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="sm:pr-6">
                  <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock /> {formatDuration(service.duration_minutes)}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-5 sm:flex-col sm:items-end sm:justify-center">
                  <span className="text-xl font-semibold text-foreground">
                    {formatPrice(service.price_cents)}
                  </span>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Book
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Not sure what to pick? Start with the closest match and note it at checkout — your stylist
          will confirm the plan before anything begins.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading center title="Booking questions" />
          <div className="mt-10">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

function Clock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
