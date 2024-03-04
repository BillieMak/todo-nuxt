import { ref } from "vue";
interface SeverityMap {
  [key: number]: string;
}

interface StateNameMap {
  [key: number]: string;
}

export const useIncidencia = async() => {

  const { data } = await useFetch("http://localhost:3000/incidencias");

  const incidencias : any = ref(data);


  const getSeverity = (state: number) => {
    return severity[state];
  };

  const getStateName = (state: number) => {
    return stateName[state];
  };

  const severity: SeverityMap = {
    0: "success",
    1: "info",
    2: "warning",
    3: "error",
  };

  const stateName: StateNameMap = {
    0: "Pendiente",
    1: "En proceso",
    2: "Cerrado",
    3: "Cancelado",
  };

  return {
    incidencias,
    getSeverity,
    getStateName,
  };
};
