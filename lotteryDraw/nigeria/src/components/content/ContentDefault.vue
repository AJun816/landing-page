<template>
  <div class="w-full text-center text-white my-8 relative">
    <!-- 活动Logo -->
    <div v-if="logo" class="mb-6 transform transition-all duration-700 hover:scale-105">
      <img :src="logo" :alt="logoAlt" class="mx-auto max-h-20 md:max-h-24 object-contain drop-shadow-lg">
    </div>

    <!-- 标题 - 带呼吸效果和渐变文字 -->
    <h1
      class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-shadow-lg animate-pulse-slow bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
      {{ title }}
    </h1>

    <!-- 副标题 - 带闪烁强调 -->
    <h2 class="text-xl md:text-2xl font-semibold mb-4 text-yellow-300 relative inline-block">
      <span class="relative z-10">{{ subtitle }}</span>
      <span
        class="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 opacity-70 transform -translate-y-1 animate-pulse"></span>
    </h2>

    <!-- 插槽：主副标题下方，用于插入倒计时等组件（小屏幕也会显示） -->
    <slot name="after-subtitle"></slot>

    <!-- CTA按钮 - 美化样式，悬浮在最适合点击的位置 -->
    <div class="mt-8 mb-6 relative animate-pulse">
      <a :href="ctaButtonUrl" @click.prevent="$emit('cta-click')"
        class="inline-block bg-gradient-to-r from-yellow-400 to-orange-600 text-white font-bold text-xl md:text-2xl py-5 px-16 rounded-full shadow-3xl transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/60 hover:shadow-4xl focus:outline-none focus:ring-6 focus:ring-orange-400 focus:ring-opacity-70 relative overflow-hidden group z-30 animate-pulse">
        <span class="relative z-10 flex items-center justify-center gap-2">
          {{ ctaButtonText }}
          <i class="fa fa-arrow-right transition-transform group-hover:translate-x-1 animate-pulse-slow"></i>
        </span>
        <!-- 内部发光效果 -->
        <span
          class="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        <!-- 外部发光效果 -->
        <span
          class="absolute -inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-60 group-hover:opacity-90 transition duration-500"></span>
        <!-- 脉冲波纹效果 -->
        <span
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-white/20 rounded-full animate-ping-slow pointer-events-none"></span>
      </a>
      <!-- 装饰性光晕 -->
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 bg-orange-500 rounded-full blur-3xl opacity-30 animate-pulse-slow z-10">
      </div>
    </div>

    <!-- 描述文本：仅中等及以上屏幕显示 -->
    <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-100 hidden md:block">
      {{ description }}
    </p>

    <!-- 列表项：仅中等及以上屏幕显示，逐项淡入动画 -->
    <div class="max-w-lg mx-auto mb-10 hidden md:block">
      <ul class="space-y-4">
        <li v-for="(point, index) in bulletPoints" :key="index"
          class="flex items-start justify-center gap-3 opacity-0 animate-fadeIn"
          :style="{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }">
          <i class="fa fa-check-circle text-green-400 mt-1 text-xl animate-pulse-fast"></i>
          <span class="text-left text-lg">{{ point }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  logo: {
    type: String,
    default: ''
  },
  logoAlt: {
    type: String,
    default: 'Event Logo'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  bulletPoints: {
    type: Array,
    required: true
  },
  ctaButtonText: {
    type: String,
    required: true
  },
  ctaButtonUrl: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['cta-click']);
</script>

<style scoped>
/* 自定义动画 */
@keyframes pulseSlow {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

@keyframes pulseFast {

  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

/* 动画类 */
.animate-pulse-slow {
  animation: pulseSlow 3s infinite;
}

.animate-pulse-fast {
  animation: pulseFast 1.5s infinite;
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

.animate-ping-slow {
  animation: pingSlow 3s infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

/* 其他样式增强 */
.text-shadow-lg {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* 脉冲波纹动画 */
@keyframes pingSlow {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}
</style>
