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

const props = defineProps({
  label: {
    type: String,
    default: 'Hurry! Offer ends in:'
  },
  endTime: {
    type: Date,
    required: true
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

// 计算倒计时
const calculateCountdown = () => {
  const now = new Date();
  const end = new Date(props.endTime);
  const diff = end - now;

  if (diff <= 0) {
    days.value = 0;
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
    clearInterval(timer);
    return;
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24));
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000);
};

// 启动倒计时
onMounted(() => {
  calculateCountdown();
  timer = setInterval(calculateCountdown, 1000);
});

// 清理定时器
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

