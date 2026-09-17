export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function stripHtml(html) {
  if (!html) return "";
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return String(html).replace(/<[^>]*>/g, "");
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function getYear(dateString) {
  if (!dateString) return null;
  const year = String(dateString).slice(0, 4);
  return /^\d{4}$/.test(year) ? year : null;
}

export function formatDate(dateString) {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRating(average) {
  if (average === null || average === undefined) return null;
  return Number(average).toFixed(1);
}
