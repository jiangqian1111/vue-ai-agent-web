# Cradle Chat

> 现代化 AI 对话门户 — 基于 Vue 3 + TypeScript + Fetch ReadableStream 重构

## 特性

- 🚀 **Fetch + ReadableStream 流式渲染** — 从 XHR onprogress 重构为现代 ReadableStream 方案，更精准的流控
- 🎨 **Mac 卡片风 UI** — 悬浮卡片架构、柔和阴影、大圆角、冷灰色调
- 💬 **双模型支持** — 兼容 OpenAI 官方 API 与 Access Token 非官方代理
- 🌐 **多语言** — 内置中/英/繁/日/韩/俄/西/越等语言
- 📱 **响应式** — 适配桌面端与移动端
- 🧩 **Prompt 商店** — 内置常用提示词模板

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Vue 3 (Composition API) |
| 语言 | TypeScript |
| 构建 | Vite |
| 状态管理 | Pinia |
| UI 组件 | Naive UI |
| 样式 | Tailwind CSS |
| 网络层 | Fetch API + ReadableStream |
| 后端 | Express (TypeScript) |
| 包管理 | pnpm |

## 快速开始

### 前置要求

- Node.js `^16 || ^18 || ^19 || ^20`
- pnpm

### 配置

```bash
# 1. 创建后端环境变量
cp service/.env.example service/.env

# 2. 编辑 service/.env，填入 API Key
# 使用 OpenAI:
#   OPENAI_API_KEY=sk-xxxxxxxx
# 使用 DeepSeek:
#   OPENAI_API_KEY=sk-xxxxxxxx
#   OPENAI_API_BASE_URL=https://api.deepseek.com
#   OPENAI_API_MODEL=deepseek-chat
```

### 安装 & 启动

```bash
# 安装依赖
pnpm install
cd service && pnpm install && cd ..

# 启动后端（端口 3002）
cd service && pnpm start &

# 启动前端（端口 5173）
pnpm dev
```

浏览器访问 `http://localhost:5173`

### Docker 部署

```bash
docker build -t cradle-chat .
docker run -d -p 3002:3002 --env OPENAI_API_KEY=你的Key cradle-chat
```

## 重构亮点

本项目从 [chatgpt-web](https://github.com/Chanzhaoyu/chatgpt-web) fork，进行了以下现代化改造：

1. **网络层重构** — 将 Axios XHR `onprogress` 方案替换为原生 `fetch` + `ReadableStream`，NDJSON 解析下沉至 API 层
2. **UI 重构** — 从通铺满屏布局改为 Mac 卡片风悬浮架构
3. **去品牌化** — 移除原作者个人信息、赞助链接及商业推广内容

## License

MIT
