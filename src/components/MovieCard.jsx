import { ArrowRight, Star } from "lucide-react";
import { PLACEHOLDER_POSTER } from "@/lib/api";
import { formatRating, getYear } from "@/lib/utils";

export function MovieCard({ movie, onSelect }) {
  const year = getYear(movie.premiered);
  const rating = formatRating(movie.rating?.average);
  const poster = movie.image?.medium || movie.image?.original || PLACEHOLDER_POSTER;

  return (
    <article className="group flex flex-col">
      <button
        type="button"
        onClick={() => onSelect(movie)}
        aria-label={`See details for ${movie.name}`}
        className="relative block aspect-[2/3] w-full overflow-hidden rounded-xl bg-muted ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-primary/60 focus-visible:ring-2 focus-visible:ring-primary"
      >
        <img
          src={poster}
          alt={`${movie.name} poster`}
          loading="lazy"
          onError={(event) => {
            if (event.currentTarget.src.endsWith(PLACEHOLDER_POSTER)) return;
            event.currentTarget.src = PLACEHOLDER_POSTER;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {rating && (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-background/85 px-2 py-1 text-xs font-bold text-primary backdrop-blur">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            {rating}
          </span>
        )}
      </button>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="truncate text-sm font-semibold text-foreground"
            title={movie.name}
          >
            {movie.name}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
            {year ?? "—"}
            {movie.type ? ` • ${movie.type}` : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelect(movie)}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
        >
          Details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
