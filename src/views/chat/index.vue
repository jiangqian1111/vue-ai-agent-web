<script setup lang='ts'>
import type { Ref } from 'vue'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NInput, useDialog, useMessage } from 'naive-ui'
import { toPng } from 'html-to-image'
import { Message } from './components'
import { useScroll } from './hooks/useScroll'
import { useChat } from './hooks/useChat'
import { useUsingContext } from './hooks/useUsingContext'
import HeaderComponent from './components/Header/index.vue'
import { SvgIcon } from '@/components/common'
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { useChatStore, usePromptStore } from '@/store'
import { fetchChatAPIProcess } from '@/api'
import { t } from '@/locales'

let controller = new AbortController()

const openLongReply = import.meta.env.VITE_GLOB_OPEN_LONG_REPLY === 'true'

const route = useRoute()
const dialog = useDialog()
const ms = useMessage()

const chatStore = useChatStore()

const { isMobile } = useBasicLayout()
const { addChat, updateChat, updateChatSome, getChatByUuidAndIndex } = useChat()
const { scrollRef, scrollToBottom, scrollToBottomIfAtBottom } = useScroll()
const { usingContext, toggleUsingContext } = useUsingContext()

const { uuid } = route.params as { uuid: string }

const dataSources = computed(() => chatStore.getChatByUuid(+uuid))
const conversationList = computed(() => dataSources.value.filter(item => (!item.inversion && !!item.conversationOptions)))

const prompt = ref<string>('')
const loading = ref<boolean>(false)
const inputRef = ref<Ref | null>(null)

// 添加PromptStore
const promptStore = usePromptStore()

// 使用storeToRefs，保证store修改后，联想部分能够重新渲染
const { promptList: promptTemplate } = storeToRefs<any>(promptStore)

// 未知原因刷新页面，loading 状态不会重置，手动重置
dataSources.value.forEach((item, index) => {
  if (item.loading)
    updateChatSome(+uuid, index, { loading: false })
})

function handleSubmit() {
  onConversation()
}

async function onConversation() {
  let message = prompt.value

  if (loading.value)
    return

  if (!message || message.trim() === '')
    return

  controller = new AbortController()

  addChat(
    +uuid,
    {
      dateTime: new Date().toLocaleString(),
      text: message,
      inversion: true,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: null },
    },
  )
  scrollToBottom()

  loading.value = true
  prompt.value = ''

  let options: Chat.ConversationRequest = {}
  const lastContext = conversationList.value[conversationList.value.length - 1]?.conversationOptions

  if (lastContext && usingContext.value)
    options = { ...lastContext }

  addChat(
    +uuid,
    {
      dateTime: new Date().toLocaleString(),
      text: t('chat.thinking'),
      loading: true,
      inversion: false,
      error: false,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    },
  )
  scrollToBottom()

  try {
    let lastText = ''
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess<Chat.ConversationResponse>({
        prompt: message,
        options,
        signal: controller.signal,
        // 🔥 重构：onDownloadProgress → onProgress
        // data 已是解析好的 JSON 对象，无需再手动 JSON.parse
        onProgress: (data) => {
          updateChat(
            +uuid,
            dataSources.value.length - 1,
            {
              dateTime: new Date().toLocaleString(),
              text: lastText + (data.text ?? ''),
              inversion: false,
              error: false,
              loading: true,
              conversationOptions: { conversationId: data.conversationId, parentMessageId: data.id },
              requestOptions: { prompt: message, options: { ...options } },
            },
          )

          if (openLongReply && data.detail?.choices?.[0]?.finish_reason === 'length') {
            options.parentMessageId = data.id
            lastText = data.text
            message = ''
            return fetchChatAPIOnce()
          }

          scrollToBottomIfAtBottom()
        },
      })
      updateChatSome(+uuid, dataSources.value.length - 1, { loading: false })
    }

    await fetchChatAPIOnce()
  }
  catch (error: any) {
    const errorMessage = error?.message ?? t('common.wrong')

    // 🔥 fetch 被 abort 时抛出 AbortError（name: 'AbortError'）
    // 兼容原 axios 的取消错误（message: 'canceled'）
    if (error.name === 'AbortError' || error.message === 'canceled') {
      updateChatSome(
        +uuid,
        dataSources.value.length - 1,
        {
          loading: false,
        },
      )
      scrollToBottomIfAtBottom()
      return
    }

    const currentChat = getChatByUuidAndIndex(+uuid, dataSources.value.length - 1)

    if (currentChat?.text && currentChat.text !== '') {
      updateChatSome(
        +uuid,
        dataSources.value.length - 1,
        {
          text: `${currentChat.text}\n[${errorMessage}]`,
          error: false,
          loading: false,
        },
      )
      return
    }

    updateChat(
      +uuid,
      dataSources.value.length - 1,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
    )
    scrollToBottomIfAtBottom()
  }
  finally {
    loading.value = false
  }
}

