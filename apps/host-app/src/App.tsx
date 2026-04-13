import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@worldcup/shared-state";
import LiveScoreWrapper from './components/LiveScoreWrapper';

const RemoteMatchList = lazy(() => import("remote_matches/MatchList"));
// trigger
// ─── AppLayout: nằm BÊN TRONG BrowserRouter nên dùng được useNavigate ─────
// TẠI SAO phải tách ra?
// → useNavigate() cần BrowserRouter context phía trên nó trong cây component.
// → Nếu gọi useNavigate() trong App() cùng chỗ có <BrowserRouter> → lỗi:
//   "useNavigate() may be used only in the context of a <Router>"
function AppLayout() {
  const { user, login, logout } = useAuthStore();

  // useNavigate: lấy hàm để thay đổi URL trình duyệt
  const navigate = useNavigate();

  // useLocation: đọc URL hiện tại
  // Dùng để tính initialPath truyền xuống Remote (deep link)
  const location = useLocation();

  // Tính initialPath cho MemoryRouter của Remote:
  // Host URL: /matches/vie-tha → Remote initialPath: /vie-tha
  // Host URL: /matches         → Remote initialPath: /
  const getInitialPath = () => {
    const prefix = "/matches";
    if (location.pathname.startsWith(prefix)) {
      return location.pathname.slice(prefix.length) || "/";
    }
    return "/";
  };

  return (
    <>
      <header
        style={{
          background: "#f4f4f4",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>🏆 Host App: Bảng Điều Khiển WC 2026</h1>
        <nav style={{ display: 'flex', gap: '12px' }}>
          <Link to="/">🏠 Home</Link>
          <Link to="/matches">⚽ Lịch thi đấu</Link>
        </nav>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>👤 Xin chào, {user.name}</span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <button onClick={() => login({ name: "Chuyên gia Frontend", role: "admin" })}>
              Đăng nhập
            </button>
          )}
        </div>
      </header>

      <main style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
          <Routes>
            <Route path="/" element={
              <p style={{ color: '#888' }}>👈 Chọn "Lịch thi đấu" từ menu để bắt đầu</p>
            } />

            <Route path="/matches/*" element={
              <Suspense fallback={<p>Đang tải lịch thi đấu...</p>}>
                {/*
                  onNavigate: khi Remote điều hướng nội bộ,
                  nó gọi callback này → Host cập nhật URL thật

                  initialPath: truyền đoạn path sau "/matches" xuống
                  để MemoryRouter của Remote bắt đầu đúng chỗ (deep link)
                */}
                <RemoteMatchList
                  key={location.pathname}
                  onNavigate={(path: string) => navigate(path)}
                  initialPath={getInitialPath()}
                />
              </Suspense>
            } />
          </Routes>
        </div>

        <aside style={{ width: '350px', backgroundColor: '#222', color: 'white', padding: '15px', borderRadius: '10px' }}>
          <Suspense fallback="Loading Widget...">
            <LiveScoreWrapper matchId="vie-tha" />
          </Suspense>
        </aside>
      </main>
    </>
  );
}

// ─── App: chỉ bao BrowserRouter, không có logic ───────────────────────────
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
