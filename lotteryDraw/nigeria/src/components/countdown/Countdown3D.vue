<template>
  <div class="flex flex-col items-center text-white space-y-6">
    <!-- 标题 -->
    <p class="text-2xl md:text-3xl font-extrabold animate-pulse tracking-widest drop-shadow-glow">
      {{ label }}
    </p>

    <!-- 倒计时容器 -->
    <div class="flex items-center space-x-3 md:space-x-6">
      <!-- 分钟 -->
      <div class="flip-box">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front minute-front">{{ minutes.toString().padStart(2, '0') }}</div>
            <div class="flip-card-back minute-back">{{ minutes.toString().padStart(2, '0') }}</div>
          </div>
        </div>
        <span class="flip-label">{{ labels.minute }}</span>
      </div>

      <span class="separator">:</span>

      <!-- 秒 -->
      <div class="flip-box">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front second-front">{{ seconds.toString().padStart(2, '0') }}</div>
            <div class="flip-card-back second-back">{{ seconds.toString().padStart(2, '0') }}</div>
          </div>
        </div>
        <span class="flip-label">{{ labels.second }}</span>
      </div>

      <span class="separator">:</span>

      <!-- 毫秒 -->
      <div class="flip-box">
        <div class="flip-card millisecond">
          <div class="flip-card-inner">
            <div class="flip-card-front millisecond-front">{{ milliseconds.toString().padStart(3, '0') }}</div>
            <div class="flip-card-back millisecond-back">{{ milliseconds.toString().padStart(3, '0') }}</div>
          </div>
        </div>
        <span class="flip-label">{{ labels.millisecond }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  totalDuration: { type: Number, required: true },
  labels: { type: Object, required: true }
});

const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);

let startTime, timer;
let prevMinutes = 0;
let prevSeconds = 0;
let prevMilliseconds = 0;

const updateCountdown = () => {
  const now = new Date().getTime();
  const elapsed = now - startTime;
  const remaining = Math.max(props.totalDuration - elapsed, 0);

  const newMinutes = Math.floor((remaining / 1000 / 60) % 60);
  const newSeconds = Math.floor((remaining / 1000) % 60);
  const newMilliseconds = Math.floor(remaining % 1000);

  if (newMinutes !== prevMinutes) {
    minutes.value = newMinutes;
    prevMinutes = newMinutes;
    document.querySelector('.minute-front')?.classList.add('flipping');
    setTimeout(() => {
      document.querySelector('.minute-front')?.classList.remove('flipping');
    }, 500);
  }

  if (newSeconds !== prevSeconds) {
    seconds.value = newSeconds;
    prevSeconds = newSeconds;
    document.querySelector('.second-front')?.classList.add('flipping');
    setTimeout(() => {
      document.querySelector('.second-front')?.classList.remove('flipping');
    }, 500);
  }

  if (newMilliseconds !== prevMilliseconds) {
    milliseconds.value = newMilliseconds;
    prevMilliseconds = newMilliseconds;
    document.querySelector('.millisecond-front')?.classList.add('flipping');
    setTimeout(() => {
      document.querySelector('.millisecond-front')?.classList.remove('flipping');
    }, 100);
  }

  if (remaining <= 0) clearInterval(timer);
};

onMounted(() => {
  startTime = new Date().getTime();
  timer = setInterval(updateCountdown, 50);
  prevMinutes = minutes.value;
  prevSeconds = seconds.value;
  prevMilliseconds = milliseconds.value;
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
/* 标题发光 */
.drop-shadow-glow {
  text-shadow: 0 0 8px #ff3366, 0 0 15px #66ccff, 0 0 25px #ff3366;
  animation: glowPulse 3s infinite alternate;
}

@keyframes glowPulse {
  from {
    text-shadow: 0 0 5px #ff3366, 0 0 10px #66ccff, 0 0 15px #ff3366;
  }
  to {
    text-shadow: 0 0 15px #ff3366, 0 0 25px #66ccff, 0 0 35px #ff3366;
  }
}

/* 翻牌容器 */
.flip-box {
  @apply flex flex-col items-center;
}

/* 翻牌卡片整体 */
.flip-card {
  width: 80px;
  height: 120px;
  perspective: 1000px;
}

/* 翻牌卡片内部（3D 效果） */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* 翻转动画触发 */
.flipping + .flip-card-back {
  animation: flipAnimation 0.5s forwards;
}

@keyframes flipAnimation {
  0% {
    transform: rotateX(0deg);
    opacity: 0;
  }
  50% {
    transform: rotateX(90deg);
    opacity: 0;
  }
  51% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

/* 卡片正反两面 */
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 800;
  border-radius: 8px;
  overflow: hidden;
}

/* 正面通用样式 */
.flip-card-front {
  background: linear-gradient(135deg, #333 0%, #1a1a1a 100%);
  color: white;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.3);
}

/* 背面通用样式 */
.flip-card-back {
  background: linear-gradient(135deg, #2a2a2a 0%, #111 100%);
  color: white;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5), 0 5px 10px rgba(0, 0, 0, 0.3);
  transform: rotateX(180deg);
}

/* 分钟卡片特殊样式 */
.minute-front, .minute-back {
  background: linear-gradient(135deg, #ffcc00 0%, #ff9900 100%);
  color: #333;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 秒卡片特殊样式 */
.second-front, .second-back {
  background: linear-gradient(135deg, #ff3366 0%, #ff0033 100%);
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 毫秒卡片特殊样式 */
.millisecond {
  width: 100px;
}

.millisecond-front, .millisecond-back {
  background: linear-gradient(135deg, #66ccff 0%, #3399ff 100%);
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  animation: millisecondGlow 1s infinite alternate;
}

@keyframes millisecondGlow {
  from {
    box-shadow: 0 0 5px rgba(102, 204, 255, 0.7);
  }
  to {
    box-shadow: 0 0 15px rgba(102, 204, 255, 1), 0 0 25px rgba(102, 204, 255, 0.5);
  }
}

/* 单位标签 */
.flip-label {
  @apply text-sm mt-2 opacity-80 tracking-wider uppercase;
  font-weight: 600;
  letter-spacing: 1px;
}

/* 分隔符 */
.separator {
  @apply text-4xl md:text-5xl font-bold text-yellow-400;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 170, 0, 0.6);
  animation: blink 1s infinite alternate;
}

@keyframes blink {
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
}
</style>
