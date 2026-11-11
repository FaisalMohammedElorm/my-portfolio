"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={cn(
        "mb-14",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left",
        className
      )}
    >
      <span className="inline-block text-sm font-semibold tracking-widest uppercase text-primary mb-3">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-foreground/60 text-balance">
          {description}
        </p>
      )}
    </motion.div>
  );
}
