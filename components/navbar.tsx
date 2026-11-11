"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { navLinks, personalInfo } from "@/data/profile";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState("/#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Other pages (e.g. /photography) highlight their own link.
    if (!isHome) {
      setActive(pathname);
      return;
    }

    const sections = navLinks
      .filter((l) => l.href.startsWith("/#"))
      .map((l) => document.getElementById(l.href.slice(2)))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav
        className={cn(
          "section-container flex items-center justify-between rounded-full transition-all duration-300",
          scrolled ? "glass shadow-card py-2.5 px-5" : "px-2 py-1"
        )}
      >
        <Link
          href="/#home"
          className="font-display font-bold text-lg tracking-tight"
        >
          {personalInfo.firstName}
          <span className="text-primary">.</span>
        </Link>

        <ul className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors",
                  active === link.href
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden w-9 h-9 flex items-center justify-center rounded-full border border-border"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden overflow-hidden mx-4 mt-2"
          >
            <div className="glass rounded-2xl p-4 flex flex-col gap-1 shadow-card">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    active === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
