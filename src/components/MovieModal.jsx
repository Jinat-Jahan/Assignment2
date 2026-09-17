import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Calendar, Star, Tv, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLACEHOLDER_POSTER } from "@/lib/api";
import { formatDate, formatRating, stripHtml } from "@/lib/utils";

export function MovieModal({ movie, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!movie) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const poster =
    movie.image?.original || movie.image?.medium || PLACEHOLDER_POSTER;
  const rating = formatRating(movie.rating?.average);
  const summary =
    stripHtml(movie.summary) || "No summary is available for this title.";
  const network = movie.network?.name || movie.webChannel?.name || "Unknown";
  const genres = movie.genres?.length ? movie.genres : ["Uncategorized"];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-modal-title"
    >
      <div
        className="animate-overlay-in fixed inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="animate-panel-in relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-border bg-background shadow-2xl sm:max-h-[88dvh] sm:rounded-2xl">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid overflow-y-auto sm:grid-cols-[minmax(0,260px)_1fr]">
          <div className="relative h-44 w-full overflow-hidden bg-muted sm:h-auto">
            <img
              src={poster}
              alt={`${movie.name} poster`}
              onError={(event) => {
                if (event.currentTarget.src.endsWith(PLACEHOLDER_POSTER)) return;
                event.currentTarget.src = PLACEHOLDER_POSTER;
              }}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {movie.type || "Show"} details
            </p>
            <h2
              id="movie-modal-title"
              className="mt-1 text-xl font-bold tracking-tight sm:text-2xl"
            >
              {movie.name}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {rating && (
                <Badge variant="default">
                  <Star className="mr-1 h-3 w-3 fill-current" aria-hidden="true" />
                  {rating}
                </Badge>
              )}
              <Badge variant="secondary">
                <Calendar className="mr-1 h-3 w-3" aria-hidden="true" />
                {formatDate(movie.premiered)}
              </Badge>
              <Badge variant="secondary">
                <Tv className="mr-1 h-3 w-3" aria-hidden="true" />
                {network}
              </Badge>
              {movie.status && <Badge variant="outline">{movie.status}</Badge>}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overview
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                {summary}
              </p>
            </div>

            <div className="mt-6">
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4" aria-hidden="true" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
