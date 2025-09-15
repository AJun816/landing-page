<!-- CountdownRing.vue -->
<template>
  <div class="flex flex-col items-center space-y-4 relative">
    <h2 class="text-xl font-bold animate-pulse bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
      {{ label }}
    </h2>

    <div class="relative w-40 h-40">
      <svg class="w-full h-full transform -rotate-90">
        <circle cx="80" cy="80" r="70" stroke="#333" stroke-width="12" fill="none" />
        <circle
            cx="80" cy="80" r="70"
            stroke="url(#gradient)" stroke-width="12" fill="none"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="progress"
            stroke-linecap="round"
            class="transition-all duration-200 ease-linear"
        />
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#ff0080"/>
            <stop offset="100%" stop-color="#7928ca"/>
          </linearGradient>
        </defs>
      </svg>

      <div class="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
        <span class="text-3xl">{{ seconds.toString().padStart(2, '0') }}</span>
        <span class="text-xs opacity-70">{{ labels.second }}</span>
      </div>

      <!-- 粒子闪光 -->
      <div v-for="n in 10" :key="n" class="particle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps({
  label: String,
  totalDuration: Number,
  labels: Object
});

const seconds = ref(0);
let startTime, timer;

const circumference = 2 * Math.PI * 70;
const progress = computed(() => ((60 - seconds.value) / 60) * circumference);

const update = () => {
  const now = Date.now();
  const elapsed = now - startTime;
  const remaining = Math.max(props.totalDuration - elapsed, 0);

  seconds.value = Math.floor((remaining / 1000) % 60);

  if (remaining <= 0) clearInterval(timer);
};

onMounted(() => {
  startTime = Date.now();
  timer = setInterval(update, 200);
});
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #fff, transparent);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  animation: sparkle 2s infinite ease-in-out;
}
.particle:nth-child(odd) { animation-delay: 0.5s; }
.particle:nth-child(even) { animation-delay: 1s; }

@keyframes sparkle {
  0% { transform: translate(0, 0) scale(0.5); opacity: 1; }
  50% { transform: translate(40px, -30px) scale(1.2); opacity: 0.6; }
  100% { transform: translate(0, 0) scale(0.5); opacity: 0; }
}
</style>
