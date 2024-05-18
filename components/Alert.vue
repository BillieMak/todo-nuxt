import { useAlertStore } from '../store/alertStore';
<template>
    <Dialog v-model:visible="visible" :closable="false" modal :style="{ width: '30rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <template #header>

            <h3 class="m-0 flex"> 
                <span>{{ title }}</span>
                <i class="pi pi-lock"> </i>
            </h3>
        </template>
        <p class="m-0">
            {{ message }}
        </p>
    </Dialog>
</template>
<script setup lang="ts">
import { useAlertStore } from '~/store/alertStore';

//  const visible : Ref<boolean> = ref(true)

const alertStore = useAlertStore();

const { message, life, visible, title } = storeToRefs(alertStore)

onMounted(() => {
    if (visible.value) {
        setTimeout(() => {
            visible.value = false
        }, life.value)
    }
})
watch(() => visible.value, (newValue, _) => {
    if (newValue) {
        setTimeout(() => {
            visible.value = false;
        }, life.value);
    }
});

</script>

<style scoped>
.m-0 {
    margin: 0;
}
.flex{
    display: flex; 
    justify-content: space-between;
    align-items: center; 
    gap:10px
}
</style>
