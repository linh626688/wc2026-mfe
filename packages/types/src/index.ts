// ============================================================
// @worldcup/types — Shared Type Definitions
//
// Package này là "contract" chung giữa các MFE apps.
// Mọi interface được dùng ở nhiều hơn 1 app đều đặt ở đây.
//
// TẠI SAO cần package riêng thay vì khai báo trong từng app?
// → Tránh khai báo trùng lặp (duplication) → dễ lệch nhau.
// → Khi Remote thay đổi props, chỉ cần sửa 1 chỗ duy nhất.
// → TypeScript đảm bảo cả Host và Remote cùng dùng đúng type.
// ============================================================

// ─── User (dùng chung giữa Host, Remote và shared-state) ─────────────────
export interface User {
  name: string;
  role: string;
}

// ─── MatchList Remote Component Props ────────────────────────────────────
// Đây là "API contract" giữa Host và remote-matches.
// Host truyền vào → Remote nhận.
export interface MatchListProps {
  /**
   * Callback để Remote thông báo Host khi cần thay đổi URL trình duyệt.
   * Remote gọi: onNavigate("/matches/vie-tha")
   * Host thực thi: navigate("/matches/vie-tha") → URL thật thay đổi
   *
   * Optional vì Remote có thể chạy standalone (port 5001) không cần Host.
   */
  onNavigate?: (path: string) => void;

  /**
   * Path khởi tạo cho MemoryRouter của Remote.
   * Host tính từ URL hiện tại và truyền xuống để hỗ trợ Deep Link.
   *
   * Ví dụ:
   *   Host URL: /matches/vie-tha → initialPath = "/vie-tha"
   *   Host URL: /matches         → initialPath = "/"
   *
   * Default: "/" (trang danh sách)
   */
  initialPath?: string;
}

// ─── Match Data ───────────────────────────────────────────────────────────
export interface Match {
  id: string;
  home: string;
  away: string;
  date?: string;
  time?: string;
}
