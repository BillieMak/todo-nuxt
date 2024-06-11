<template>
    <div>
        <h1>Areas</h1>
        <main class="flex">
            <div class="container-table">
                <DataTable :value="areas" paginator :rows="8" stripedRows selection-mode="single" @row-select="onRowClick">
                    <template #header>
                        <div class="header">
                            <span class="text-xl text-900 font-bold text-white">Areas</span>
                            <Button icon="pi pi-refresh" severity="secondary" rounded raised @click="getAreas" />
                        </div>
                    </template>
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Area"></Column>
                    <Column header="Area">
                        <template #body>
                            Hola
                        </template>
                    </Column>
                </DataTable>
            </div>
            <Panel header="Area" class="panel">

                <div class="panel-body">
                    <label for="name">Nombre</label>
                    <InputText id="name" type="text" v-model="form.name" />
                </div>

                <template #footer>
                    <Button label="Save" 
                  
                    raised />
                </template>
            </Panel>
        </main>
    </div>
</template>
<script setup lang="ts">

definePageMeta({
    middleware: ['auth', 'is-admin'],
    name: 'areas'
})

const { areas, getAreas } = useAreas()

const titlePanel = ref()

const form = ref({
    name: ''
})

const onRowClick = ({ data }: { data: any }) => {
    titlePanel.value = 'Usuario - Editando'
    form.value = data
}


</script>
<style scoped>
.flex {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
}

.container-table {
    border-radius: 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
}

.panel {
    box-shadow: 0 0 2px #00000033;
}

.panel-body {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

@media (width <=768px) {
    .card {
        margin-bottom: 30px;
    }
}
</style>