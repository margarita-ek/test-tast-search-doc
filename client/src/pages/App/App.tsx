import React, {
    useEffect
} from "react"

import Header from "../../components/Header/Header"
import DocumentSearchPage from "../DocumentSearchPage/DocumentSearchPage"

import {
    StyledAppMain
} from "./App.styles"

import { useAppDispatch } from "../../toolkit/hooks"
import { addDocumentsToStorage } from "../../toolkit/slices/documentsSlice"

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => { 
        const fetchData = async () => { 
            const response = await fetch("/api/documents")
            const data = await response.json()
            
            dispatch(addDocumentsToStorage(data))
        }
        fetchData()
    }, [])

    return (
        <StyledAppMain>
            <Header />
            <DocumentSearchPage />
        </StyledAppMain>
    )
}

export default App
