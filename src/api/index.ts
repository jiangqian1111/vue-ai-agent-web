// ============================================================
// src/api/index.ts  —  重构版（fetch + ReadableStream）
// ============================================================

import type { GenericAbortSignal } from 'axios'
import { post } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'

// ============================================================
// 非流式接口保持不变（仍用 axios，改动范围最小化）
// ============================================================

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

// ============================================================
// 🔥 核心重构：流式接口 — 从 XHR onprogress → fetch + ReadableStream
// ============================================================

/**
 * 流式聊天请求
 *
 * 重构要点：
 * - 不再依赖 axios 的 onDownloadProgress（底层是 XHR onprogress）
 * - 改用原生 fetch + response.body.getReader() 主动读取流
 * - NDJSON 解析下沉到 API 层，调用方只拿解析好的对象
 * - AbortController.signal 原生兼容，取消逻辑零改动
 * - Token 从 useAuthStore 手动注入 headers（替代 axios 拦截器）
 *
 * @param params.prompt      - 用户输入的文本
 * @param params.options     - 对话上下文（conversationId / parentMessageId）
 * @param params.signal      - AbortController.signal，用于取消请求
 * @param params.onProgress  - 每收到一个完整 JSON 对象就回调一次
 */
export async function fetchChatAPIProcess<T = any>(params: {
  prompt: string
  options?: { conversationId?: string; parentMessageId?: string }
  signal?: AbortSignal
  onProgress?: (data: T) => void
}): Promise<void> {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()

  // ---------- 1. 组装请求体（逻辑不变） ----------
  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  // ---------- 2. 组装请求头 ----------
  // Token 携带：原来由 src/utils/request/axios.ts 的拦截器自动注入
  // 现在改用手动添加，因为 fetch 不走 axios 拦截器
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (authStore.token)
    headers['Authorization'] = `Bearer ${authStore.token}`

  // ---------- 3. 发起 fetch ----------
  // signal 直接传给 fetch，AbortController.abort() 会触发 AbortError
  let response: Response
  try {
    response = await fetch('/api/chat-process', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      signal: params.signal,
    })
  }
  catch (error: any) {
    // 网络错误或取消：直接向上抛，由调用方的 try/catch 处理
    throw error
  }

  // ---------- 4. 检查 HTTP 状态 ----------
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}`
    try {
      const errorBody = await response.text()
      if (errorBody)
        errorMessage = errorBody
    }
    catch {
      // 无法读取响应体，使用默认错误信息
    }
    throw new Error(errorMessage)
  }

  // ---------- 5. 获取可读流 ----------
  if (!response.body)
    throw new Error('当前浏览器不支持 ReadableStream')

  const reader = response.body.getReader()
  const decoder = new TextDecoder('utf-8')

  // ---------- 6. NDJSON 解析缓冲区 ----------
  // 后端每行返回一个完整 JSON，以 \n 分隔：
  //   {"text":"你好","id":"xxx","conversationId":"yyy"}\n
  //   {"text":"你好，世界","id":"xxx","conversationId":"yyy"}\n
  //
  // 但 TCP 流不按行边界到达，可能在某行中间切断，所以用 buffer 拼接：
  //   1. 把新收到的字节解码后追加到 buffer
  //   2. 按 \n 切成多行
  //   3. 最后一段（无 \n 结尾）留在 buffer，等下次拼接
  //   4. 前面的完整行逐一 JSON.parse，回调 onProgress
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done)
        break

      // 流式解码：stream: true 保证多字节 UTF-8 字符不会被截断
      buffer += decoder.decode(value, { stream: true })

      // 按换行符切分
      const lines = buffer.split('\n')

      // 最后一段可能不完整，塞回 buffer 等待下次拼接
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed)
          continue

        try {
          const parsed = JSON.parse(trimmed) as T
          params.onProgress?.(parsed)
        }
        catch {
          // JSON 不完整或格式异常，静默跳过
          // 和原方案 XHR onprogress 里 try/catch 的策略一致
        }
      }
    }

    // ---------- 7. 处理缓冲区残留 ----------
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer.trim()) as T
        params.onProgress?.(parsed)
      }
      catch {
        // 残留数据不完整，丢弃
      }
    }
  }
  finally {
    // 释放读取器锁，防止内存泄漏
    try {
      reader.releaseLock()
    }
    catch {
      // 如果流已被取消，releaseLock 可能抛错，忽略
    }
  }
}

// ============================================================
// 以下接口保持不变
// ============================================================

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}
