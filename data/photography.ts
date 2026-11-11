export type PhotoOrientation = "portrait" | "landscape" | "square";

// Add a category here to make it available as a gallery filter.
// Filters only appear for categories that have at least one photograph.
export const photoCategories = [
  "Portraits",
  "Nature",
  "Landscapes",
  "Street",
  "City",
  "Events",
  "Cinematic",
] as const;

export type PhotoCategory = (typeof photoCategories)[number];

export type Photograph = {
  id: string;
  title: string;
  category: PhotoCategory;
  orientation: PhotoOrientation;
  // Path inside /public, e.g. "/photography/my-photo.jpg".
  // Leave it out to show an elegant placeholder frame instead.
  src?: string;
  // Pixel size of the image file. The gallery uses it to show the photo at
  // its true shape, uncropped. Without it, a default shape for the
  // orientation is used (3:4 portrait, 3:2 landscape, 1:1 square).
  width?: number;
  height?: number;
  // Describe what is in the photograph, for screen readers.
  alt: string;
};

// Photos are laid out in rows, in this order. Each row fills up until it
// holds about one landscape plus two portraits' worth of width, then a new
// row starts — so the order below decides which photos sit side by side.
export const photographs: Photograph[] = [
  // Row 1
  {
    id: "photo-14",
    title: "Boats at Sunset",
    category: "Landscapes",
    orientation: "landscape",
    src: "/photography/photo_14_2026-10-03_17-28-42.jpg",
    width: 1280,
    height: 719,
    alt: "Small boats resting on a shoreline under an orange sunset sky",
  },
  {
    id: "photo-4",
    title: "Leaves & Droplets",
    category: "Nature",
    orientation: "portrait",
    src: "/photography/photo_4_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Close-up of a leafy plant covered in water droplets against a soft green background",
  },
  // Row 2
  {
    id: "photo-10",
    title: "Under the Clouds",
    category: "City",
    orientation: "portrait",
    src: "/photography/photo_10_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Multi-storey hotel building above green treetops beneath heavy clouds",
  },
  {
    id: "photo-1",
    title: "Graffiti Wall",
    category: "Street",
    orientation: "square",
    src: "/photography/photo_1_2026-10-03_17-28-42.jpg",
    width: 1227,
    height: 1280,
    alt: "Black-and-white photo of graffiti on a small building beside a brick path under trees",
  },
  {
    id: "photo-8",
    title: "Reflections",
    category: "Street",
    orientation: "portrait",
    src: "/photography/photo_8_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Buildings and trees reflected in a puddle on a road under an overcast sky",
  },
  // Row 3
  {
    id: "photo-13",
    title: "University of Ghana",
    category: "Street",
    orientation: "landscape",
    src: "/photography/photo_13_2026-10-03_17-28-42.jpg",
    width: 1280,
    height: 960,
    alt: "Entrance sign reading University of Ghana beside palm trees and a pedestrian crossing sign",
  },
  {
    id: "photo-6",
    title: "Paving & Leaf",
    category: "Street",
    orientation: "portrait",
    src: "/photography/photo_6_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Low-angle close-up of wet paving stones with water and an orange leaf in the foreground",
  },
  {
    id: "photo-3",
    title: "Chain-Link Fence",
    category: "Street",
    orientation: "portrait",
    src: "/photography/photo_3_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "View through a green chain-link fence onto grass scattered with fallen leaves",
  },
  // Row 4
  {
    id: "photo-9",
    title: "Overcast City",
    category: "City",
    orientation: "portrait",
    src: "/photography/photo_9_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Tall building rising above trees and parked vehicles under a cloudy sky",
  },
  {
    id: "photo-2",
    title: "Light Bulb",
    category: "Cinematic",
    orientation: "landscape",
    src: "/photography/photo_2_2026-10-03_17-28-42.jpg",
    width: 1280,
    height: 960,
    alt: "Glowing filament light bulb hanging in the dark with blurred blue light behind it",
  },
  {
    id: "photo-5",
    title: "Puddle on Paving",
    category: "Street",
    orientation: "portrait",
    src: "/photography/photo_5_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Low-angle close-up of a small puddle between paving stones",
  },
  // Row 5
  {
    id: "photo-11",
    title: "Sunset Traffic",
    category: "City",
    orientation: "portrait",
    src: "/photography/photo_11_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Orange sunset behind a billboard and silhouetted vehicles in traffic",
  },
  {
    id: "photo-7",
    title: "Paving & Leaf II",
    category: "Street",
    orientation: "portrait",
    src: "/photography/photo_7_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Close-up of wet paving stones with an orange leaf resting in water",
  },
  {
    id: "photo-12",
    title: "Evening Sky",
    category: "City",
    orientation: "portrait",
    src: "/photography/photo_12_2026-10-03_17-28-42.jpg",
    width: 960,
    height: 1280,
    alt: "Dramatic clouds and setting sun over a paved car park with street lights",
  },
];
