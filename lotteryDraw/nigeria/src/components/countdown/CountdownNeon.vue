<!-- CountdownNeon.vue -->
<template>
  <div class="flex flex-col items-center space-y-6">
    <h2 class="text-lg md:text-2xl font-bold neon-text animate-pulse">
      {{ label }}
    </h2>

    <div class="flex space-x-6">
      <div v-for="(val, key) in timeUnits" :key="key" class="flex flex-col items-center">
        <span class="text-5xl font-mono px-6 py-4 rounded-lg neon-box">
          {{ val.toString().padStart(2, '0') }}
        </span>
        <span class="text-sm opacity-80">{{ labels[key] }}</span>
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
.neon-text {
  color: #0ff;
  text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff;
}
.neon-box {
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid #0ff;
  box-shadow: 0 0 15px #0ff, inset 0 0 25px #0ff;
}
</style>
