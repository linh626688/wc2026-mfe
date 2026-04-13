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
  :host là selector đặc biệt để style cho chính thẻ <wc-live-score> 
  từ bên trong Shadow DOM. 
*/
:host {
  display: block;
  margin-bottom: 10px;
}

.live-widget {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background-color: #1a1a1a; /* Quay lại màu tối cho chuyên nghiệp */
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  font-family: Inter, system-ui, sans-serif;
  border: 1px solid #333;
}

.live-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.blinking {
  animation: blink 1s infinite;
}

.match-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.teams {
  font-size: 0.8rem;
  color: #aaa;
}

.score {
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}

.time {
  color: #4ade80;
  font-weight: bold;
  font-family: monospace;
}

@keyframes blink {
  50% { opacity: 0 }
}
</style>
