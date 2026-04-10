// ============================================================
// CUSTOM ELEMENTS (WEB COMPONENTS) - JSX AUGMENTATION
//
// ⚠️  File này BẮT BUỘC phải có `export {}` ở top-level.
//
// Lý do: Với React 19 + "moduleDetection": "force" trong tsconfig,
// `declare module 'react'` chỉ hoạt động như MODULE AUGMENTATION
// (mở rộng React, giữ nguyên FC/useState/...) khi file này là ES Module.
//
// Nếu THIẾU `export {}`:
//   → File là Script → `declare module 'react'` THAY THẾ hoàn toàn
//     package react → FC, useState, mọi type biến mất!
//
// Tách file riêng để tránh conflict với `remotes.d.ts` (ambient declarations).
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
          /** ID trận đấu — truyền qua HTML attribute (chỉ nhận string) */
          'match-id'?: string;
          /** Dùng `class` thay cho `className` trong Web Component */
          class?: string;
        },
        HTMLElement
      >;
    }
  }
}
