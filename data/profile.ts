// =============================================================
// data/profile.ts
// SINGLE SOURCE OF TRUTH for all portfolio content.
// Edit this file to update the site — the UI renders from it.
// =============================================================

export const personalInfo = {
  name: "Faisal Mohammed",
  firstName: "Faisal",
  titles: ["Software Engineer", "AI Engineer", "Full Stack Developer"],
  tagline:
    "I build fast, intelligent, and delightful digital products — from full-stack web apps to AI-powered systems.",
  bio: [
    "I'm a software engineer who enjoys turning ambiguous problems into clean, reliable products. My focus spans full-stack web development and applied AI — building systems that are both technically sound and genuinely useful to the people who rely on them.",
    "My background blends hands-on engineering with a growing interest in AI Engineering — prompt design, LLM-powered applications, and agentic systems. I care about writing maintainable code, thoughtful UX, and shipping things that hold up in production, not just in a demo.",
    "Outside of writing code, I'm interested in fintech and mobile-first technology in emerging markets, and I enjoy learning how large-scale systems — from telecom networks to mobile money platforms — are designed to be reliable at scale.",
  ],
  location: "Accra, Ghana",
  email: "mohammedelormf@gmail.com", // TODO: replace with real email
  phone: "+233 53 824 9825", // TODO: replace with real phone
  resumeUrl: "/resume/Mohammed_Faisal_Elorm_CV.pdf",
  avatarUrl: "/avatar-placeholder.png", // TODO: replace with real photo
  availableForWork: true,
};

export const socialLinks = {
  github: "https://github.com/FaisalMohammedElorm",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  instagram: "https://www.instagram.com/faisal_forevergh/",
};

