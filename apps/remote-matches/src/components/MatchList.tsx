import { MemoryRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@worldcup/shared-state";
import type { MatchListProps, Match } from "@worldcup/types";
import { Button, Card, Badge, Heading, Text, Code } from "@worldcup/ui-component";
import "@worldcup/ui-component/design-system.css";

// Import CSS Module
// Vite automatically hashes class names: .container → ._container_abc123
// Ensures no conflict with Host or other Remotes
import styles from "./MatchList.module.css";

// ─── Mock data ────────────────────────────────────────────────────────────
const MATCHES: Match[] = [
  { id: "vie-tha", home: "🇻🇳 Vietnam", away: "🇹🇭 Thailand" },
  { id: "jpn-kor", home: "🇯🇵 Japan", away: "🇰🇷 South Korea" },
];

type PageProps = Pick<MatchListProps, "onNavigate">;

// ─── List Page ──────────────────────────────────────────────────────
function MatchListPage({ onNavigate }: PageProps) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleMatchClick = (matchId: string) => {
    navigate(`/${matchId}`);
    onNavigate?.(`/matches/${matchId}`);
  };

  return (
    // Use styles.container instead of inline style={{...}}
    // → CSS is in .module.css file, easier to maintain
    <div className={styles.container}>
      <Heading size="section" className={styles.title}>⚽ World Cup 2026 Matches</Heading>

      {user ? (
        <Badge variant="green" className={styles.badge}>
          ✓ Synced: {user.name}
        </Badge>
      ) : (
        <Badge variant="orange" className={styles.badge}>
          ⚠ Please login to view details.
        </Badge>
      )}

      <div className="notion-grid">
        {MATCHES.map((match) => (
          <div key={match.id}>
            <Card variant="standard" title={`${match.home} vs ${match.away}`} className={styles.matchCard}>
              <Button 
                variant="pill" 
                onClick={() => handleMatchClick(match.id)}
              >
                View Details →
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Detail Page ───────────────────────────────────────────────────────
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
      <Button variant="ghost" onClick={handleBack} className={styles.backButton}>
        ← Back
      </Button>

      {match ? (
        <Card variant="featured" title={`${match.home} vs ${match.away}`}>
          <Text color="secondary">
            Match ID: <Code>{matchId}</Code>
          </Text>
          <div style={{ marginTop: '24px' }}>
             <Badge variant="blue">Confirmed</Badge>
          </div>
        </Card>
      ) : (
        <Text color="secondary">
          ❌ Match not found: {matchId}
        </Text>
      )}
    </div>
  );
}

// ─── Main component exported to Host ─────────────────────────────────
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
