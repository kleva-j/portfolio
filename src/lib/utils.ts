export { cn } from "cn";

export function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const WORDS_PER_MINUTE = 200;
const MIN_READING_MINUTES = 2;

export function calcReadingTime(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(
    MIN_READING_MINUTES,
    Math.ceil(words / WORDS_PER_MINUTE),
  );
  return `${minutes} min read`;
}
