"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  MapPin,
  CalendarDays,
  CheckCircle2,
  ArrowDown,
  LucideIcon,
} from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { education, type EducationItem } from "@/data/profile";

const levelIcon: Record<EducationItem["level"], LucideIcon> = {
  school: School,
  university: GraduationCap,
};

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 bg-accent/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Education"
          title="Academic background"
          description="The foundation behind my work in technology."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting rail: draws downward on scroll, then hands off to the next section. */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-6 bottom-6 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-primary via-secondary to-primary/30"
          />

          <ol className="space-y-8">
            {education.map((item, i) => {
              const Icon = levelIcon[item.level];
              return (
                <motion.li
                  key={item.institution}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="relative pl-20"
                >
                  <div className="absolute left-0 top-0 w-12 h-12 rounded-xl border border-border bg-card text-primary flex items-center justify-center shadow-card">
                    <Icon size={22} aria-hidden />
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/60">
                        <CalendarDays size={12} aria-hidden />
                        {item.period}
                      </span>
                      {item.status && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <CheckCircle2 size={12} aria-hidden />
                          {item.status}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-display font-bold text-balance">
                      {item.institution}
                    </h3>
                    <p className="mt-1 text-foreground/70">
                      {item.qualification}
                    </p>
                    <p className="mt-4 flex items-center gap-1.5 text-sm text-foreground/50">
                      <MapPin size={14} aria-hidden className="shrink-0" />
                      {item.location}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* Hand-off into the Current Experience section */}
          <motion.div
            variants={fadeUp}
            custom={education.length}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative pl-20 mt-8 h-12 flex items-center"
          >
            <span
              aria-hidden
              className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping motion-reduce:animate-none" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary" />
              </span>
            </span>
            <a
              href="#current-experience"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-primary focus-visible:text-primary"
            >
              Next chapter: Current experience
              <ArrowDown
                size={14}
                aria-hidden
                className="transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
