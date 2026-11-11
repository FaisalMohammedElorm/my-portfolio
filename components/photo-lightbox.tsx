"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PhotoFrame from "@/components/photo-frame";
import type { Photograph } from "@/data/photography";
import { cn } from "@/lib/utils";

type Props = {
  photos: Photograph[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function PhotoLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const photo = open ? photos[index] : null;

  const go = (dir: number) => {
    if (index === null) return;
    onNavigate((index + dir + photos.length) % photos.length);
  };

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
      if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the viewer.
        const buttons = dialogRef.current.querySelectorAll("button");
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
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
      {photo && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${photo.title}, photo ${index + 1} of ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex flex-col"
          onClick={onClose}
        >
          <div
            className="flex items-center justify-between px-5 sm:px-8 py-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-sm font-medium">{photo.title}</p>
              <p className="text-xs text-white/50 tracking-wide uppercase">
                {photo.category} · {index + 1} / {photos.length}
              </p>
            </div>
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close viewer"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center px-4 sm:px-20 pb-8 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative overflow-hidden rounded-lg",
                  photo.src
                    ? "w-full h-full"
                    : photo.orientation === "portrait"
                    ? "w-[min(88vw,calc(72vh*0.75))] aspect-[3/4]"
                    : photo.orientation === "square"
                    ? "w-[min(88vw,72vh)] aspect-square"
                    : "w-[min(88vw,calc(72vh*1.5))] aspect-[3/2]"
                )}
              >
                <PhotoFrame
                  photo={photo}
                  sizes="100vw"
                  fit="contain"
                />
              </motion.div>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Previous photograph"
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Next photograph"
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
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
