"use client";

import { motion } from "framer-motion";
import {
  Landmark,
  Briefcase,
  Building2,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { education, currentExperience } from "@/data/profile";

// Journey strip: every education entry, then the current placement.
const journey = [
  ...education.map((e) => ({
    period: e.period,
    label: e.institution,
    current: false,
  })),
  {
    period: currentExperience.period,
    label: `${currentExperience.organization} (${currentExperience.shortName})`,
    current: true,
  },
];

export default function CurrentExperience() {
  const xp = currentExperience;

  return (
    <section id="current-experience" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Current Experience"
          title="Where I am now"
          description="From the lecture hall into Ghana's technology sector."
        />

        {/* Progression: school → university → NITA */}
        <motion.ol
          aria-label="My journey so far"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto mb-10 grid gap-6 sm:grid-cols-3"
        >
          {journey.map((step, i) => (
            <motion.li
              key={step.label}
              variants={fadeUp}
              custom={i}
              aria-current={step.current ? "step" : undefined}
              className={cn(
                "relative rounded-xl border px-4 py-3",
                step.current
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-card"
              )}
            >
              <p
                className={cn(
                  "text-xs font-medium",
                  step.current ? "text-primary" : "text-foreground/50"
                )}
              >
                {step.period}
              </p>
              <p className="mt-0.5 text-sm font-semibold leading-snug">
                {step.label}
              </p>

              {i < journey.length - 1 && (
                <>
                  <ChevronRight
                    size={16}
                    aria-hidden
                    className="hidden sm:block absolute -right-5 top-1/2 -translate-y-1/2 text-foreground/30"
                  />
                  <ChevronDown
                    size={16}
                    aria-hidden
                    className="sm:hidden absolute -bottom-5 left-1/2 -translate-x-1/2 text-foreground/30"
                  />
                </>
              )}
            </motion.li>
          ))}
        </motion.ol>

        {/* Featured placement card */}
        <motion.article
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto"
        >
          <div className="group rounded-2xl p-px bg-gradient-to-br from-primary via-secondary/60 to-border shadow-glow transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
            <div className="relative overflow-hidden rounded-[15px] bg-card p-6 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
              />

              <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Landmark size={26} aria-hidden />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                      <span aria-hidden className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping motion-reduce:animate-none" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      Current placement
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground/60">
                      <CalendarDays size={12} aria-hidden />
                      {xp.period}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-balance">
                    {xp.organization}{" "}
                    <span className="text-foreground/40">({xp.shortName})</span>
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-lg text-foreground/80">
                    <Briefcase
                      size={18}
                      aria-hidden
                      className="text-primary shrink-0"
                    />
                    {xp.position}
                  </p>

                  <p className="mt-4 max-w-2xl text-foreground/70 leading-relaxed">
                    {xp.description}
                  </p>

                  <dl className="mt-6 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
                    <div>
                      <dt className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-foreground/50">
                        <Building2 size={13} aria-hidden />
                        Institution
                      </dt>
                      <dd className="text-sm font-medium">{xp.institution}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-foreground/50">
                        <BadgeCheck size={13} aria-hidden />
                        Status
                      </dt>
                      <dd className="text-sm font-medium">{xp.status}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
