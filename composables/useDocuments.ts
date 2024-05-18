import { useDocumentsStore } from "~/store/documentsStore";

export const useDocuments = () => {

  const documentsStore = useDocumentsStore();

  const { $locally } = useNuxtApp();

  const { documents } = storeToRefs(documentsStore);

  const fillDocuments = async() => {
    const data = await fetch("/api/documents", {
      headers: {
        token: $locally.getItem("tokenid") ?? ""
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
