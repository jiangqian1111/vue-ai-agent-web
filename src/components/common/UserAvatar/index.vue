<script setup lang='ts'>
import { computed } from 'vue'
import { NAvatar } from 'naive-ui'
import { useUserStore } from '@/store'
import { isString } from '@/utils/is'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
</script>

<template>
  <div class="flex items-center overflow-hidden">
    <div class="w-9 h-9 overflow-hidden rounded-full shrink-0">
      <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
        <NAvatar
          size="medium"
          round
          :src="userInfo.avatar"
        />
      </template>
      <template v-else>
        <NAvatar size="medium" round :style="{ background: '#6366f1' }">
          {{ (userInfo.name || 'U').charAt(0).toUpperCase() }}
        </NAvatar>
      </template>
    </div>
    <div class="flex-1 min-w-0 ml-2.5">
      <h2 class="overflow-hidden text-sm font-semibold text-neutral-700 text-ellipsis whitespace-nowrap">
        {{ userInfo.name ?? 'Cradle User' }}
      </h2>
    </div>
  </div>
</template>
