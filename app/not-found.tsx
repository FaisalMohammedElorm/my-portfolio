import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <span className="text-8xl font-display font-bold gradient-text">
        404
      </span>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-foreground/60 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
