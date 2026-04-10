import { lazy, Suspense, useEffect } from "react";
import { useAuthStore } from "@worldcup/shared-state";
import LiveScoreWrapper from './components/LiveScoreWrapper';

const RemoteMatchList = lazy(() => import("remote_matches/MatchList"));

function App() {
  // Lấy state và actions từ global store
  const { user, login, logout } = useAuthStore();

  return (
    <div>
      <header
        style={{
          background: "#f4f4f4",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>🏆 Host App: Bảng Điều Khiển WC 2026</h1>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "10px" }}>
                👤 Xin chào, {user.name}
              </span>
              <button onClick={logout}>Đăng xuất</button>
            </>
          ) : (
            <button
              onClick={() =>
                login({ name: "Chuyên gia Frontend", role: "admin" })
              }
            >
              Đăng nhập
            </button>
          )}
        </div>
      </header>
      {/* <main style={{ padding: "20px" }}>
        <Suspense fallback={<p>Đang tải lịch thi đấu...</p>}>
          <RemoteMatchList />
        </Suspense>
      </main> */}

      <main style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Khu vực trung tâm: Hiển thị danh sách trận đấu - Ta sẽ setup Route Synce sau */}
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
          <h2>Remote Matches Placeholder</h2>
          <Suspense fallback={<p>Đang tải lịch thi đấu...</p>}>
            <RemoteMatchList />
          </Suspense>
        </div>
        {/* Cột bên phải: Hiển thị Tỷ số trực tiếp từ Vue */}
        <aside style={{ width: '350px', backgroundColor: '#222', color: 'white', padding: '15px', borderRadius: '10px' }}>
          <h3>Live: Vietnam vs Thailand</h3>
          {/* Lệnh gọi tới Widget Vue */}
          <Suspense fallback="Loading Widget...">
            <LiveScoreWrapper matchId="vie-tha" />
          </Suspense>
        </aside>
      </main>
    </div>
  );
}

export default App;
