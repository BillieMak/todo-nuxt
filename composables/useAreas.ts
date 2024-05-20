import { useQuery } from "@tanstack/vue-query";
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

  // const { $apiBase } = useNuxtApp();

  const getAreas = async () => {
    try {
      const response = await $fetch(`/api/areas`, {
        headers: { 
          token: `${$locally.getItem()}`,
        },
      });
      areaStore.addAreas(response as area[]);
    } catch (error: any) {
      console.log({ error });
    }
  };

  onMounted(() => {
    getAreas();
  });

  return {
    areas,
  };
};
