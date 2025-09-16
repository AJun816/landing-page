<template>
  <div class="flex flex-col items-center justify-center space-y-6">
    <!-- 标题 -->
    <h2 class="text-2xl font-bold text-gradient bg-clip-text text-transparent">
      {{ config.title }}
    </h2>

    <!-- 老虎机显示区域 -->
    <div class="flex space-x-4 bg-gray-900/80 p-4 rounded-xl shadow-xl">
      <div v-for="(reel, i) in reels" :key="i" class="w-20 h-20 flex items-center justify-center bg-black rounded-lg relative overflow-hidden">
        <div
          class="absolute top-0 w-full transition-transform duration-700"
          :style="{ transform: `translateY(-${currentIndexes[i] * 100}%)` }"
        >
          <div v-for="(item, j) in reel" :key="j" class="h-20 flex items-center justify-center text-2xl font-bold text-yellow-400">
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- 抽奖按钮 -->
    <button
      @click="spin"
      class="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-red-500 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
    >
      {{ config.buttonText }}
    </button>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})

const reels = reactive([]) // 存放每列的选项
const currentIndexes = reactive([]) // 当前显示索引

// 初始化
props.config.reels.forEach((reel) => {
  reels.push([...reel])
  currentIndexes.push(0)
})

// 抽奖逻辑
const spin = () => {
  props.config.reels.forEach((reel, i) => {
    const randomIndex = Math.floor(Math.random() * reel.length)
    currentIndexes[i] = randomIndex
  })
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(90deg, #facc15, #f87171, #e879f9);
}
</style>
