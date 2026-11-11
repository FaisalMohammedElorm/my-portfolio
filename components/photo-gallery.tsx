"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PhotoFrame from "@/components/photo-frame";
import PhotoLightbox from "@/components/photo-lightbox";
import {
  photoCategories,
  photographs,
  type PhotoCategory,
  type PhotoOrientation,
  type Photograph,
} from "@/data/photography";
import { cn } from "@/lib/utils";

type Filter = "All" | PhotoCategory;

// A row's width is measured in summed aspect ratios (width / height).
// 3.0 ≈ one landscape + two portraits. Rows narrower than MIN_ROW_WIDTH
// (e.g. a lone last photo) keep a sensible height instead of filling the row.
const MAX_ROW_WIDTH = 3;
const MIN_ROW_WIDTH = 2.2;

const defaultAspect: Record<PhotoOrientation, number> = {
  portrait: 3 / 4,
  landscape: 3 / 2,
  square: 1,
};

type Cell = { photo: Photograph; aspect: number; index: number };

function buildRows(photos: Photograph[]): Cell[][] {
  const rows: Cell[][] = [];
  let row: Cell[] = [];
  let width = 0;

  photos.forEach((photo, index) => {
    const aspect =
      photo.width && photo.height
        ? photo.width / photo.height
        : defaultAspect[photo.orientation];
    if (row.length > 0 && width + aspect > MAX_ROW_WIDTH) {
      rows.push(row);
      row = [];
      width = 0;
    }
    row.push({ photo, aspect, index });
    width += aspect;
  });
  if (row.length > 0) rows.push(row);
  return rows;
}

export default function PhotoGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [viewing, setViewing] = useState<number | null>(null);

  // Only offer filters for categories that actually have photographs.
  const filters: Filter[] = [
    "All",
    ...photoCategories.filter((c) => photographs.some((p) => p.category === c)),
  ];

  const visible = useMemo(
    () =>
      filter === "All"
        ? photographs
        : photographs.filter((p) => p.category === filter),
    [filter]
  );

  const rows = useMemo(() => buildRows(visible), [visible]);

  return (
    <>
      <div
        role="group"
        aria-label="Filter photographs by category"
        className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14"
      >
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-colors border",
              filter === f
                ? "bg-foreground text-background border-foreground"
                : "border-border text-foreground/60 hover:text-foreground hover:border-foreground/40"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/*
        Mobile: one photo per row at full width.
        Tablet and up: justified rows — photos in a row share one height and
        each keeps its own aspect ratio, so nothing is cropped or stretched.
      */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-3 sm:gap-4"
        >
          {rows.map((row, r) => {
            const rowWidth = Math.max(
              row.reduce((sum, { aspect }) => sum + aspect, 0),
              MIN_ROW_WIDTH
            );
            return (
              <div
                key={r}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 [--gap:0.75rem] sm:[--gap:1rem]"
              >
                {row.map(({ photo, aspect, index }) => {
                  const share = aspect / rowWidth;
                  return (
                    <motion.button
                      key={photo.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.6,
                        delay: (index % 3) * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => setViewing(index)}
                      aria-label={`View ${photo.title} (${photo.category}, ${photo.orientation})`}
                      style={
                        {
                          aspectRatio: aspect,
                          "--w": `calc((100% - ${row.length - 1} * var(--gap)) * ${share})`,
                        } as React.CSSProperties
                      }
                      className="group relative block w-full sm:w-[var(--w)] shrink-0 overflow-hidden rounded-xl bg-card text-left"
                    >
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]">
                        <PhotoFrame
                          photo={photo}
                          sizes={`(min-width: 1280px) ${Math.round(
                            1200 * share
                          )}px, (min-width: 640px) ${Math.round(
                            100 * share
                          )}vw, 100vw`}
                        />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity duration-300">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/70">
                          {photo.category}
                        </p>
                        <p className="text-sm font-medium mt-0.5">
                          {photo.title}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <PhotoLightbox
        photos={visible}
        index={viewing}
        onClose={() => setViewing(null)}
        onNavigate={setViewing}
      />
    </>
  );
}
