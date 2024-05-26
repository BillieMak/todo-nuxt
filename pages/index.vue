<template>
   <div>
      <h1>Dashboard</h1>

      <Toast position="bottom-right" group="br" @close="onClose">
         <template #message="{message}">
            <div class="toast-body" style="flex: 1">
               <div class="flex">
                  <Avatar image="/imagebot" alt="Bot" width="40" height="40" shape="circle" />
                  <span class="font-bold text-900">Bot Billie</span>
               </div>
               <div class="font-medium text-lg my-3 text-900">{{ message.summary }}</div>
               <div class="flex">
                  <Button class="p-button-sm" label="Si" @click="login"></Button>
                  <Button class="p-button-sm" label="No" @click="onClose"></Button>
               </div>
            </div>
         </template>
      </Toast>
   </div>
</template>

<script setup lant="ts">
import Avatar from "primevue/avatar";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const visible = ref(false);

const router = useRouter();

const { isLogged } = useAuth();

useHead({
   title: 'Dashboard',
   link: [
      {
         rel: "preload",
         as: "image",
         href: "/imagebot"
      }
   ]
})

onMounted(() => {
   if (!visible.value && !isLogged.value) {
      console.log('isLogged', isLogged)
      toast.add({ severity: 'info', summary: 'Desea Iniciar Sesión?', group: 'br' });
      visible.value = true;
   }
})

const login = () => {
   toast.removeGroup('br');
   router.push('/login');
}

const onClose = () => {
   toast.removeGroup('br');
   visible.value = false;
}
</script>

<style scoped>
.toast-body {
   display: flex;
   flex-direction: column;
   gap: 10px;
}
.flex {
   display: flex;
   justify-content:flex-start;
   align-items: center;
   gap: 5px;
}
</style>
