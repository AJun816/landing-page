<template>
  <div class="redirect-notice fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full backdrop-blur-sm shadow-lg z-40">
    <p class="text-center text-sm md:text-base">
      {{ message }} {{ secondsRemaining }} {{ secondsLabel }}
      <button
          v-if="allowSkip"
          @click="handleSkip"
      class="text-yellow-300 hover:text-yellow-200 font-medium ml-2 underline"
      >
      {{ skipButtonText }}
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 定义 props - 完整匹配App.vue中传递的参数
const props = defineProps({
  targetUrl: {
    type: String,
    required: true
  },
  countdownSeconds: {
    type: Number,
    default: 3
  },
  message: {
    type: String,
    default: 'You will be redirected in:'
  },
  secondsLabel: {
    type: String,
    default: 'seconds'
  },
  allowSkip: {
    type: Boolean,
    default: true
  },
  skipButtonText: {
    type: String,
    default: 'Skip →'
  }
});

// 定义事件发射器
const emit = defineEmits(['skip', 'auto-redirect']);

const secondsRemaining = ref(props.countdownSeconds);
let countdownTimer = null;

// 启动倒计时
const startCountdown = () => {
  secondsRemaining.value = props.countdownSeconds;

  countdownTimer = setInterval(() => {
    secondsRemaining.value--;

    if (secondsRemaining.value <= 0) {
      clearInterval(countdownTimer);
      performRedirect(); // 直接执行重定向
    }
  }, 1000);
};

// 执行重定向
const performRedirect = () => {
  emit('auto-redirect');
  if (props.targetUrl) {
    window.location.href = props.targetUrl;
  }
};

// 处理跳过倒计时
const handleSkip = () => {
  emit('skip');
  skipCountdown();
};

// 跳过倒计时（供父组件调用）
const skipCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
  performRedirect();
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});

// 暴露方法给父组件
defineExpose({
  reset: startCountdown,
  skipCountdown: skipCountdown // 添加skipCountdown方法
});
</script>
