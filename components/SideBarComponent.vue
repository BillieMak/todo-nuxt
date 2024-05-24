<template>
    <div class="card container">
        <Sidebar v-model:visible="visible">
            <template #container="{ closeCallback }">
                <div class="sidebar-header flex align-items-center gap-3">
                    <Avatar image="http://localhost:3000/imagebot" alt="Bot" shape="circle" />
                    <span class="font-bold">Incidencias OSI</span>
                </div>
                <div class="flex flex-column h-full space-between">
                    <div class="sidebar-body h-full">
                        <NuxtLink to="/" class="link" :activeClass="'active'" @click="closeCallback">
                            <i class="pi pi-home"></i>
                            <span> Dashboard</span>
                        </NuxtLink>
                        <NuxtLink to="/attendance" class="link" :activeClass="'active'"  @click="closeCallback">
                            <i class="pi pi-calendar"></i>
                            <span>Attendance</span>
                        </NuxtLink>
                        <NuxtLink to="/documents" class="link" :activeClass="'active'"  @click="closeCallback">
                            <i class="pi pi-book"></i>
                            <span>Documents</span>
                        </NuxtLink>
                        <NuxtLink to="/users" class="link" :activeClass="'active'"  @click="closeCallback">
                            <i class="pi pi-users"></i>
                            <span>Users</span>
                        </NuxtLink>
                        <NuxtLink to="/areas" class="link" :activeClass="'active'"  @click="closeCallback">
                            <i class="pi pi-building"></i>
                            <span>Areas</span>
                        </NuxtLink>
                    </div>
                    <div class="sidebar-footer flex space-between align-items-center">
                        <div class="flex align-items-center gap-3">
                            <Avatar image="http://localhost:3000/imagebot"
                            shape="circle" />
                        <span class="font-bold">David Rivera</span>
                        </div>
                        <Button icon="pi pi-ellipsis-v" rounded text />
                    </div>
                </div>
            </template>
        </Sidebar>
    </div>
</template>

<script setup>
import { useTimeAgo, useStorage } from '@vueuse/core'

const timeAgo = useTimeAgo(new Date(2022, 0, 1));
const state = useStorage('state', 0);
const visible = defineModel();

const events = [
    {
        id: 999999998,
        code: "first-position",
        name: "Tramo Inicial",
        latitude: "-12.12202",
        longitude: "-77.03284",
        devicetime: "22/05/2024 09:36:18 PM",
        address: "Aromia, 401, Calle José Gálvez, Cocharcas, Miraflores, Lima, Lima Metropolitana, Lima, 15074, Perú",
        geozone_name: null,
        fixtime: 1716431778000
    },
    {
        id: 180,
        code: "green_driving3",
        name: "Giro brusco",
        latitude: "-12.12262",
        longitude: "-77.03214",
        devicetime: "22/05/2024 09:46:13 PM",
        address: "Wong, Calle José Gálvez, Cocharcas, Miraflores, Lima, Lima Metropolitana, Lima, 15074, Perú",
        geozone_name: null,
        fixtime: 1716432373000
    }
];

const mapTest = new Map(events.map((event) => [event.id, event]));

</script>

<style scoped>
.flex {
    display: flex;
    /* outline: 2px solid cyan; */
}

.h-full {
    height: 100%;
}
.w-full {
    width: 100%;
}

.gap-3 {
    gap: 8px;
}

.flex-column {
    flex-direction: column;
}

.align-items-center {
    align-items: center;
}

.space-between {
    justify-content: space-between;
}

.sidebar-header,
.sidebar-body,
.sidebar-footer {
    padding: 10px;
}

.sidebar-header {
    /* outline: 2px solid pink; */
    padding: 15px 15px;
   box-shadow: -2px 0 0 1px #05040433;

}

.sidebar-body {
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    padding-left: 10px;
    gap: 20px;
    justify-content:baseline;
    /* outline: 2px solid lime; */
}

.sidebar-footer {
    height: 60px;
    box-shadow: -2px 0 0 1px #05040433;
    /* outline: 2px solid red; */
}

.link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: #111;
    padding: 8px 10px;
    font-size: medium;
    border-radius: 10px;
}

.active {
    color: #23a;
    /* background-color: red; */
    border-radius: 8px;
    text-decoration: none;
}
</style>