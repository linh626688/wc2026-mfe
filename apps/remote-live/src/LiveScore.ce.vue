<script setup>
import { computed } from 'vue';

// Nhận match-id từ Host (kebab-case trong HTML tự động map vào camelCase ở đây)
const props = defineProps({
  matchId: {
    type: String,
    default: 'unknown'
  }
});

// Giả lập dữ liệu dựa trên matchId
const matchData = computed(() => {
  const db = {
    'vie-tha': { teams: 'VN vs THA', score: '2 - 1', time: "89'" },
    'jpn-kor': { teams: 'JPN vs KOR', score: '0 - 0', time: "15'" },
    'bra-arg': { teams: 'BRA vs ARG', score: '1 - 1', time: "HT" },
  };
  return db[props.matchId] || { teams: 'Match', score: '?-?', time: '--' };
});
</script>

<template>
  <div class="live-widget">
    <div class="live-status">
      <span class="blinking">🔴</span>
      <span class="text">LIVE</span>
    </div>
    <div class="match-info">
      <span class="teams">{{ matchData.teams }}</span>
      <span class="score">{{ matchData.score }}</span>
    </div>
    <span class="time">{{ matchData.time }}</span>
  </div>
</template>

<style>
/* 
  Shadow DOM Isolation: 
  CSS Variables (Tokens) xuyên qua được Shadow DOM.
  Mọi mã màu ở đây đều lấy từ packages/ui/src/design-system.css
*/
:host {
  display: block;
  margin-bottom: 0;
  width: 100%;
}

.live-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: var(--color-notion-black);
  color: var(--color-pure-white);
  padding: 12px 16px;
  border-radius: var(--radius-comfortable);
  font-family: var(--font-family);
  box-shadow: var(--shadow-deep);
  border: var(--border-whisper);
}

.live-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.blinking {
  color: #ff4d4f;
  animation: blink 1.2s infinite;
}

.match-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.teams {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-warm-gray-300);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.score {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-pure-white);
  line-height: 1.2;
}

.time {
  color: var(--color-green);
  font-weight: 700;
  font-family: var(--mono, monospace);
  background: rgba(26, 174, 57, 0.1);
  padding: 2px 8px;
  border-radius: var(--radius-micro);
  font-size: 13px;
}

@keyframes blink {
  0% { opacity: 1 }
  50% { opacity: 0.3 }
  100% { opacity: 1 }
}
</style>
