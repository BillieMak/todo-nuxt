import {defineStore} from "pinia"

interface Document {
    id: Number
    name: String
    created_at: String,
    url: String,
    codigo: String
}

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