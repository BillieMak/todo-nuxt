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

  const isLoding = ref(false);

  const getAreas = async () => {
    const { data } = await useFetch('/api/areas', {
      headers: {
          token : `${ $locally.getItem('tokenid')}`
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
