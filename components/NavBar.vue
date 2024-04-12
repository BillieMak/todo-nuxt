<template>
  <div class="card">
    <Menubar :model="items" class="menu" :pt="{
      menuitem: {
        style: {
          'padding': '5px 0',
        }
      }
    }">
      <template #item="{ item, hasSubmenu, props, root }">
        <NuxtLink class="links" :to="item.to" :style="{ color: isRouterActive(item.to) ? ' #ec4899 ' : '#111111' }">
          <i :class="item.icon"></i>
          {{ item.label }}
          <i v-if="hasSubmenu"
            :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
        </NuxtLink>
      </template>
      <template #end>
        <Avatar image="/luffy.png" shape="circle" size="large"  />
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();

const isRouterActive = (path: string): boolean => {
  return route.path === path
}

const items = ref([
  {
    label: "Incidencias",
    icon: "pi pi-inbox",
    to: "/",
  },
  {
    label: "Documentos",
    icon: "pi pi-book",
    to: "/documents",
  },
  {
    label: "Mantenimiento",
    icon: "pi pi-pencil",
    items: [
      {
        label: "Usuarios",
        icon: "pi pi-user",
        to: "/users",
      },
      {
        label: "Areas",
        icon: "pi pi-plus",
        to: "/areas",
      },
    ]
  }
]);
</script>

<style scoped>
.menu {
  box-shadow: 0 0 .8rem .3px rgba(41, 41, 41, 0.452);
  padding: 2px 15px;
}

.links {
  /* color: #111; */
  text-decoration: none;
  margin-right: 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
}
</style>