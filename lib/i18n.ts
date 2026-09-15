// Source of truth = Indonesian. EN is a Record<MsgKey, string> so any missing
// EN key fails tsc. Do NOT weaken EN's type.
const ID = {
  // Language switcher
  "lang.toggle": "Ganti bahasa",
  "lang.current": "Bahasa saat ini",

  // Navbar
  "nav.about": "Tentang",
  "nav.skills": "Keahlian",
  "nav.experience": "Pengalaman",
  "nav.projects": "Proyek",
  "nav.services": "Layanan",
  "nav.menuOpen": "Buka menu",
  "nav.menuClose": "Tutup menu",
  "cta.contact": "Hubungi",

  // Hero
  "hero.location": "Jakarta, Indonesia",
  "hero.headline": "Product Owner & Software Quality Engineer",
  "hero.role": "Product · QA · Growth & Web Performance",
  "hero.ctaProjects": "Lihat Proyek",
  "hero.ctaContact": "Hubungi Saya",
  "hero.ctaCv": "Unduh CV",

  // About
  "about.eyebrow": "Tentang",
  "about.title": "Data-driven, hasil nyata",
  "about.bio.1":
    "Technical Product Owner dengan fondasi kuat di Software Quality Assurance dan SDET, berpengalaman mengantar produk digital lintas fintech dan edtech — dari discovery, PRD, UAT, rilis, hingga monitoring.",
  "about.bio.2":
    "Terampil menerjemahkan kebutuhan bisnis, pelanggan, operasional, dan regulasi menjadi requirement produk yang jelas, bekerja erat dengan Engineering, QA, UI/UX, Operations, Commercial, dan Marketing.",
  "about.bio.3":
    "Hands-on dengan API, database, integrasi, troubleshooting produksi, dan pengiriman software end-to-end.",
  "about.bio.4":
    "Side work / keahlian tambahan: growth & web performance engineering — Core Web Vitals, GA4, Google Ads — lewat proyek nyata: indonesiaforklift dan sayurindo.",
  "about.stat.1": "Tahun Pengalaman",
  "about.stat.2": "Proyek & Produk Digital",
  "about.stat.3": "Sektor: Fintech & EdTech",
  "about.stat.4": "Tahun Produk Fintech",

  // Skills
  "skills.eyebrow": "Keahlian",
  "skills.title": "Teknologi & keterampilan",
  "skills.sub": "Perpaduan engineering dan pemasaran berbasis data.",

  // Experience
  "exp.eyebrow": "Riwayat",
  "exp.title": "Pengalaman & pendidikan",
  "exp.sub":
    "Perjalanan karier di product dan quality assurance, serta latar belakang akademik.",
  "exp.workHeader": "Pengalaman Kerja",
  "exp.eduHeader": "Pendidikan",
  "exp.type.fulltime": "Full-time",
  "exp.type.freelance": "Freelance",
  "exp.type.contract": "Kontrak",
  "exp.loc.remote": "Jakarta (Remote)",
  "exp.loc.hybrid": "Jakarta (Hybrid)",
  "exp.loc.south": "Jakarta Selatan",
  "exp.loc.north": "Jakarta Utara",
  "exp.1.period": "Des 2023 – Sekarang · ±2,5 tahun",
  "exp.1.b1":
    "Mengelola inisiatif produk DepositoBPR lintas mobile, web, admin portal, dan backend — dari discovery, UAT, rilis, hingga monitoring.",
  "exp.1.b2":
    "Menerjemahkan kebutuhan bisnis, pelanggan, operasional, dan regulasi menjadi PRD, user stories, acceptance criteria, dan backlog terprioritas.",
  "exp.1.b3":
    "Kolaborasi lintas fungsi: Engineering, QA, UI/UX, Operations, Commercial, Marketing, Finance, serta partner teknologi eksternal.",
  "exp.1.b4":
    "Memimpin inisiatif di seluruh area produk: deposit digital, pembayaran/disbursement, promosi, deposan korporasi, KYC, manajemen biaya BPR, analytics, dan sistem operasional.",
  "exp.1.b5":
    "Mendukung integrasi pihak ketiga dan alur keuangan kompleks — identitas, payment provider, callback, scheduler — serta investigasi masalah produksi lewat API, database, log, caching, dan business rules untuk root cause.",
  "exp.1.b6":
    "Mendukung keamanan/compliance/regulasi: KYC, APU-PPT, dan remediasi hasil pen-testing.",
  "exp.2.period": "Mar 2022 – Des 2023 · 1 thn 10 bln",
  "exp.2.b1":
    "Functional, API, integration, regression, dan E2E testing untuk produk digital.",
  "exp.2.b2":
    "Menyusun skenario automated & manual testing untuk meningkatkan keyakinan rilis.",
  "exp.2.b3":
    "Menerjemahkan requirements menjadi test case; kolaborasi dengan Product, Engineering, dan Design.",
  "exp.2.b4":
    "Investigasi defect, dokumentasi, analisis root cause, dan validasi perbaikan.",
  "exp.3.period": "Jul 2022 – Feb 2023 · 8 bln",
  "exp.3.b1":
    "Mentoring peserta dalam fundamental QA, skenario & test case, bug reporting, API testing, dan alur kerja industri.",
  "exp.4.period": "Sep 2021 – Mar 2022 · 7 bln",
  "exp.4.b1":
    "Functional, regression, integration, dan API testing lintas produk.",
  "exp.4.b2": "Dokumentasi defect, koordinasi perbaikan, dan validasi pre-release.",
  "exp.4.b3": "Testing EDC (Electronic Data Capture) dengan kartu kredit, kartu debit, QRIS, dan integrasi payment gateway.",
  "exp.5.period": "Apr 2021 – Sep 2021 · 6 bln",
  "exp.5.b1":
    "Menjaga catatan database operasional (PRM), validasi data, reporting, dan konsistensi data.",
  "exp.5.b2":
    "Memastikan data akurat guna mendukung operasional dan pengambilan keputusan.",

  // Education
  "edu.focus": "Sistem informasi, analisis data, manajemen proyek.",
  "edu.degree": "S1 Sistem Informasi",

  // Projects
  "proj.eyebrow": "Proyek",
  "proj.title": "Karya terpilih",
  "proj.sub": "Campuran engineering, performance, dan growth marketing.",
  "proj.tag.b2bHeavy": "Side Project · B2B Alat Berat",
  "proj.tag.agri": "Side Project · Agribisnis",
  "proj.tag.komunal": "Product Owner · Fintech",
  "proj.tag.edtech": "EdTech · Product",
  "proj.tag.20plus": "Portfolio",
  "proj.tag.hermes": "AI Agent · Orchestrator",
  "proj.tag.n8n": "Workflow Automation",
  "proj.desc.forklift":
    "Website B2B alat berat. Optimasi Core Web Vitals, GA4 + Google Ads tracking, WA conversion pipeline.",
  "proj.desc.sayurindo":
    "Sektor agribisnis dan distribusi sayur. Kampanye Google Ads berbasis data.",
  "proj.desc.depositobpr":
    "Produk deposito digital yang saya kelola sebagai Product Owner — DepositoBPR by Komunal. Platform deposito digital bank perekonomian rakyat (BPR) dengan proto digital deposit experience, KYC, dan onboarding.",
  "proj.desc.kuncie":
    "Platform pembelajaran digital (edtech) — kualitas produk diuji lewat testing otomatis & E2E.",
  "proj.20plus.title": "20+ Proyek Lainnya",
  "proj.desc.20plus":
    "Beragam proyek growth marketing dan pengembangan web untuk berbagai skala bisnis.",
  "proj.desc.hermes":
    "Automasi & orkestrasi AI agent: riset, laporan otomatis, monitoring SEO/Ads, dan delegasi kerja ke sub-agent (OMP) lewat Hermes Agent.",
  "proj.desc.n8n":
    "Automasi workflow dengan n8n — integrasi API, notifikasi, dan pipeline data untuk operasional digital.",

  // Services
  "services.eyebrow": "Layanan",
  "services.title": "Apa yang saya kerjakan",
  "services.sub":
    "Dari audit performa sampai kampanye berbasis data — satu alur: ukur, optimasi, ulangi.",
  "services.s1.title": "Product Ownership & Roadmap",
  "services.s1.desc":
    "Backlog terprioritas, PRD, acceptance criteria, dan delivery produk fintech end-to-end.",
  "services.s2.title": "Technical Product Management",
  "services.s2.desc":
    "Jembatani tim Engineering dengan requirement produk yang jelas, berbasis data, API, dan logika sistem.",
  "services.s3.title": "QA & Test Automation",
  "services.s3.desc":
    "Strategi testing functional, API, regression, E2E, dan root-cause analysis yang berkelanjutan.",
  "services.s4.title": "Integrasi CRM & Omnichannel",
  "services.s4.desc":
    "Integrasi CRM, omnichannel customer service, dan chatbot untuk mendukung operasional layanan pelanggan yang mulus.",

  // Contact
  "contact.title.a": "Punya proyek?",
  "contact.title.b": "Mari diskusi.",
  "contact.body":
    "Butuh website cepat, campaign yang terukur, atau optimasi performa? Kirim pesan — saya balas secepatnya.",
  "contact.cta": "Kirim Email",

  // Footer
  "footer.tagline": "Digital Growth & Web Performance — Indonesia",
  "footer.cv": "Unduh CV",
} as const;

