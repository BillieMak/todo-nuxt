<template>
    <Dialog v-model:visible="getOpen" modal maximizable :header="'Incidencia - ' + getSelected?.id" :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        },
        closeButton: {
            onclick: closeModal
        }
    }" 
    :style="{ width: '40rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <div class="flex">
           <h3 class="w-6rem inline">Usuario </h3>
           <span>{{ getSelected?.person }}</span>
        </div>
        <div class="flex">
            <h3 class="w-6rem ">Fecha solicitada</h3>
            <span>{{ formatDate(getSelected.created_at) }}</span>
        </div>
        <div class="flex">
            <h3 class="w-6rem ">Problema</h3>
            <span>{{ getSelected.problem }}</span>
        </div>
        <div class="flex">
            <h3 class="w-6rem ">Area</h3>
            <span>{{ getSelected.area }}</span>
        </div>
        <div flex="flex">
            <h3 class="w-6rem">Descripcion</h3>
            <span>{{ getSelected.description }}</span>
        </div>
        <template #footer>
            <Button @click="closeModal" raised>Cerrar</Button>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
import { useModalDataStore } from '~/store/modalDataStore';

const modalStore = useModalDataStore()

const { getOpen, getSelected } = storeToRefs(modalStore)

const formatDate = (date: string) : string => {
    return new Date(date).toLocaleString('es-ES')
}

const closeModal = () : void => {
    modalStore.close()
}
</script>