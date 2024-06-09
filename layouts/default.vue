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

const visible = ref(false)

</script>