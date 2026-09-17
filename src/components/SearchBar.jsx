import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ value, onChange, placeholder = "Search for a movie..." }) {
  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className="relative w-full"
    >
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Search for a movie"
        className="pl-11 pr-11 [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
