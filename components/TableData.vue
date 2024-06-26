<template>
  <div class="card">
    <DataTable
      :value="attendances"
      v-model:filters="filters"
      filterDisplay="row"
      :rows="10"
      paginator
      stripedRows
      :globalFilterFields="['person', 'area', 'created_by', 'created_at']"
    >
      <template #header>
        <div class="header">
          <span class="text-xl text-900 font-bold text-white">Incidencias</span>
          <div class="flex">
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="filters['global'].value"
                placeholder="Buscar por Area o Persona"
              />
            </IconField>
            <Button
              v-if="isLogged"
              icon="pi pi-plus"
              severity="secondary"
              rounded
              raised
              @click="openModal"
            />
          </div>
        </div>
      </template>
      <template #empty> No Attendances found. </template>
      <template #loading> Loading Attendances data. Please wait. </template>
      <Column field="person" header="Usuario" class="w-18rem" >
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            v-model="filterModel.value"
            type="text"
            @input="filterCallback()"
            class="p-column-filter"
            placeholder="Buscar Solicitante"
          />
        </template>
      </Column>
      <Column field="created_at" header="Fecha" :body="formatDate" class=" max-w-16rem" :showFilterMenu="false">
        <template #body="{ data }">
          {{ formatDate(data.created_at) }}
        </template>
        <template #filter>
            <Calendar
              v-model="filters['created_at'].value"
              showIcon
              :showOnFocus="false"
              placeholder="Buscar por Fecha"
              date-format="dd/mm/yy"
              inputId="buttondisplay"
            />
        </template>
      </Column>
      <Column sortable field="created_by" header="Registrado"></Column>
      <Column field="problem" header="Problema"></Column>
      <Column field="area" header="Area"></Column>
      <Column sortable :showFilterMenu="false" field="state" header="Status">
        <template #body="{ data }">
          <Tag
            :value="getStateName(data.state)"
            :severity="getSeverity(data.state)"
          />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="[0, 1, 2, 3]"
            placeholder="Select a State"
            class="p-column-filter"
            style="max-width: 12rem"
            :showClear="true"
          >
            <template #value="{ value, placeholder }">
              <Tag
                :value="getStateName(value) || placeholder"
                :severity="getSeverity(value)"
              />
            </template>
            <template #option="slotProps">
              <Tag
                :value="getStateName(slotProps.option)"
                :severity="getSeverity(slotProps.option)"
              />
            </template>
          </Dropdown>
        </template>
      </Column>
      <Column header="Actions">
        <template #body="{ data }">
          <div class="flex">
            <Button
              icon="pi pi-eye"
              @click="showData(data)"
              text
              rounded
              aria-label="Show"
            />
            <div>
              <Button
                icon="pi pi-pencil"
                @click="toggle($event, data)"
                text
                rounded
                aria-label="Show"
              />
              <LazyMenu
                ref="menu"
                id="overlay_menu"
                :model="items"
                :popup="true"
              />
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
    <div
      class="absolute flex flex-column py-4 gap-4 shadow-4 border-1 border-white w-4rem h-auto bg-blue-600 border-round-xl top-50 right-0"
    >
      <Button
        :style="{
          ':disabled': {
            cursor: 'not-allowed',
          },
        }"
        v-tooltip.left="'Clear filters'"
        severity="secondary"
        :disabled="checkFields"
        raised
        rounded
        icon="pi pi-filter-slash"
        @click="clearCalendar"
      />
      <Button severity="secondary" raised rounded icon="pi pi-home" />
      <Button severity="secondary" raised rounded icon="pi pi-home" />
    </div>
  </div>

  <LazyModalForm :isVisible="isVisible" @closeModal="closeModal" />
  <ModalData />
</template>

<script setup lang="ts">
import { FilterMatchMode } from "primevue/api";
import { useModalDataStore } from "~/store/modalDataStore";
import { useToast } from "primevue/usetoast";
import type { Attendance } from "~/interfaces/attendance";

const { getSeverity, getStateName, attendances, cancelAttendance, finishAttendance } =
  useIncidencia();

const toast = useToast();

const modalStore = useModalDataStore();

const { isLogged } = useAuth();

const filters: any = ref({});

const attendance = ref<Attendance>();

const isVisible = ref(false);

const menu = ref();
const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Cancel",
        icon: "pi pi-times",
        command: async () => {
          // alert(attendanceId.value)
          const ok = await cancelAttendance(attendance.value!.id);
          if (ok) {
            toast.add({
              severity: "success",
              summary: "Success",
              detail: "Incidencia Cancelada",
              life: 3000,
              group: "tr",
            });
            return;
          }
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Incidencia No Cancelada",
            life: 3000,
            group: "tr",
          });
        },
      },
      {
        label: "Complete",
        icon: "pi pi-check",
        command: async() => {
          const ok = await finishAttendance(attendance.value!.id);
        },
      },
      {
        label: "Asign person",
        icon: "pi pi-user-plus",
        command: () => {
          alert("asignar Persona");
        },
      },
    ],
  },
]);

const initFilters = (): void => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_at: { value: null, matchMode: FilterMatchMode.DATE_IS },
    state: { value: null, matchMode: FilterMatchMode.EQUALS },
    person: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

initFilters();

const clearCalendar = () => {
  filters.value["created_at"].value = null;
  filters.value["global"].value = null;
};

const checkFields = computed(() => {
  return !(filters.value["created_at"].value || filters.value["global"].value);
});

const formatDate = computed(() => {
  return (date: string) => {
    if (!date) return;
    return new Date(date).toLocaleString("es-PE");
  };
});

const showData = (dataRow: object): void => {
  modalStore.setSelected(dataRow);
  modalStore.open();
};

const openModal = (): void => {
  isVisible.value = true;
};

const closeModal = (visible: boolean): void => {
  isVisible.value = visible;
};

const toggle = (event: Event, attendanceData: Attendance) => {
  attendance.value = attendanceData;
  menu.value.toggle(event);
};
</script>
<style>
.card {
  /* outline: 2px solid red; */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  width: 90vw;
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
  color: var(--blue-600);
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
