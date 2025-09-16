<template>
  <div 
    class="countdown-container relative overflow-hidden rounded-xl  from-orange-500 to-red-600 p-6 shadow-2xl transition-all duration-1000 md:p-8"
    :class="{ 
      'animate-pulse': isLowTime,
      'from-red-600 to-red-800': isVeryLowTime 
    }"
  >
    <!-- 装饰元素 - 随时间变化 -->
    <div 
      class="absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl transition-all duration-1000"
      :class="{ 'bg-white/20': isLowTime, 'bg-white/10': !isLowTime }"
    ></div>
    <div 
      class="absolute -bottom-10 -left-10 h-40 w-40 rounded-full blur-3xl transition-all duration-1000"
      :class="{ 'bg-white/20': isLowTime, 'bg-white/10': !isLowTime }"
    ></div>
    
    <!-- 火焰装饰 - 随时间增强 -->
    <div v-if="isLowTime" class="absolute top-2 left-2 text-yellow-300 drop-shadow-lg">
      <i class="fa fa-fire text-xl animate-pulse"></i>
    </div>
    <div v-if="isLowTime" class="absolute top-2 right-2 text-yellow-300 drop-shadow-lg">
      <i class="fa fa-fire text-xl animate-pulse"></i>
    </div>
    
    <!-- 标题 - 随时间变化 -->
    <h2 
      class="mb-6 text-center text-2xl font-bold text-white drop-shadow-md transition-all duration-500 md:text-3xl"
      :class="{ 
        'text-yellow-100 scale-105': isLowTime,
        'text-yellow-300 scale-110': isVeryLowTime 
      }"
    >
      {{ countdown.label }}
      <span v-if="isVeryLowTime" class="inline-block ml-2 animate-bounce">⏰</span>
    </h2>
    
    <!-- 倒计时显示 -->
    <div class="flex flex-col items-center justify-center gap-6">
      <!-- 时间数字显示 -->
      <div class="flex flex-wrap items-center justify-center gap-3 md:gap-6">
        <!-- 分钟 -->
        <div class="time-box group relative">
          <div 
            class="time-digit h-24 w-20 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md px-3 text-4xl font-bold text-white shadow-lg transition-all duration-300 md:h-32 md:w-28 md:text-6xl"
            :class="{ 
              'bg-red-500/30': isLowTime,
              'bg-red-600/40 transform scale-105': isVeryLowTime
            }"
          >
            <span :class="{ 'animate-slide': minuteChanged }" class="flex h-full w-full items-center justify-center">
              {{ minutes }}
            </span>
          </div>
          <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white transition-all duration-300 backdrop-blur-sm group-hover:bg-white/30">
            {{ countdown.labels.minute }}
          </span>
        </div>
        
        <div class="time-separator hidden items-center text-3xl font-bold text-white/70 md:flex">
          :
        </div>
        
        <!-- 秒钟 -->
        <div class="time-box group relative">
          <div 
            class="time-digit h-24 w-20 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md px-3 text-4xl font-bold text-white shadow-lg transition-all duration-300 md:h-32 md:w-28 md:text-6xl"
            :class="{ 
              'bg-red-500/30': isLowTime,
              'bg-red-600/40 transform scale-105': isVeryLowTime
            }"
          >
            <span :class="{ 'animate-slide': secondChanged }" class="flex h-full w-full items-center justify-center">
              {{ seconds }}
            </span>
          </div>
          <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white transition-all duration-300 backdrop-blur-sm group-hover:bg-white/30">
            {{ countdown.labels.second }}
          </span>
        </div>
        
        <div class="time-separator hidden items-center text-3xl font-bold text-white/70 md:flex">
          :
        </div>
        
        <!-- 毫秒 -->
        <div class="time-box group relative">
          <div 
            class="time-digit h-24 w-20 overflow-hidden rounded-lg bg-white/10 backdrop-blur-md px-3 text-4xl font-bold text-white shadow-lg transition-all duration-300 md:h-32 md:w-28 md:text-6xl"
            :class="{ 
              'bg-red-500/30': isLowTime,
              'bg-red-600/40 transform scale-105': isVeryLowTime
            }"
          >
            <span :class="{ 'animate-slide': millisecondChanged }" class="flex h-full w-full items-center justify-center">
              {{ milliseconds }}
            </span>
          </div>
          <span class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white transition-all duration-300 backdrop-blur-sm group-hover:bg-white/30">
            {{ countdown.labels.millisecond }}
          </span>
        </div>
      </div>
      
      <!-- 移动端时间分隔符 -->
      <div class="flex items-center justify-center gap-8 text-lg font-bold text-white/70 md:hidden">
        <span>{{ countdown.labels.minute }}</span>
        <span>{{ countdown.labels.second }}</span>
        <span>{{ countdown.labels.millisecond }}</span>
      </div>
      
      <!-- 进度条 - 随时间变色 -->
      <div class="mt-4 h-2 w-full max-w-md rounded-full bg-white/20 overflow-hidden shadow-inner">
        <div 
          :style="{ width: progress + '%' }"
          class="h-full transition-all duration-100 ease-linear"
          :class="{
            'bg-green-400': progress > 60,
            'bg-yellow-400': progress <= 60 && progress > 30,
            'bg-orange-400': progress <= 30 && progress > 10,
            'bg-red-400 animate-pulse': progress <= 10
          }"
        ></div>
      </div>
      
      <!-- 倒计时结束提示 -->
      <div v-if="remainingTime <= 0" class="mt-4 text-center">
        <p class="text-xl font-bold text-yellow-200 drop-shadow-lg animate-bounce">时间到！</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 配置参数
