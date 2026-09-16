import type { MsgKey } from "./i18n";

export const site = {
  name: "Bani Adam Afandi",
  email: "Bani.adam.afandi@gmail.com",
  website: "bani.adam.biz.id",
  linkedin: "https://www.linkedin.com/in/bani-adam-afandi-747038179",
};

export const skills = [
  {
    title: "Product Ownership",
    items: [
      { name: "Agile/Scrum", level: 92 },
      { name: "Backlog Prioritization", level: 90 },
      { name: "Sprint Planning", level: 90 },
      { name: "Release Management", level: 88 },
      { name: "Feature Review", level: 88 },
      { name: "Stakeholder Alignment", level: 87 },
    ],
  },
  {
    title: "Testing & Automation",
    items: [
      { name: "TestCafe", level: 90 },
      { name: "Mocha, Chai, Postman", level: 88 },
      { name: "Regression, E2E, UAT", level: 90 },
    ],
  },
  {
    title: "Performance & Security",
    items: [
      { name: "K6", level: 86 },
      { name: "Google Lighthouse", level: 85 },
      { name: "OWASP", level: 84 },
      { name: "Burp Suite", level: 83 },
    ],
  },
  {
    title: "Tools & Analytics",
    items: [
      { name: "Jira · Xray · ClickUp", level: 88 },
      { name: "SQL Server", level: 87 },
      { name: "CleverTap · AppsFlyer", level: 85 },
    ],
  },
  {
    title: "Languages",
    items: [
      { name: "JavaScript", level: 86 },
      { name: "SQL", level: 88 },
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  type: MsgKey;
  period: MsgKey;
  location: MsgKey;
  bullets: MsgKey[];
};

export const experiences: Experience[] = [
  {
    role: "Product Owner",
    company: "Komunal Indonesia",
    type: "exp.type.fulltime",
    period: "exp.1.period",
    location: "exp.loc.remote",
    bullets: [
      "exp.1.b1",
      "exp.1.b2",
      "exp.1.b3",
      "exp.1.b4",
      "exp.1.b5",
      "exp.1.b6",
    ],
  },
  {
    role: "Junior SDET (Software Development Engineer in Test)",
    company: "Kuncie Pintar Nusantara",
    type: "exp.type.fulltime",
    period: "exp.2.period",
    location: "exp.loc.hybrid",
    bullets: ["exp.2.b1", "exp.2.b2", "exp.2.b3", "exp.2.b4"],
  },
  {
    role: "Mentor QA",
    company: "Jago QA Institute",
    type: "exp.type.freelance",
    period: "exp.3.period",
    location: "exp.loc.remote",
    bullets: ["exp.3.b1"],
  },
  {
    role: "Software QA Tester",
    company: "PT Mitra Transaksi Indonesia",
    type: "exp.type.contract",
    period: "exp.4.period",
    location: "exp.loc.south",
    bullets: ["exp.4.b1", "exp.4.b2", "exp.4.b3"],
  },
  {
    role: "Administrator",
    company: "Kalbe Nutritionals (PT Sanghiang Perkasa)",
    type: "exp.type.contract",
    period: "exp.5.period",
    location: "exp.loc.north",
    bullets: ["exp.5.b1", "exp.5.b2", "exp.5.b3"],
  },
];

export type Education = {
  school: string;
  degree: MsgKey;
  period: string;
  focus: MsgKey;
  orgs: string[];
};

export const education: Education[] = [
  {
    school: "Universitas AMIKOM Yogyakarta",
    degree: "edu.degree",
    period: "Sep 2016 – Feb 2020",
    focus: "edu.focus",
    orgs: [
      "Keluarga Mahasiswa Riau Amikom",
      "Amikom Computer Club",
      "Komunitas Game Developer Jogja",
    ],
  },
];

export type Project = {
  title: string;
  tag: MsgKey;
  year: string;
  desc: MsgKey;
  url: string | null;
};

export const projects: Project[] = [
  {
    title: "DepositoBPR by Komunal",
    tag: "proj.tag.komunal",
    year: "2023–Present",
    desc: "proj.desc.depositobpr",
    url: "https://depositobpr.co.id",
  },
  {
    title: "Kuncie",
    tag: "proj.tag.edtech",
    year: "2022–2023",
    desc: "proj.desc.kuncie",
    url: "https://kuncie.id",
  },
  {
    title: "IndonesiaForklift",
    tag: "proj.tag.b2bHeavy",
    year: "2025",
    desc: "proj.desc.forklift",
    url: "https://indonesiaforklift.com",
  },
  {
    title: "Sayurindo",
    tag: "proj.tag.agri",
    year: "2025",
    desc: "proj.desc.sayurindo",
    url: "https://sayurindo.id",
  },
  {
    title: "Hermes Agent",
    tag: "proj.tag.hermes",
    year: "2026",
    desc: "proj.desc.hermes",
    url: "https://hermes-agent.nousresearch.com",
  },
  {
    title: "n8n Automation",
    tag: "proj.tag.n8n",
    year: "2026",
    desc: "proj.desc.n8n",
    url: null,
  },
  {
    title: "20+ Proyek Lainnya",
    tag: "proj.tag.20plus",
    year: "—",
    desc: "proj.desc.20plus",
    url: null,
  },
];

export type Service = { title: MsgKey; desc: MsgKey };

export const services: Service[] = [
  {
    title: "services.s1.title",
    desc: "services.s1.desc",
  },
  {
    title: "services.s2.title",
    desc: "services.s2.desc",
  },
  {
    title: "services.s3.title",
    desc: "services.s3.desc",
  },
  {
    title: "services.s4.title",
    desc: "services.s4.desc",
  },
];