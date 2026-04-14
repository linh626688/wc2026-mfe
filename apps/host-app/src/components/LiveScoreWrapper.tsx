import React, { useEffect, useRef, useState } from "react";

interface LiveScoreWrapperProps {
  matchId: string;
  // Complex data (Array/Object) needs to be passed directly via DOM Property
  liveEvents?: unknown[];
}

type LoadingState = "idle" | "loading" | "ready" | "error";

const LiveScoreWrapper: React.FC<LiveScoreWrapperProps> = ({ matchId, liveEvents }) => {
  // Reference pointing directly to the DOM Node of the Web Component
  const wcRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<LoadingState>("idle");

  // ─── Effect 1: Load remote module (Dynamic Import) ────────────────────────
  // WHY use dynamic import instead of static import at top-level?
  // → Static import is analyzed by Vite at COMPILE TIME → "Does the file exist?" error
  //   because `vite-plugin-federation` only resolves remoteEntry.js at RUNTIME (post-build).
  // → Dynamic import inside useEffect only runs in the BROWSER, after Vite startup.
  useEffect(() => {
    setStatus("loading");
    import("remote_live/LiveScore")
      .then(() => {
        // Module loaded → custom element "wc-live-score" has been registered to window
        setStatus("ready");
      })
      .catch((err) => {
        console.error("[LiveScoreWrapper] Failed to load remote_live/LiveScore:", err);
        setStatus("error");
      });
  }, []); // Only run once on mount

  // ─── Effect 2: Pass complex data via DOM Property ────────────────────
  // WHY use DOM Property instead of HTML Attribute?
  // → HTML Attribute only accept STRING. Passing Array/Object requires JSON.stringify → slow.
  // → DOM Property allows passing any JS types directly.
  useEffect(() => {
    if (wcRef.current && status === "ready" && liveEvents) {
      // Type casting because DOM element does not have type for custom property
      (wcRef.current as HTMLElement & { liveEventsData?: unknown[] }).liveEventsData = liveEvents;
    }
  }, [liveEvents, status]);

  // ─── Render States ────────────────────────────────────────────────────────
  if (status === "idle" || status === "loading") {
    return <div className="live-score-placeholder">⏳ Loading Live Score...</div>;
  }

  if (status === "error") {
    return (
      <div className="live-score-error">
        ❌ Cannot connect to widget. Make sure remote-live is running on port 5002.
      </div>
    );
  }

  return (
    <div className="live-score-container">
      {/*
        Use standard HTML attribute (kebab-case) instead of React's camelCase.
        ref points to DOM node to be able to set DOM Properties in Effect 2.
      */}
      <wc-live-score
        ref={wcRef}
        match-id={matchId}
      ></wc-live-score>
    </div>
  );
};

export default LiveScoreWrapper;
