import { Github, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { navLinks, personalInfo, socialLinks } from "@/data/profile";

const socials = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: socialLinks.twitter, label: "Twitter / X" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="section-container py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <a href="#home" className="font-display font-bold text-xl">
            {personalInfo.firstName}
            <span className="text-primary">.</span>
          </a>
          <p className="mt-3 text-sm text-foreground/60 max-w-xs">
            {personalInfo.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
            Navigation
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
            Connect
          </h3>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="text-center text-xs text-foreground/50">
          © {new Date().getFullYear()} {personalInfo.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
