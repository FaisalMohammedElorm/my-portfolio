"use client";

import { motion } from "framer-motion";
import {
  Code,
  Globe,
  Smartphone,
  Sparkles,
  Plug,
  PenTool,
  Bot,
  LucideIcon,
} from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { services } from "@/data/profile";

const iconMap: Record<string, LucideIcon> = {
  code: Code,
  web: Globe,
  mobile: Smartphone,
  ai: Sparkles,
  api: Plug,
  design: PenTool,
  automation: Bot,
};

export default function Services() {
  return (
    <section id="services" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Services"
          title="How I can help"
          description="Whether you need a full product built or a specific problem solved, here's where I add the most value."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-border bg-card p-7 shadow-card transition-shadow hover:shadow-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
