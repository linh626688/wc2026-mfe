// ============================================================
// CUSTOM ELEMENTS (WEB COMPONENTS) - JSX AUGMENTATION
//
// ⚠️  This file MUST have `export {}` at the top-level.
//
// Reason: With React 19 + "moduleDetection": "force" in tsconfig,
// `declare module 'react'` only works as MODULE AUGMENTATION
// (extends React, keeping FC/useState/...) when this file is an ES Module.
//
// If `export {}` is MISSING:
//   → File is a Script → `declare module 'react'` REPLACES the entire
//     react package → FC, useState, all types disappear!
//
// Separated to its own file to avoid conflicts with `remotes.d.ts` (ambient declarations).
// ============================================================
export { };

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * Vue 3 Web Component: Live Score Widget
       *
       * Được đăng ký tại remote-live/src/main.ts:
       *   customElements.define("wc-live-score", defineCustomElement(LiveScore))
       *
       * @example
       * <wc-live-score match-id="vie-tha" />
       */
      'wc-live-score': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          /** Match ID — passed via HTML attribute (only accepts string) */
          'match-id'?: string;
          /** Use `class` instead of `className` in Web Components */
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}
