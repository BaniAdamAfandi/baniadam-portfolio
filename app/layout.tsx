import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n-provider";
import { site } from "@/lib/data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://baniadam.biz.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bani Adam Afandi — Product Owner & Software Quality Engineer",
    template: "%s — Bani Adam Afandi",
  },
  description:
    "Portofolio Bani Adam Afandi — Product Owner & Software Quality Engineer di Jakarta. Produk fintech & edtech (DepositoBPR by Komunal, Kuncie), QA/SDET, web performance.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bani Adam Afandi — Product Owner & Software Quality Engineer",
    description:
      "Portofolio Bani Adam Afandi — Product Owner & Software Quality Engineer di Jakarta. Produk fintech & edtech (DepositoBPR by Komunal, Kuncie), QA/SDET, web performance.",
    url: SITE_URL,
    type: "website",
    siteName: site.name,
    images: ["/icon.png"],
  },
  twitter: {
    card: "summary",
    title: "Bani Adam Afandi — Product Owner & Software Quality Engineer",
    description:
      "Portofolio Bani Adam Afandi — Product Owner & Software Quality Engineer di Jakarta. Produk fintech & edtech (DepositoBPR by Komunal, Kuncie), QA/SDET, web performance.",
    images: ["/icon.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Product Owner & Software Quality Engineer",
  url: SITE_URL,
  email: site.email,
  sameAs: [site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
