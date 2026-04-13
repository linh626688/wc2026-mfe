import { MemoryRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@worldcup/shared-state";
import type { MatchListProps, Match } from "@worldcup/types";

// Import CSS Module
// Vite tự động hash tên class: .container → ._container_abc123
// Đảm bảo không bao giờ conflict với Host hay Remote khác
import styles from "./MatchList.module.css";

// ─── Mock data ────────────────────────────────────────────────────────────
const MATCHES: Match[] = [
  { id: "vie-tha", home: "🇻🇳 Vietnam", away: "🇹🇭 Thailand" },
  { id: "jpn-kor", home: "🇯🇵 Japan",   away: "🇰🇷 South Korea" },
];

type PageProps = Pick<MatchListProps, "onNavigate">;

// ─── Trang danh sách ──────────────────────────────────────────────────────
function MatchListPage({ onNavigate }: PageProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleMatchClick = (matchId: string) => {
    navigate(`/${matchId}`);
    onNavigate?.(`/matches/${matchId}`);
  };

  return (
    // Dùng styles.container thay vì style={{...}} inline
    // → CSS nằm trong file .module.css, dễ maintain hơn
    <div className={styles.container}>
      <h2 className={styles.title}>⚽ Lịch Thi Đấu World Cup 2026</h2>

      {user ? (
        // Kết hợp 2 class: statusAuth (base) + statusLoggedIn (modifier)
        <p className={`${styles.statusAuth} ${styles.statusLoggedIn}`}>
          ✓ Đã đồng bộ: <b>{user.name}</b>
        </p>
      ) : (
        <p className={`${styles.statusAuth} ${styles.statusGuest}`}>
          ⚠ Vui lòng đăng nhập để xem chi tiết.
        </p>
      )}

      <ul className={styles.matchList}>
        {MATCHES.map((match) => (
          <li key={match.id}>
            <button
              className={styles.matchItem}
              onClick={() => handleMatchClick(match.id)}
            >
              <span>{match.home} vs {match.away}</span>
              <span className={styles.matchArrow}>→</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Trang chi tiết ───────────────────────────────────────────────────────
function MatchDetail({ onNavigate }: PageProps) {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const match = MATCHES.find((m) => m.id === matchId);

  const handleBack = () => {
    navigate("/");
    onNavigate?.("/matches");
  };

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={handleBack}>
        ← Quay lại
      </button>

      {match ? (
        <div className={styles.detailCard}>
          <p className={styles.detailTeams}>
            {match.home} vs {match.away}
          </p>
          <p className={styles.detailMeta}>
            Match ID: <code>{matchId}</code>
          </p>
        </div>
      ) : (
        <p className={styles.errorText}>
          ❌ Không tìm thấy trận đấu: {matchId}
        </p>
      )}
    </div>
  );
}

// ─── Component chính được export cho Host ─────────────────────────────────
export default function MatchList({ onNavigate, initialPath = "/" }: MatchListProps) {
  return (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<MatchListPage onNavigate={onNavigate} />} />
        <Route path="/:matchId" element={<MatchDetail onNavigate={onNavigate} />} />
      </Routes>
    </MemoryRouter>
  );
}
