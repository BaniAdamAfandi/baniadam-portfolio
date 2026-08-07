import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { bio, stats } from "@/lib/data";

export function About() {
  return (
    <section id="tentang" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeader eyebrow="Tentang" title="Data-driven, hasil nyata" />
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="space-y-4 text-muted">
            {bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-3xl font-semibold text-accent">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}