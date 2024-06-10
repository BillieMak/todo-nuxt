import { defineStore } from "pinia";
import type { area } from "~/interfaces/area";

export const useAreaStore = defineStore("areas", () => {
  const areas = ref<area[]>([]);

  const addAreas = (areasArray: area[]) => {
    areas.value = areasArray;
  };
  return { areas, addAreas, };
});
