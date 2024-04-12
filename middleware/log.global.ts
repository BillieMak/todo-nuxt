export default defineNuxtRouteMiddleware((to, from) => {
    console.log("global middleware")
    console.log(to, from)
})