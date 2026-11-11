"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { fadeUp, slideInLeft, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import ProjectCard from "@/components/project-card";
import { projects } from "@/data/profile";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects I've built"
          description="A selection of things I've shipped — plus a few more on the way."
        />

        {featured && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative rounded-3xl border border-border overflow-hidden mb-16 grid lg:grid-cols-2 shadow-card"
          >
            <motion.div
              variants={slideInLeft}
              className="relative aspect-video lg:aspect-auto bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent flex items-center justify-center"
            >
              {/* TODO: replace with next/image of the real EcoAlert screenshot */}
              <span className="text-foreground/30 text-sm">
                Project Preview
              </span>
            </motion.div>

            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                Featured Project
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
                {featured.title}
              </h3>
              <p className="text-foreground/60 mb-6 leading-relaxed">
                {featured.description}
              </p>

              <ul className="grid grid-cols-2 gap-2 mb-6">
                {featured.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm text-foreground/70 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-8">
                {featured.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
                  >
                    <Github size={15} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
