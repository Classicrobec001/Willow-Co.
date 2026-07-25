import type { Testimonial } from "@/config/content";

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 sm:p-7">
      <Stars />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-5 border-t border-border pt-4">
        <div className="font-semibold text-foreground">{testimonial.name}</div>
        <div className="text-sm text-muted-foreground">{testimonial.detail}</div>
      </figcaption>
    </figure>
  );
}
