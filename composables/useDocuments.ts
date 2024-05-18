import { useDocumentsStore } from "~/store/documentsStore";

export const useDocuments = () => {

  const documentsStore = useDocumentsStore();

  const { $locally } = useNuxtApp();

  const { documents } = storeToRefs(documentsStore);

  const { $apiBase } = useNuxtApp();

  const fillDocuments = async() => {
    const data = await fetch(`${$apiBase}/documents`, {
      headers: {
        token: `${$locally.getItem()}`
      }
    })
    // console.log(`${$locally.getItem("tokenid")}`)
    documentsStore.setDocuments(await data.json())
  };
  onMounted(() => {
    fillDocuments()
  });

  return {
    documents,
  };
};
