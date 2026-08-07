import { Gauge, TrendingUp, Code2, LineChart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { services } from "@/lib/data";

const icons = [Gauge, TrendingUp, Code2, LineChart];

export function Services() {
  return (
    <section id="layanan" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <SectionHeader
        eyebrow="Layanan"
        title="Apa yang saya kerjakan"
        sub="Dari audit performa sampai kampanye berbasis data — satu alur: ukur, optimasi, ulangi."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div className="group flex h-full gap-4 rounded-2xl border border-line bg-card p-6 transition hover:border-accent/50">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}