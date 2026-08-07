import { Mail, ExternalLink, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/data";

export function Contact() {
  return (
    <section id="kontak" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
          />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Punya proyek? <span className="text-accent">Mari diskusi.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Butuh website cepat, campaign yang terukur, atau optimasi performa?
            Kirim pesan — saya balas secepatnya.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#06281c] transition hover:brightness-110"
            >
              <MessageCircle size={16} />
              Chat WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-fg transition hover:border-accent/60 hover:text-accent"
            >
              <Mail size={16} />
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-6 flex items-center justify-center">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
          >
            <ExternalLink size={16} />
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}