async function onRegenerate(index: number) {
  if (loading.value)
    return

  controller = new AbortController()

  const { requestOptions } = dataSources.value[index]

  let message = requestOptions?.prompt ?? ''

  let options: Chat.ConversationRequest = {}

  if (requestOptions.options)
    options = { ...requestOptions.options }

  loading.value = true

  updateChat(
    +uuid,
    index,
    {
      dateTime: new Date().toLocaleString(),
      text: '',
      inversion: false,
      error: false,
      loading: true,
      conversationOptions: null,
      requestOptions: { prompt: message, options: { ...options } },
    },
  )

  try {
    let lastText = ''
    const fetchChatAPIOnce = async () => {
      await fetchChatAPIProcess<Chat.ConversationResponse>({
        prompt: message,
        options,
        signal: controller.signal,
        // 🔥 重构：onDownloadProgress → onProgress
        // data 已是解析好的 JSON 对象，无需再手动 JSON.parse
        onProgress: (data) => {
          updateChat(
            +uuid,
            index,
            {
              dateTime: new Date().toLocaleString(),
              text: lastText + (data.text ?? ''),
              inversion: false,
              error: false,
              loading: true,
              conversationOptions: { conversationId: data.conversationId, parentMessageId: data.id },
              requestOptions: { prompt: message, options: { ...options } },
            },
          )

          if (openLongReply && data.detail?.choices?.[0]?.finish_reason === 'length') {
            options.parentMessageId = data.id
            lastText = data.text
            message = ''
            return fetchChatAPIOnce()
          }
        },
      })
      updateChatSome(+uuid, index, { loading: false })
    }
    await fetchChatAPIOnce()
  }
  catch (error: any) {
    // 🔥 fetch 被 abort 时抛出 AbortError（name: 'AbortError'）
    // 兼容原 axios 的取消错误（message: 'canceled'）
    if (error.name === 'AbortError' || error.message === 'canceled') {
      updateChatSome(
        +uuid,
        index,
        {
          loading: false,
        },
      )
      return
    }

    const errorMessage = error?.message ?? t('common.wrong')

    updateChat(
      +uuid,
      index,
      {
        dateTime: new Date().toLocaleString(),
        text: errorMessage,
        inversion: false,
        error: true,
        loading: false,
        conversationOptions: null,
        requestOptions: { prompt: message, options: { ...options } },
      },
    )
  }
  finally {
    loading.value = false
  }
}

function handleExport() {
  if (loading.value)
    return

  const d = dialog.warning({
    title: t('chat.exportImage'),
    content: t('chat.exportImageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: async () => {
      try {
        d.loading = true
        const ele = document.getElementById('image-wrapper')
        const imgUrl = await toPng(ele as HTMLDivElement)
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = imgUrl
        tempLink.setAttribute('download', 'chat-shot.png')
        if (typeof tempLink.download === 'undefined')
          tempLink.setAttribute('target', '_blank')
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        window.URL.revokeObjectURL(imgUrl)
        d.loading = false
        ms.success(t('chat.exportSuccess'))
        Promise.resolve()
      }
      catch (error: any) {
        ms.error(t('chat.exportFailed'))
      }
      finally {
        d.loading = false
      }
    },
  })
}

