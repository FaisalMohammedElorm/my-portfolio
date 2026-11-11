"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="absolute top-[-10%] left-[-5%] w-[420px] h-[420px] bg-primary/30 rounded-full blur-[110px] animate-blob" />
      <div className="absolute top-[20%] right-[-10%] w-[480px] h-[480px] bg-secondary/25 rounded-full blur-[120px] animate-blob [animation-delay:3s]" />
      <div className="absolute bottom-[-15%] left-[20%] w-[400px] h-[400px] bg-primary-light/20 rounded-full blur-[100px] animate-blob [animation-delay:6s]" />
    </div>
  );
}
