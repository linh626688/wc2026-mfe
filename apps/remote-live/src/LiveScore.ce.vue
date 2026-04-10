<template>
  <div class="live-widget">
    <span class="blinking">🔴 LIVE</span>
    <span class="score">VN 2 - 1 THA</span>
    <span class="time">89'</span>
  </div>
</template>

<style>
/* CSS này sẽ bị nhốt kín trong Shadow DOM, không ảnh hưởng đến React */
.live-widget {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #1a1a1a;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-family: sans-serif;
  font-weight: bold;
}
.blinking {
  color: #ff4d4f;
  animation: blink 1s infinite;
}
.score {
  color: #fff;
}
.time {
  color: #4ade80;
  font-size: 0.9em;
}
@keyframes blink {
  50% {
    opacity: 0.5;
  }
}
</style>
