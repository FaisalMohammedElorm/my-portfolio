"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";
import AnimatedBackground from "@/components/animated-background";
import { personalInfo, socialLinks } from "@/data/profile";

function useTypewriter(words: string[], speed = 90, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === currentWord) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting
              ? currentWord.slice(0, t.length - 1)
              : currentWord.slice(0, t.length + 1)
          );
        },
        deleting ? speed / 2 : speed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(personalInfo.titles);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
    >
      <AnimatedBackground />

      {/* Floating shapes */}
      <motion.div
        className="absolute top-32 right-[8%] w-20 h-20 rounded-2xl glass hidden md:block"
        animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-[6%] w-14 h-14 rounded-full glass hidden md:block"
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-[18%] w-8 h-8 rounded-lg bg-secondary/40 hidden lg:block"
        animate={{ y: [0, -14, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          {personalInfo.availableForWork
            ? "Available for new opportunities"
            : "Currently focused on existing commitments"}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-balance max-w-4xl"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 h-9 flex items-center"
        >
          <span className="text-xl sm:text-2xl font-semibold text-foreground/80">
            {typed}
            <span className="inline-block w-[2px] h-6 bg-primary ml-1 animate-pulse align-middle" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg text-foreground/60 max-w-xl text-balance"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white font-medium shadow-glow hover:bg-primary-dark transition-colors"
          >
            View Projects
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border font-medium hover:bg-accent transition-colors"
          >
            <Mail size={16} />
            Contact Me
          </a>
          <a
            href={personalInfo.resumeUrl}
            download
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border font-medium hover:bg-accent transition-colors"
          >
            <Download size={16} />
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-12 flex items-center gap-4"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground/50 hover:text-primary transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground/50 hover:text-primary transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
