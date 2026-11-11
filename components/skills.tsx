"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Sparkles,
  Wrench,
  LucideIcon,
} from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { skillCategories } from "@/data/profile";

const iconMap: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  ai: Sparkles,
  tools: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32 bg-accent/40">
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="Technologies I work with"
          description="A snapshot of the tools and technologies I use to design, build, and ship products."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((group, gi) => {
            const Icon = iconMap[group.icon];
            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                custom={gi}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-semibold">{group.category}</h3>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  className="space-y-4"
                >
                  {group.skills.map((skill, si) => (
                    <motion.div key={skill.name} variants={fadeUp} custom={si}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-foreground/50">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={viewportOnce}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
