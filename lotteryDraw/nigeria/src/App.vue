<template>
  <!-- 背景组件 -->
  <Background :background-image="config.background.imageUrl" :overlay-color="config.background.overlayColor"
    :overlay-opacity="config.background.overlayOpacity" />

  <!-- 主内容容器 -->
  <main class="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 max-w-4xl mx-auto">
    <!-- 内容组件 -->
    <Content :logo-url="config.logo.url" :logo-alt="config.logo.alt" :title="config.content.title"
      :subtitle="config.content.subtitle" :description="config.content.description"
      :bullet-points="config.content.bulletPoints" :cta-button-text="config.content.ctaButton.text"
      :cta-button-url="config.content.ctaButton.url" @cta-click="handleCtaClick">
      <template v-slot:after-subtitle>
      <LEDCountdown :config="config.countdown"/>
      </template>
    </Content>
  </main>
  <!-- 退出确认组件 -->
  <ExitConfirm :title="config.exitConfirm.title" :message="config.exitConfirm.message"
    :stay-button-text="config.exitConfirm.stayButtonText" :leave-button-text="config.exitConfirm.leaveButtonText"
    @stay="handleStay" @leave="handleLeave" />

  <!-- 自动重定向组件 -->
  <Redirect ref="redirectComponent" :target-url="config.redirect.targetUrl"
    :countdown-seconds="config.redirect.countdownSeconds" :message="config.redirect.message"
    :seconds-label="config.redirect.secondsLabel" :allow-skip="config.redirect.allowSkip" />
</template>

<script setup>
import { ref } from 'vue';
import Background from './components/background/BackgroundDefault.vue';
import Content from './components/content/ContentDefault.vue';
import ExitConfirm from './components/exitconfirm/ExitConfirmDefault.vue';
import Redirect from './components/redirect/RedirectDefault.vue';
import config from '/landing.config.js';
import LEDCountdown from './components/countdown/LEDCountdown.vue';

// 重定向组件引用
const redirectComponent = ref(null);

// 处理CTA按钮点击
const handleCtaClick = () => {
  // 点击按钮时立即重定向
  if (redirectComponent.value) {
    redirectComponent.value.skipCountdown();
  }
};

// 处理用户选择留下
const handleStay = () => {
  console.log('User chose to stay');
  // 可以添加留下后的逻辑，如显示额外优惠等
};

// 处理用户选择离开
const handleLeave = () => {
  console.log('User chose to leave');
  // 可以添加离开前的最后挽留逻辑
};
</script>

<style>
/* 全局样式 */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义工具类 */
@layer utilities {
  .text-shadow-lg {
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .animate-pop-in {
    animation: popIn 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
}

/* 全局动画定义 */
@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* 基础样式重置 */
body {
  @apply font-sans;
}
</style>
