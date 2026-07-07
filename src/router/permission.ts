import type { Router } from 'vue-router'
import { useAuthStoreWithout } from '@/store/modules/auth'

export function setupPageGuard(router: Router) {
  router.beforeEach(async (_to, _from, next) => {
    const authStore = useAuthStoreWithout()

    // session 已存在（正常登录或已进入离线模式），直接放行
    if (authStore.session) {
      next()
      return
    }

    // 尝试请求 /api/session
    try {
      const data = await authStore.getSession()
      if (String(data.auth) === 'false' && authStore.token)
        authStore.removeToken()
      next()
    }
    catch {
      // 请求失败（GitHub Pages 无后端 / 断网 / 任何原因）
      // → 进入离线预览模式，展示完整 UI，绝不跳转错误页
      authStore.setOfflineSession()
      next()
    }
  })
}
