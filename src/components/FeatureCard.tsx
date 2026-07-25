import type { Feature } from "@/config/content";

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-7 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={feature.icon} />
        </svg>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
    </div>
  );
}
