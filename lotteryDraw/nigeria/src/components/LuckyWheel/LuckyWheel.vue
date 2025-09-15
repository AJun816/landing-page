<template>
  <div class="flex flex-col items-center space-y-6">
    <div class="relative w-72 h-72">
      <!-- 转盘 -->
      <div
          class="w-full h-full rounded-full border-8 border-white shadow-2xl transition-transform duration-[4000ms] ease-out"
          :style="{ transform: `rotate(${rotation}deg)` }"
      >
        <div class="w-full h-full rounded-full bg-[conic-gradient(#ff0066_0deg_60deg,#00ccff_60deg_120deg,#ffcc00_120deg_180deg,#33ff66_180deg_240deg,#ff6600_240deg_300deg,#6600ff_300deg_360deg)]"></div>
      </div>

      <!-- 指针 -->
      <div class="absolute top-[-24px] left-1/2 -translate-x-1/2 w-0 h-0
                  border-l-[20px] border-r-[20px] border-b-[40px] border-transparent border-b-yellow-400
                  drop-shadow-[0_0_10px_gold]">
      </div>
    </div>

    <!-- 按钮 -->
    <button
        @click="spinWheel"
        class="px-6 py-3 rounded-xl font-bold text-lg text-white
             bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-600
             shadow-lg shadow-yellow-400/50
             hover:scale-110 transition-transform duration-200"
    >
      🎉 开始抽奖
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rotation = ref(0);
let spinning = false;

const spinWheel = () => {
  if (spinning) return;
  spinning = true;

  const randomExtra = Math.floor(Math.random() * 360);
  const spins = 5 * 360;
  const finalRotation = rotation.value + spins + randomExtra;

  rotation.value = finalRotation;

  setTimeout(() => {
    spinning = false;
    alert('🎉 恭喜！就差一点点，下一个就是你！');
  }, 4000);
};
</script>
