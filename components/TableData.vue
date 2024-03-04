
<template>
    <div class="card">
        <DataTable :value="incidencias.data">
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Incidencias</span>
                    <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                </div>
            </template>
            <Column field="user" header="Usuario"></Column>
           
            <Column field="problem" header="Problema"></Column>
           
            <Column field="state" header="Status">
                <template #body="{data}">
                    <Tag :value="getStateName(data.state)" :severity="getSeverity(data.state)" />
                </template>
            </Column>
            <template #footer> In total there are {{ incidencias.data.length}} incidencias. </template>
        </DataTable>

    </div>
</template>

<script setup lang="ts">

 const {incidencias , getSeverity, getStateName} = await useIncidencia()


</script>
