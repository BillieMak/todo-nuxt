<template>
    <h1>Areas</h1>
    <main class="flex">
       <div class="card">
        <DataTable :value="areas" >
            <template #header>
                <div class="header">
                    <h2 class="text-xl text-900 font-bold">Incidencias</h2>
                </div>
            </template>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Area"></Column>
        </DataTable>
       </div>
        <Panel header="Area">
            <hr>
            <label for="name">Nombre</label>
            <br>
            <br>
            <InputText id="name" type="text" />
            <br>
            <br>
            <Button label="Save" icon="pi pi-check" raised severity="success" />
        </Panel>
    </main>
</template>
<script setup lang="ts">
const areas = ref([
    {
        id: 1,
        name: 'Area 1'
    },
    {
        id: 2,
        name: 'Area 2'
    },
    {
        id: 3,
        name: 'Area 3'
    }
])

</script>
<style scoped>
.flex {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px;
}
@media (width <= 768px) {
   .card{
    margin-bottom: 30px;
   }
}
</style>