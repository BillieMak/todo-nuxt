
import { useAlertStore } from "~/store/alertStore";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    const alertStore = useAlertStore();
    const { auth } = storeToRefs(authStore);

    if (auth.value.rolName !== "admin") {
      
        //mostrar alerta 
        alertStore.addAlert({title: 'Acceso Denegado',message: 'No Tienes Permisos para Acceder a esta Pagina 🎶', life: 2000 , visible:true})
        // return navigateTo("/attendance");
        return navigateTo("/attendance");
      }
})