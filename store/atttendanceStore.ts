import { defineStore } from "pinia";
import type { Attendance } from "~/interfaces/attendance";

export const useAttendanceStore = defineStore("attendance", () => {
  const attendances = ref<Array<Attendance>>([]);

  const isLoading = ref<boolean>(true);

  const setAttendances = (attendancesArray: Array<Attendance>) => {
    isLoading.value = false;
    attendances.value = attendancesArray;
  };
  const existById = (item1: Attendance, item2: Attendance) =>
    item1.id === item2.id;

  const addAttendance = (attendance: Attendance) => {
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
