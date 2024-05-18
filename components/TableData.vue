<template>
    <div class="card">
        <DataTable :value="attendances" v-model:filters="filters" filterDisplay="menu" :rows="10" paginator
            :globalFilterFields="['person', 'area', 'state']">
            <template #header>
                <div class="header">
                    <span class="text-xl text-900 font-bold">Incidencias</span>
                    <Button v-if="isLogged" icon="pi pi-plus" rounded raised @click="openModal" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Buscar por Area o Persona" />
                    </IconField>
                </div>
            </template>
            <Column field="person" header="Usuario"></Column>
            <Column field="created_at" header="Fecha" :body="formatDate">
                <template #body="{ data }">
                    {{ formatDate(data.created_at) }}
                </template>
            </Column>
            <Column field="created_by" header="Registrado"></Column>
            <Column field="problem" header="Problema"></Column>
            <Column field="area" header="Area"></Column>

            <Column field="state" header="Status">
                <template #body="{ data }">
                    <Tag :value="getStateName(data.state)" :severity="getSeverity(data.state)" />
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                   <div class="flex">
                    <Button icon="pi pi-eye" @click="showData(data)" text rounded aria-label="Show" />
                    <div>
                        <Button icon="pi pi-pencil"@click="toggle" text rounded aria-label="Show" />
                    <LazyMenu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                    </div>
                   </div>
                </template>
            </Column>
        </DataTable>
    </div>

    <LazyModalForm :isVisible="isVisible" @closeModal="closeModal" />
    <ModalData />
</template>

<script setup lang="ts">

import { FilterMatchMode } from 'primevue/api'
import { useModalDataStore } from '~/store/modalDataStore';
import { useAttendanceStore } from '~/store/atttendanceStore';

const { $locally } = useNuxtApp()

const { getSeverity, getStateName } = await useIncidencia()


const attendanceStore = useAttendanceStore()

const modalStore = useModalDataStore()

const { getAttendances } = storeToRefs(attendanceStore)

const isLogged = ref($locally.getItem('tokenid'))

const filters: any = ref({})

const isVisible = ref(false)

const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Complete',
                icon: 'pi pi-check',
                command: () => {
                    alert('Complete')
                }
            },
            {
                label: 'Asign person', 
                icon: 'pi pi-user-plus',
                command: () => {
                    alert('asinar Persona')
                }
            }
        ]
    }
]);


const initFilters = (): void => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    }
}

initFilters()

const attendances = computed(() => getAttendances.value)

const formatDate = computed(() => {
    return (date: string) => {
        if (!date) return
        return new Date(date).toLocaleString('es-ES')
    }
})


const showData = (data: object): void => {
    modalStore.setSelected(data)
    modalStore.open()
}

const openModal = (): void => {
    isVisible.value = true
}

const closeModal = (v: boolean): void => {
    isVisible.value = v
}


const toggle = (event : Event) => {
    menu.value.toggle(event);
};

</script>


<style>
.p-datatable {
    box-shadow: 0 0 10px #00000033;
    overflow: hidden;
    border-radius: 10px;
}

.p-datatable-header {
    background-color: var(--blue-600);
    color: #fff;
}

table button .p-button-icon {
    color: var(--blue-600)
}
</style>
<style scoped>
.card {
    /* outline: 2px solid red; */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 80vw;
    margin: 0 auto;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.flex {
    display: flex;
}
@media (width <=768px) {
    .header {
        flex-direction: column;
        gap: 10px;
    }
}
</style>