import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08 },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const viewportOnce = { once: true, margin: "-80px" };
