import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Clapperboard } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinkClass = ({ isActive }) =>
  cn(
    "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:text-foreground",
  );

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/90 backdrop-blur"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-bold uppercase tracking-widest">
            Movie<span className="text-primary">Explorer</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-border bg-card/60 p-1 md:flex"
          aria-label="Primary"
        >
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={navLinkClass}>
            Movies
          </NavLink>
        </nav>

        <Link to="/movies" className={buttonVariants({ size: "sm" })}>
          Browse Movies
        </Link>
      </div>
    </header>
  );
}
