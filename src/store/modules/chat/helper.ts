import { db } from '@/utils/db'
import type { Conversation, Message } from '@/utils/db'
import { t } from '@/locales'

/**
 * 返回默认的初始状态（同步）
 * 应用启动时先用这个填充 store，然后再从 IndexedDB 水合数据
 */
export function defaultState(): Chat.ChatState {
  const uuid = 1002
  return {
    active: uuid,
    usingContext: true,
    history: [{ uuid, title: t('chat.newChat') || 'New Chat', isEdit: false }],
    chat: [{ uuid, data: [] }],
  }
}

/**
 * 从 IndexedDB 读取聊天状态
 * 把三张表的数据重新组装成 ChatState 结构
 * 如果数据库为空（首次启动），返回 null，store 将保留默认状态
 */
export async function getLocalState(): Promise<Chat.ChatState | null> {
  // 并行读取三张表
  const [settings, conversations, allMessages] = await Promise.all([
    db.settings.get(1),
    db.conversations.toArray(),
    db.messages.orderBy('sortIndex').toArray(),
  ])

  // 首次启动：没有任何持久化数据，返回 null 让 store 保持默认状态
  if (!settings && conversations.length === 0)
    return null

  // 将 messages 按 conversationUuid 分组，还原为 chat: { uuid, data }[]
  const chat = conversations.map((conv: Conversation) => ({
    uuid: conv.uuid,
    data: allMessages
      .filter((m: Message) => m.conversationUuid === conv.uuid)
      // 去掉 DB 专用字段（id, conversationUuid, sortIndex），还原为标准 Chat 结构
      .map(({ id: _id, conversationUuid: _cId, sortIndex: _si, ...msg }) => msg as unknown as Chat.Chat),
  }))

  return {
    active: settings?.active ?? defaultState().active,
    usingContext: settings?.usingContext ?? true,
    // DB 的 Conversation 结构正好和 Chat.History 兼容
    history: conversations.map(({ uuid, title, isEdit }) => ({ uuid, title, isEdit })),
    chat,
  }
}

/**
 * 将聊天状态写入 IndexedDB
 * 在一个事务中完成三张表的替换
 *
 * 注意：state 是 Pinia 的响应式 Proxy 对象，IndexedDB 无法对其进行结构化克隆。
 * 因此先通过 JSON 往返做深拷贝脱壳，得到一个纯 JavaScript 对象再写入。
 */
export async function setLocalState(state: Chat.ChatState): Promise<void> {
  // 脱壳：Vue Proxy → 纯 JS 对象，解决 DataCloneError
  const rawState: Chat.ChatState = JSON.parse(JSON.stringify(state))

  await db.transaction('rw', db.conversations, db.messages, db.settings, async () => {
    // 1. 清空旧数据
    await db.conversations.clear()
    await db.messages.clear()

    // 2. 写入会话列表
    await db.conversations.bulkPut(
      rawState.history.map(h => ({ uuid: h.uuid, title: h.title, isEdit: h.isEdit })),
    )

    // 3. 将嵌套的 chat[].data[] 展平为 messages，附带 conversationUuid 和 sortIndex
    const messages: Message[] = rawState.chat.flatMap(chatEntry =>
      chatEntry.data.map((msg, index) => ({
        conversationUuid: chatEntry.uuid,
        sortIndex: index,
        dateTime: msg.dateTime,
        text: msg.text,
        inversion: msg.inversion,
        error: msg.error,
        loading: msg.loading,
        conversationOptions: msg.conversationOptions ?? undefined,
        requestOptions: msg.requestOptions,
      })),
    )

    if (messages.length > 0)
      await db.messages.bulkPut(messages)

    // 4. 写入全局设置（upsert）
    await db.settings.put({
      id: 1,
      active: rawState.active,
      usingContext: rawState.usingContext,
    })
  })
}
