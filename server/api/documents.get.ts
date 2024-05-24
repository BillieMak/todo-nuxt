export default defineEventHandler(async (event) => {
    const { apiBase } = useRuntimeConfig();
   
    const res = await $fetch(`${apiBase}/documents`, {
        headers: {
            token: `${event.node.req.headers.token}`
        }
    })
    return res;
})