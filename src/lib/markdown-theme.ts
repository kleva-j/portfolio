// Client-safe markdown theming constants. This module carries no heavy
// dependencies, so it is safe to import from client components. The wrapper
// class scopes both the prose styles (styles.css) and the server-generated
// highlight theme (markdown-highlighter.ts, server-only).
export const markdownRendererClassName = "markdown-renderer";
