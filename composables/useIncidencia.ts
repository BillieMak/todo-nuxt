import { AxiosError } from "axios";
import type { Attendance } from "~/interfaces/attendance";
import { useAttendanceStore } from "~/store/atttendanceStore";
interface SeverityMap {
  [key: number]: string;
}

interface StateNameMap {
  [key: number]: string;
}

const severity: SeverityMap = {
  0: "success",
  1: "info",
  2: "warning",
  3: "danger",
};

const stateName: StateNameMap = {
  0: "Pendiente",
  1: "En proceso",
  2: "Finalizado",
  3: "Cancelado",
};

const attendanceApi = useNuxtApp().$axios;

export const useIncidencia = () => {
  const attendanceStore = useAttendanceStore();

  const { attendances } = storeToRefs(attendanceStore);

  const { $apiBase } = useNuxtApp();

  const eventSource = ref<EventSource>();

  const cancelAttendance = async (id: number) : Promise<boolean> => {
    try {
      
      const {data} =  await attendanceApi.patch<Attendance>(`${$apiBase}/att/${id}?status=3`);
      attendanceStore.addAttendance(data);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Error al Canelar la Incidencia");
        }
      return false;
    }
  };

  const finishAttendance = async (id: number) : Promise<boolean> => {
    try {
      
      const {data} =  await attendanceApi.patch<Attendance>(`${$apiBase}/att/${id}?status=2`);
      attendanceStore.addAttendance(data);
      return true;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error("Error al Completar la Incidencia");
        }
      return false;
    }
  };

  const fillStore = async () => {
    //TODO: hacer una peticion para traer for fechas
    const res = await attendanceApi.post(
      `${$apiBase}/attdate`,
      {
        date: "2022-01-01",
      },
      {
        responseType: "stream",
      }
    );

    eventSource.value = new EventSource(`${$apiBase}/att`);
    eventSource.value.onopen = (event) => {
      // attendanceStore
    };

    eventSource.value.onmessage = (event) => {
      const attendance = JSON.parse(event.data);
      attendanceStore.addAttendance(attendance);
    };

    eventSource.value.onerror = (event) => {
      console.log("conexion terminada");
    };
  };

  onMounted(() => {
    fillStore();
  });

  onUnmounted(() => {
    eventSource.value?.close();
  });

  onDeactivated(() => {
    eventSource.value?.close();
  });

  const getSeverity = (state: number): string => {
    return severity[state];
  };

  const getStateName = (state: number): string => {
    return stateName[state];
  };

  return {
    attendances,
    getSeverity,
    getStateName,
    cancelAttendance,
    finishAttendance,

    severity,
    stateName,
  };
};
