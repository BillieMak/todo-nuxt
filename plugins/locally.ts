export default defineNuxtPlugin((nuxtApp) =>{
    return {
        provide: {
            locally: {
                getItem(item : string) :string | null {
                    if (process.client) {
                        return localStorage.getItem(item) ?? null
                    } else {
                        return null
                    }
                },

                setItem(item : string, value : string) : void {
                    if (process.client) {
                        const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
                        localStorage.setItem(item, serializedValue);
                    }
                },

                removeItem(item : string) : void {
                    if (process.client) {
                        return localStorage.removeItem(item)
                    }
                }
            }
        }
    }
})