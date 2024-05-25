<template>
  <div class="container">
    <Menubar :model="items">
      <template #item="{ item }">
        <NuxtLink class="links" :to="item.to" :active-class="'active'">
          <i :class="item.icon"></i>
          {{ item.label }}
        </NuxtLink>
      </template>
      <template #menubutton="{ class: slotClass }">
        <Button class="btn-menu" :class="slotClass" icon="pi pi-bars" severity="secondary" text rounded
          @click="toggleSideBar" />
      </template>
      <template #end>

        <Button v-if="!isLogged" type="button" class="p-link" severity="secondary" @click="login"
          label="Iniciar Sesion" />


        <Button v-else type="button" class="p-link" icon="pi pi-ellipsis-v" severity="secondary" @click="toggle"
          aria-haspopup="true" aria-controls="overlay_menu" />
        <LazyMenu :model="itemMenu" class="w-full md:w-15rem" ref="menu" :popup="true">

          <template #start>
            <span class="submenu-header">{{ user.rolName.toUpperCase() }}</span>
          </template>
          <template #submenuheader="{ item }">
            <span class="text-primary font-bold">{{ item.label }}</span>
          </template>
          <template #end>
            <button v-ripple
              class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
              <Avatar :label="user.name.substring(0, 1)" class="mr-2" shape="circle" />
              <span class="inline-flex flex-column">
                <span class="font-bold">{{ user.name }}</span>
              </span>
            </button>
          </template>
        </LazyMenu>

      </template>
    </Menubar>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/authStore';


const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    to: "/",
  },
  {
    label: "Incidencias",
    icon: "pi pi-inbox",
    to: "/attendance",
  },
  {
    label: "Documentos",
    icon: "pi pi-book",
    to: "/documents",
  },
  {
    label: "Usuarios",
    icon: "pi pi-user",
    to: "/users",
  },
  {
    label: "Areas",
    icon: "pi pi-building",
    to: "/areas",
  },
]);

const visible = defineModel()

const menu = ref();

const authStore = useAuthStore()

const { auth:user } = storeToRefs(authStore)

const { logout, isLogged } = useAuth()

 

const router = useRouter()

const itemMenu = ref([
  {
    separator: true
  },
  {
    label: 'Profile',
    items: [
      {
        label: 'Settings',
        icon: 'pi pi-cog',
      },
      {
        label: 'Messages',
        icon: 'pi pi-inbox',
        badge: 2
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => logout()
      }
    ]
  },
  {
    separator: true
  }
]);

const login = () => {
  router.push('/login')
}

const toggleSideBar = () => {
  visible.value = !visible.value
}
const toggle = (event: any) => {
  menu.value.toggle(event);
};

</script>
<style>
.p-menubar {
  /* border: none; */
  border-radius: 15px;
  background-color: var(--blue-600);
  height: 60px;
  padding: 8px 15px;

  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
}

.p-menubar-root-list {
  gap: 30px;
}

.p-menuitem-content {
  background-color: transparent;
}

.p-menuitem-item:hover {
  background-color: transparent;
}

.p-submenu-list .links {
  color: #111;
}

.p-submenu-list .active {
  padding: 0;

}

.p-menubar.p-menubar-mobile .p-menubar-root-list {
  gap: 15px;
  background-color: var(--blue-600);
  padding: 0.8rem 10px;
}

.p-menu-start {
  padding: 7px;
  font-weight: 600;
}
</style>

<style scoped>
.flex {
  display: flex;
  gap: 6px;
  justify-content: start;
  align-items: center;
  padding: 7px 7px;
}

.links {
  text-decoration: none;
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  color: #fff
}

.active {
  color: #111;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
}

.btn-menu {
  color: #fff
}

.btn-menu:hover {
  color: #111
}
</style>