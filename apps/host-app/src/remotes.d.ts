// ============================================================
// REMOTE MODULE DECLARATIONS (Ambient - Script File)
//
// ⚠️  File này KHÔNG được có `export` hay `import` ở top-level.
//
// Lý do: Khi file là SCRIPT (không có export/import), TypeScript
// hiểu `declare module 'foo'` là AMBIENT DECLARATION:
//   → "Module 'foo' tồn tại ở runtime (do Module Federation tạo ra),
//      TypeScript hãy tin tưởng và bỏ qua việc resolve file vật lý."
//
// Nếu file là MODULE (có export {}), `declare module 'foo'` trở thành
// MODULE AUGMENTATION → TypeScript yêu cầu 'foo' phải TỒN TẠI trước
// → "Cannot find module" vì đây là virtual MFE module!
// ============================================================

declare module 'remote_matches/MatchList' {
  import { FC } from 'react';
  // Import từ @worldcup/types — nguồn sự thật duy nhất cho props contract
  // Khi Remote thay đổi MatchListProps, chỉ cần sửa packages/types/src/index.ts
  import type { MatchListProps } from '@worldcup/types';

  const MatchList: FC<MatchListProps>;
  export default MatchList;
}

// Side-effect import: đăng ký custom element <wc-live-score> vào window
// Khi host-app chạy `import("remote_live/LiveScore")`, file này được
// executed → customElements.define("wc-live-score", ...) chạy → tag hợp lệ
declare module 'remote_live/LiveScore' { }