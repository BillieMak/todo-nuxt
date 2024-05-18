<template>
    <div>
        <h1>Areas</h1>
        <main class="flex">
            <div class="card">
                <DataTable :value="areas" paginator :rows="8">
                    <template #header>
                        <div class="header">
                            <span class="text-xl text-900 font-bold">Areas</span>
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
                    <InputText id="name" type="text" />
                </div>

                <template #footer>
                    <Button label="Save" icon="pi pi-check" raised severity="success" />
                </template>
            </Panel>
        </main>
    </div>
</template>
<script setup lang="ts">

definePageMeta({
    middleware: ['auth', 'is-admin']
})

const {areas} = useAreas()

</script>
<style scoped>
.flex {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
}

.panel {
    box-shadow: 0 0 10px #00000033;
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