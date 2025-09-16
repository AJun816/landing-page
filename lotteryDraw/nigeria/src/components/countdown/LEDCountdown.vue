<template>
  <div class="flex flex-col items-center justify-center space-y-6 p-6 rounded-2xl shadow-2xl">
    <!-- 闪烁标题 -->
    <h1 class="text-2xl font-bold text-red-500 animate-blink">
      {{ config.label }}
    </h1>

    <!-- 倒计时主体 -->
    <div class="flex space-x-4 text-red-500 font-mono text-5xl font-extrabold">
      <!-- 分钟 -->
      <div class="flex flex-col items-center">
        <div class="dot-matrix">{{ time.minutes }}</div>
        <span class="text-sm text-gray-300 mt-1">{{ config.labels.minute }}</span>
      </div>
      <!-- 秒 -->
      <div class="flex flex-col items-center">
        <div class="dot-matrix">{{ time.seconds }}</div>
        <span class="text-sm text-gray-300 mt-1">{{ config.labels.second }}</span>
      </div>
      <!-- 毫秒 -->
      <div class="flex flex-col items-center">
        <div class="dot-matrix">{{ time.milliseconds }}</div>
        <span class="text-sm text-gray-300 mt-1">{{ config.labels.millisecond }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const time = reactive({
  minutes: '00',
  seconds: '00',
  milliseconds: '000'
})

let timer = null

// 倒计时逻辑
const startCountdown = () => {
  const end = Date.now() + props.config.totalDuration

  timer = setInterval(() => {
    const remaining = Math.max(0, end - Date.now())

    const minutes = Math.floor(remaining / 60000)
    const seconds = Math.floor((remaining % 60000) / 1000)
    const milliseconds = Math.floor((remaining % 1000))

    time.minutes = String(minutes).padStart(2, '0')
    time.seconds = String(seconds).padStart(2, '0')
    time.milliseconds = String(milliseconds).padStart(3, '0')

    if (remaining <= 0) {
      clearInterval(timer)
    }
  }, 50)
}

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
/* 标题闪烁动画 */
@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.2;
  }
}

.animate-blink {
  animation: blink 1s infinite;
}

/* 背景透明，去掉原本的黑色背景 */
.dot-matrix {
  display: inline-block;
  padding: 10px 16px;
  background: rgba(20,20,20,0.6); /* 半透明深灰，保证对比 */
  border-radius: 8px;
  box-shadow:
    0 0 12px rgba(255, 149, 0, 0.9),   /* 外部橙黄光晕 */
    inset 0 0 8px rgba(255, 80, 0, 0.8); /* 内部红橙发光 */
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
  color: #e4ae3a; /* 主体数字颜色：亮红 */
  position: relative;
}

/* 粒子闪烁效果 */
.dot-matrix::after {
  content: '';
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-image: radial-gradient(circle, rgba(255,149,0,0.6) 2px, transparent 2px);
  background-size: 8px 8px;
  animation: flicker 1s infinite;
  opacity: 0.5;
}

@keyframes flicker {

  0%,
  100% {
    opacity: 0.7;
  }

  50% {
    opacity: 0.3;
  }
}
</style>
