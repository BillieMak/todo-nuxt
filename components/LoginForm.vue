<template>
    <div>
        <form class="form-login">
            <h1>Login</h1>
            <div class="flex">
                <label for="username">Username</label>
                <InputText id="username" v-model="username" />
            </div>
            <br />
            <div class="flex">
                <label for="password">Password</label>
                <Password id="password" v-model="password" :feedback="false" toggleMask @keypress.enter="login" />
            </div>
            <br />

            <div class="flex">
                <Button label="Login" @click="login" />
            </div>
        </form>
    </div>
    <Toast position="top-right" group="tr"/>
</template>
<script setup>

const { username, password, login } = useAuth()

</script>

<style scoped>
.form-login {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.13);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    backdrop-filter: blur(5px);
    padding: 20px;
    border-radius: 10px;
}

.flex {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>