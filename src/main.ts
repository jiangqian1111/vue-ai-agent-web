import { createApp } from 'vue'
import App from './App.vue'
import { setupI18n } from './locales'
import { setupAssets, setupScrollbarStyle } from './plugins'
import { setupStore } from './store'
import { useChatStore } from './store'
import { setupRouter } from './router'

async function bootstrap() {
  const app = createApp(App)
  setupAssets()

  setupScrollbarStyle()

  setupStore(app)

  setupI18n(app)

  // 从 IndexedDB 加载持久化的聊天数据
  const chatStore = useChatStore()
  await chatStore.hydrate()

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
