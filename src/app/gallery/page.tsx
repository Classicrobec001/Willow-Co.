import type { Metadata } from "next";
import brand from "@/config/brand";
import { img, stock } from "@/config/stock";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: `Gallery — ${brand.name}`,
  description: `A look inside ${brand.name} — the studio, the work, and the atmosphere.`,
};

// A staggered masonry-style layout: taller and shorter tiles for visual rhythm.
const SPANS = [
  "sm:row-span-2",
  "",
  "",
  "sm:row-span-2",
  "",
  "",
];

export default function GalleryPage() {
  return (
    <div>
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl sm:text-5xl font-semibold tracking-tight text-foreground text-balance">
            A look inside the studio
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
            The space, the chairs, and a little of the work. Come see it in person.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:grid-cols-3">
          {stock.gallery.map((g, i) => (
            <figure
              key={g.id}
              className={`group relative overflow-hidden rounded-2xl border border-border ${SPANS[i % SPANS.length]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img(g.id, 700, 900)}
                alt={g.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-4 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                {g.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <CTASection
        title="Like what you see?"
        subtitle="Book a chair and experience it for yourself — online, in under a minute."
      />
    </div>
  );
}
