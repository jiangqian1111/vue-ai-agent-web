<script setup lang='ts'>
import type { Ref } from 'vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NAutoComplete, NInput, useDialog, useMessage } from 'naive-ui'
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

// 可优化部分
// 搜索选项计算，这里使用value作为索引项，所以当出现重复value时渲染异常(多项同时出现选中效果)
// 理想状态下其实应该是key作为索引项,但官方的renderOption会出现问题，所以就需要value反renderLabel实现
const searchOptions = computed(() => {
  if (prompt.value.startsWith('/')) {
    return promptTemplate.value.filter((item: { key: string }) => item.key.toLowerCase().includes(prompt.value.substring(1).toLowerCase())).map((obj: { value: any }) => {
      return {
        label: obj.value,
        value: obj.value,
      }
    })
  }
  else {
    return []
  }
})

// value反渲染key
const renderOption = (option: { label: string }) => {
  for (const i of promptTemplate.value) {
    if (i.value === option.label)
      return [i.key]
  }
  return []
}

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
  <div class="flex flex-col w-full h-full bg-white">
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
                <div class="w-16 h-16 mb-4 rounded-2xl bg-neutral-100 flex items-center justify-center">
                  <SvgIcon icon="ri:bubble-chart-fill" class="text-3xl text-neutral-300" />
                </div>
                <h3 class="text-lg font-semibold text-neutral-400">
                  {{ t('chat.newChatTitle') }}
                </h3>
                <p class="text-sm text-neutral-300 mt-1">
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
                    class="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 text-sm text-neutral-500 hover:bg-neutral-200 transition-colors"
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
      :class="isMobile ? 'pt-2' : 'pt-4 bg-gradient-to-t from-white via-white to-transparent'"
    >
      <div class="max-w-3xl mx-auto">
        <!-- 输入卡片 -->
        <div
          class="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 shadow-sm hover:border-neutral-300 focus-within:border-neutral-400 focus-within:shadow-md transition-all duration-200"
        >
          <!-- 文本输入区 -->
          <NAutoComplete
            v-model:value="prompt"
            :options="searchOptions"
            :render-label="renderOption"
            :class="isMobile ? 'w-full' : 'w-full'"
          >
            <template #default="{ handleInput, handleBlur, handleFocus }">
              <NInput
                ref="inputRef"
                v-model:value="prompt"
                type="textarea"
                :placeholder="placeholder"
                :autosize="{ minRows: 1, maxRows: isMobile ? 4 : 8 }"
                class="!bg-transparent"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @keypress="handleEnter"
              />
            </template>
          </NAutoComplete>

          <!-- 工具栏：操作按钮 + 发送 -->
          <div class="flex items-center justify-between border-t border-neutral-200/50 pt-2.5 mt-2">
            <!-- 左侧工具按钮组 -->
            <div class="flex items-center space-x-1.5">
              <!-- 上下文开关 -->
              <button
                class="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                :class="usingContext
                  ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  : 'bg-white text-neutral-400 border border-neutral-200 hover:text-neutral-600 hover:bg-neutral-100'"
                @click="toggleUsingContext"
              >
                <SvgIcon icon="ri:chat-history-line" class="text-sm" />
                <span>上下文</span>
              </button>

              <!-- 清空对话 -->
              <button
                v-if="!isMobile"
                class="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs bg-white text-neutral-400 border border-neutral-200 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                @click="handleClear"
              >
                <SvgIcon icon="ri:delete-bin-line" class="text-sm" />
                <span>清空</span>
              </button>
            </div>

            <!-- 右侧发送按钮 -->
            <div class="flex items-center space-x-2">
              <!-- 导出按钮（桌面端） -->
              <button
                v-if="!isMobile"
                class="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-200/60 transition-colors"
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
            v-for="hint in ['解释这个项目的架构', '用 Fetch 实现流式渲染', '重构一个 React 组件']"
            :key="hint"
            class="text-xs text-neutral-400 bg-neutral-100 hover:bg-neutral-200/80 px-3 py-1.5 rounded-lg border border-neutral-200/40 transition-colors"
            @click="prompt = hint; handleSubmit()"
          >
            {{ hint }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
