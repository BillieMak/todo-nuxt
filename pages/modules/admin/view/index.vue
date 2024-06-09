<template>
    <h1>admin- {{ isLogged }}</h1>
</template>
<script lang="ts" setup>

const { isLogged } = useAuth();
</script>