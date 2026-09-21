---
title: "Designing PairSync's sync protocol without a server"
date: Jun 2026
dateTime: 2026-06
category: Engineering
description: "How I built conflict-free file and clipboard sync over a direct peer connection — no cloud, no relay, no accounts."
draft: true
---

Most sync tools start with a server. It is the obvious place to put the source
of truth, resolve conflicts, and fan out changes. PairSync starts from the
opposite constraint: no cloud, no relay, no accounts. Two devices, a direct
connection, and whatever guarantees I can build on top of that.

## The connection is the easy part

A direct link between peers is largely a solved problem — hole punching with a
lightweight signaling step, then an encrypted channel. The hard part is what you
send over it. A naive "push my file, overwrite yours" loses data the moment both
sides edit while briefly offline.

## Model changes, not files

The protocol never syncs files. It syncs an ordered log of changes, each tagged
with a logical clock:

```ts
type Op = {
  id: string; // device id + counter
  clock: number; // Lamport timestamp
  path: string;
  kind: "put" | "delete";
};
```

Each device keeps its own counter and takes the max it has seen, so two peers
that reconnect after an hour apart can replay each other's log and land on the
same state — without a referee.

> [!TIP] Conflicts are a UI decision, not a data-loss event
> When two ops touch the same path, the protocol keeps both and surfaces the
> collision. Nothing is silently dropped; the user chooses.

## What this buys

- **Offline-first by default** — the log is the source of truth, not a server.
- **Auditable** — every state is reachable by replaying ops in clock order.
- **Small surface** — the transport can change without touching merge logic.

The result is boring in the best way: reconnect two laptops after a flight and
the clipboard history is simply there, in order, on both.
