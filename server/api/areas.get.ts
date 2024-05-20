export default defineEventHandler(async (event) => {
    const { apiBase } = useRuntimeConfig();

    const res = await $fetch(`https://incidencias-backend-production.up.railway.app/api/v1/areas`, {
        headers: {
            token: `${event.node.req.headers.token}`
        }
    })
    return res;
})