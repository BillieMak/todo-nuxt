
import { useAlertStore } from "~/store/alertStore";
import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to, from) => {

    const authStore = useAuthStore();
    const alertStore = useAlertStore();

    if (authStore.auth.rolName !== "admin") {
      
        //mostrar alerta 
        alertStore.addAlert({title: 'Acceso Denegado',message: 'No Tienes Permisos para Acceder a esta Pagina 🎶', life: 2000 , visible:true})

        //sacar de la ruta
        return navigateTo("/attendance");
      }
})