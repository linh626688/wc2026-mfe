import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@worldcup/shared-state";
import LiveScoreWrapper from './components/LiveScoreWrapper';
import { Button, Heading, Text, Card } from "@worldcup/ui-component";
import "@worldcup/ui-component/design-system.css";

const RemoteMatchList = lazy(() => import("remote_matches/MatchList"));
// trigger
// ─── AppLayout: inside BrowserRouter so we can use useNavigate ─────
// WHY separate this?
// → useNavigate() requires a Router context above it in the component tree.
// → If we call useNavigate() in App() where <BrowserRouter> is defined → error:
//   "useNavigate() may be used only in the context of a <Router>"
function AppLayout() {
  const { user, login, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useNavigate: get function to change browser URL
  const navigate = useNavigate();

  // useLocation: reading current URL
  // Used to calculate initialPath to pass down to Remote (deep link)
  const location = useLocation();

  // Calculate initialPath for MemoryRouter inside Remote:
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
    <div className="bg-pure-white" style={{ minHeight: '100vh' }}>
      <header
        style={{
          borderBottom: "var(--border-whisper)",
          padding: "16px 0",
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="notion-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Heading level={1} size="sub">🏆 WC 2026 Admin</Heading>

          <nav className="responsive-hide-mobile" style={{ display: 'flex', gap: '24px' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Text weight={600} color="secondary">🏠 Home</Text>
            </Link>
            <Link to="/matches" style={{ textDecoration: 'none' }}>
              <Text weight={600} color="secondary">⚽ Matches</Text>
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="responsive-hide-mobile">
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Text weight={500}>👤 {user.name}</Text>
                  <Button variant="secondary" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Button variant="primary" onClick={() => login({ name: "Jone Doe", role: "admin" })}>
                  Login
                </Button>
              )}
            </div>

            {/* Hamburger Button */}
            <button
              className="notion-btn notion-btn-secondary"
              style={{ display: 'none', padding: '8px' }}
              id="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span style={{ fontSize: '20px' }}>{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#fff',
              borderBottom: 'var(--border-whisper)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 90
            }}
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <Text weight={600}>🏠 Home</Text>
            </Link>
            <Link to="/matches" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none' }}>
              <Text weight={600}>⚽ Matches</Text>
            </Link>
            <div style={{ borderTop: 'var(--border-whisper)', paddingTop: '16px' }}>
              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Text weight={500}>👤 {user.name}</Text>
                  <Button variant="secondary" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Button variant="primary" onClick={() => login({ name: "Jone Doe", role: "admin" })}>
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="notion-container" style={{ paddingTop: '24px', paddingBottom: '24px', width: '100%', overflow: 'hidden' }}>
        <div className="responsive-flex-stack gap-32" style={{ width: '100%' }}>
          <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
            <Card variant="standard">
              <Routes>
                <Route path="/" element={
                  <p style={{ color: '#888' }}>👈 Select "Matches" from the menu to start</p>
                } />

                <Route path="/matches/*" element={
                  <Suspense fallback={<p>Loading matches...</p>}>
                    {/*
                  onNavigate: when Remote navigates internally,
                  it calls this callback → Host updates the real URL

                  initialPath: pass the path segment after "/matches" down
                  so MemoryRouter of Remote starts at the right place (deep link)
                */}
                    <RemoteMatchList
                      key={location.pathname}
                      onNavigate={(path: string) => navigate(path)}
                      initialPath={getInitialPath()}
                    />
                  </Suspense>
                } />
              </Routes>
            </Card>
          </div>

          <aside className="responsive-aside" style={{ width: '100%', maxWidth: '380px' }}>
            <div className="mb-24">
              <Card variant="featured" title="Live Scores">
                <Suspense fallback={<Text color="muted">Loading Widget...</Text>}>
                  <LiveScoreWrapper matchId="vie-tha" />
                </Suspense>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// ─── App: only wraps BrowserRouter, no logic ───────────────────────────
function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
