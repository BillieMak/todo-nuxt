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

  const getAreas = async () => {
    try {
      const response = await $fetch<area[]>(`/api/areas`, {
        headers: { 
          token: `${$locally.getItem()}`,
        },
      });
      areaStore.addAreas(response);
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
