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
        <div>
            <h3 class="w-6rem">Archivo - Ficha</h3>
            
            <Button raised v-if="getSelected.codigo_file" icon="pi pi-download" iconPos="right" label="Descargar Ficha" />
            <FileUpload v-else name="file" @before-upload="onBeforeUpload"  @upload="onAdvancedUpload" url="http://localhost:8080/api/v1/documents" :multiple="false" accept=".pdf" :maxFileSize="1000000">
                <template #empty>
                    {{ getSelected.codigo_file }}
                    <p>Drag and drop files to here to upload.</p>
                </template>
            </FileUpload>
            <!-- <Button raised v-if="getSelected.file" icon="pi pi-download" iconPos="right" label="Descargar Ficha" /> -->
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

const onBeforeUpload = (event:any) : void => {

    event.formData.append('name', getSelected.value.person)
    event.formData.append('codigo_file', generateCode())
    event.formData.append('id_attendance', getSelected.value.id)
}

const onAdvancedUpload = (event:any) : void => {
    const { codigo } = JSON.parse(event.xhr.response)
    console.log(codigo)
}

const generateCode = () : string => {
    return Math.random().toString(36).slice(-8);
}
</script>