import { Column } from '../../.nuxt/components';
<template>
    <h1>Users</h1>
    <main class="flex">
        <div class="card">
            <DataTable :value="users" stripedRows  @row-select="onRowClick" selection-mode="single">
                <template #header>
                    <div class="header">
                        <h2 class="text-xl text-900 font-bold">Incidencias</h2>
                    </div>
                </template>
                <Column field="id" header="ID"></Column>
                <Column field="name" header="Usuario"></Column>
                <Column field="status" header="Status">
                    <template #body="{ data }">
                        <Tag :value="getStateName(data.status)"  :severity="getSeverity(data.status)"/>
                    </template>
                </Column>
            </DataTable>
        </div>
        <Panel header="Area">
            <label for="name">Nombre</label>
            <InputText id="name" type="text" />
            <br>
            <label for="status">Status</label>
            <InputText id="status" type="text" />
            <template #footer>
                <div class="flex">
                    <Button label="Cancelar" icon="pi pi-times" severity="danger" raised />
                    <Button label="Save" icon="pi pi-check" severity="success" raised />
                </div>
            </template>
        </Panel>
    </main>
</template>

<script setup lang="ts">

const users = ref([

    {
        id: 1,
        name: 'Usuario 1',
        status: 0,
    },
    {
        id: 2,
        name: 'Usuario 2',
        status: 1,
    },
    {
        id: 3,
        name: 'Usuario 3',
        status: 0,
    }
])

const stateName : any ={
    0: 'Inactivo',
    1: 'Activo',
}

const getSeverity = (state: number)  => {
    return state === 0 ? 'danger' : 'success'
}

const getStateName = (state: number)  => {
    return stateName[state]
}

const onRowClick =({data} : {data: any}) => {
    console.log(JSON.stringify(data))
}

</script>
<style scoped>
.flex {
    display: flex;
    gap: 5px;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 10px;
}

</style>