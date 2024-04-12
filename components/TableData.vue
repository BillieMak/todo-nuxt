<template>
    <div class="card">
        <DataTable :value="attendances" v-model:filters="filters" filterDisplay="menu" :rows="10" paginator
            :globalFilterFields="['person', 'area']">
            <template #header>
                <div class="header">
                    <span class="text-xl text-900 font-bold">Incidencias</span>
                    <Button icon="pi pi-plus" rounded raised @click="openModal" />
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <Column field="person" header="Usuario"></Column>
            <Column field="created_at" header="Fecha" :body="formatDate">
                <template #body="{ data }">
                    {{ formatDate(data.created_at) }}
                </template>
            </Column>
            <Column field="problem" header="Problema"></Column>
            <Column field="area" header="Area"></Column>

            <Column field="state" header="Status">
                <template #body="{ data }">
                    <Tag :value="getStateName(data.state)" :severity="getSeverity(data.state)" />
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <Button label="View" @click="showData(data)" raised />
                </template>
            </Column>
            <!-- <template #footer>
                Total de Incidencias : {{ incidencias.length }}
            </template> -->
        </DataTable>
    </div>

    <ModalForm :isVisible="isVisible" @closeModal="closeModal" />
    <ModalData />
</template>

<script setup lang="ts">

import { FilterMatchMode } from 'primevue/api'
import { useModalDataStore } from '~/store/modalDataStore';
import { useAttendanceStore } from '~/store/atttendanceStore';



const { getSeverity, getStateName } = await useIncidencia()


const attendanceStore = useAttendanceStore()

const modalStore = useModalDataStore()

const { getAttendances}  = storeToRefs(attendanceStore)

const filters : any= ref({})

const isVisible = ref(false)

const initFilters = () : void => {
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


const showData = (data: object) : void => {
    modalStore.setSelected(data)
    modalStore.open()
}

const openModal = () : void => {
    isVisible.value = true
}

const closeModal = (v: boolean) :void => {
    isVisible.value = v
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