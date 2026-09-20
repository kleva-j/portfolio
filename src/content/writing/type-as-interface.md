This site has almost no chrome. No cards stacked on cards, no drop shadows
earning their keep, no accent color fighting for attention. That was not a
minimalist pose — it was a decision to let **type and whitespace carry the
interface**, and to delete every border that was not doing real work.

## Type is the layout

When you commit to typography as the primary UI, the hierarchy has to live in
the type scale, not in boxes. A few rules did most of the work:

- One display face for headings, one text face for everything else.
- A reading measure capped around 68 characters — never full-bleed prose.
- Metadata (dates, counts, labels) set in mono, so numbers align and read as
  data rather than sentences.

## One accent, used sparingly

There is exactly one accent — a copper drawn from the OKLCH token set — and it
only appears on things you can act on: links, the active nav item, a live
indicator. If everything is emphasized, nothing is.

| Element | Treatment                         |
| ------- | --------------------------------- |
| Body    | Foreground token, ~1.6 leading    |
| Links   | Copper, underline on hover        |
| Rules   | Single hairline border, no shadow |

## Cut the borders that do nothing

The last pass was subtractive. Every divider had to justify itself: does it
separate two things that would otherwise be ambiguous? If not, it went. What is
left reads less like a dashboard and more like a well-set page — which is the
whole point.
