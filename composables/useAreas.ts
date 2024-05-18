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

  const { $apiBase } = useNuxtApp();

  const isLoding = ref(false);

  const getAreas = async () => {

    console.log($locally.getItem())
    const { data } = await useFetch(`${$apiBase}/areas`, {
      headers: {
          "token" : `${$locally.getItem()}`
      }
  })
    areaStore.addAreas(data.value as area[]);
  };

  onMounted(() => {
    getAreas();
  });

  return {
    areas,
  };
};
