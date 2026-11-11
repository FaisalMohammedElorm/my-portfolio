"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { experience } from "@/data/profile";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-accent/40">
      <div className="section-container">
        <SectionHeading eyebrow="Previous Experience" title="Where I've worked" />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <motion.div
                key={`${item.role}-${i}`}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className={`relative flex sm:items-center gap-6 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                <div className="absolute left-5 sm:left-1/2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background sm:-translate-x-1/2 z-10" />

                <div className="hidden sm:block sm:w-1/2" />

                <div className="pl-14 sm:pl-0 sm:w-1/2">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                    {item.type && (
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                        <Briefcase size={13} />
                        {item.type}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold">{item.role}</h3>
                    <p className="text-sm text-foreground/60 mb-1">
                      {item.organization}
                      {item.location && ` · ${item.location}`} · {item.period}
                    </p>
                    <p className="text-sm text-foreground/70 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                    {item.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {item.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-sm text-foreground/60 flex gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