const countdownConfig = {
  label: '🔥 活动火热进行中！倒计时 🔥',
  totalDuration: 60000, // 总时长，毫秒
  labels: {
    minute: '分',
    second: '秒',
    millisecond: '毫秒'
  }
};

// 倒计时状态
const remainingTime = ref(countdownConfig.totalDuration);
const minutes = ref('00');
const seconds = ref('00');
const milliseconds = ref('000');
const progress = ref(100);
const intervalId = ref(null);

// 动画状态
const minuteChanged = ref(false);
const secondChanged = ref(false);
const millisecondChanged = ref(false);

// 计算低时间状态 (最后20秒)
const isLowTime = computed(() => {
  return remainingTime.value <= 20000 && remainingTime.value > 0;
});

// 计算极低时间状态 (最后10秒)
const isVeryLowTime = computed(() => {
  return remainingTime.value <= 10000 && remainingTime.value > 0;
});

// 格式化时间
const formatTime = () => {
  const ms = remainingTime.value;
  
  // 保存旧值用于检测变化
  const oldMinutes = minutes.value;
  const oldSeconds = seconds.value;
  const oldMilliseconds = milliseconds.value;
  
  // 计算各时间单位
  const mins = Math.floor(ms / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  const msds = Math.floor((ms % 1000));
  
  // 格式化显示（补零）
  minutes.value = mins.toString().padStart(2, '0');
  seconds.value = secs.toString().padStart(2, '0');
  milliseconds.value = msds.toString().padStart(3, '0');
  
  // 更新进度条
  progress.value = (ms / countdownConfig.totalDuration) * 100;
  
  // 检测变化并触发动画
  minuteChanged.value = oldMinutes !== minutes.value;
  secondChanged.value = oldSeconds !== seconds.value;
  millisecondChanged.value = oldMilliseconds !== milliseconds.value;
  
  // 重置动画状态
  if (minuteChanged.value) {
    setTimeout(() => minuteChanged.value = false, 500);
  }
  if (secondChanged.value) {
    setTimeout(() => secondChanged.value = false, 500);
  }
  if (millisecondChanged.value) {
    setTimeout(() => millisecondChanged.value = false, 500);
  }
};

// 开始倒计时
const startCountdown = () => {
  // 清除可能存在的定时器
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  
  // 设置定时器，每10毫秒更新一次
  intervalId.value = setInterval(() => {
    remainingTime.value -= 10;
    
    if (remainingTime.value <= 0) {
      remainingTime.value = 0;
      clearInterval(intervalId.value);
    }
    
    formatTime();
  }, 10);
};

// 组件挂载时初始化并开始倒计时
onMounted(() => {
  formatTime();
  startCountdown();
});

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

// 暴露给模板
const countdown = countdownConfig;
</script>

<style scoped>
.countdown-container {
  @apply relative max-w-3xl mx-auto;
}

/* 数字变化动画 */
.animate-slide {
  animation: slide-down 0.5s ease-out forwards;
}

@keyframes slide-down {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* 时间分隔符闪烁动画 */
.time-separator {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from, to { opacity: 1; }
  50% { opacity: 0.4; }
}

/* 悬停效果 */
.time-box:hover .time-digit {
  transform: scale(1.05);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
}

/* 低时间状态下的增强动画 */
@keyframes pulse-fast {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse-fast {
  animation: pulse-fast 0.6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 倒计时结束时的动画 */
@keyframes celebrate {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.animate-celebrate {
  animation: celebrate 0.5s ease-in-out infinite;
}
</style>
