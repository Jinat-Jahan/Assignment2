import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clapperboard, Search, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieModal } from "@/components/MovieModal";
import { buttonVariants } from "@/components/ui/button";
import { getShows } from "@/lib/api";
import { cn } from "@/lib/utils";

const HOME_LIMIT = 10;

const features = [
  {
    icon: Clapperboard,
    title: "Thousands of titles",
    description:
      "Browse a vast catalogue of movies and TV shows from around the world.",
  },
  {
    icon: Search,
    title: "Instant search",
    description:
      "Find exactly what you are looking for with fast, title-based search.",
  },
  {
    icon: Sparkles,
    title: "Rich details",
    description: "Dive into ratings, genres, release dates and full summaries.",
  },
];

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");

    getShows(0)
      .then((data) => {
        if (active) setMovies(data.slice(0, HOME_LIMIT));
      })
      .catch(() => {
        if (active) {
          setError("We couldn't load movies right now. Please try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  return (
    <>
      <Hero />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-px bg-border sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-background p-8">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-sm font-semibold uppercase tracking-wider">
                {title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Library
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Popular right now
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A hand-picked selection of titles to get you started.
            </p>
          </div>

          <Link
            to="/movies"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Show all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10">
          <MovieGrid
            movies={movies}
            loading={loading}
            error={error}
            onSelect={setSelected}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        </div>

        <div className="mt-10 flex justify-center sm:hidden">
          <Link
            to="/movies"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          >
            Show all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </>
  );
}
