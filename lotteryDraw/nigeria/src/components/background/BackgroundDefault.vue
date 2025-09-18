<template>
  <div class="background-container fixed inset-0 z-0">
    <!-- 低质量占位图（提高初始加载速度） -->
    <div 
        v-if="lowQualityPlaceholder"
        class="absolute inset-0 bg-cover bg-center"
        :style="{
        backgroundImage: `url(${lowQualityPlaceholder})`,
        opacity: imageLoaded ? 0 : 1,
        transition: 'opacity 0.5s ease-out'
      }"
    ></div>

    <!-- 主背景图 -->
    <div
        class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        :style="{
        backgroundImage: `url(${backgroundImage})`,
        opacity: imageLoaded ? 1 : 0
      }"
    ></div>

    <!-- 背景覆盖层：结合opacity -->
    <div
        class="absolute inset-0"
        :style="{
      backgroundColor: props.overlayColor,
      opacity: props.overlayOpacity
    }"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineAsyncComponent } from 'vue';

const props = defineProps({
  backgroundImage: { type: String, required: true },
  overlayColor: { type: String, default: 'rgba(0, 0, 0, 0.5)' },
  overlayOpacity: { type: Number, default: 1 }
});

// 图片加载状态
const imageLoaded = ref(false);
const lowQualityPlaceholder = ref(''); // 低质量占位图
const loadingTimeout = 5000; // 5秒加载超时

// 预加载背景图 - 使用requestIdleCallback确保不阻塞主渲染
onMounted(() => {
  // 对于SVG，我们可以创建一个简单的占位色，因为SVG本身已经很小
  lowQualityPlaceholder.value = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImEiIHg9IjAiIHk9IjAiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjA1IiBudW1PY3RhdmVzPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT48ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4wNSAwIj48L2ZlQ29sb3JNYXRyaXg+PC9maWx0ZXI+PGcgZmlsdGVyPSJ1cmwoI2EpIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJncmVlbiI+PC9yZWN0PjwvZz48L3N2Zz4=';

  // 使用requestIdleCallback确保背景图加载不会阻塞页面渲染
  const loadImage = () => {
    const img = new Image();
    
    // 设置加载超时
    const timeoutId = setTimeout(() => {
      // 超时后仍然显示背景色，避免白屏
      imageLoaded.value = true;
    }, loadingTimeout);
    
    img.onload = () => {
      clearTimeout(timeoutId);
      imageLoaded.value = true;
    };
    
    img.onerror = () => {
      clearTimeout(timeoutId);
      // 加载失败时也显示背景色
      imageLoaded.value = true;
    };
    
    // 设置图片的优先级为低，不影响关键资源加载
    if ('loading' in img) {
      img.loading = 'lazy';
    }
    
    img.src = props.backgroundImage;
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadImage);
  } else {
    // 降级方案：延迟加载，避免阻塞初始渲染
    setTimeout(loadImage, 200);
  }
});
</script>

<style scoped>
.background-container {
  pointer-events: none;
}

/* 确保背景图不会阻止页面的交互 */
.background-container {
  will-change: opacity;
}
</style>

