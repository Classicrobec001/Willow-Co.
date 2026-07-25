import Link from "next/link";
import brand from "@/config/brand";
import { listActiveServices } from "@/lib/db";
import { img, stock } from "@/config/stock";
import { stats, features, testimonials, team, faqs } from "@/config/content";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import TeamCard from "@/components/TeamCard";
import FaqList from "@/components/FaqList";
import CTASection from "@/components/CTASection";

export const dynamic = "force-dynamic";

export default function Home() {
  const services = listActiveServices();
  const featured = services.slice(0, 3);

  return (
    <div>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-8 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div style={{ animation: "fade-up 0.6s ease-out both" }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="text-accent">★★★★★</span> Rated 4.9 by 1,200+ clients
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl text-balance">
              {brand.tagline}
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
              {brand.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                Book an appointment
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-3.5 font-medium text-foreground transition-colors hover:bg-muted"
              >
                Explore services
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Dot /> Open today
              </span>
              <span className="flex items-center gap-2">
                <Dot /> Walk-ins welcome
              </span>
              <span className="flex items-center gap-2">
                <Dot /> Online booking
              </span>
            </div>
          </div>

          <div className="relative" style={{ animation: "fade-up 0.7s ease-out both" }}>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(stock.hero, 900, 1000)}
                alt="A client at the studio"
                className="aspect-[9/10] w-full object-cover"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-background/95 px-5 py-4 shadow-lg backdrop-blur sm:block">
              <div className="text-2xl font-semibold text-foreground">8,000+</div>
              <div className="text-xs text-muted-foreground">appointments &amp; counting</div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Stats */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 divide-border rounded-3xl border border-border bg-muted/30 py-8 sm:grid-cols-4 sm:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-4 text-center">
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title="Services for every kind of hair"
            subtitle="Cuts, colour, and care — each priced clearly and bookable in a couple of taps."
          />
          <Link
            href="/services"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all services →
          </Link>
        </div>
        {featured.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------ Features */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            center
            title="The little things add up"
            subtitle="We sweat the details so your appointment is the easy, relaxing part of your week."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Story */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-3xl border border-border lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(stock.stylistAtWork, 900, 700)}
              alt="A stylist finishing a blow-dry"
              className="aspect-[9/7] w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              title="Unhurried, expert, and genuinely yours"
              subtitle="No conveyor belt, no upsell. Just senior stylists who take the time to get it right — in a space that's calm from the moment you walk in."
            />
            <ul className="mt-6 space-y-3">
              {[
                "One-on-one attention, never double-booked",
                "Complimentary consultation with every visit",
                "Products chosen for your hair's long-term health",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-foreground">
                  <Check /> <span>{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center rounded-full border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-muted"
            >
              More about us
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Gallery */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="Take a look inside" />
            <Link href="/gallery" className="text-sm font-medium text-primary hover:underline">
              See the full gallery →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stock.gallery.slice(0, 4).map((g, i) => (
              <div
                key={g.id}
                className={`overflow-hidden rounded-2xl border border-border ${
                  i === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img(g.id, i === 0 ? 800 : 400, i === 0 ? 800 : 400)}
                  alt={g.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          center
          title="Don't just take our word for it"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- Team */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            center
            title="Meet your stylists"
            subtitle="A small, senior team who genuinely love what they do — and it shows."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading center title="Questions, answered" />
        <div className="mt-10">
          <FaqList faqs={faqs} />
        </div>
      </section>

      {/* ----------------------------------------------------------------- CTA */}
      <CTASection />
    </div>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-secondary" />;
}

function Check() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-primary"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
