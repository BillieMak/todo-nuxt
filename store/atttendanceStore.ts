import { defineStore } from "pinia";
import type { Attendance } from "~/interfaces/attendance";

export const useAttendanceStore = defineStore("attendance", () => {
  const attendances = ref<Array<Attendance>>([]);

  const isLoading = ref<boolean>(true);

  const setAttendances = (attendancesArray: Array<Attendance>) => {
    isLoading.value = false;
    attendances.value = attendancesArray;
  };
  const isEqual = (a: any, b: any) => {
    // Si los valores son estrictamente iguales, retorna true
    if (a === b) return true;

    // Si alguno no es objeto o es null, retorna false
    if (
      typeof a !== "object" ||
      typeof b !== "object" ||
      a === null ||
      b === null
    )
      return false;

    // Obtiene las claves de ambos objetos
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    // Si tienen diferente número de propiedades, no son iguales
    if (keysA.length !== keysB.length) return false;

    // Comprueba que ambas claves y sus valores sean iguales recursivamente
    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) return false;
    }

    return true;
  };

  const addAttendance = (attendance: Attendance) => {
    attendance.created_at = new Date(attendance.created_at);
    const index = attendances.value.findIndex((item) =>
      isEqual(item, attendance)
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
