<template>
  <div class="countdown-container bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg mb-8">
    <p class="text-white text-center mb-4 text-lg md:text-xl font-medium">
      {{ label }}
    </p>

    <div class="flex justify-center gap-2 md:gap-4">
      <!-- 天 -->
      <div v-if="showDays" class="countdown-item">
        <div class="countdown-number bg-red-600 text-white text-2xl md:text-4xl font-bold rounded-lg w-12 h-16 md:w-16 md:h-20 flex items-center justify-center shadow-md">
          {{ days.toString().padStart(2, '0') }}
        </div>
        <div class="countdown-label text-white text-xs md:text-sm text-center mt-1">{{ dayLabel }}</div>
      </div>

      <!-- 时 -->
      <div class="countdown-item">
        <div class="countdown-number bg-red-600 text-white text-2xl md:text-4xl font-bold rounded-lg w-12 h-16 md:w-16 md:h-20 flex items-center justify-center shadow-md">
          {{ hours.toString().padStart(2, '0') }}
        </div>
        <div class="countdown-label text-white text-xs md:text-sm text-center mt-1">{{ hourLabel }}</div>
      </div>

      <!-- 分 -->
      <div class="countdown-item">
        <div class="countdown-number bg-red-600 text-white text-2xl md:text-4xl font-bold rounded-lg w-12 h-16 md:w-16 md:h-20 flex items-center justify-center shadow-md">
          {{ minutes.toString().padStart(2, '0') }}
        </div>
        <div class="countdown-label text-white text-xs md:text-sm text-center mt-1">{{ minuteLabel }}</div>
      </div>

      <!-- 秒 -->
      <div class="countdown-item">
        <div class="countdown-number bg-red-600 text-white text-2xl md:text-4xl font-bold rounded-lg w-12 h-16 md:w-16 md:h-20 flex items-center justify-center shadow-md">
          {{ seconds.toString().padStart(2, '0') }}
        </div>
        <div class="countdown-label text-white text-xs md:text-sm text-center mt-1">{{ secondLabel }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 修正1：将 props 从 endTime 改为 totalSeconds（总秒数）
const props = defineProps({
  label: {
    type: String,
    default: 'Hurry! Offer ends in:'
  },
  totalSeconds: {  // 接收父组件传递的总秒数
    type: Number,
    required: true,
    validator: (value) => value >= 0  // 确保秒数为非负数
  },
  showDays: {
    type: Boolean,
    default: true
  },
  dayLabel: {
    type: String,
    default: 'Days'
  },
  hourLabel: {
    type: String,
    default: 'Hrs'
  },
  minuteLabel: {
    type: String,
    default: 'Mins'
  },
  secondLabel: {
    type: String,
    default: 'Secs'
  }
});

// 倒计时状态
const days = ref(0);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let timer = null;

// 修正2：基于总秒数计算倒计时（替代原日期差计算）
const calculateCountdown = () => {
  // 初始总秒数（首次计算时赋值）
  if (seconds.value === 0 && timer === null) {
    seconds.value = props.totalSeconds;
  }

  // 秒数耗尽时停止
  if (seconds.value <= 0) {
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    clearInterval(timer);
    return;
  }

  // 从总秒数中拆分天/时/分/秒
  const total = seconds.value;
  days.value = Math.floor(total / (60 * 60 * 24));
  const remainingAfterDays = total % (60 * 60 * 24);

  hours.value = Math.floor(remainingAfterDays / (60 * 60));
  const remainingAfterHours = remainingAfterDays % (60 * 60);

  minutes.value = Math.floor(remainingAfterHours / 60);
  seconds.value = remainingAfterHours % 60;

  // 每秒递减
  seconds.value--;
};

// 启动倒计时
onMounted(() => {
  calculateCountdown();  // 初始化
  timer = setInterval(calculateCountdown, 1000);  // 每秒更新
});

// 清理定时器（防止内存泄漏）
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
