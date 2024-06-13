import { useAreaStore } from "~/store/areasStore";

interface area {
  id: number;
  name: string;
  // subArea: string
}

export const useAreas = () => {
  const { $locally } = useNuxtApp();

  const areaStore = useAreaStore();

  const { areas } = storeToRefs(areaStore);

  const attendanceApi = useNuxtApp().$axios;

  const getAreas = async () => {
    try {      
      const {data} = await attendanceApi.get<area[]>(`/api/areas`)
      
      areaStore.addAreas(data);

    } catch (error: any) {
      console.log({ error });
    }
  };

  onMounted(() => {
    getAreas();
  });

  return {
    areas,

    getAreas,
  };
};
