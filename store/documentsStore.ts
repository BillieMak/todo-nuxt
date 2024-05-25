import {defineStore} from "pinia"
import type { Document } from "~/interfaces/document"



interface DocumentState {
    documents: Array<Document>
    isLoading: boolean
}

export const useDocumentsStore = defineStore('documents', {
    state: () : DocumentState => ({
        documents: [],
        isLoading: true,
    }),
    getters: {
        getDocuments: (state) => state.documents
    },
    actions: {
        setDocuments(documents: Array<Document>) {
            this.documents = documents
        }
    }
})