export const stats = [
  { label: "Years Learning", value: 4, suffix: "+" },
  { label: "Projects Completed", value: 15, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
  { label: "GitHub Contributions", value: 500, suffix: "+" },
];

export type Skill = {
  name: string;
  level: number; // 0-100
};

export type SkillCategory = {
  category: string;
  icon: "frontend" | "backend" | "database" | "ai" | "tools";
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    icon: "frontend",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "React JS", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "React Native", level: 70 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend & Database",
    icon: "database",
    skills: [
      { name: "MongoDB", level: 80 },
      { name: "Firebase", level: 75 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: "Tools",
    icon: "tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Vercel", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 70 },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  comingSoon?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ecoalert",
    title: "EcoAlert",
    description:
      "An environmental hazard reporting platform that lets citizens report, document and monitor community environmental issues such as waste dumping, flooding, blocked drains, water pollution and overflowing bins.",
    image: "/projects/ecoalert.png", // TODO: add project screenshot
    features: [
      "Citizen incident reporting",
      "Admin dashboard",
      "User authentication",
      "Supabase backend",
      "Image uploads",
      "Interactive maps",
      "Responsive design",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    liveUrl: "#", // TODO: add live demo link
    githubUrl: "#", // TODO: add GitHub link
    featured: true,
  },
  {
    slug: "construction-management-system",
    title: "Construction Management System",
    description:
      "A platform to manage construction projects, budgets, and site progress. Details coming soon.",
    image: "/projects/placeholder.png",
    features: [],
    technologies: ["React", "Node.js", "PostgreSQL"],
    featured: false,
    comingSoon: true,
  },
];

export type ExperienceItem = {
  role: string;
  organization: string;
  location?: string;
  period: string;
  type?: "Full-time" | "Internship" | "Freelance" | "Research";
  description: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Engineering Intern – Web Development and Maintenance",
    organization: "Kumasi Technical University",
    period: "2025",
    type: "Internship",
    description:
      "A software engineering internship focused on web development and website maintenance.",
    highlights: [
      "Developed and maintained responsive websites using modern web technologies",
      "Performed website updates, debugging and performance optimization",
      "Collaborated with team members using Slack and Jira to manage development tasks",
      "Improved website usability and ensured smooth operation across multiple devices",
    ],
  },
  {
    role: "Lab Assistant",
    organization: "Keta Nursing Training College",
    location: "Keta, Volta Region, Ghana",
    period: "April 2024 – May 2024",
    description:
      "Supported the day-to-day running of the college laboratory and the students and staff who use it.",
    highlights: [
      "Assisted students during practical laboratory sessions",
      "Maintained laboratory equipment and ensured a safe working environment",
      "Supported lecturers with laboratory preparations and technical assistance",
      "Helped organize laboratory materials and records",
    ],
  },
];

// -------------------------------------------------------------
// Certificates — files live in public/certificates/ (copies of the
// originals in /certificates). Details are transcribed from each document.
// Listed newest first.
// -------------------------------------------------------------
export type Certificate = {
  id: string;
  title: string;
  /** Wording printed on the certificate, e.g. "Certificate of Completion". */
  kind: string;
  issuer: string;
  /** What the certificate was awarded for, as stated on it. */
  description: string;
  /** Date of issue, as printed. */
  issued: string;
  /** Public path to the full-quality file. */
  file: string;
  width: number;
  height: number;
  /** Verification link printed on the certificate, if any. */
  verifyUrl?: string;
};

export const certificates: Certificate[] = [
  {
    id: "alx-prodev-frontend",
    title: "ProDev Frontend",
    kind: "Certificate of Completion",
    issuer: "ALX · Software Engineering",
    description:
      "Completed a 4-month ALX Software Engineering Programme in ProDev Frontend.",
    issued: "18 December 2025",
    file: "/certificates/85-prodev-frontend-certificate-faisal-mohammed.png",
    width: 1280,
    height: 720,
    verifyUrl: "https://savanna.alxafrica.com/certificates/BRrenpNF28",
  },
  {
    id: "alx-professional-foundations",
    title: "Professional Foundations",
    kind: "Certificate of Completion",
    issuer: "ALX",
    description:
      "Completed Professional Development Skills for the Digital Age.",
    issued: "5 August 2025",
    file: "/certificates/89-professional-foundations-certificate-faisal-mohammed.png",
    width: 1280,
    height: 720,
    verifyUrl: "https://savanna.alxafrica.com/certificates/e3SNZBnG6Y",
  },
  {
    id: "alx-virtual-assistant",
    title: "Virtual Assistant",
    kind: "Certificate of Achievement",
    issuer: "ALX",
    description:
      "Completed a 10-week programme in Virtual Assistance Skills in the Digital Age.",
    issued: "10 June 2025",
    file: "/certificates/72-virtual-assistant-certificate-faisal-mohammed.png",
    width: 1280,
    height: 720,
    verifyUrl: "https://savanna.alxafrica.com/certificates/yLzZJEYNf2",
  },
];

// The preview is page 1 of the CV rendered to an image; regenerate it
// (and update pages/size) if you replace the PDF.
export const resume = {
  file: personalInfo.resumeUrl,
  preview: "/resume/Mohammed_Faisal_Elorm_CV-preview.jpg",
  previewWidth: 1001,
  previewHeight: 1415,
  format: "PDF",
  pages: 2,
  size: "76 KB",
};

export type EducationItem = {
  institution: string;
  qualification: string;
  period: string;
  location: string;
  /** Short label shown as a badge, e.g. "Completed". Optional. */
  status?: string;
  /** "school" for secondary education, "university" for tertiary. */
  level: "school" | "university";
};

// Listed oldest → newest; the timeline renders them in this order.
export const education: EducationItem[] = [
  {
    institution: "Keta Senior High Technical School",
    qualification: "Senior High School Education",
    period: "2019 – 2022",
    location: "Keta, Volta Region, Ghana",
    level: "school",
  },
  {
    institution: "University of Ghana, Legon",
    qualification: "Bachelor of Science (BSc) in Information Technology",
    period: "2022 – 2026",
    location: "Legon, Accra, Ghana",
    status: "Completed",
    level: "university",
  },
];

export type CurrentExperience = {
  organization: string;
  shortName: string;
  position: string;
  period: string;
  institution: string;
  status: string;
  description: string;
};

export const currentExperience: CurrentExperience = {
  organization: "National Information Technology Agency",
  shortName: "NITA",
  position: "National Service Personnel",
  period: "2026 – Present",
  institution: "Ministry of Communications, Ghana",
  status: "Currently undertaking National Service",
  description:
    "My current placement following the completion of my BSc in Information Technology, and my first step into Ghana's public technology sector.",
};

export type Service = {
  title: string;
  description: string;
  icon: "code" | "web" | "mobile" | "ai" | "api" | "design" | "automation";
};

export const services: Service[] = [
  {
    title: "Software Development",
    description:
      "End-to-end software builds — from architecture to deployment — for web and cross-platform products.",
    icon: "code",
  },
  {
    title: "Web Development",
    description:
      "Fast, responsive, SEO-friendly websites and web apps built with modern frameworks.",
    icon: "web",
  },
  {
    title: "Mobile Development",
    description:
      "Cross-platform mobile apps using React Native, sharing logic with your web codebase.",
    icon: "mobile",
  },
  {
    title: "AI Solutions",
    description:
      "LLM-powered features, prompt engineering, and AI agent integrations for real products.",
    icon: "ai",
  },
  {
    title: "API Development",
    description:
      "Secure, well-documented REST APIs with authentication, validation, and clean data models.",
    icon: "api",
  },
  {
    title: "UI/UX Implementation",
    description:
      "Pixel-accurate, accessible implementations of designs with polished micro-interactions.",
    icon: "design",
  },
  {
    title: "Automation",
    description:
      "Scripts and workflows that remove repetitive manual work from your team's day-to-day.",
    icon: "automation",
  },
];

// Section links are prefixed with "/" so they also work from other pages
// (e.g. /photography) — on the home page they simply scroll.
export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Experience", href: "/#current-experience" },
  { label: "Certificates", href: "/#certificates" },
  { label: "Services", href: "/#services" },
  { label: "Photography", href: "/photography" },
  { label: "Contact", href: "/#contact" },
];

export const siteConfig = {
  url: "https://faisalmohammed.dev", // TODO: replace with real domain
  title: `${personalInfo.name} — ${personalInfo.titles.join(" / ")}`,
  description: personalInfo.tagline,
  keywords: [
    "Faisal Mohammed",
    "Software Engineer",
    "AI Engineer",
    "Full Stack Developer",
    "Portfolio",
    "Next.js Developer",
    "Ghana Software Engineer",
  ],
};
