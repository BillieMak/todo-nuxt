<template>
    <div class="content-login">
        <LoginForm />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'login'
})
</script>

<style scoped>
.content-login {
    position: absolute;
    top: 0;
    left: 0;
    background-image: url('/public/unjfsc.png');
    /* background-image: url('/public/peakpx.jpg'); */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>