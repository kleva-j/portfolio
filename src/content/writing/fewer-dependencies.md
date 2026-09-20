---
title: "Reaching for fewer dependencies"
date: Dec 2025
dateTime: 2025-12
category: Notes
description: "Every package is a small bet on someone else's roadmap. A few heuristics I now use before adding one."
demo: true
---

Every package you add is a small, quiet bet on someone else's roadmap. Sometimes
that bet pays for itself in an afternoon. Sometimes it compounds into a migration
you never chose. Here is the checklist I now run before reaching for a dependency
— and why the [portfolio](/) itself renders through one I trust.

## Read the shape before the README

A dependency's real interface is its exported types, not its marketing. For a
renderer, I want a document model I can hold onto:

```ts
import { parseMarkdown } from "@tanstack/markdown/parser";

const document = parseMarkdown(source);
const cached = JSON.stringify(document); // plain objects, safe to store
```

That `document` is plain data — no classes, no closures — so it serializes,
caches, and re-renders deterministically. Parse once, render many.

> [!TIP] Treat the AST as the source of truth
> Render HTML on the server, React on the client, and the same tree drives both.
> Presentation changes never force a reparse.

## Enable only what you need

Broad stacks pull in an ecosystem. I opt into a small set instead:

| Concern             | Cost   |
| ------------------- | ------ |
| Callouts + headings | 2.3 KB |
| Streaming responses | 0.2 KB |
| Syntax highlighting | opt-in |

The rules I keep coming back to:

- Prefer a **narrow entry point** over a convenient default barrel.
- Keep unsafe behavior _explicit_ — raw HTML stays escaped unless I say otherwise.
- Push presentation concerns, like highlighting, to the edge of the system.

## Keep the diff boring

When a dependency finally does need to change, the diff should stay dull — which
is exactly what you want from infrastructure:

```diff
- import remark from "remark";
+ import { parseMarkdown } from "@tanstack/markdown/parser";
```

Fewer bets, held deliberately. That is the whole trick.