function handleDelete(index: number) {
  if (loading.value)
    return

  dialog.warning({
    title: t('chat.deleteMessage'),
    content: t('chat.deleteMessageConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.deleteChatByUuid(+uuid, index)
    },
  })
}

function handleClear() {
  if (loading.value)
    return

  dialog.warning({
    title: t('chat.clearChat'),
    content: t('chat.clearChatConfirm'),
    positiveText: t('common.yes'),
    negativeText: t('common.no'),
    onPositiveClick: () => {
      chatStore.clearChatByUuid(+uuid)
    },
  })
}

function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
  else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      handleSubmit()
    }
  }
}

function handleStop() {
  if (loading.value) {
    controller.abort()
    loading.value = false
  }
}

// ==================================================
// 🔥 / 斜杠指令悬浮窗系统
// ==================================================

/** 键盘当前高亮的提示词索引 */
const activeIndex = ref(0)

/** 用户是否按 Esc 手动关闭了悬浮窗 */
const promptSuggestionDismissed = ref(false)

/** 内置默认提示词（prompt store 为空时使用） */
const BUILT_IN_PROMPTS: Array<{ key: string; value: string }> = [
  { key: 'translate', value: '请将以下内容翻译成中文：' },
  { key: 'summarize', value: '请总结以下内容的核心要点：' },
  { key: 'explain', value: '请用通俗易懂的语言解释以下概念：' },
  { key: 'code-review', value: '请对以下代码进行审查，指出问题和改进建议：' },
  { key: 'rewrite', value: '请重写以下内容，使其更加简洁流畅：' },
  { key: 'brainstorm', value: '请针对以下主题进行头脑风暴，给出多个创意方向：' },
  { key: 'refactor', value: '请重构以下代码，提高可读性和可维护性：' },
  { key: 'fix', value: '以下代码有 bug，请帮我找出并修复：' },
]

/** 模糊过滤：对提示词的 key 和 value 做双字段包含匹配 */
const filteredPrompts = computed(() => {
  if (!prompt.value.startsWith('/'))
    return []

  // 优先使用用户自定义提示词，为空时回退到内置默认
  const source = (promptTemplate.value.length > 0
    ? promptTemplate.value
    : BUILT_IN_PROMPTS) as Array<{ key: string; value: string }>

  const keyword = prompt.value.substring(1).toLowerCase().trim()
  if (!keyword)
    return source

  return source.filter(
    item =>
      item.key.toLowerCase().includes(keyword)
      || item.value.toLowerCase().includes(keyword),
  )
})

/** 是否显示悬浮窗 */
const showPromptSuggestion = computed(() =>
  !promptSuggestionDismissed.value
  && prompt.value.startsWith('/')
  && filteredPrompts.value.length > 0,
)

/** 选中某条提示词：用 value 替换输入框中的 / 指令 */
function selectPrompt(item: { key: string; value: string }) {
  prompt.value = item.value
  promptSuggestionDismissed.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

/** 键盘导航：上/下键移动高亮，Enter 选中，Esc 关闭 */
function handleKeydown(event: KeyboardEvent) {
  if (!showPromptSuggestion.value)
    return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, filteredPrompts.value.length - 1)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    promptSuggestionDismissed.value = true
  }
  else if (event.key === 'Enter') {
    event.preventDefault()
    if (filteredPrompts.value[activeIndex.value])
      selectPrompt(filteredPrompts.value[activeIndex.value])
  }
}

// 当输入内容变化时，重置悬浮窗状态
watch(prompt, () => {
  promptSuggestionDismissed.value = false
  activeIndex.value = 0
})

