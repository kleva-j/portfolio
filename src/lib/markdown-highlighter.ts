import type { CodeHighlighter } from "@tanstack/markdown";

import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { githubLightTheme } from "@tanstack/highlight/themes/github-light";
import { githubDarkTheme } from "@tanstack/highlight/themes/github-dark";
import { plaintext } from "@tanstack/highlight/languages/plaintext";
import { markdown } from "@tanstack/highlight/languages/markdown";
import { createHighlighter } from "@tanstack/highlight/core";
import { shell } from "@tanstack/highlight/languages/shell";
import { createThemeCss } from "@tanstack/highlight/theme";
import { diff } from "@tanstack/highlight/languages/diff";
import { json } from "@tanstack/highlight/languages/json";
import { html } from "@tanstack/highlight/languages/html";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { css } from "@tanstack/highlight/languages/css";
import { js } from "@tanstack/highlight/languages/js";
import { ts } from "@tanstack/highlight/languages/ts";

import { markdownRendererClassName } from "@/lib/markdown-theme";

// Heavy module: eagerly builds the highlighter at load. Import only from
// `posts.server.ts` (server) or the lazy `streaming-demo.tsx` chunk, never the
// eager client graph. Client code that only needs the class should import
// `markdown-theme.ts` instead.

// Only the languages this portfolio publishes are registered; an unknown fence
// language degrades to escaped plain text.
const highlighter = createHighlighter({
  languages: [plaintext, ts, tsx, js, json, shell, css, html, markdown, diff],
});

export const highlightMarkdownCode: CodeHighlighter =
  createTanStackMarkdownHighlighter(highlighter);

const RENDERER_CLASS = markdownRendererClassName;

// Deterministic light/dark token theme, scoped to the renderer wrapper; dark
// mode nests under `.dark` on <html>. Computed once and injected via a hoisted
// <style> in markdown.tsx.
export const markdownHighlightCss = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  lightSelector: `.${RENDERER_CLASS}`,
  darkSelector: `.dark .${RENDERER_CLASS}`,
  codeBlockSelector: `.${RENDERER_CLASS} pre.tm-code`,
  lineNumbersSelector: `.${RENDERER_CLASS} .tm-code--line-numbers`,
});
