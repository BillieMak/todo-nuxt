<template>
    <Dialog v-model:visible="visible" modal header="Nueva Incidencia" :closable="false" :style="{ width: '25rem' }">
        <template #header>
            <div class="inline-flex align-items-center justify-content-center gap-2">
                <span class="font-bold white-space-nowrap">Create</span>
            </div>
        </template>
        <span class="p-text-secondary block mb-5">Create a new attendance.</span>
        <div class="flex">
            <label for="person" class="font-semibold w-6rem">Usuario:</label>
            <InputText id="person" class="flex-auto" autocomplete="off" v-model="attendance.setPerson"
                aria-describedby="person-help" />
            <small id="person-help">{{ hasErrors.person }}</small>
        </div>
        <div class="flex">
            <label for="problem" class="font-semibold w-6rem">Problema:</label>
            <InputText id="problem" class="flex-auto" autocomplete="off" v-model="attendance.setProblem"
                aria-describedby="problem-help" />
            <small id="problem-help">{{ hasErrors.problem }}</small>
        </div>
        <div class="flex">
            <label for="area" class="font-semibold w-6rem">Area:</label>
            <SelectFilter id="area" />
        </div>
        <div class="flex">
            <label for="description" class="font-semibold w-6rem">Description:</label>
            <Textarea id="description" class="flex-auto" auto-resize v-model="attendance.setDescription" rows="4" />
        </div>
        <template #footer>
            <Button label="Cancel" text raised severity="danger" @click="onCancel" autofocus />
            <Button label="Save" raised @click="onSave" severity="success" autofocus />
        </template>
    </Dialog>
    <Toast position="bottom-right" group="tr" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useModalFormStore } from '~/store/modalFormStore';

import { useAttendanceStore } from '~/store/atttendanceStore';

import { useToast } from 'primevue/usetoast';
import Attendance from '~/plugin/attendance';


const { $locally } = useNuxtApp()





const props = defineProps({
    isVisible: Boolean
})

const visible = computed(() => props.isVisible)

const modalFromStore = useModalFormStore()

const attendanceStore = useAttendanceStore()

const toast = useToast()

const { getAttendance } = storeToRefs(modalFromStore)

const selectedArea = computed(() => getAttendance.value.area)

const attendance: Ref<Attendance> = ref(new Attendance('', '', '', '', ''))

const hasErrors: Ref<Attendance> = ref(new Attendance('', '', '', '', ''))

const emit = defineEmits(['closeModal'])

const { $apiBase } = useNuxtApp();

const { user } = useAuth();

const clearFields = (): void => {

    attendance.value = new Attendance('', '', '', '', '')

    hasErrors.value = new Attendance('', '', '', '', '')
}

const onCancel = (): void => {
    clearFields()
    emit('closeModal', false)
}


const onSave = async (): Promise<void> => {

    attendance.value.setArea = selectedArea.value

    if (!$locally.getItem('tokenid')) {
        showToast('error', 'Debe Registrarse Primero', 'No estas Registrado');
        return
    }

    attendance.value.setCreated_by = user.value.name.toString()

    console.log('token', $locally.getItem('tokenid'))
    try {
        const response: any = await $fetch(`${$apiBase}/att`, {
            headers: {
                token: `${$locally.getItem('tokenid')}`
            },

            method: 'POST',
            body: JSON.stringify(attendance.value),
            watch: false,
        })

        attendanceStore.addAttendance(response)
        showToast('success', 'Incidencia Creada', 'Incidencia Creada con exito');
        clearFields()
        emit('closeModal', false)
        return


    } catch (error: any) {
        console.log(error.data)
        hasErrors.value = error.data
        showToast('error', 'Error Al Crear', 'Verificar Campos');
    }

}


const showToast = (severity: any, summary: string, detail: string): void => {
    toast.add({ severity: severity, summary, detail, group: 'br', life: 4000 });
}

</script>

<style scoped>
.mb-5 {
    /* outline: 2px solid red; */
    /* display: block; */
    margin-bottom: 50px;
}

.flex {
    display: flex;
    /* gap: 5px;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px; */
    flex-direction: column;
    gap: 5px;
    margin-top: 8px;
}
</style>