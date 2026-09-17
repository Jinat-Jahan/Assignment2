import { RefreshCw, SearchX, TriangleAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { MovieCard } from "@/components/MovieCard";

const GRID_CLASS =
  "grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

function SkeletonCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <Skeleton className="mt-3 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/3" />
    </div>
  );
}

function StateMessage({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-base font-semibold uppercase tracking-wide">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}

export function MovieGrid({
  movies,
  loading = false,
  error = "",
  onSelect,
  onRetry,
  emptyTitle = "No movies found",
  emptyDescription = "Try adjusting your search to find what you're looking for.",
}) {
  if (loading) {
    return (
      <div className={GRID_CLASS} aria-busy="true" aria-label="Loading movies">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <StateMessage
        icon={TriangleAlert}
        title="Something went wrong"
        description={error}
        action={
          onRetry ? (
            <Button variant="outline" size="sm" className="mt-5" onClick={onRetry}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Try again
            </Button>
          ) : null
        }
      />
    );
  }

  if (!movies.length) {
    return (
      <StateMessage
        icon={SearchX}
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className={GRID_CLASS}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </div>
  );
}
