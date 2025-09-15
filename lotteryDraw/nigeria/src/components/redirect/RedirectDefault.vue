<template>
  <div class="redirect-notice fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full backdrop-blur-sm shadow-lg z-40">
    <p class="text-center text-sm md:text-base">
      You will be redirected in {{ secondsRemaining }} seconds
      <button
          @click="emit('skip')"
      class="text-yellow-300 hover:text-yellow-200 font-medium ml-2 underline"
      >
      Skip →
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 1. 定义 props
const props = defineProps({
  redirectSeconds: {
    type: Number,
    default: 3
  }
});

// 2. 定义事件发射器（关键步骤）
const emit = defineEmits(['skip', 'auto-redirect']);

const secondsRemaining = ref(props.redirectSeconds);
let countdownTimer = null;

// 启动倒计时
const startCountdown = () => {
  secondsRemaining.value = props.redirectSeconds;

  countdownTimer = setInterval(() => {
    secondsRemaining.value--;

    if (secondsRemaining.value <= 0) {
      clearInterval(countdownTimer);
      emit('auto-redirect'); // 用 emit 替代 $emit
    }
  }, 1000);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

// 暴露重置方法
defineExpose({
  reset: startCountdown
});
</script>
