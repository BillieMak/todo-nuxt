import { useAuthStore } from "~/store/authStore"

export default defineNuxtPlugin(() =>{

    const authStore = useAuthStore();

    return {
        provide: {
            locally: {
                getItem() {
                    return authStore.getToken();
                }
            }
        }
    }
})