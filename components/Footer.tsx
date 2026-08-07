import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="text-xs">Digital Growth & Web Performance — Indonesia</p>
      </div>
    </footer>
  );
}