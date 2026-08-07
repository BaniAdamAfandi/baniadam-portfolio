import { Reveal } from "@/components/Reveal";

export function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal>
      <div className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {sub && <p className="mt-3 max-w-xl text-muted">{sub}</p>}
      </div>
    </Reveal>
  );
}