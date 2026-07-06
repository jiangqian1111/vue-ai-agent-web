import Dexie, { type Table } from 'dexie'

/**
 * API 对话选项（聊天请求/响应中的 conversation 上下文）
 */
export interface ConversationOptions {
  conversationId?: string
  parentMessageId?: string
}

/**
 * 聊天会话 —— 对应原来的 Chat.History
 * 每条记录代表一次对话（侧边栏的一项）
 */
export interface Conversation {
  uuid: number       // 主键，时间戳
  title: string      // 对话标题
  isEdit: boolean    // 标题是否处于编辑状态
}

/**
 * 聊天消息 —— 对应原来的 Chat.Chat
 * 归属于某个 Conversation（通过 conversationUuid）
 */
export interface Message {
  id?: number                // 自增主键
  conversationUuid: number   // 所属会话的 uuid
  sortIndex: number          // 消息在会话中的排序位置
  dateTime: string
  text: string
  inversion?: boolean
  error?: boolean
  loading?: boolean
  conversationOptions?: ConversationOptions | null
  requestOptions: {
    prompt: string
    options?: ConversationOptions | null
  }
}

/**
 * 全局设置 —— 对应 ChatState 中的 active / usingContext
 * 键值对存储，只有一行数据（id = 1）
 */
export interface Settings {
  id: number             // 固定为 1
  active: number | null  // 当前活跃会话的 uuid
  usingContext: boolean  // 是否使用上下文
}

/**
 * 聊天数据库
 *
 * 三个表：
 * - conversations: 对话列表（原来在 history[] 中）
 * - messages:      聊天消息（原来在 chat[].data[] 中）
 * - settings:      全局 UI 状态（原来在 ChatState 的 active/usingContext）
 */
export class ChatDatabase extends Dexie {
  conversations!: Table<Conversation, number>
  messages!: Table<Message, number>
  settings!: Table<Settings, number>

  constructor() {
    super('CradleChatDB')

    // 版本 1 —— 初始结构
    this.version(1).stores({
      // conversations 以 uuid 为主键
      conversations: '&uuid',

      // messages 自增主键，conversationUuid + sortIndex 建立复合索引便于查询
      messages: '++id, [conversationUuid+sortIndex]',

      // settings 只有一行，id 固定为 1
      settings: '&id',
    })
  }
}

/** 数据库单例 */
export const db = new ChatDatabase()
