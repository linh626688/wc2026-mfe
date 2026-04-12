import { MemoryRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@worldcup/shared-state";
import type { MatchListProps, Match } from "@worldcup/types";

// ─── Mock data ────────────────────────────────────────────────────────────
// Dùng interface Match từ @worldcup/types → đảm bảo type nhất quán
const MATCHES: Match[] = [
  { id: "vie-tha", home: "🇻🇳 Vietnam", away: "🇹🇭 Thailand" },
  { id: "jpn-kor", home: "🇯🇵 Japan",   away: "🇰🇷 South Korea" },
];

// PageProps: dùng Pick để lấy chỉ phần cần thiết từ MatchListProps
// Tránh copy-paste interface → luôn đồng bộ với nguồn gốc
type PageProps = Pick<MatchListProps, "onNavigate">;

// ─── Trang danh sách ──────────────────────────────────────────────────────
function MatchListPage({ onNavigate }: PageProps) {
  const { user } = useAuthStore();
  // useNavigate: điều hướng bên trong MemoryRouter của Remote
  const navigate = useNavigate();

  const handleMatchClick = (matchId: string) => {
    // Bước 1: Điều hướng bên trong MemoryRouter → render MatchDetail
    navigate(`/${matchId}`);

    // Bước 2: Báo lên Host để cập nhật URL trình duyệt thật
    // Nếu không có onNavigate → Remote vẫn hoạt động độc lập (standalone mode)
    onNavigate?.(`/matches/${matchId}`);
  };

  return (
    <div style={{ padding: "20px", border: "2px dashed blue", marginTop: "20px" }}>
      <h2>⚽ Lịch Thi Đấu World Cup 2026 (Từ Remote)</h2>

      {user ? (
        <p style={{ color: "green" }}>✓ Đã đồng bộ: <b>{user.name}</b></p>
      ) : (
        <p style={{ color: "red" }}>⚠ Vui lòng đăng nhập để xem chi tiết.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {MATCHES.map((match) => (
          <li key={match.id} style={{ marginBottom: "8px" }}>
            <button
              onClick={() => handleMatchClick(match.id)}
              style={{ cursor: "pointer", padding: "8px 16px" }}
            >
              {match.home} vs {match.away} →
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Trang chi tiết ───────────────────────────────────────────────────────
function MatchDetail({ onNavigate }: PageProps) {
  // useParams: đọc /:matchId từ MemoryRouter
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const match = MATCHES.find((m) => m.id === matchId);

  const handleBack = () => {
    // Bước 1: Quay lại danh sách trong MemoryRouter
    navigate("/");
    // Bước 2: Đồng bộ URL Host về /matches
    onNavigate?.("/matches");
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleBack} style={{ marginBottom: "12px", cursor: "pointer" }}>
        ← Quay lại
      </button>
      {match ? (
        <>
          <h2>📋 {match.home} vs {match.away}</h2>
          <p>Match ID: <code>{matchId}</code></p>
        </>
      ) : (
        <p style={{ color: "red" }}>❌ Không tìm thấy trận đấu: {matchId}</p>
      )}
    </div>
  );
}

// ─── Props interface cho MatchList (exported) ─────────────────────────────
interface MatchListProps {
  onNavigate?: (path: string) => void;
  // initialPath: Host truyền xuống để MemoryRouter biết bắt đầu ở đâu
  // Ví dụ: Host URL "/matches/vie-tha" → initialPath = "/vie-tha"
  initialPath?: string;
}

// ─── Component chính được export cho Host ─────────────────────────────────
export default function MatchList({ onNavigate, initialPath = "/" }: MatchListProps) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        {/*
          Truyền onNavigate xuống các page thông qua props.
          TẠI SAO không dùng Context?
          → onNavigate chỉ cần bởi 2 component nhỏ, dùng Context là over-engineering.
          → Props đơn giản hơn, dễ trace data flow hơn.
        */}
        <Route path="/" element={<MatchListPage onNavigate={onNavigate} />} />
        <Route path="/:matchId" element={<MatchDetail onNavigate={onNavigate} />} />
      </Routes>
    </MemoryRouter>
  );
}
