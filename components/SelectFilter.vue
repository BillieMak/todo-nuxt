<template>
    <div class="container flex justify-content-center">
        <Dropdown v-model="selectedArea" @change="onAreaChange" :options="areas" filter optionLabel="name"
            placeholder="Area" class="w-full md:w-14rem">
            <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                    <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
            </template>
            <template #option="slotProps">
                <div class="flex align-items-center">
                    <div>{{ slotProps.option.name }}</div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>

<script setup lang="ts">

interface Area {
    id: number
    name: string
}

import { useModalFormStore } from '~/store/modalFormStore';

const modalFormStore = useModalFormStore()

const { areas } = useAreas()

const selectedArea = ref<Area>({ id: 0, name: 'Area' })

const onAreaChange = () => {
    const area = selectedArea.value
    modalFormStore.setArea(area.name);
}
</script>
