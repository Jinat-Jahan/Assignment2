import { Clapperboard, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Clapperboard className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold uppercase tracking-widest">
                Movie<span className="text-primary">Explorer</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A clean, fast way to browse, search and discover movies and TV
              shows from around the world.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Resources
            </span>
            <a
              href="https://www.tvmaze.com/api"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              TVMaze API
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            © 2026 MovieExplorer. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Built with React &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
