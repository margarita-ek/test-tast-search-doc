import React, {
    FC,
    useCallback,
    useEffect,
    useState
} from "react"

import {
    StyledDocumentSearchPageContainer,
    StyledDocumentSearchPageWrapper
} from "./DocumentSearchPage.styles"

import RegisterOfDocuments from "./RegisterOfDocuments/RegisterOfDocuments"
import SearchForm, {
    TFromDataToFilter
} from "./SearchForm/SearchForm"

import {
    useAppSelector
} from "../../toolkit/hooks"

import {
    TDocument
} from "../../toolkit/slices/documentsSlice"

type TFilteredID = null | string

const DocumentSearchPage: FC = () => {
    const [arrayGroup, setArrayGroup] = useState<TDocument[][]>([])
    const [filteredId, setFilteredID] = useState<TFilteredID>(null)

    const [filteredItemByID, setFilteredItemByID] = useState<TDocument | null>(null)
    const [filteredItemByForm, setFilteredItemByForm] = useState<TDocument[] | null>(null)

    const [fromDataToFilter, setFromDataToFilter] = useState<TFromDataToFilter | null>(null)

    const [sort, setSort] = useState<string | null>("Создан")
    const [sortingResult, setSortingResult] = useState<string>("По убыванию")

    const storage = useAppSelector(state => state.documents)

    useEffect(() => { 
        if (filteredId !== null) { 
            const itemWithFoundID = storage.filter(({ _id }) => _id === +filteredId)
            const [obj] = itemWithFoundID
            
            if(obj) setFilteredItemByID(obj)
            setFilteredID(null)
        }
    }, [filteredId])

    useEffect(() => {
        if (fromDataToFilter !== null) { 
            const findMatches = storage.filter(({ title }) => title.indexOf(fromDataToFilter.title) > -1)

            if (findMatches.length === 0) { 
                return setFilteredItemByForm(null)
            }

            const convertDateToArray = findMatches.map(obj => ({...obj, date: [ new Date(obj.date).toLocaleDateString().split(".").reverse().join("-")].toString()}))
            
            const dateCheck = convertDateToArray.filter(arrayWithDate => arrayWithDate.date >= fromDataToFilter.createdStart)
            if (findMatches.length > 0) {
                let sortTitle = findMatches

                if (sort === "Название" && sortingResult === "По убыванию") { 
                    let sortTitleFromSort = sortTitle.sort((a, b) => b.title[0].localeCompare(a.title[0]))
                    return setFilteredItemByForm(sortTitleFromSort)
                }
                if (sort === "Название" && sortingResult === "По возрастанию") { 
                    let sortTitleFromSort = sortTitle.sort((a, b) => a.title[0].localeCompare(b.title[0]))
                    return setFilteredItemByForm(sortTitleFromSort)
                }
            } 

            if (!dateCheck.length && findMatches.length > 0) {
                return setFilteredItemByForm(findMatches)
            }
            
            if (dateCheck) {
                let sortDate = dateCheck

                if (sort === "Создан" && sortingResult === "По убыванию") { 
                    let sortDateFromSort = sortDate.sort((a, b) => b.date.localeCompare(a.date))
                    return setFilteredItemByForm(sortDateFromSort)
                }
                if (sort === "Создан" && sortingResult === "По возрастанию") { 
                    let sortDateFromSort = sortDate.sort((a, b) => a.date.localeCompare(b.date))
                    return setFilteredItemByForm(sortDateFromSort)
                }
            }            

            if (dateCheck.length > 0) {
                return setFilteredItemByForm(dateCheck)
            }            
            
            return
        }
    }, [fromDataToFilter])

    useEffect(useCallback(() => {
        getToSplitAnArrayIntoPieces(storage)      
    }, [storage]), [storage])    

    const getToSplitAnArrayIntoPieces = (arr: TDocument[]) => { 
        let res = []

        const middleCount = (arr.length / 12).toString()
        const count = parseInt(middleCount)

        for (let i = 0; i < count; i++) {
            res.push(arr.slice(i * 12, i * 12 + 12))
        }

        if (count * 12 < arr.length) {
            res.push(arr.slice(count * 12))
        }

        return setArrayGroup(res)
    }

    return (
        <StyledDocumentSearchPageWrapper>
            <StyledDocumentSearchPageContainer>
                <SearchForm
                    setFilteredID={setFilteredID}
                    setFilteredItemByID={setFilteredItemByID}
                    setFromDataToFilter={setFromDataToFilter}
                    sortingResult={sortingResult}
                    setSortingResult={setSortingResult}
                    sort={sort}
                    setSort={setSort}
                />
                <RegisterOfDocuments
                    arrayGroup={arrayGroup}
                    storage={storage}
                    filteredItemByID={filteredItemByID!}
                    filteredItemByForm={filteredItemByForm!}
                />
            </StyledDocumentSearchPageContainer>
        </StyledDocumentSearchPageWrapper>
    )
}

export default DocumentSearchPage