// 当过滤结果变化时，确保 activeIndex 不越界
watch(filteredPrompts, (list) => {
  if (activeIndex.value >= list.length)
    activeIndex.value = Math.max(0, list.length - 1)
})

const placeholder = computed(() => {
  if (isMobile.value)
    return t('chat.placeholderMobile')
  return t('chat.placeholder')
})

const buttonDisabled = computed(() => {
  return loading.value || !prompt.value || prompt.value.trim() === ''
})

onMounted(() => {
  scrollToBottom()
  if (inputRef.value && !isMobile.value)
    inputRef.value?.focus()
})

onUnmounted(() => {
  if (loading.value)
    controller.abort()
})
</script>

<template>
  <div class="flex flex-col w-full h-full bg-white dark:bg-zinc-900">
    <!-- 移动端头部 -->
    <HeaderComponent
      v-if="isMobile"
      :using-context="usingContext"
      @export="handleExport"
      @handle-clear="handleClear"
    />

    <!-- 消息区域 -->
    <main class="flex-1 overflow-hidden">
      <div id="scrollRef" ref="scrollRef" class="h-full overflow-hidden overflow-y-auto">
        <div
          class="w-full max-w-screen-xl m-auto"
          :class="[isMobile ? 'p-2' : 'p-4']"
        >
          <div id="image-wrapper" class="relative">
            <!-- 空状态 -->
            <template v-if="!dataSources.length">
              <div class="flex flex-col items-center justify-center mt-32 text-center">
                <div class="w-16 h-16 mb-4 rounded-2xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center">
                  <SvgIcon icon="ri:bubble-chart-fill" class="text-3xl text-neutral-300 dark:text-zinc-600" />
                </div>
                <h3 class="text-lg font-semibold text-neutral-400 dark:text-zinc-300">
                  {{ t('chat.newChatTitle') }}
                </h3>
                <p class="text-sm text-neutral-300 dark:text-zinc-500 mt-1">
                  开始一段新的对话
                </p>
              </div>
            </template>
            <!-- 消息列表 -->
            <template v-else>
              <div>
                <Message
                  v-for="(item, index) of dataSources"
                  :key="index"
                  :date-time="item.dateTime"
                  :text="item.text"
                  :inversion="item.inversion"
                  :error="item.error"
                  :loading="item.loading"
                  @regenerate="onRegenerate(index)"
                  @delete="handleDelete(index)"
                />
                <!-- 停止按钮 -->
                <div v-if="loading" class="sticky bottom-0 left-0 flex justify-center pb-4">
                  <button
                    class="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 text-sm text-neutral-500 dark:text-zinc-400 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors"
                    @click="handleStop"
                  >
                    <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>{{ t('common.stopResponding') }}</span>
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </main>

    <!--
      🔥 悬浮胶囊输入区
      居中卡片 + 圆角 + 阴影 + hover 态
    -->
    <div
      class="shrink-0 px-4 pb-4"
      :class="isMobile ? 'pt-2' : 'pt-4 bg-gradient-to-t from-white dark:from-zinc-900 via-white dark:via-zinc-900 to-transparent'"
    >
      <div class="max-w-3xl mx-auto">
        <!-- 输入卡片 -->
        <div
          class="relative bg-neutral-50 dark:bg-zinc-800 border border-neutral-200/80 dark:border-zinc-700 rounded-2xl p-3 shadow-sm hover:border-neutral-300 dark:hover:border-zinc-600 focus-within:border-neutral-400 dark:focus-within:border-zinc-500 focus-within:shadow-md transition-all duration-200"
        >
          <!-- 🔥 斜杠指令悬浮窗 -->
          <div
            v-if="showPromptSuggestion"
            class="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-zinc-800 rounded-xl border border-neutral-200/80 dark:border-zinc-600 shadow-lg overflow-hidden z-50 max-h-60 overflow-y-auto"
          >
            <!-- 标题栏 -->
            <div class="px-3 py-2 border-b border-neutral-100 dark:border-zinc-700 text-xs text-neutral-400 dark:text-zinc-400 font-medium select-none">
              提示词命令
            </div>
            <!-- 提示词列表 -->
            <div
              v-for="(item, index) in filteredPrompts"
              :key="item.key"
              class="flex items-center px-3 py-2 cursor-pointer transition-colors text-sm"
              :class="index === activeIndex
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'hover:bg-neutral-50 dark:hover:bg-zinc-700 text-neutral-700 dark:text-zinc-300'"
              @click="selectPrompt(item)"
              @mouseenter="activeIndex = index"
            >
              <!-- 快捷键标签 -->
              <span
                class="shrink-0 text-xs font-mono px-1.5 py-0.5 rounded mr-2.5"
                :class="index === activeIndex
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300'
                  : 'bg-neutral-100 dark:bg-zinc-700 text-neutral-500 dark:text-zinc-400'"
              >
                /{{ item.key }}
              </span>
              <!-- 内容预览 -->
              <span class="truncate">{{ item.value }}</span>
            </div>
          </div>

          <!-- 文本输入区 -->
          <NInput
            ref="inputRef"
            v-model:value="prompt"
            type="textarea"
            :placeholder="placeholder"
            :autosize="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"
            class="!bg-transparent"
            @keydown="handleKeydown"
            @keypress="handleEnter"
          />

          <!-- 工具栏：操作按钮 + 发送 -->
          <div class="flex items-center justify-between border-t border-neutral-200/50 dark:border-zinc-600/50 pt-2.5 mt-2">
            <!-- 左侧工具按钮组 -->
            <div class="flex items-center space-x-1.5">
              <!-- 上下文开关 -->
              <button
                class="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                :class="usingContext
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  : 'bg-white dark:bg-zinc-800 text-neutral-400 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700 hover:text-neutral-600 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-700'"
                @click="toggleUsingContext"
              >
                <SvgIcon icon="ri:chat-history-line" class="text-sm" />
                <span>{{ t('chat.usingContext') }}</span>
              </button>

              <!-- 清空对话 -->
              <button
                v-if="!isMobile"
                class="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs bg-white dark:bg-zinc-800 text-neutral-400 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-700 hover:text-neutral-600 dark:hover:text-zinc-200 hover:bg-neutral-100 dark:hover:bg-zinc-700 transition-colors"
                @click="handleClear"
              >
                <SvgIcon icon="ri:delete-bin-line" class="text-sm" />
                <span>{{ t('chat.clearSession') }}</span>
              </button>
            </div>

            <!-- 右侧发送按钮 -->
            <div class="flex items-center space-x-2">
              <!-- 导出按钮（桌面端） -->
              <button
                v-if="!isMobile"
                class="p-1.5 rounded-lg text-neutral-400 dark:text-zinc-400 hover:text-neutral-600 dark:hover:text-zinc-200 hover:bg-neutral-200/60 dark:hover:bg-zinc-700/60 transition-colors"
                @click="handleExport"
              >
                <SvgIcon icon="ri:download-2-line" class="text-lg" />
              </button>

              <!-- 发送按钮 -->
              <button
                :disabled="buttonDisabled"
                class="p-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                @click="handleSubmit"
              >
                <SvgIcon icon="ri:send-plane-fill" class="text-base" />
              </button>
            </div>
          </div>
        </div>

        <!-- 快捷建议按钮（空状态时显示） -->
        <div
          v-if="!dataSources.length && !isMobile"
          class="flex items-center justify-center space-x-2 mt-3"
        >
          <button
            v-for="hint in [t('chat.suggestions.arch'), t('chat.suggestions.stream'), t('chat.suggestions.react')]"
            :key="hint"
            class="text-xs text-neutral-400 dark:text-zinc-400 bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200/80 dark:hover:bg-zinc-700/80 px-3 py-1.5 rounded-lg border border-neutral-200/40 dark:border-zinc-700/40 transition-colors"
            @click="prompt = hint; handleSubmit()"
          >
            {{ hint }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
