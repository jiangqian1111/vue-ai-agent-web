<script setup lang='ts'>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Sider from './sider/index.vue'
import Permission from './Permission.vue'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useAuthStore, useChatStore } from '@/store'

const router = useRouter()
const chatStore = useChatStore()
const authStore = useAuthStore()

router.replace({ name: 'Chat', params: { uuid: chatStore.active } })

const { isMobile } = useBasicLayout()

const needPermission = computed(() => !!authStore.session?.auth && !authStore.token)
</script>

<template>
  <!--
    外层：冷灰背景 + 四边留白
    这是 Mac 卡片风的骨架 —— 整个应用悬浮在浅灰色背景上
  -->
  <div
    class="h-screen w-screen flex overflow-hidden font-sans antialiased select-none"
    :class="isMobile ? 'bg-white dark:bg-zinc-900' : 'bg-[#f4f4f5] dark:bg-zinc-950 p-4'"
  >
    <!--
      主容器：白色圆角卡片，带微阴影和极细边框
      桌面端：rounded-3xl + shadow-sm + border
      移动端：全屏无圆角
    -->
    <div
      class="flex flex-1 h-full w-full overflow-hidden"
      :class="isMobile ? '' : 'bg-white dark:bg-zinc-900 rounded-3xl border border-neutral-200/50 dark:border-zinc-800 shadow-sm'"
    >
      <!-- 侧边栏区域 -->
      <Sider />

      <!-- 主内容区 -->
      <main class="flex-1 h-full flex flex-col overflow-hidden min-w-0 bg-white dark:bg-zinc-900">
        <!--
          macOS 风格顶部栏
          包含红绿黄窗口按钮 + 会话标签
        -->
        <header
          v-if="!isMobile"
          class="h-12 border-b border-neutral-100 dark:border-zinc-800 px-5 flex items-center justify-between bg-neutral-50/50 dark:bg-zinc-900/50 shrink-0"
        >
          <div class="flex items-center">
            <!-- 当前会话标签 -->
            <div class="flex items-center bg-white/80 dark:bg-zinc-800/80 px-3 py-1 rounded-lg border border-neutral-200/60 dark:border-zinc-700 text-xs font-medium text-neutral-600 dark:text-zinc-300 shadow-sm">
              <span class="mr-1.5 text-xs">💬</span>
              <span>Nova Chat</span>
            </div>
          </div>
          <!-- 右侧状态 -->
          <div class="text-xs text-neutral-400 flex items-center space-x-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>API Connected</span>
          </div>
        </header>

        <!-- 聊天内容区 -->
        <div class="flex-1 flex flex-col overflow-hidden relative">
          <RouterView v-slot="{ Component, route }">
            <component :is="Component" :key="route.fullPath" />
          </RouterView>
        </div>
      </main>
    </div>

    <Permission :visible="needPermission" />
  </div>
</template>
