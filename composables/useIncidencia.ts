import { useAttendanceStore } from "~/store/atttendanceStore";
interface SeverityMap {
  [key: number]: string;
}

interface StateNameMap {
  [key: number]: string;
}

export const useIncidencia = async () => {
  const attendanceStore = useAttendanceStore();

  const fillStore = () : void => {
    const eventSource = new EventSource("http://localhost:8080/api/v1/att");

    eventSource.onopen = (event) => {
      // attendanceStore
    };

    eventSource.onmessage = (event) => {
      const attendance = JSON.parse(event.data);
      attendanceStore.addAttendance(attendance);
    };

    eventSource.onerror = (event) => {
      console.log("conexion terminada");
    };
  };

  onMounted(() => {
    fillStore();
  });

  const getSeverity = (state: number) : string => {
    return severity[state];
  };

  const getStateName = (state: number) : string => {
    return stateName[state];
  };

  const severity: SeverityMap = {
    0: "success",
    1: "info",
    2: "warning",
    3: "danger",
  };

  const stateName: StateNameMap = {
    0: "Pendiente",
    1: "En proceso",
    2: "Cerrado",
    3: "Cancelado",
  };

  return {
    getSeverity,
    getStateName,
  };
};