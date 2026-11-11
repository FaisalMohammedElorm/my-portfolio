"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Clock } from "lucide-react";
import type { Project } from "@/data/profile";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-card"
    >
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
        {project.comingSoon && (
          <div className="absolute inset-0 flex items-center justify-center glass">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Clock size={14} /> Coming Soon
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center text-foreground/20 text-sm">
          {/* TODO: replace with next/image of a real project screenshot */}
          Project Preview
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-foreground/60 mb-4 line-clamp-3">
          {project.description}
        </p>

        {project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ExternalLink size={14} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground"
            >
              <Github size={14} /> GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
