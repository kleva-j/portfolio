// Ambient env typing. Merges with vite/client's `ImportMetaEnv` (loaded via the
// tsconfig `types` array) so `import.meta.env.VITE_SITE_URL` is a typed string
// rather than `any`.
interface ImportMetaEnv {
  /** Absolute production origin for canonical/OG URLs. Protocol optional. */
  readonly VITE_SITE_URL?: string;
}
