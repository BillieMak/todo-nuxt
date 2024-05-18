export default defineNuxtPlugin((nuxtApp) =>{
    return {
        provide: {
            locally: {
                getItem(item : string) {
                    if (process.client) {
                        return localStorage.getItem(item) ?? '' 
                    } else {
                        return undefined
                    }
                },

                setItem(item : string, value : string) {
                    if (process.client) {
                        return localStorage.setItem(item, value)
                    }
                },

                removeItem(item : string) {
                    if (process.client) {
                        return localStorage.removeItem(item)
                    }
                }
            }
        }
    }
})