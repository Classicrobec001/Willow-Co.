import Link from "next/link";
import brand from "@/config/brand";
import { weeklyHours } from "@/lib/hours";

export default function Footer() {
  const year = new Date().getFullYear();
  const hours = weeklyHours();

  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-lg font-semibold tracking-tight text-foreground">{brand.logoText}</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{brand.tagline}</p>
          <Link
            href="/book"
            className="mt-5 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book an appointment
          </Link>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-foreground">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link href="/about" className="hover:text-foreground">About us</Link></li>
            <li><Link href="/gallery" className="hover:text-foreground">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link href="/book" className="hover:text-foreground">Book online</Link></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-foreground">Contact</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{brand.contact.address}</li>
            <li>
              <a href={`tel:${brand.contact.phone}`} className="hover:text-foreground">
                {brand.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.contact.email}`} className="hover:text-foreground">
                {brand.contact.email}
              </a>
            </li>
          </ul>
          {(brand.social?.instagram || brand.social?.facebook) && (
            <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
              {brand.social?.instagram && (
                <a href={brand.social.instagram} className="hover:text-foreground">Instagram</a>
              )}
              {brand.social?.facebook && (
                <a href={brand.social.facebook} className="hover:text-foreground">Facebook</a>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-foreground">Hours</div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {hours.map((row) => (
              <li key={row.day} className="flex justify-between gap-4">
                <span>{row.day}</span>
                <span className={row.closed ? "text-muted-foreground/60" : "text-foreground"}>
                  {row.hours}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {year} {brand.name}. All rights reserved.
      </div>
    </footer>
  );
}
