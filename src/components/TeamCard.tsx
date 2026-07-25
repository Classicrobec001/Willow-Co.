import type { TeamMember } from "@/config/content";
import { img } from "@/config/stock";

export default function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-background">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img(member.photo, 500, 625)}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
        <div className="text-sm font-medium text-primary">{member.role}</div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
      </div>
    </div>
  );
}
