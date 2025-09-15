<template>
  <div class="w-full text-center text-white my-8">
    <!-- 活动Logo -->
    <div v-if="logo" class="mb-6">
      <img
          :src="logo"
          :alt="logoAlt"
          class="mx-auto max-h-20 md:max-h-24 object-contain"
      >
    </div>

    <!-- 标题 -->
    <h1 class="text-3xl md:text-5xl font-bold mb-4 leading-tight text-shadow-lg">
      {{ title }}
    </h1>

    <!-- 副标题 -->
    <h2 class="text-xl md:text-2xl font-semibold mb-8 text-yellow-300">
      {{ subtitle }}
    </h2>

    <!-- 描述文本 -->
    <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
      {{ description }}
    </p>

    <!-- 列表项 -->
    <div class="max-w-lg mx-auto mb-10">
      <ul class="space-y-4">
        <li
            v-for="(point, index) in bulletPoints"
            :key="index"
            class="flex items-start justify-center gap-3"
        >
          <i class="fa fa-check-circle text-green-400 mt-1 text-xl"></i>
          <span class="text-left text-lg">{{ point }}</span>
        </li>
      </ul>
    </div>

    <!-- CTA按钮 -->
    <a
        :href="ctaButtonUrl"
        @click.prevent="$emit('cta-click')"
        class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg md:text-xl py-4 px-10 rounded-full shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
    >
      {{ ctaButtonText }}
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  logo: {
    type: String,
    default: ''
  },
  logoAlt: {
    type: String,
    default: 'Event Logo'
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  bulletPoints: {
    type: Array,
    required: true
  },
  ctaButtonText: {
    type: String,
    required: true
  },
  ctaButtonUrl: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['cta-click']);
</script>

