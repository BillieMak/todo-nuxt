<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
h1 {
    text-align: center;
}
/* body{
    margin: 0;
    padding: 0;
} */

.page-enter-active,
.page-leave-active {
    transition: all 0.3s ease-out;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    /* filter: blur(1rem); */
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.5s ease-out;
}

.layout-enter-from,
.layout-leave-to {
   filter: grayscale(1);
}
</style>