<!-- CountdownFlip.vue -->
<template>
  <div class="flex flex-col items-center space-y-6">
    <h2 class="text-lg md:text-2xl font-bold text-white animate-pulse">
      {{ label }}
    </h2>

    <div class="flex space-x-4">
      <div v-for="(val, key) in timeUnits" :key="key" class="flex flex-col items-center">
        <div class="flip-card">
          <span>{{ val.toString().padStart(2, '0') }}</span>
        </div>
        <span class="text-sm text-gray-400 mt-2">{{ labels[key] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  label: String,
  totalDuration: Number,
  labels: Object
});

const minutes = ref(0);
const seconds = ref(0);
const milliseconds = ref(0);
let startTime, timer;

const update = () => {
  const now = Date.now();
  const elapsed = now - startTime;
  const remaining = Math.max(props.totalDuration - elapsed, 0);

  minutes.value = Math.floor((remaining / 1000 / 60) % 60);
  seconds.value = Math.floor((remaining / 1000) % 60);
  milliseconds.value = Math.floor(remaining % 1000);

  if (remaining <= 0) clearInterval(timer);
};

onMounted(() => {
  startTime = Date.now();
  timer = setInterval(update, 50);
});
onUnmounted(() => clearInterval(timer));

const timeUnits = { minute: minutes, second: seconds, millisecond: milliseconds };
</script>

<style scoped>
.flip-card {
  background: #111;
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  border: 2px solid #ff0080;
  box-shadow: 0 0 15px #ff0080, inset 0 0 20px #ff0080;
  perspective: 1000px;
  animation: flipAnim 1s infinite;
}
@keyframes flipAnim {
  0% { transform: rotateX(0deg); }
  50% { transform: rotateX(180deg); }
  100% { transform: rotateX(360deg); }
}
</style>
