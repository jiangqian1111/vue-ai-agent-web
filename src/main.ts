import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupAssets, setupScrollbarStyle } from './plugins'
import { setupStore, useChatStore } from './store'
import { store } from './store/helper'
import { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)
  setupAssets()

  setupScrollbarStyle()

  setupStore(app)

  setupI18n(app)

  // 从 IndexedDB 加载持久化的聊天数据
  // 显式传入 pinia 实例 —— 因为不在组件的 setup() 上下文中
  const chatStore = useChatStore(store)
  await chatStore.hydrate()

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
