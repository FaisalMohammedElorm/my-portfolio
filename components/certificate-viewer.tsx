"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Download,
  ExternalLink,
} from "lucide-react";
import type { Certificate } from "@/data/profile";
import { cn } from "@/lib/utils";

type Props = {
  certificates: Certificate[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const ZOOM_LEVELS = [1, 1.5, 2, 3];

const toolButton =
  "w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70";

export default function CertificateViewer({
  certificates,
  index,
  onClose,
  onNavigate,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [zoomStep, setZoomStep] = useState(0);
  const open = index !== null;
  const cert = open ? certificates[index] : null;
  const zoom = ZOOM_LEVELS[zoomStep];

  const go = (dir: number) => {
    if (index === null) return;
    onNavigate((index + dir + certificates.length) % certificates.length);
  };
  const zoomBy = (dir: number) =>
    setZoomStep((s) => Math.min(Math.max(s + dir, 0), ZOOM_LEVELS.length - 1));

  // Each certificate opens fitted to the screen.
  useEffect(() => setZoomStep(0), [index]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "+" || e.key === "=") zoomBy(1);
      if (e.key === "-") zoomBy(-1);
      if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the viewer.
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not(:disabled), a[href]"
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <AnimatePresence>
      {cert && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${cert.title} certificate, ${index + 1} of ${certificates.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col"
          onClick={onClose}
        >
          {/* Header: details + actions */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-8 py-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{cert.title}</p>
              <p className="text-xs text-white/50 tracking-wide uppercase">
                {cert.issuer} · {cert.issued}
                {certificates.length > 1 &&
                  ` · ${index + 1} / ${certificates.length}`}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => zoomBy(-1)}
                disabled={zoomStep === 0}
                aria-label="Zoom out"
                className={toolButton}
              >
                <ZoomOut size={17} />
              </button>
              <span
                aria-live="polite"
                className="w-12 text-center text-xs tabular-nums text-white/70"
              >
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => zoomBy(1)}
                disabled={zoomStep === ZOOM_LEVELS.length - 1}
                aria-label="Zoom in"
                className={toolButton}
              >
                <ZoomIn size={17} />
              </button>
              <span aria-hidden className="mx-1 h-6 w-px bg-white/20" />
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open original in a new tab"
                title="Open original in a new tab"
                className={toolButton}
              >
                <ExternalLink size={17} />
              </a>
              <a
                href={cert.file}
                download
                aria-label="Download certificate"
                title="Download certificate"
                className={toolButton}
              >
                <Download size={17} />
              </a>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close viewer"
                title="Close (Esc)"
                className={toolButton}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Document stage — scrolls to pan when zoomed */}
          <div className="relative flex-1 min-h-0 px-2 sm:px-20 pb-6">
            <div
              className="h-full w-full flex overflow-auto overscroll-contain"
              onClick={onClose}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  onClick={(e) => e.stopPropagation()}
                  className={cn(
                    "m-auto shrink-0",
                    zoom === 1 && "w-full h-full flex"
                  )}
                  style={
                    zoom === 1
                      ? undefined
                      : { width: `min(${zoom * 100}%, ${cert.width * zoom}px)` }
                  }
                >
                  <Image
                    src={cert.file}
                    alt={`${cert.title} certificate issued by ${cert.issuer} on ${cert.issued}`}
                    width={cert.width}
                    height={cert.height}
                    unoptimized
                    priority
                    className={cn(
                      "rounded-lg shadow-2xl",
                      zoom === 1
                        ? "m-auto max-h-full w-auto max-w-full object-contain"
                        : "w-full h-auto"
                    )}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {certificates.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous certificate"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next certificate"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
