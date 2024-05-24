export default defineEventHandler(async (event) => {
    const { apiBase } = useRuntimeConfig();

    const res = await $fetch(`${apiBase}/areas`, {
        headers: {
            token: `${event.node.req.headers.token}`
        }
    })
    return res;
})