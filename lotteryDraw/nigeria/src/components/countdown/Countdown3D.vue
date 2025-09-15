<template>
  <div class="flex flex-col items-center text-white space-y-6">
    <!-- 标题 -->
    <p class="text-2xl md:text-3xl font-extrabold animate-bounce tracking-widest drop-shadow-glow">
      {{ label }}
    </p>

    <!-- 倒计时容器 -->
    <div class="flex items-center space-x-6 md:space-x-10">
      <!-- 分钟 -->
      <div class="flip-box">
        <span class="flip-number">{{ minutes.toString().padStart(2, '0') }}</span>
        <span class="flip-label">{{ labels.minute }}</span>
      </div>

      <span class="separator">:</span>

      <!-- 秒 -->
      <div class="flip-box">
        <span class="flip-number">{{ seconds.toString().padStart(2, '0') }}</span>
        <span class="flip-label">{{ labels.second }}</span>
      </div>

      <span class="separator">:</span>

      <!-- 毫秒 -->
      <div class="flip-box">
        <span class="flip-number text-accent">{{ milliseconds.toString().padStart(3, '0') }}</span>
        <span class="flip-label">{{ labels.millisecond }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  totalDuration: { type: Number, required: true },
  labels: { type: Object, required: true }
});

const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);

let startTime, timer;

const updateCountdown = () => {
  const now = new Date().getTime();
  const elapsed = now - startTime;
  const remaining = Math.max(props.totalDuration - elapsed, 0);

  minutes.value = Math.floor((remaining / 1000 / 60) % 60);
  seconds.value = Math.floor((remaining / 1000) % 60);
  milliseconds.value = Math.floor(remaining % 1000);

  if (remaining <= 0) clearInterval(timer);
};

onMounted(() => {
  startTime = new Date().getTime();
  timer = setInterval(updateCountdown, 50);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
/* 标题发光 */
.drop-shadow-glow {
  text-shadow: 0 0 8px #ff0080, 0 0 15px #00ffff, 0 0 25px #ff0080;
}

/* 翻牌容器 */
.flip-box {
  @apply flex flex-col items-center;
}

/* 数字样式：高端翻牌风格 */
.flip-number {
  @apply text-5xl md:text-7xl font-extrabold rounded-lg px-6 py-3;
  background: linear-gradient(180deg, #1a1a1a, #2d2d2d);
  color: #ffffff;
  border: 2px solid #444;
  box-shadow:
      inset 0 -4px 8px rgba(0, 0, 0, 0.7),
      inset 0 4px 8px rgba(255, 255, 255, 0.1),
      0 8px 15px rgba(0, 0, 0, 0.6);
  display: inline-block;
  min-width: 90px;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: flipAnim 1s infinite ease-in-out alternate;
}

/* 毫秒特殊颜色 */
.text-accent {
  background: linear-gradient(180deg, #ff0077, #7700ff);
  text-shadow: 0 0 6px #ff00ff, 0 0 10px #00ffff;
}

/* 单位标签 */
.flip-label {
  @apply text-sm mt-2 opacity-80 tracking-wider uppercase;
}

/* 分隔符 */
.separator {
  @apply text-5xl md:text-7xl font-bold text-yellow-400;
  text-shadow: 0 0 10px #ffd700, 0 0 20px #ffae00;
}

/* 翻牌动画 */
@keyframes flipAnim {
  0% {
    transform: perspective(400px) rotateX(0deg);
  }
  100% {
    transform: perspective(400px) rotateX(-15deg);
  }
}
</style>
