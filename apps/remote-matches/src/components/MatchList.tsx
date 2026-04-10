import { useAuthStore } from "@worldcup/shared-state";

export default function MatchList() {
  // Remote app chỉ cần đọc state 'user'
  const { user } = useAuthStore();
  return (
    <div
      style={{ padding: "20px", border: "2px dashed blue", marginTop: "20px" }}
    >
      <h2>⚽ Lịch Thi Đấu World Cup 2026 (Từ Remote)</h2>

      {/* Hiển thị thông điệp dựa trên state global */}
      {user ? (
        <p style={{ color: "green" }}>
          ✓ Đã đồng bộ tài khoản: <b>{user.name}</b> có thể xem chi tiết trận
          đấu.
        </p>
      ) : (
        <p style={{ color: "red" }}>
          ⚠ Vui lòng đăng nhập ở Header để xem thông tin chi tiết.
        </p>
      )}

      <ul>
        <li>🇻🇳 Vietnam vs 🇹🇭 Thailand</li>
        <li>🇯🇵 Japan vs 🇰🇷 South Korea</li>
      </ul>
    </div>
  );
}
