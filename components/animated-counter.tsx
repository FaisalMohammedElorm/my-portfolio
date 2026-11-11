"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  duration?: number;
};

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.6,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
