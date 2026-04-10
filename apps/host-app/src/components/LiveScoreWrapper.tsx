import React, { useEffect, useRef, useState } from "react";

interface LiveScoreWrapperProps {
  matchId: string;
  // Dữ liệu phức tạp (Array/Object) cần truyền thẳng qua DOM Property
  liveEvents?: unknown[];
}

type LoadingState = "idle" | "loading" | "ready" | "error";

const LiveScoreWrapper: React.FC<LiveScoreWrapperProps> = ({ matchId, liveEvents }) => {
  // Reference trỏ thẳng tới DOM Node của Web Component
  const wcRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<LoadingState>("idle");

  // ─── Effect 1: Load remote module (Dynamic Import) ────────────────────────
  // TẠI SAO dùng dynamic import thay vì static import ở top-level?
  // → Static import bị Vite phân tích ở COMPILE TIME → lỗi "Does the file exist?"
  //   vì `vite-plugin-federation` chỉ resolve remoteEntry.js ở RUNTIME (sau khi build).
  // → Dynamic import bên trong useEffect chỉ chạy ở BROWSER, sau khi Vite đã khởi động xong.
  useEffect(() => {
    setStatus("loading");
    import("remote_live/LiveScore")
      .then(() => {
        // Module đã load → custom element "wc-live-score" đã được đăng ký vào window
        setStatus("ready");
      })
      .catch((err) => {
        console.error("[LiveScoreWrapper] Không thể load remote_live/LiveScore:", err);
        setStatus("error");
      });
  }, []); // Chỉ chạy một lần khi component mount

  // ─── Effect 2: Đẩy dữ liệu phức tạp qua DOM Property ────────────────────
  // TẠI SAO dùng DOM Property thay vì HTML Attribute?
  // → HTML Attribute chỉ nhận STRING. Truyền Array/Object phải JSON.stringify → chậm.
  // → DOM Property cho phép truyền trực tiếp bất kỳ kiểu JS nào.
  useEffect(() => {
    if (wcRef.current && status === "ready" && liveEvents) {
      // Ép kiểu vì DOM element không có type cho custom property
      (wcRef.current as HTMLElement & { liveEventsData?: unknown[] }).liveEventsData = liveEvents;
    }
  }, [liveEvents, status]);

  // ─── Render States ────────────────────────────────────────────────────────
  if (status === "idle" || status === "loading") {
    return <div className="live-score-placeholder">⏳ Đang tải Live Score...</div>;
  }

  if (status === "error") {
    return (
      <div className="live-score-error">
        ❌ Không thể kết nối widget. Hãy chắc chắn remote-live đang chạy ở port 5002.
      </div>
    );
  }

  return (
    <div className="live-score-container">
      {/*
        Dùng HTML attribute chuẩn (kebab-case) thay vì camelCase của React.
        ref trỏ tới DOM node để có thể gán DOM Properties ở Effect 2.
      */}
      <wc-live-score
        ref={wcRef}
        match-id={matchId}
      ></wc-live-score>
    </div>
  );
};

export default LiveScoreWrapper;
