import {defineStore} from "pinia"
import type { Document } from "~/interfaces/document"

export const useDocumentsStore = defineStore('documents', ()=>{
    const documents = ref<Array<Document>>([])

    const isLoading = ref<boolean>(true)
    
    const setDocuments = (documentArray: Array<Document>) => {
        isLoading.value = false
        documents.value = documentArray
    }

    return {
        // ESTATE 
        documents,
        isLoading,

        // ACTIONS
        setDocuments
        
    }
})