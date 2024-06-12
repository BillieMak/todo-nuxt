import { defineStore } from "pinia";
import type { Atendance } from "~/interfaces/attendance";

export const useAttendanceStore = defineStore("attendance", () => {
  const attendances = ref<Array<Atendance>>([]);

  const isLoading = ref<boolean>(true);

  const setAttendances = (attendancesArray: Array<Atendance>) => {
    isLoading.value = false;
    attendances.value = attendancesArray;
  };
  const existById = (item1: Atendance, item2: Atendance) =>
    item1.id === item2.id;

  const addAttendance = (attendance: Atendance) => {
    attendance.created_at = new Date(attendance.created_at);
    const index = attendances.value.findIndex((item) =>
      existById(item, attendance)
    );
    if (index === -1) {
      attendances.value.unshift(attendance);
    }
    attendances.value[index] = attendance;
  };

  return {
    attendances,
    isLoading,
    setAttendances,
    addAttendance,
    // GETTERS
    getAttendances: computed(() => attendances.value),
  };
});
