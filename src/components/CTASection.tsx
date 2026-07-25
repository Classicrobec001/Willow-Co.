import Link from "next/link";
import brand from "@/config/brand";
import { img, stock } from "@/config/stock";

export default function CTASection({
  title = "Ready for your best hair day?",
  subtitle = "Book online in under a minute — pick a service, choose a time, and you're set.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(stock.ctaBand, 1600, 700)}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative px-6 py-16 text-center sm:px-12 sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/85 text-pretty">{subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Book an appointment
            </Link>
            <a
              href={`tel:${brand.contact.phone}`}
              className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Call {brand.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
