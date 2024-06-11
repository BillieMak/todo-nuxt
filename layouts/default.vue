<template>
  <div class="bg-cyan-100 flex flex-column h-screen">
    <header>
      <NavBar :base-id="'menu'" v-model="visible" />
      <SideBarComponent v-model="visible" />
    </header>
    <main class="bg-blue-100">
      <slot />
    </main>
    <footer class="bg-red-100">
      <Footer />
    </footer>
  </div>
  <LazyAlert />
</template>

<script setup lang="ts">

const visible = ref(false)

</script>