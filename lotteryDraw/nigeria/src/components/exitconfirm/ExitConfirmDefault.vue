<template>
  <div
      v-if="showModal"
      class="exit-modal fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
  >
    <div class="modal-content bg-white rounded-2xl p-6 md:p-8 max-w-md w-full mx-auto transform transition-all animate-bounce-slow shadow-2xl">
      <!-- 图标 -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-2">
          <i class="fa fa-exclamation-triangle text-2xl"></i>
        </div>
      </div>

      <!-- 内容 -->
      <h3 class="text-xl md:text-2xl font-bold text-center mb-4 text-gray-800">
        {{ title }}
      </h3>

      <p class="text-gray-600 text-center mb-8">
        {{ message }}
      </p>

      <!-- 按钮 -->
      <div class="flex flex-col sm:flex-row gap-4">
        <button
            @click="$emit('stay')"
            class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors transform hover:scale-105"
        >
          {{ stayButtonText }}
        </button>

        <button
            @click="$emit('leave')"
            class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {{ leaveButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "Don't Leave!"
  },
  message: {
    type: String,
    default: "Are you sure you want to miss this exclusive offer? Stay to claim your reward!"
  },
  stayButtonText: {
    type: String,
    default: "Stay & Claim"
  },
  leaveButtonText: {
    type: String,
    default: "Leave"
  }
});

const emits = defineEmits(['stay', 'leave']);
</script>

