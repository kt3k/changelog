// Minimal ambient declarations so the worker compiles without pulling in
// @cloudflare/workers-types. The .ttf data modules resolve to ArrayBuffers
// via the wrangler "Data" rule (see wrangler.jsonc).
declare module "*.ttf" {
  const data: ArrayBuffer;
  export default data;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
}

declare const caches: { default: Cache };
