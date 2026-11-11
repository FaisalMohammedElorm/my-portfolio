"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import AnimatedCounter from "@/components/animated-counter";
import { personalInfo, stats } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="About Me"
          title="Get to know me a little better"
        />

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-3 space-y-5"
          >
            {personalInfo.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                custom={i}
                className="text-foreground/70 leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="lg:col-span-2 grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <div className="text-3xl sm:text-4xl font-display font-bold text-primary">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-foreground/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
