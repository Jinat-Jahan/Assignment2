const BASE_URL = "https://api.tvmaze.com";

export const PLACEHOLDER_POSTER = "/poster-placeholder.svg";

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

export const SHOWS_PER_PAGE = 250;

export async function getShows(page = 0) {
  return request(`/shows?page=${page}`);
}

export async function searchShows(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const results = await request(`/search/shows?q=${encodeURIComponent(trimmed)}`);
  return results.map((entry) => entry.show);
}
