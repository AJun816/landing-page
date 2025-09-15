<template>
  <div class="w-full text-center text-white my-8 relative">
    <!-- 背景装饰元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-20 -left-20 w-64 h-64 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-40 -right-20 w-64 h-64 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    </div>

    <!-- 活动Logo -->
    <div v-if="logo" class="mb-6 transform transition-all duration-700 hover:scale-105">
      <img
          :src="logo"
          :alt="logoAlt"
          class="mx-auto max-h-20 md:max-h-24 object-contain drop-shadow-lg"
      >
    </div>

    <!-- 标题 - 带呼吸效果和渐变文字 -->
    <h1 class="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-shadow-lg animate-pulse-slow bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-white">
      {{ title }}
    </h1>

    <!-- 副标题 - 带闪烁强调 -->
    <h2 class="text-xl md:text-2xl font-semibold mb-4 text-yellow-300 relative inline-block">
      <span class="relative z-10">{{ subtitle }}</span>
      <span class="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 opacity-70 transform -translate-y-1 animate-pulse"></span>
    </h2>

    <!-- 插槽：主副标题下方，用于插入倒计时等组件（小屏幕也会显示） -->
    <slot name="after-subtitle"></slot>

    <!-- 描述文本：仅中等及以上屏幕显示 -->
    <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-100 hidden md:block">
      {{ description }}
    </p>

    <!-- 列表项：仅中等及以上屏幕显示，逐项淡入动画 -->
    <div class="max-w-lg mx-auto mb-10 hidden md:block">
      <ul class="space-y-4">
        <li
            v-for="(point, index) in bulletPoints"
            :key="index"
            class="flex items-start justify-center gap-3 opacity-0 animate-fadeIn"
            :style="{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }"
        >
          <i class="fa fa-check-circle text-green-400 mt-1 text-xl animate-pulse-fast"></i>
          <span class="text-left text-lg">{{ point }}</span>
        </li>
      </ul>
    </div>

    <!-- CTA按钮 - 带脉冲和放大效果（始终显示） -->
    <a
        :href="ctaButtonUrl"
        @click.prevent="$emit('cta-click')"
        class="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg md:text-xl py-4 px-10 rounded-full shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-red-500/30 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50 relative overflow-hidden group"
    >
      <span class="relative z-10 flex items-center gap-2">
        {{ ctaButtonText }}
        <i class="fa fa-arrow-right transition-transform group-hover:translate-x-1"></i>
      </span>
      <span class="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
      <span class="absolute -inset-1 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000"></span>
    </a>
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
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

@keyframes pulseFast {
  0%, 100% {
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
</style>
