<template>
  <div>
    <header>
      <NavBar :base-id="'menu'" v-model="visible" />
      <SideBarComponent v-model="visible" />
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
  <LazyAlert />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';


const authStore = useAuthStore()

const visible = ref(false)

onMounted(() => {
  authStore.loadToken()
})
</script>