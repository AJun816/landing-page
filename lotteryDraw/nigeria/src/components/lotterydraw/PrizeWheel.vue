<template>
  <div class="flex flex-col items-center justify-center space-y-6">
    <h2 class="text-2xl font-bold text-gradient bg-clip-text text-transparent">
      {{ config.title }}
    </h2>

    <div class="relative w-72 h-72">
      <!-- 转盘 -->
      <div
        ref="wheel"
        class="w-full h-full rounded-full border-8 border-yellow-400 shadow-2xl relative"
        :style="{ transform: `rotate(${rotation}deg)` }"
      >
        <div
          v-for="(item, i) in config.segments"
          :key="i"
          class="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left flex items-center justify-center text-sm font-bold text-white"
          :style="{ transform: `rotate(${i * segmentAngle}deg)` }"
        >
          {{ item.label }}
        </div>
      </div>

      <!-- 指针 -->
      <div class="absolute top-1/2 left-1/2 w-4 h-20 bg-red-500 -translate-x-1/2 -translate-y-full rounded-full shadow-lg"></div>
    </div>

    <button
      @click="spinWheel"
      class="mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
    >
      {{ config.buttonText }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const wheel = ref(null)
const rotation = ref(0)
const segmentAngle = computed(() => 360 / props.config.segments.length)

const spinWheel = () => {
  // 随机转动角度，至少转 3 圈
  const randomIndex = Math.floor(Math.random() * props.config.segments.length)
  const randomAngle = 360 * 3 + randomIndex * segmentAngle.value + segmentAngle.value / 2
  rotation.value += randomAngle
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #34d399, #3b82f6, #fbbf24);
}
</style>
