// ============================================================
// REMOTE MODULE DECLARATIONS (Ambient - Script File)
//
// ⚠️  This file MUST NOT have a top-level `export` or `import`.
// Reason: When the file is a SCRIPT (no export/import), TypeScript
// understands `declare module 'foo'` as an AMBIENT DECLARATION:
//   → "Module 'foo' exists at runtime (created by Module Federation),
//      TypeScript should trust it and skip resolving the physical file."
//
// If the file is a MODULE (has export {}), `declare module 'foo'` becomes
// MODULE AUGMENTATION → TypeScript requires 'foo' to EXIST beforehand
// → "Cannot find module" because this is a virtual MFE module!
// ============================================================

declare module 'remote_matches/MatchList' {
  import { FC } from 'react';
  // Import from @worldcup/types — single source of truth for props contract
  // When Remote changes MatchListProps, just update packages/types/src/index.ts
  import type { MatchListProps } from '@worldcup/types';

  const MatchList: FC<MatchListProps>;
  export default MatchList;
}

// Side-effect import: register custom element <wc-live-score> to window
// When host-app runs `import("remote_live/LiveScore")`, this file is
// executed → customElements.define("wc-live-score", ...) runs → valid tag
declare module 'remote_live/LiveScore' { }
