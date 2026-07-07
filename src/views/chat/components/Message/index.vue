<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NDropdown, useMessage } from 'naive-ui'
import TextComponent from './Text.vue'
import { SvgIcon } from '@/components/common'
import { useIconRender } from '@/hooks/useIconRender'
import { t } from '@/locales'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { copyToClip } from '@/utils/copy'

interface Props {
  dateTime?: string
  text?: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
}

interface Emit {
  (ev: 'regenerate'): void
  (ev: 'delete'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const { isMobile } = useBasicLayout()

const { iconRender } = useIconRender()

const message = useMessage()

const textRef = ref<HTMLElement>()

const asRawText = ref(props.inversion)

const messageRef = ref<HTMLElement>()

const options = computed(() => {
  const common = [
    {
      label: t('chat.copy'),
      key: 'copyText',
      icon: iconRender({ icon: 'ri:file-copy-2-line' }),
    },
    {
      label: t('common.delete'),
      key: 'delete',
      icon: iconRender({ icon: 'ri:delete-bin-line' }),
    },
  ]

  if (!props.inversion) {
    common.unshift({
      label: asRawText.value ? t('chat.preview') : t('chat.showRawText'),
      key: 'toggleRenderType',
      icon: iconRender({ icon: asRawText.value ? 'ic:outline-code-off' : 'ic:outline-code' }),
    })
  }

  return common
})

function handleSelect(key: 'copyText' | 'delete' | 'toggleRenderType') {
  switch (key) {
    case 'copyText':
      handleCopy()
      return
    case 'toggleRenderType':
      asRawText.value = !asRawText.value
      return
    case 'delete':
      emit('delete')
  }
}

function handleRegenerate() {
  messageRef.value?.scrollIntoView()
  emit('regenerate')
}

async function handleCopy() {
  try {
    await copyToClip(props.text || '')
    message.success(t('chat.copied'))
  }
  catch {
    message.error(t('chat.copyFailed'))
  }
}
</script>

<template>
  <div
    ref="messageRef"
    class="flex w-full"
    :class="inversion ? 'mb-6' : 'mb-10'"
  >
    <!-- 内容区 -->
    <div class="flex-1 min-w-0 overflow-hidden">
      <!-- 顶行：用户名 + 时间戳 -->
      <div class="flex items-center gap-2 mb-1">
        <span class="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          {{ inversion ? 'You' : 'Nova AI' }}
        </span>
        <span class="text-xs text-neutral-400 dark:text-neutral-500">
          {{ dateTime }}
        </span>
      </div>

      <!-- 消息正文（无气泡、全平铺） -->
      <TextComponent
        ref="textRef"
        :inversion="inversion"
        :error="error"
        :text="text"
        :loading="loading"
        :as-raw-text="asRawText"
      />

      <!-- 底部操作栏（hover 渐显） -->
      <div class="flex items-center gap-0.5 mt-1.5 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <button
          v-if="!inversion"
          class="p-0.5 transition text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-300"
          @click="handleRegenerate"
        >
          <SvgIcon icon="ri:restart-line" />
        </button>
        <NDropdown
          :trigger="isMobile ? 'click' : 'hover'"
          placement="right"
          :options="options"
          @select="handleSelect"
        >
          <button class="p-0.5 transition text-neutral-300 hover:text-neutral-500 dark:hover:text-neutral-300">
            <SvgIcon icon="ri:more-2-fill" />
          </button>
        </NDropdown>
      </div>

      <!-- 微妙的水平分隔线（AI 消息后） -->
      <div
        v-if="!inversion"
        class="mt-6 border-b border-neutral-100 dark:border-zinc-800"
      />
    </div>
  </div>
</template>
