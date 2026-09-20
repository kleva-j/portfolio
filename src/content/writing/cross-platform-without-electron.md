---
title: "Cross-platform without Electron"
date: Oct 2025
dateTime: 2025-10
category: Engineering
description: "Why I moved to a native core with thin platform clients, and what that traded away."
---

Electron is the default answer to "one codebase, every desktop." It is also a
Chromium runtime shipped with every app. For PairSync — a tool that should feel
native, launch fast, and sip memory while it waits in the background — that
tradeoff never sat right. So I moved to a native core with thin platform clients,
and this is what it cost.

## A core that knows nothing about UI

The sync engine, transport, and storage live in one portable core with no view
layer at all. It exposes a small command surface and emits events; every platform
binds to that same contract:

```ts
type Command =
  | { type: "pair"; code: string }
  | { type: "send"; path: string }
  | { type: "revoke"; deviceId: string };
```

The rule is strict: no UI concept leaks into the core, and no platform reaches
past the command surface. That boundary is the whole design.

## Thin clients, real controls

Each client is small and native — the file pickers, notifications, and menu-bar
presence people expect, wired to core commands. There is no shared widget layer
pretending every OS is the same.

## What it traded away

- **More surface to build** — a native shell per platform instead of one webview.
- **Less code reuse in the UI** — deliberately. The reuse lives in the core.
- **Fewer "just npm install it" escape hatches** — you own more of the stack.

In return: cold starts measured in tens of milliseconds, idle memory a fraction
of a webview app, and an interface that feels like it belongs on the machine.
For a background utility, that was the right bet — even though it was the harder
one.
