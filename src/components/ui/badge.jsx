import { cn } from "@/lib/utils";

const variants = {
  default: "border-primary/30 bg-primary/10 text-primary",
  secondary: "border-border bg-secondary text-secondary-foreground",
  outline: "border-border text-muted-foreground",
};

export function Badge({ className, variant = "secondary", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
