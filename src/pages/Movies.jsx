import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { MovieGrid } from "@/components/MovieGrid";
import { MovieModal } from "@/components/MovieModal";
import { Button } from "@/components/ui/button";
import { getShows, searchShows } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

const ALL_GENRES = "All";

export default function Movies() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 450);

  const [shows, setShows] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [activeGenre, setActiveGenre] = useState(ALL_GENRES);

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searching, setSearching] = useState(false);

  const [error, setError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [loadMoreError, setLoadMoreError] = useState("");

  const [reloadKey, setReloadKey] = useState(0);
  const [searchReloadKey, setSearchReloadKey] = useState(0);
  const [selected, setSelected] = useState(null);

  const trimmedQuery = debouncedQuery.trim();
  const isSearchMode = trimmedQuery.length > 0;

  useEffect(() => {
    let active = true;
    setInitialLoading(true);
    setError("");
    setPage(0);
    setHasMore(true);

    getShows(0)
      .then((data) => {
        if (!active) return;
        setShows(data);
        setHasMore(data.length > 0);
      })
      .catch(() => {
        if (active) {
          setError("We couldn't load movies right now. Please try again.");
        }
      })
      .finally(() => {
        if (active) setInitialLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reloadKey]);

  useEffect(() => {
    if (!trimmedQuery) return undefined;

    let active = true;
    setSearching(true);
    setSearchError("");

    searchShows(trimmedQuery)
      .then((data) => {
        if (active) setResults(data);
      })
      .catch(() => {
        if (active) setSearchError("Search failed. Please try again.");
      })
      .finally(() => {
        if (active) setSearching(false);
      });

    return () => {
      active = false;
    };
  }, [trimmedQuery, searchReloadKey]);

  const genreOptions = useMemo(() => {
    const set = new Set();
    shows.forEach((show) => show.genres?.forEach((genre) => set.add(genre)));
    return [ALL_GENRES, ...Array.from(set).sort()].slice(0, 13);
  }, [shows]);

  const filteredShows = useMemo(() => {
    if (activeGenre === ALL_GENRES) return shows;
    return shows.filter((show) => show.genres?.includes(activeGenre));
  }, [shows, activeGenre]);

  function handleQueryChange(value) {
    setQuery(value);
    if (!value.trim()) {
      setSearchError("");
      setSearching(false);
    }
  }

  async function handleLoadMore() {
    const nextPage = page + 1;
    setLoadingMore(true);
    setLoadMoreError("");

    try {
      const data = await getShows(nextPage);
      setShows((previous) => [...previous, ...data]);
      setPage(nextPage);
      setHasMore(data.length > 0);
    } catch {
      setLoadMoreError("We couldn't load more movies. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  }

  const movies = isSearchMode ? results : filteredShows;
  const loading = isSearchMode ? searching : initialLoading;
  const activeError = isSearchMode ? searchError : error;

  const countLabel = loading
    ? "Loading titles..."
    : isSearchMode
      ? `${movies.length} ${movies.length === 1 ? "result" : "results"}`
      : `${movies.length} ${movies.length === 1 ? "title" : "titles"}${
          activeGenre !== ALL_GENRES ? ` in ${activeGenre}` : ""
        }`;

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                {isSearchMode ? "Search" : "Library"}
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {isSearchMode ? `Results for “${trimmedQuery}”` : "Browse Movies"}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">{countLabel}</p>
          </div>

          <div className="mt-6 max-w-xl">
            <SearchBar value={query} onChange={handleQueryChange} />
          </div>

          {!isSearchMode && genreOptions.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {genreOptions.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setActiveGenre(genre)}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                    activeGenre === genre
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <MovieGrid
          movies={movies}
          loading={loading}
          error={activeError}
          onSelect={setSelected}
          onRetry={() =>
            isSearchMode
              ? setSearchReloadKey((key) => key + 1)
              : setReloadKey((key) => key + 1)
          }
          emptyTitle={isSearchMode ? "No results found" : "No titles here"}
          emptyDescription={
            isSearchMode
              ? `We couldn't find anything for “${trimmedQuery}”. Try a different title.`
              : `No titles match the “${activeGenre}” filter yet.`
          }
        />

        {!isSearchMode && hasMore && !initialLoading && !error && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore && <Loader2 className="h-4 w-4 animate-spin" />}
              {loadingMore ? "Loading..." : "Load more"}
            </Button>
            {loadMoreError && (
              <p className="text-sm text-destructive">{loadMoreError}</p>
            )}
          </div>
        )}
      </section>

      <MovieModal movie={selected} onClose={() => setSelected(null)} />
    </>
  );
}
