<script setup lang='ts'>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { NButton, useDialog } from 'naive-ui'
import List from './List.vue'
import Footer from './Footer.vue'
import { useAppStore, useChatStore } from '@/store'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { PromptStore, SvgIcon } from '@/components/common'
import { t } from '@/locales'

const appStore = useAppStore()
const chatStore = useChatStore()

const dialog = useDialog()

const { isMobile } = useBasicLayout()
const show = ref(false)

const collapsed = computed(() => appStore.siderCollapsed)

function handleAdd() {
  chatStore.addHistory({ title: t('chat.newChat') || 'New Chat', uuid: Date.now(), isEdit: false })
  if (isMobile.value)
    appStore.setSiderCollapsed(true)
}

function handleUpdateCollapsed() {
  appStore.setSiderCollapsed(!collapsed.value)
}

function handleClearAll() {
  dialog.warning({
    title: t('chat.deleteMessage'),
    content: t('chat.clearHistoryConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.clearHistory()
      if (isMobile.value)
        appStore.setSiderCollapsed(true)
    },
  })
}

const getMobileClass = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return {
      position: 'fixed',
      zIndex: 50,
    }
  }
  return {}
})

const mobileSafeArea = computed(() => {
  if (isMobile.value) {
    return {
      paddingBottom: 'env(safe-area-inset-bottom)',
    }
  }
  return {}
})

watch(
  isMobile,
  (val) => {
    appStore.setSiderCollapsed(val)
  },
  {
    immediate: true,
    flush: 'post',
  },
)
</script>

<template>
  <!--
    桌面端侧边栏：透明背景，融入外层冷灰色
    Naive UI NLayoutSider 替换为纯 div，避免自带边框和深色背景
  -->
  <template v-if="!isMobile || !collapsed">
    <aside
      class="h-full flex flex-col shrink-0 border-r border-neutral-100 dark:border-zinc-800"
      :class="isMobile ? 'w-[260px] fixed z-50 bg-white dark:bg-zinc-900 dark:text-zinc-200 shadow-2xl' : 'w-[260px] bg-transparent dark:text-zinc-200'"
      :style="getMobileClass"
    >
      <div class="flex flex-col h-full" :style="mobileSafeArea">
        <main class="flex flex-col flex-1 min-h-0">
          <!-- 新建对话按钮 -->
          <div class="p-4">
            <NButton dashed block @click="handleAdd" class="!rounded-xl">
              {{ $t('chat.newChatButton') }}
            </NButton>
          </div>

          <!-- 对话列表 -->
          <div class="flex-1 min-h-0 pb-2 overflow-hidden">
            <List />
          </div>

          <!-- Prompt 商店 + 清空 -->
          <div class="flex items-center px-4 pb-1 space-x-2">
            <div class="flex-1">
              <NButton block size="small" @click="show = true" class="!rounded-lg">
                {{ $t('store.siderButton') }}
              </NButton>
            </div>
            <NButton size="small" @click="handleClearAll" class="!rounded-lg">
              <SvgIcon icon="ri:close-circle-line" />
            </NButton>
          </div>
        </main>

        <!-- 底部用户信息 -->
        <Footer />
      </div>
    </aside>
  </template>

  <!-- 移动端遮罩 -->
  <template v-if="isMobile">
    <div v-show="!collapsed" class="fixed inset-0 z-40 w-full h-full bg-black/40" @click="handleUpdateCollapsed" />
  </template>

  <PromptStore v-model:visible="show" />
</template>
