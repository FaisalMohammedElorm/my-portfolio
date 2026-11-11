import Image from "next/image";
import { Aperture } from "lucide-react";
import type { Photograph } from "@/data/photography";
import { cn } from "@/lib/utils";

const tones = [
  "from-primary/30 via-card to-secondary/10",
  "from-secondary/25 via-card to-primary/10",
  "from-foreground/10 via-card to-primary/20",
  "from-primary/15 via-muted to-secondary/25",
];

// Stable tone per photo, so a placeholder looks the same wherever it appears.
const toneFor = (id: string) =>
  tones[[...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) % tones.length];

type Props = {
  photo: Photograph;
  sizes: string;
  // "cover" fills the frame (gallery); "contain" shows the whole photo (viewer).
  fit?: "cover" | "contain";
  className?: string;
};

export default function PhotoFrame({
  photo,
  sizes,
  fit = "cover",
  className,
}: Props) {
  if (photo.src) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className={cn(
          fit === "cover" ? "object-cover" : "object-contain",
          className
        )}
      />
    );
  }

  const ratioLabel = { portrait: "3 : 4", landscape: "3 : 2", square: "1 : 1" }[
    photo.orientation
  ];

  return (
    <div
      role="img"
      aria-label={`${photo.orientation} photograph placeholder: ${photo.title}`}
      className={cn(
        "absolute inset-0 bg-gradient-to-br",
        toneFor(photo.id),
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.25))]" />

      {/* Viewfinder corner marks */}
      <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-foreground/25" />
      <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-foreground/25" />
      <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-foreground/25" />
      <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-foreground/25" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <Aperture size={22} className="text-foreground/30 mb-3" strokeWidth={1.25} />
        <span className="text-[11px] font-semibold tracking-[0.35em] uppercase text-foreground/60">
          {photo.orientation}
        </span>
        <span className="mt-1.5 text-[11px] text-foreground/40">
          Replace with photograph
        </span>
      </div>

      <span className="absolute top-4 inset-x-0 text-center text-[10px] tracking-[0.25em] text-foreground/30 font-mono">
        {ratioLabel}
      </span>
    </div>
  );
}
