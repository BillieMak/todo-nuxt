<template>
    <Dialog v-model:visible="alert.visible" :closable="false" modal dismissableMask class="dialog"
        :breakpoints="{ '960px': '50vw', '500px': '80vw' }">
        <template #header>
            <h3 class="m-0 flex">
                <span>{{ alert.title }}</span>
                <i class="pi pi-lock"> </i>
            </h3>
        </template>
        <p class="m-0">
            {{ alert.message }}
        </p>
    </Dialog>
</template>
<script setup lang="ts">
import { useAlertStore } from '~/store/alertStore';

const alertStore = useAlertStore();

const { alert } = storeToRefs(alertStore)

onMounted(() => {
    if (alert.value.visible) {
        setTimeout(() => {
            alert.value.visible = false
        }, alert.value.life)
    }
})
watch(() => alert.value.visible, (newValue, _) => {
    if (newValue) {
        setTimeout(() => {
            alert.value.visible = false
        }, alert.value.life)
    }
});

</script>

<style scoped>
.m-0 {
    margin: 0;
}

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px
}
</style>

<style>
@media (width <=768px) {
    .dialog {
        width: 80vw;
    }
}
</style>
