import type { Metadata } from "next";
import brand from "@/config/brand";
import { img, stock } from "@/config/stock";
import { stats, values, team } from "@/config/content";
import SectionHeading from "@/components/SectionHeading";
import TeamCard from "@/components/TeamCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: `About — ${brand.name}`,
  description: `The story, the studio, and the team behind ${brand.name}.`,
};

export default function AboutPage() {
  return (
    <div>
      {/* Page hero */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl font-semibold tracking-tight text-foreground text-balance">
            A neighbourhood studio built around good hair and good people
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty">
            {brand.name} started with a simple idea: slow down, do fewer heads beautifully, and
            treat everyone who sits in the chair like the only client of the day.
          </p>
        </div>
      </section>

      {/* Story + image */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img(stock.interiorLight, 900, 750)}
              alt="Inside the studio"
              className="aspect-[6/5] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              title="Craft first, everything else second"
            />
            <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                After years in fast-paced salons where chairs were double-booked and consultations
                were an afterthought, our founder set out to build the opposite. A place where
                stylists have time to think, clients never feel rushed, and the work speaks for
                itself.
              </p>
              <p>
                Today we&apos;re a small, senior team working out of a bright studio on{" "}
                {brand.contact.address}. We keep our books deliberately light so every appointment
                gets the attention it deserves — and so you leave with hair you actually want to
                show off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-semibold tracking-tight text-primary">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading center title="Our values" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title} className="rounded-2xl border border-border bg-background p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            center
            title="The team behind the chair"
            subtitle="Fully-qualified, endlessly curious, and genuinely happy to be here."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come see the studio for yourself"
        subtitle="Book your first appointment online — we think you'll want to make it a habit."
      />
    </div>
  );
}
