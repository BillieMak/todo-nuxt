<template>
    <Dialog v-model:visible="getOpen" modal maximizable :header="'Incidencia - ' + getSelected?.id" :pt="{
        root: 'border-none',
        mask: {
            style: 'backdrop-filter: blur(2px)'
        },
        closeButton: {
            onclick: closeModal
        }
    }" :style="{ width: '40rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
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

            <NuxtLink v-if="getSelected.codigo_file" target="_blank" :to="downloadFile(getSelected.codigo_file)">
                <Button raised icon="pi pi-download" iconPos="right" label="Descargar Ficha" @click="" />
            </NuxtLink>
            <FileUpload v-else name="file" @before-upload="onBeforeUpload" :url="urlUpload"
                :invalid-file-size-message="'Archivo demasiado grande'" :multiple="false" accept=".pdf"
                :maxFileSize="3e+6">
                <template #header="{ chooseCallback, clearCallback, files, uploadCallback }">
                    <div class="content-upload">
                        <Button icon="pi pi-file-plus" severity="info" label="Select" raised @click="chooseCallback" />
                        <Button icon="pi pi-upload" severity="success" label="Upload" raised
                            @click="onUpdateFile(files, uploadCallback)" />
                        <Button icon="pi pi-times" severity="danger" label="Clear" raised @click="clearCallback" />
                    </div>
                </template>
                <template #empty>
                    <p>Arrastras y el archivo a subir</p>
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

const { $apiBase } = useNuxtApp()

const urlUpload = `${$apiBase}/document/upload`;

const { getOpen, getSelected } = storeToRefs(modalStore)


//supabase 
const supabase = useSupabaseClient()

//url and code file desde supabase
const url_file = ref("")
const codigo_file = ref("")

const formatDate = (date: string): string => {
    return new Date(date).toLocaleString('es-ES')
}

const closeModal = (): void => {
    modalStore.close()
}

interface File {
    fullPath: string
    id: string,
    path: string
}


const uploadFile = async (files: any): Promise<void> => {
    const { data, error } = await supabase.storage.from('files').upload(generateCode(), files[0])
    if (error) {
        console.error(error)
    }
    const fileres = data as File

    const url = supabase.storage.from('files').getPublicUrl(fileres.path)

    url_file.value = url.data.publicUrl
    codigo_file.value = fileres.path
}

const onUpdateFile = async (files: any, uploadCallback: Function) => {

    // guardamos el pdf en supabase
    await uploadFile(files)

    // actulizamos el link del pdf en la bd
    uploadCallback()
}



const onBeforeUpload = (event: any) => {
    event.formData.append('name', getSelected.value.person)
    event.formData.append('area', getSelected.value.area)
    event.formData.append('id_attendance', getSelected.value.id)
    event.formData.append('codigo_file', codigo_file.value)
    event.formData.append('url', url_file.value)
}


const generateCode = (): string => {
    return Math.random().toString(36).slice(-8);
}

const downloadFile =  (codigo: string): string => {
    // window.location.href = `${$apiBase}/document/download/${codigo}`
    return supabase.storage.from('files').getPublicUrl(codigo).data.publicUrl
}
</script>
<style scoped>
.content-upload {
    display: flex;
    gap: 5px;
}
</style>