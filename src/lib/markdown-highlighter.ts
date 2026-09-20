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

/**
 * HEAVY MODULE. Eagerly builds the highlighter (tokenizer + grammars + themes)
 * at load. It must never be imported from the eager client graph. Two importers
 * are allowed:
 *   - `posts.server.ts` (server-only), which renders post HTML on the server; and
 *   - `streaming-demo.tsx`, a `React.lazy` client component whose entire point is
 *     to run the tokenizer client-side — it deliberately pulls this into an
 *     isolated, demo-only lazy chunk, never the initial client bundle.
 * Anything reachable from the initial client bundle must import
 * `markdown-theme.ts` instead.
 */

/**
 * Syntax highlighting is kept as an explicit, external integration — TanStack
 * Markdown bundles no tokenizer, grammars, or themes. Only the languages this
 * portfolio actually publishes are registered here; any unknown fence language
 * degrades to escaped plain text rather than pulling in a broad runtime.
 */
const highlighter = createHighlighter({
  languages: [plaintext, ts, tsx, js, json, shell, css, html, markdown, diff],
});

/**
 * TanStack Markdown owns each `<pre><code>` shell. This adapter returns only the
 * escaped inner token markup for that container, so it must not be confused with
 * Highlight's high-level HTML methods (which emit their own wrapper).
 */
export const highlightMarkdownCode: CodeHighlighter =
  createTanStackMarkdownHighlighter(highlighter);

/** Wrapper class the highlight theme selectors are scoped to. */
const RENDERER_CLASS = markdownRendererClassName;

/**
 * Deterministic light/dark token theme, scoped to the renderer wrapper. Dark
 * mode is driven by the `.dark` class on `<html>` (see theme-provider.tsx), so
 * the dark selector nests under it. Computed once at module load; the string is
 * injected through a deduped React 19 hoisted `<style>` in markdown.tsx.
 */
export const markdownHighlightCss = createThemeCss({
  light: githubLightTheme,
  dark: githubDarkTheme,
  lightSelector: `.${RENDERER_CLASS}`,
  darkSelector: `.dark .${RENDERER_CLASS}`,
  codeBlockSelector: `.${RENDERER_CLASS} pre.tm-code`,
  lineNumbersSelector: `.${RENDERER_CLASS} .tm-code--line-numbers`,
});
