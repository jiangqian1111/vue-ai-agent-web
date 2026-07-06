<script setup lang='ts'>
import { computed, onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import pkg from '../../../../package.json'
import { fetchChatConfig } from '@/api'
import { useAuthStore } from '@/store'

interface ConfigState {
  timeoutMs?: number
  reverseProxy?: string
  apiModel?: string
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

const authStore = useAuthStore()

const loading = ref(false)

const config = ref<ConfigState>()

const isChatGPTAPI = computed<boolean>(() => !!authStore.isChatGPTAPI)

async function fetchConfig() {
  try {
    loading.value = true
    const { data } = await fetchChatConfig<ConfigState>()
    config.value = data
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchConfig()
})
</script>

<template>
  <NSpin :show="loading">
    <div class="p-4 space-y-5">
      <!-- 项目信息 -->
      <div class="text-center">
        <h2 class="text-xl font-bold text-neutral-800">
          Nova Chat
        </h2>
        <p class="text-sm text-neutral-400 mt-1">
          v{{ pkg.version }} · MIT
        </p>
      </div>

      <!-- 技术栈 -->
      <div class="p-3 space-y-2 rounded-xl bg-neutral-50 border border-neutral-100">
        <p class="text-xs font-semibold text-neutral-400 uppercase tracking-wide">Tech Stack</p>
        <div class="flex flex-wrap gap-1.5">
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Vue 3</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">TypeScript</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Vite</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Pinia</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Tailwind CSS</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Naive UI</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Dexie.js</span>
          <span class="px-2 py-0.5 text-xs rounded-md bg-white border border-neutral-200 text-neutral-600">Fetch + ReadableStream</span>
        </div>
      </div>

      <!-- 配置信息 -->
      <div class="space-y-2.5">
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-400">{{ $t("setting.api") }}</span>
          <span class="font-mono text-neutral-600">{{ config?.apiModel ?? '-' }}</span>
        </div>
        <div v-if="isChatGPTAPI" class="flex items-center justify-between text-sm">
          <span class="text-neutral-400">{{ $t("setting.monthlyUsage") }}</span>
          <span class="font-mono text-neutral-600">{{ config?.usage ?? '-' }}</span>
        </div>
        <div v-if="!isChatGPTAPI" class="flex items-center justify-between text-sm">
          <span class="text-neutral-400">{{ $t("setting.reverseProxy") }}</span>
          <span class="font-mono text-neutral-600">{{ config?.reverseProxy ?? '-' }}</span>
        </div>
        <div class="flex items-center justify-between text-sm">
          <span class="text-neutral-400">{{ $t("setting.timeout") }}</span>
          <span class="font-mono text-neutral-600">{{ config?.timeoutMs ?? '-' }}ms</span>
        </div>
      </div>
    </div>
  </NSpin>
</template>
