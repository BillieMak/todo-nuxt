import { useDocumentsStore } from "~/store/documentsStore";

export const useDocuments = () => {
  const documentsStore = useDocumentsStore();

  const { documents } = storeToRefs(documentsStore);

  const fillDocuments = async() => {
    const data = await fetch("http://localhost:8080/api/v1/documents")

    documentsStore.setDocuments(await data.json())

  };

  onMounted(() => {
    fillDocuments()
  });

  return {
    documents,
  };
};
