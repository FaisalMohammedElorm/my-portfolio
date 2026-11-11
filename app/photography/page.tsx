import type { Metadata } from "next";
import PhotographyIntro from "@/components/photography-intro";
import PhotoGallery from "@/components/photo-gallery";

export const metadata: Metadata = {
  title: "Photography",
  description:
    "A visual collection of moments, people, places, nature, and everyday stories.",
};

export default function PhotographyPage() {
  return (
    <section className="pt-32 sm:pt-40 pb-8">
      <PhotographyIntro />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        <PhotoGallery />
      </div>
    </section>
  );
}
