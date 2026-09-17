import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const BACKDROP =
  "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=2000&q=80";

const stats = [
  { value: "10K+", label: "Titles" },
  { value: "HD", label: "Posters" },
  { value: "Live", label: "Search" },
];

export function Hero() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-neutral-950">
      {!imageFailed && (
        <img
          src={BACKDROP}
          alt=""
          aria-hidden="true"
          onError={() => setImageFailed(true)}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-background/80" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            New releases every week
          </span>

          <h1 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Discover
            <br />
            <span className="text-primary">Movies</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Explore and discover your favorite movies and TV shows from around
            the world. Search thousands of titles and dive into the details.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/movies" className={buttonVariants({ size: "lg" })}>
              Explore Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/movies"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Show all
            </Link>
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-6">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
