
<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item }">
        <NuxtLink class="links" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Features",
    icon: "pi pi-star",
    to: "/",
  },
  {
    label: "Contact",
    icon: "pi pi-envelope",
    to: "/",
  },
]);
</script>

<style scoped>
.links{
  color: #111;
  text-decoration: none;
}
</style>