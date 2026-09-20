The interactive bookshelf on this site is the one place I let the design go loud.
A real-time Three.js scene is also the fastest way to tank a page's performance,
so the interesting work was not making it look good — it was making it look good
while staying out of the main thread's way.

## Instancing over object soup

The first draft created a mesh per book. That is thousands of draw calls before
anything moves. Collapsing them into a single instanced mesh turned the whole
shelf into one draw call:

```ts
const shelf = new THREE.InstancedMesh(geometry, material, count);
for (let i = 0; i < count; i++) {
  matrix.setPosition(layout[i].x, layout[i].y, layout[i].z);
  shelf.setMatrixAt(i, matrix);
}
```

Per-book variation (spine art, slight rotation) moves into instance attributes
and a texture atlas instead of separate materials.

## Know when to stop rendering

The scene does not need to run when nobody is looking at it. Two cheap wins:

- Pause the render loop when the canvas leaves the viewport.
- Respect `prefers-reduced-motion` and fall back to a static frame.

> [!NOTE] Frame budget is a feature
> Sixty frames a second is sixteen milliseconds each. Treating that as a hard
> budget — not an aspiration — is what keeps scroll smooth on a laptop battery.

## The payoff

Instancing plus a texture atlas plus not rendering off-screen took the showcase
from a fan-spinning novelty to something that holds its frame rate on a mid-tier
machine. The lesson generalizes: the cheapest work is the work you decide not to
do.
