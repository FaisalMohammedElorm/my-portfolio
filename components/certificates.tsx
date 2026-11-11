"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Building2,
  CalendarDays,
  Eye,
  Download,
  ShieldCheck,
  Maximize2,
} from "lucide-react";
import { fadeUp, viewportOnce } from "@/lib/animations";
import SectionHeading from "@/components/section-heading";
import CertificateViewer from "@/components/certificate-viewer";
import { certificates } from "@/data/profile";

export default function Certificates() {
  const [viewing, setViewing] = useState<number | null>(null);

  return (
    <section id="certificates" className="py-24 sm:py-32">
      <div className="section-container">
        <SectionHeading
          eyebrow="Certificates"
          title="Certifications & Academic Credentials"
          description="Programmes I've completed alongside my degree. Open any certificate to inspect it, or verify it with the issuer."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.li
              key={cert.id}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <article className="group h-full flex flex-col rounded-2xl border border-border bg-card shadow-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                {/* Thumbnail — opens the viewer */}
                <button
                  type="button"
                  onClick={() => setViewing(i)}
                  aria-label={`View ${cert.title} certificate`}
                  className="relative block aspect-video overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                >
                  <Image
                    src={cert.file}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-900 opacity-0 translate-y-1 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <Maximize2 size={13} aria-hidden />
                      Preview
                    </span>
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                    <Award size={13} aria-hidden />
                    {cert.kind}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60 leading-relaxed">
                    {cert.description}
                  </p>

                  <dl className="mt-4 space-y-1.5 text-sm text-foreground/60">
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Issued by</dt>
                      <Building2 size={14} aria-hidden className="shrink-0" />
                      <dd>{cert.issuer}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Date of issue</dt>
                      <CalendarDays size={14} aria-hidden className="shrink-0" />
                      <dd>{cert.issued}</dd>
                    </div>
                  </dl>

                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setViewing(i)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                      <Eye size={15} aria-hidden />
                      View Certificate
                    </button>
                    <a
                      href={cert.file}
                      download
                      aria-label={`Download ${cert.title} certificate`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
                    >
                      <Download size={15} aria-hidden />
                      Download
                    </a>
                  </div>

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 self-start text-xs text-foreground/50 transition-colors hover:text-primary"
                    >
                      <ShieldCheck size={13} aria-hidden />
                      Verify with issuer
                    </a>
                  )}
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>

      <CertificateViewer
        certificates={certificates}
        index={viewing}
        onClose={() => setViewing(null)}
        onNavigate={setViewing}
      />
    </section>
  );
}
