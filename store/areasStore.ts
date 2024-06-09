import { defineStore } from "pinia";
import type { area } from "~/interfaces/area";

export const useAreaStore = defineStore("areas", () => {
  const areas = ref<area[]>([]);

  const addAreas = (areasArray: area[]) => {
    areas.value = areasArray;
  };

  const loadAreas = async () => {
    const areas = await $fetch<area[]>("http://localhost:8080/api/v1/areas", {
      headers: {
        token: "123abc",
      },
    });
    addAreas(areas);
  };

  return { areas, addAreas, loadAreas };
});
