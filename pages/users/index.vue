<template>
    <div>
        <h1>Users</h1>
        <main class="flex">
            <div class="container-table">
                <DataTable :value="users" v-model:filters="filters" stripedRows @row-select="onRowClick"
                    selection-mode="single" :globalFilterFields="['name', 'username', 'email', 'status']">
                    <template #header>
                        <div class="header">
                            <span class="text-xl text-900 font-bold">Usuarios</span>
                            <div class="flex">
                                <IconField iconPosition="left">
                                    <InputIcon>
                                        <i class="pi pi-search" />
                                    </InputIcon>
                                    <InputText v-model="filters['global'].value" placeholder="Buscar por Nombre" />
                                </IconField>

                                <Button icon="pi pi-refresh" rounded severity="secondary" unded raised
                                    @click="refreshTable" />
                            </div>
                        </div>
                    </template>
                    <!-- <Column field="id" header="ID"></Column> -->
                    <Column field="name" header="Nombre"></Column>
                    <Column field="username" header="Username"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="rolName" header="Rol"></Column>
                    <Column field="enabled" header="Status">
                        <template #body="{ data }">
                            <Tag :value="getStateName(data.enabled)" :severity="getSeverity(data.enabled)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
            <Panel :header="titlePanel" class="panel">
                <div class="panel-body">
                    <label for="name">Nombre</label>
                    <InputText v-model="modalFields.name" id="name" type="text" />
                    <label for="username">Username</label>
                    <InputText v-model="modalFields.username" id="username" type="text" />
                    <label for="email">Email</label>
                    <InputText v-model="modalFields.email" id="email" type="text" />
                    <label for="rol">Rol</label>
                    <InputText v-model="modalFields.rolName" id="rol" type="text" />
                    <label for="status">Status</label>
                    <InputText v-model="modalFields.enabled" id="status" type="text" />
                </div>
                <template #footer>
                    <div class="flex">
                        <Button label="Cancelar" @click="onCancel" icon="pi pi-times" severity="danger" raised />
                        <Button label="Save" icon="pi pi-check" severity="success" raised />
                    </div>
                </template>
            </Panel>
        </main>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: ["auth", "is-admin"]
})

import { FilterMatchMode } from 'primevue/api'

const titlePanel = ref('Usuario - Agregar')


const filters: any = ref({})

const users = ref([])
const { $locally } = useNuxtApp();

const showUsers = async () => {
    const data = await fetch("/api/users", {
        headers: {
            token: `${$locally.getItem()}`
        }
    });
    users.value = await data.json();
    // console.log(await data.json());
}

showUsers()

const refreshTable = () => {
    showUsers()
}

const modalFields = ref({
    name: '',
    username: '',
    email: '',
    rolName: '',
    enabled: '',
})

const initFilters = (): void => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }
}

initFilters()

const stateName: any = {
    0: 'Inactivo',
    1: 'Activo',
}

const getSeverity = computed(() => {
    return (state: number) => {
        return state === 0 ? 'danger' : 'success'
    }
})

const getStateName = computed(() => {
    return (state: number) => {
        return stateName[state]
    }
})
const onCancel = () => {
    titlePanel.value = 'Usuario - Agregar'
    modalFields.value = {
        name: '',
        username: '',
        email: '',
        rolName: '',
        enabled: '',

    }
}

const onRowClick = ({ data }: { data: any }) => {
    titlePanel.value = 'Usuario - Editando'
    modalFields.value = data
}

</script>
<style scoped>
.flex {
    display: flex;
    gap: 5px;
    justify-content: space-evenly;
    align-items: center;
    /* margin-top: 10px; */
    flex-wrap: wrap;
    /* outline: 2px solid lime; */
}

.container-table {
    border-radius: 10px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* outline: 2px solid red */
}

.panel {
    box-shadow: 0 0 10px #00000033;
}

.panel-body {
    display: flex;
    flex-direction: column;
    /* outline: 2px solid red; */
    gap: 5px;
}
</style>