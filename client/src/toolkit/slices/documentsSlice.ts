import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type TDocument = {
    _id: number
    date: Date | number | string 
    title: string
    body: string
}

interface IInitialState { 
    documents: TDocument[]
}

const initialState = {
    documents: []
} as IInitialState

const documentsSlice = createSlice({
    name: "documentsSlice",
    initialState,
    reducers: {
        addDocumentsToStorage: (state, action: PayloadAction<TDocument[]>) => { 
            state.documents = action.payload
        }
    }
})

export const { addDocumentsToStorage } = documentsSlice.actions

export default documentsSlice.reducer