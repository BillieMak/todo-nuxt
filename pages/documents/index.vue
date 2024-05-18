<template>
    <div>
        <h1>Documents</h1>
        <div class="card">
            <DataTable :value="documents" :rows="10" paginator>
                <template #header>
                    <div class="header">
                        <span class="text-xl text-900 font-bold">Descargar Documentos</span>
                    </div>
                </template>
                <Column field="name" header="Nombre"></Column>
                <Column field="area" header="Area"></Column>

                <Column field="created_at" header="Fecha de Subida">
                    <template #body="{ data }">
                        {{ formatDate(data.created_at) }}
                    </template>
                </Column>

                <Column field="url" header="Descargar">
                    <template #body="{ data }">
                        <Button @click="downloadFile(data.codigo)" icon="pi pi-download" text rounded aria-label="Show" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

</template>

<script setup lang="ts">
definePageMeta({
   middleware: ["auth"]
})

const { documents } = useDocuments()

const { $apiBase } = useNuxtApp();


const formatDate = computed(() => {
    return (date: string) => {
        if (!date) return
        return new Date(date).toLocaleString('es-ES')
    }
})

const downloadFile = async (codigo: String) => {

    window.location.href = `${$apiBase}/document/download/${codigo}`
}

</script>

<style scoped>
.card {
    /* outline: 2px solid red; */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 70vw;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
}
</style>