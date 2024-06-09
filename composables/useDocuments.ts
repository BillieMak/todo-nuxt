import type { Document } from "~/interfaces/document";
import { useDocumentsStore } from "~/store/documentsStore";

export const useDocuments = () => {

  const documentsStore = useDocumentsStore();

  const { $locally } = useNuxtApp();

  const { documents } = storeToRefs(documentsStore);

  const fillDocuments = async() => {
    const documents = await $fetch<Document[]>(`/api/documents`, {
      headers: {
        token: `${$locally.getItem()}`
      }
    })
    // console.log(`${$locally.getItem("tokenid")}`)
    documentsStore.setDocuments(documents)
  };

  return {
    documents,

    fillDocuments
  };
};
