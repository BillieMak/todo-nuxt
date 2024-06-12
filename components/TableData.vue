<template>
    <div class="card">
        <DataTable :value="attendances" v-model:filters="filters" filterDisplay="menu" :rows="10" paginator
            :globalFilterFields="['person', 'area', 'state', 'created_by', 'created_at']">
            <template #header>
                <div class="header">
                    <span class="text-xl text-900 font-bold text-white">Incidencias</span>
                    <div class="flex">
                        <Calendar v-model="calendarPicker" 
                        showIcon :showOnFocus="false"   
                        placeholder="Buscar por Fecha"
                        date-format="dd/mm/yy"
                        @date-select="onDateSelect"
                        showTime hourFormat="24"
                        inputId="buttondisplay" />
                        <IconField iconPosition="left">
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Buscar por Area o Persona" />
                        </IconField>
                        <Button v-if="isLogged" icon="pi pi-plus" severity="secondary" rounded raised
                            @click="openModal" />
                    </div>
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
                            <Button icon="pi pi-pencil" @click="toggle" text rounded aria-label="Show" />
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

const { getSeverity, getStateName, attendances } = await useIncidencia()

const modalStore = useModalDataStore()

const { isLogged } = useAuth()

const filters: any = ref({})

const calendarPicker = ref()

const isVisible = ref(false)

const menu = ref();
const items = ref([
    {
        label: 'Options',
        items: [
            {
                label: 'Cancel',
                icon: 'pi pi-times',
                command: () => {
                    alert('Cancel')
                }
            },
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
                    alert('asignar Persona')
                }
            }
        ]
    }
]);



const initFilters = (): void => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        created_at: { value: null, matchMode: FilterMatchMode.DATE_BEFORE },
    }
}

initFilters()

const onDateSelect = (date : any): void => {

    filters.value['created_at'].value = new Date(date)
    // console.log("calendar",new Date(date).toISOString());
  
    
}


const formatDate = computed(() => {
    return (date: string) => {
        if (!date) return
        return new Date(date).toLocaleString('es-PE')
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


const toggle = (event: Event) => {
    menu.value.toggle(event);
};

</script>
<style>
.card {
    /* outline: 2px solid red; */
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    width: 80vw;
    margin: 0 auto;
    border-radius: 10px;
}

.p-datatable {
    box-shadow: 0 0 3px #00000033;
    overflow: hidden;
    border-radius: inherit;
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
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.flex {
    display: flex;
    gap: 6px;
    align-items: center;

}

@media (width <=768px) {
    .header {
        flex-direction: column;
        gap: 10px;
    }
}
</style>