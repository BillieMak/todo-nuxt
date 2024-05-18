<template>
    <div>
        <form class="form-login">
            <h1>Login</h1>
            <div class="flex">
                <label for="email">Email</label>
                <InputText id="email" v-model="email" />
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
    <Toast position="bottom-right" group="br" />
</template>
<script setup>

const { email, password, login } = useAuth()

</script>

<style scoped>
.form-login {
    color: aliceblue;
    background-color: rgba(255, 255, 255, 0.13);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 10px;
}

.flex {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>