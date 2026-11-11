"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { personalInfo } from "@/data/profile";

export default function PhotographyIntro() {
  return (
    <div className="section-container text-center mb-12 sm:mb-16">
      <motion.span
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="inline-block text-xs font-semibold tracking-[0.4em] uppercase text-primary mb-5"
      >
        Photography
      </motion.span>
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-balance"
      >
        Through my lens.
      </motion.h1>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="mt-5 text-base sm:text-lg text-foreground/60 max-w-xl mx-auto text-balance"
      >
        A visual collection of moments, people, places, nature, and everyday
        stories.
      </motion.p>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="mt-8 flex items-center justify-center gap-3 text-xs tracking-[0.25em] uppercase text-foreground/40"
      >
        <span className="h-px w-10 bg-foreground/20" />
        {personalInfo.name}
        <span className="h-px w-10 bg-foreground/20" />
      </motion.div>
    </div>
  );
}
