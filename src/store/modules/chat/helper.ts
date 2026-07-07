import { db } from '@/utils/db'
import type { Conversation, Message } from '@/utils/db'
import { t } from '@/locales'

/**
 * 离线预览 Mock 数据
 * 当 IndexedDB 为空且后端不可达时，展示预设演示对话，完整呈现 UI 还原度
 */
function buildMockConversations(): { history: Chat.History[]; chat: { uuid: number; data: Chat.Chat[] }[] } {
  const now = new Date().toLocaleString()

  // ============================================================
  // Conversation 1 · i18n 国际化架构演示
  // ============================================================
  const conv1: Chat.History = { uuid: 9001, title: '🌏 7-Language i18n Architecture', isEdit: false }
  const data1: Chat.Chat[] = [
    {
      dateTime: now,
      text: 'How does Nova Chat handle internationalization? I need to support 7 languages simultaneously.',
      inversion: true,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: 'How does Nova Chat handle internationalization?', options: null },
    },
    {
      dateTime: now,
      text: `Nova Chat is built on **vue-i18n 9** with a full 7-language localization engine. Here is the architecture:

| Language | Code | Status |
|----------|------|--------|
| 简体中文 | zh-CN | ✅ Active |
| 繁體中文 | zh-TW | ✅ Active |
| English | en-US | ✅ Active |
| Español | es-ES | ✅ Active |
| 한국어 | ko-KR | ✅ Active |
| Русский | ru-RU | ✅ Active |
| Tiếng Việt | vi-VN | ✅ Active |

**Key design decisions:**

- All 7 locale files have strictly aligned keys — missing a key in one language will fall back to \`en-US\` via \`fallbackLocale\`, guaranteeing zero runtime errors
- **Naive UI** component library locale synchronizes with business text via the \`useLanguage()\` hook
- Language preference persists to \`localStorage\`, auto-detects \`navigator.language\` on first launch`,
      inversion: false,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '', options: null },
    },
    {
      dateTime: now,
      text: 'Show me how the language switcher works in the UI.',
      inversion: true,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: 'Show me the language switcher UI', options: null },
    },
    {
      dateTime: now,
      text: `The language switcher lives in the **Settings drawer** (bottom-left gear icon). When you select a new language:

1. \`useLanguage()\` calls \`setLocale(lang)\` — updates vue-i18n global locale
2. Simultaneously maps to the corresponding **Naive UI locale ID** (\`zhCN\`, \`enUS\`, \`koKR\`, etc.)
3. All UI text, date formats, and component labels switch **instantly** without page reload

> 💡 Try it now: click the gear icon in the sidebar footer, pick any of the 7 languages, and watch the entire UI transform.`,
      inversion: false,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '', options: null },
    },
  ]

  // ============================================================
  // Conversation 2 · Gemini-Style 暗黑平铺画布演示
  // ============================================================
  const conv2: Chat.History = { uuid: 9002, title: '🎨 Gemini-Style Flat Canvas', isEdit: false }
  const data2: Chat.Chat[] = [
    {
      dateTime: now,
      text: 'What makes the new Gemini-style layout different from traditional chat UIs?',
      inversion: true,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: 'What makes the new Gemini-style layout different?', options: null },
    },
    {
      dateTime: now,
      text: `The new layout is a complete departure from traditional left-right chat bubbles. Here is what changed:

**Before (Bubble Style):**
- User messages float **right** with green \`bg-[#d2f9d1]\` background
- AI messages float **left** with gray \`bg-[#f4f6f8]\` background
- Both had \`rounded-md\` borders and padding

**After (Gemini Flat Canvas):**
- ✅ All messages aligned **left** — no more directional bias
- ✅ **Zero background colors** — text floats directly on the canvas
- ✅ Minimal text labels (\`You\` / \`Nova AI\`) replace avatars
- ✅ Subtle horizontal separators between message exchanges
- ✅ Full-width code blocks with rounded borders

\`\`\`css
/* Example: the new dark mode code block styling */
.highlight pre, pre {
  background-color: #1e1e24;
  border: 1px solid #2e2e38;
  border-radius: 8px;
}
\`\`\``,
      inversion: false,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '', options: null },
    },
    {
      dateTime: now,
      text: 'How does it handle dark mode and code blocks?',
      inversion: true,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: 'How does it handle dark mode?', options: null },
    },
    {
      dateTime: now,
      text: `Dark mode is fully supported across every component using **Tailwind CSS** \`dark:\` variants:

- Text: \`dark:text-neutral-200\` ensures high contrast readability
- Separators: \`dark:border-zinc-800\` for subtle visual rhythm
- Code blocks: \`dark:bg-[#1e1e24]\` with \`#2e2e38\` borders
- **Highlight.js** auto-detects language and applies syntax coloring
- Mermaid diagrams also adapt to dark backgrounds

The result: long-form reading comfort with strong code contrast — no eye strain, even in pitch-black environments.`,
      inversion: false,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '', options: null },
    },
  ]

  // ============================================================
  // Conversation 3 · 斜杠指令系统演示
  // ============================================================
  const conv3: Chat.History = { uuid: 9003, title: '⚡ Slash Command System', isEdit: false }
  const data3: Chat.Chat[] = [
    {
      dateTime: now,
      text: '/code-review',
      inversion: true,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '/code-review', options: null },
    },
    {
      dateTime: now,
      text: `📋 **Slash Command detected:** \`/code-review\`

The custom floating panel triggered by \`/\` is a self-developed component system with:

**8 built-in templates:**
| Command | Description |
|---------|-------------|
| \`/translate\` | Translate to Chinese |
| \`/summarize\` | Summarize key points |
| \`/explain\` | Explain concepts simply |
| \`/code-review\` | Review code for issues |
| \`/rewrite\` | Rewrite for clarity |
| \`/brainstorm\` | Brainstorm creative ideas |
| \`/refactor\` | Refactor for readability |
| \`/fix\` | Find and fix bugs |

**Interaction model:**
- ↑↓ **arrow keys** navigate the suggestion list
- **Enter** selects and replaces the \`/\` prefix with the command value
- **Esc** dismisses the panel
- **Dual-field fuzzy matching** — searches both \`key\` and \`value\` simultaneously`,
      inversion: false,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '', options: null },
    },
    {
      dateTime: now,
      text: 'Can I add my own custom commands?',
      inversion: true,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: 'Can I add custom commands?', options: null },
    },
    {
      dateTime: now,
      text: `Absolutely. The **Prompt Store** (accessible from the sidebar) supports:

- **JSON Import/Export** — share prompt templates as \`.json\` files
- **Online recommendation sources** — subscribe to community prompt feeds
- **In-place editing** — add, edit, or delete custom prompts directly in the UI

Your custom prompts appear in the same \`/\` suggestion panel alongside built-ins, with the same keyboard navigation and fuzzy search behavior. The entire system is backed by **Pinia** reactive state, so changes reflect instantly.`,
      inversion: false,
      error: false,
      loading: false,
      conversationOptions: null,
      requestOptions: { prompt: '', options: null },
    },
  ]

  return {
    history: [conv3, conv2, conv1],
    chat: [
      { uuid: 9003, data: data3 },
      { uuid: 9002, data: data2 },
      { uuid: 9001, data: data1 },
    ],
  }
}

/**
 * 返回默认的初始状态（同步）
 * 应用启动时先用这个填充 store，然后再从 IndexedDB 水合数据
 *
 * 当 IndexedDB 为空时（首次访问 / 离线预览），展示预设演示对话，
 * 确保 UI 100% 可还原，面试官或评审者无需后端即可浏览完整交互体验
 */
export function defaultState(): Chat.ChatState {
  const mock = buildMockConversations()

  return {
    active: mock.history[0].uuid,
    usingContext: true,
    history: mock.history,
    chat: mock.chat,
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
