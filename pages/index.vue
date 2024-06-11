<template>
   <div class="p-3">
      <div class="grid">
         <nav class="col-2 
         bg-blue-600 border-round-xl text-white border-1
          border-white border-900 shadow-3 flex flex-column p-3 gap-3">
            <NuxtLink v-for="item in sideBarItems" 
            :key="item.name" :to="item.to" class="item font-semibold border-round round-md no-underline p-3"
             :active-class="'bg-white text-black-alpha-70 capitalize'">
               <i :class="['pi', item.icon]"></i>
               {{ item.name }}
            </NuxtLink>
         </nav>
         <section class="col-10">
            <h1>Principal</h1>
            <div class="flex justify-content-center gap-4 flex-wrap">
               <div class="inline-block border-round-md w-3 h-10rem bg-blue-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-red-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-cyan-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-blue-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-red-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-cyan-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-blue-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-red-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-cyan-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-blue-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-red-400"></div>
               <div class="inline-block border-round-md w-3 h-10rem bg-cyan-400"></div>
            </div>
         </section>
      </div>

      <Toast position="bottom-right" group="br" @close="onClose">
         <template #message="{ message }">
            <div class="toast-body" style="flex: 1">
               <div class="d-flex">
                  <Avatar image="/imagebot" alt="Bot" width="40" height="40" shape="circle" />
                  <span class="font-bold text-900">Bot Billie</span>
               </div>
               <div class="font-medium text-lg my-3 text-900">{{ message.summary }}</div>
               <div class="d-flex">
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

const sideBarItems = [
   {
      name:'home',
      icon: 'pi pi-home',
      to:'/',
   },{
      name:'Analitic',
      icon: 'pi pi-building',
      to:'/areas'
   }
]

onMounted(() => {
   if (!visible.value && !isLogged.value) {
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

.d-flex {
   display: flex;
   justify-content: flex-start;
   align-items: center;
   gap: 5px;
}
.item{
   color:white;
}
</style>