export type MsgKey = keyof typeof ID;

// EN must cover every key. If a key is missing here, tsc FAILS.
const EN: Record<MsgKey, string> = {
  "lang.toggle": "Change language",
  "lang.current": "Current language",

  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.experience": "Experience",
  "nav.projects": "Projects",
  "nav.services": "Services",
  "nav.menuOpen": "Open menu",
  "nav.menuClose": "Close menu",
  "cta.contact": "Contact",

  "hero.location": "Jakarta, Indonesia",
  "hero.headline": "Product Owner & Software Quality Engineer",
  "hero.role": "Product · QA · Growth & Web Performance",
  "hero.ctaProjects": "View Projects",
  "hero.ctaContact": "Contact Me",
  "hero.ctaCv": "Download CV",

  "about.eyebrow": "About",
  "about.title": "Data-driven, real results",
  "about.bio.1":
    "Technical Product Owner with a strong foundation in Software Quality Assurance and SDET, delivering digital products across fintech and edtech — from discovery, PRD, UAT, release, to monitoring.",
  "about.bio.2":
    "Skilled at translating business, customer, operational, and regulatory needs into clear product requirements, working closely with Engineering, QA, UI/UX, Operations, Commercial, and Marketing.",
  "about.bio.3":
    "Hands-on with APIs, databases, integrations, production troubleshooting, and end-to-end software delivery.",
  "about.bio.4":
    "Side work / additional expertise: growth & web performance engineering — Core Web Vitals, GA4, Google Ads — via real projects: indonesiaforklift and sayurindo.",
  "about.stat.1": "Years of Experience",
  "about.stat.2": "Projects & Digital Products",
  "about.stat.3": "Sectors: Fintech & EdTech",
  "about.stat.4": "Years in Fintech Products",

  "skills.eyebrow": "Skills",
  "skills.title": "Technologies & skills",
  "skills.sub": "A blend of engineering and data-driven marketing.",

  "exp.eyebrow": "History",
  "exp.title": "Experience & education",
  "exp.sub":
    "My career journey in product and quality assurance, plus my academic background.",
  "exp.workHeader": "Work Experience",
  "exp.eduHeader": "Education",
  "exp.type.fulltime": "Full-time",
  "exp.type.freelance": "Freelance",
  "exp.type.contract": "Contract",
  "exp.loc.remote": "Jakarta (Remote)",
  "exp.loc.hybrid": "Jakarta (Hybrid)",
  "exp.loc.south": "South Jakarta",
  "exp.loc.north": "North Jakarta",
  "exp.1.period": "Dec 2023 – Present · ±2.5 years",
  "exp.1.b1":
    "Manage DepositoBPR product initiatives across mobile, web, admin portal, and backend — from discovery, UAT, release, to monitoring.",
  "exp.1.b2":
    "Translate business, customer, operational, and regulatory needs into PRDs, user stories, acceptance criteria, and a prioritized backlog.",
  "exp.1.b3":
    "Cross-functional collaboration: Engineering, QA, UI/UX, Operations, Commercial, Marketing, Finance, and external technology partners.",
  "exp.1.b4":
    "Lead initiatives across the entire product surface: digital deposits, payments/disbursement, promotions, corporate depositors, KYC, BPR cost management, analytics, and operational systems.",
  "exp.1.b5":
    "Support third-party integrations and complex financial flows — identity, payment providers, callbacks, schedulers — and investigate production issues through API, database, logs, caching, and business rules to find root cause.",
  "exp.1.b6":
    "Support security/compliance/regulatory work: KYC, APU-PPT, and remediation of pen-testing findings.",
  "exp.2.period": "Mar 2022 – Dec 2023 · 1 yr 10 mo",
  "exp.2.b1":
    "Functional, API, integration, regression, and E2E testing for digital products.",
  "exp.2.b2":
    "Built automated and manual testing scenarios to increase release confidence.",
  "exp.2.b3":
    "Translated requirements into test cases; collaborated with Product, Engineering, and Design.",
  "exp.2.b4": "Investigated defects, documented, analyzed root cause, and validated fixes.",
  "exp.3.period": "Jul 2022 – Feb 2023 · 8 mo",
  "exp.3.b1":
    "Mentored participants in QA fundamentals, test scenarios & cases, bug reporting, API testing, and industry workflows.",
  "exp.4.period": "Sep 2021 – Mar 2022 · 7 mo",
  "exp.4.b1": "Functional, regression, integration, and API testing across products.",
  "exp.4.b2": "Defect documentation, fix coordination, and pre-release validation.",
  "exp.4.b3": "EDC (Electronic Data Capture) testing with credit card, debit card, QRIS, and payment gateway integration.",
  "exp.5.period": "Apr 2021 – Sep 2021 · 6 mo",
  "exp.5.b1":
    "Maintained operational database (PRM) records, data validation, reporting, and data consistency.",
  "exp.5.b2": "Ensured accurate data to support operations and decision-making.",

  "edu.focus": "Information systems, data analysis, project management.",
  "edu.degree": "B.Sc. Information Systems",

  "proj.eyebrow": "Projects",
  "proj.title": "Selected work",
  "proj.tag.hermes": "AI Agent · Orchestrator",
  "proj.tag.n8n": "Workflow Automation",
  "proj.sub": "A mix of engineering, performance, and growth marketing.",
  "proj.tag.b2bHeavy": "Side Project · B2B Heavy Equipment",
  "proj.tag.agri": "Side Project · Agribusiness",
  "proj.tag.komunal": "Product Owner · Fintech",
  "proj.tag.edtech": "EdTech · Product",
  "proj.tag.20plus": "Portfolio",
  "proj.desc.forklift":
    "B2B heavy-equipment website. Core Web Vitals optimization, GA4 + Google Ads tracking, WhatsApp conversion pipeline.",
  "proj.desc.sayurindo":
    "Agribusiness and vegetable distribution sector. Data-driven Google Ads campaigns.",
  "proj.desc.depositobpr":
    "Digital deposit product I own as Product Owner — DepositoBPR by Komunal. Digital deposit platform for Indonesian rural banks (BPR); digital banking, KYC, and onboarding.",
  "proj.desc.hermes":
    "AI agent automation & orchestration: research, automated reporting, SEO/Ads monitoring, and delegating work to sub-agents (OMP) via Hermes Agent.",
  "proj.desc.n8n":
    "Workflow automation with n8n — API integrations, notifications, and data pipelines for digital operations.",
  "proj.desc.kuncie":
    "Digital learning platform (edtech) — product quality ensured via automated & E2E testing.",
  "proj.20plus.title": "20+ More Projects",
  "proj.desc.20plus":
    "A range of growth marketing and web development projects for businesses of all sizes.",

  "services.eyebrow": "Services",
  "services.title": "What I do",
  "services.sub":
    "From performance audits to data-driven campaigns — one loop: measure, optimize, repeat.",
  "services.s1.title": "Product Ownership & Roadmap",
  "services.s1.desc":
    "Prioritized backlog, PRDs, acceptance criteria, and end-to-end fintech product delivery.",
  "services.s2.title": "Technical Product Management",
  "services.s2.desc":
    "Bridge Engineering teams with clear product requirements grounded in data, APIs, and system logic.",
  "services.s3.title": "QA & Test Automation",
  "services.s3.desc":
    "Sustainable functional, API, regression, and E2E testing strategies with root-cause analysis.",
  "services.s4.title": "CRM & Omnichannel Integration",
  "services.s4.desc":
    "CRM, omnichannel customer service, and chatbot integrations to support seamless customer operations.",

  "contact.title.a": "Have a project?",
  "contact.title.b": "Let's talk.",
  "contact.body":
    "Need a fast website, measurable campaigns, or performance optimization? Send a message — I'll get back to you right away.",
  "contact.cta": "Send Email",

  "footer.tagline": "Digital Growth & Web Performance — Indonesia",
  "footer.cv": "Download CV",
};

const STRINGS: Record<Locale, Record<MsgKey, string>> = { id: ID, en: EN };

export type Locale = "id" | "en";

export function translate(
  locale: Locale,
  key: MsgKey,
  vars?: Record<string, string | number>
): string {
  let s: string = STRINGS[locale][key];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replaceAll(`{${k}}`, String(v));
    }
  }
  return s;
}