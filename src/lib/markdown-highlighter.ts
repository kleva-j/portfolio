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
const RENDERER_CLASS = "markdown-renderer";

export const markdownRendererClassName = RENDERER_CLASS;

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
