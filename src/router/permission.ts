import type { Router } from 'vue-router'
import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStoreWithout()

    // 500 页面始终放行，避免死循环
    if (to.path === '/500') {
      next()
      return
    }

    if (authStore.session) {
      next()
      return
    }

    try {
      const data = await authStore.getSession()
      if (String(data.auth) === 'false' && authStore.token)
        authStore.removeToken()
      next()
    }
    catch {
      // 🌐 离线预览模式：API 不可达（GitHub Pages 等纯静态托管场景）
      // 注入 mock session 放行，展示完整 UI，不跳转 500
      authStore.setOfflineSession()
      next()
    }
  })
}
