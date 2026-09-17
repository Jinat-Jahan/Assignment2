import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants = {
  default: "bg-primary text-primary-foreground hover:brightness-110",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
  outline:
    "border border-border bg-transparent text-foreground hover:border-foreground/40 hover:bg-accent",
  ghost: "text-muted-foreground hover:bg-accent hover:text-foreground",
  destructive:
    "bg-destructive text-destructive-foreground hover:brightness-110",
  inverse: "bg-white text-neutral-950 hover:bg-white/90",
};

const sizes = {
  default: "h-10 px-5",
  sm: "h-9 px-4 text-xs",
  lg: "h-12 px-7",
  icon: "h-10 w-10",
};

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export const Button = forwardRef(function Button(
  { className, variant = "default", size = "default", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
});
