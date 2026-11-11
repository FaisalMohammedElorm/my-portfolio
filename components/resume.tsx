"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Files, HardDrive } from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import { personalInfo, resume } from "@/data/profile";

export default function Resume() {
  return (
    <section id="resume" className="py-24 sm:py-32 bg-accent/40">
      <div className="section-container">
        <SectionHeading eyebrow="Resume" title="Professional Resume" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-2xl border border-border bg-card shadow-card p-6 sm:p-10 grid gap-8 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12 items-center">
            {/* Page-one preview — opens the full PDF */}
            <a
              href={resume.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open my CV (PDF) in a new tab"
              className="group relative mx-auto w-full max-w-[15rem] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-card"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg border border-border bg-muted"
              />
              <Image
                src={resume.preview}
                alt="First page of my CV"
                width={resume.previewWidth}
                height={resume.previewHeight}
                sizes="240px"
                className="relative rounded-lg border border-border shadow-card transition duration-300 group-hover:-translate-y-1 group-hover:-translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              />
            </a>

            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <FileText size={22} aria-hidden />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold">
                {personalInfo.name} — CV
              </h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">
                Explore my academic background, technical experience, skills,
                and professional journey.
              </p>

              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-foreground/60">
                <li className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                  <FileText size={12} aria-hidden />
                  {resume.format}
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                  <Files size={12} aria-hidden />
                  {resume.pages} pages
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1">
                  <HardDrive size={12} aria-hidden />
                  {resume.size}
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={resume.file}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white font-medium shadow-glow hover:bg-primary-dark transition-colors"
                >
                  <Download size={16} aria-hidden />
                  Download CV
                </a>
                <a
                  href={resume.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border font-medium hover:bg-accent transition-colors"
                >
                  <ExternalLink size={16} aria-hidden />
                  View CV
                </a>
              </div>
              <p className="mt-3 text-xs text-foreground/50">
                View CV opens in your browser&apos;s PDF viewer in a new tab.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
