<template>
    <h1>Documents</h1>

    <div class="card">
        <DataTable :value="documents" :rows="10" paginator>
            <Column field="name" header="name"></Column>

            <Column field="created_at" header="Fecha de Subida">
                <template #body="{ data }">
                    {{ formatDate(data.created_at) }}
                </template>
            </Column>

            <Column field="url" header="Descargar">
                <template #body="{ data }">
                    <Button @click="downloadFile(data.codigo)" icon="pi pi-download" raised label="Descargar PDF" />
                </template>
            </Column>
        </DataTable>
    </div>

</template>

<script setup lang="ts">

const { documents } = useDocuments()

const formatDate = computed(() => {
    return (date: string) => {
        if (!date) return
        return new Date(date).toLocaleString('es-ES')
    }
})

const downloadFile = async (codigo: String) => {
    window.location.href = `http://localhost:8080/api/v1/document/download/${codigo}`
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
}
</style>