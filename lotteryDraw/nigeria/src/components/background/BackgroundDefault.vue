<template>
  <div class="background-container fixed inset-0 z-0">
    <!-- 背景图 -->
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
import {onMounted, ref} from 'vue';

const props = defineProps({
  backgroundImage: { type: String, required: true },
  overlayColor: { type: String, default: 'rgba(0, 0, 0, 0.5)' },
  overlayOpacity: { type: Number, default: 1 } // 新增：控制覆盖层透明度
});

// 图片加载状态
const imageLoaded = ref(false);

// 预加载背景图
onMounted(() => {
  const img = new Image();
  img.src = props.backgroundImage;
  img.onload = () => {
    imageLoaded.value = true;
  };
});
</script>

<style scoped>
.background-container {
  pointer-events: none;
}
</style>

