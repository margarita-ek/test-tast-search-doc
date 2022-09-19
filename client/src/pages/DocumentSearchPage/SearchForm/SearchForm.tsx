import React, { 
    FC,
    KeyboardEvent,
    useState,
    useEffect,
    ChangeEvent,
} from 'react'

import {
    StyledInput,
    StyledInputRadio,
    StyledInputRadioSortContainer,
    StyledInputRadioSortWrapper,
    StyledLabel,
    StyledLabelForInputRadio,
    StyledSearchFormContainer,
    StyledWarning
} from './SearchForm.styles'

type Props = {
    setFilteredID: Function
    setFilteredItemByID: Function
    setFromDataToFilter: Function
    sortingResult: string
    setSortingResult: Function
    sort: string | null
    setSort: Function
}

export type TFromDataToFilter = {
    createdStart: string
    createdFinish?: string
    title: string  
}

const SearchForm: FC<Props> = ({ 
    setFilteredID,
    setFilteredItemByID,
    setFromDataToFilter,
    sortingResult,
    setSortingResult,
    sort,
    setSort
}) => {

    const [form, setForm] = useState({
        id: "",
        createdStart: "",
        createdFinish: "",
        title: ""
    })

    const [sortToggle, setSortToggle] = useState<boolean>(false)
    const [sortingResultToggle, setSortingResultToggle] = useState<boolean>(false)

    const [warningToggleTitle, setWarningToggleTitle] = useState<boolean>(false)
    const [warningTitle, setWarningTitle] = useState<string>("")
    const [warningToggleDate, setWarningToggleDate] = useState<boolean>(false)
    const [warningDate, setWarningDate] = useState<string>("")

    useEffect(() => { 
        setTimeout(() => { 
            setWarningToggleDate(false)
            setWarningToggleTitle(false)
            setWarningTitle("")
            setWarningDate("")
        }, 3000)
    }, [warningToggleDate, warningToggleTitle, warningTitle, warningDate])

    const changeHandlerUpdateForm = (event: ChangeEvent<HTMLInputElement>) => { 
        setForm({ ...form, [event.target.name]: [event.target.value] })
    }

    const changeValueInSortInput = (event: ChangeEvent<HTMLInputElement>) => { 
        if (event.target.name === "sortRadioCreated" || event.target.name === "sortRadioTitle") { 
            setSort(event.target.value)
            setSortToggle(false)
        }
        if (event.target.name === "sortRadioTitleDecrease" || event.target.name === "sortRadioTitleIncrease") { 
            setSortingResult(event.target.value)
            setSortingResultToggle(false)
        }
    }

    const checkFormValidation = (formData: TFromDataToFilter) => {
        const createdStart = formData.createdStart
        const createdFinish = formData.createdFinish
        const title = formData.title

        const dateComparisonResult = JSON.stringify(createdStart) < JSON.stringify(createdFinish)

        if (createdStart && !dateComparisonResult && title) { 
            setWarningToggleDate(true)
            setWarningDate("Введите корректные данные")
            setFromDataToFilter({
                createdStart: form.createdStart,
                createdFinish: form.createdFinish,
                title: form.title.toString()
            })            
        }

        if (!dateComparisonResult) { 
            setWarningToggleDate(true)
            setWarningDate("Введите корректные данные")
        }

        if (!title) { 
            setWarningToggleTitle(true)
            setWarningTitle("Введите наименование для поиска")
        }

        if (dateComparisonResult && title) { 
            setFromDataToFilter({
                createdStart: form.createdStart,
                createdFinish: form.createdFinish,
                title: form.title.toString()
            })
        } 

        if (!createdStart && !dateComparisonResult && title) { 
            setWarningToggleDate(false)
            setWarningDate("")            
            setFromDataToFilter({
                createdStart: form.createdStart,
                createdFinish: form.createdFinish,
                title: form.title.toString()
            })
        } 
        
        return
    }

    const onKeyDownPressInput = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code === "Enter") {
            setFilteredItemByID(null)

            if (form.id.length > 0) { 
                setFilteredID(form.id.toString())
            }

            if (!form.id.length && (form.title || form.createdStart || form.createdFinish)) { 
                checkFormValidation({
                    createdStart: form.createdStart,
                    createdFinish: form.createdFinish,
                    title: form.title                 
                })
            }

            setForm({
                id: "",
                createdStart: "",
                createdFinish: "",
                title: ""
            })
        }        
    }

    return (
        <StyledSearchFormContainer>
            <div>

                <div>
                    <StyledLabel htmlFor="id">ID документа</StyledLabel>
                    <StyledInput
                        type="number"
                        title="id документа"
                        name="id"
                        id="id"
                        value={form.id}
                        onChange={changeHandlerUpdateForm}
                        onKeyDown={(event) => onKeyDownPressInput(event)}          
                    />
                    { form.id.length > 0 ? <StyledWarning>
                        <span>Если заполнено <strong>ID документа</strong>, то все остальные поля будут проигнорированы</span>
                    </StyledWarning> : null }
                </div>

                <div>
                    <StyledLabel htmlFor="createdStart">Создан</StyledLabel>
                    <div className="created">
                        <StyledInput
                            type="date"
                            min="2022-09-16"
                            max="2023-09-16"
                            title="начало периода"
                            name="createdStart"
                            id="createdStart"
                            value={form.createdStart}
                            onChange={changeHandlerUpdateForm}                        
                            onKeyDown={(event) => onKeyDownPressInput(event)}          
                        />                            
                        <StyledInput
                            type="date"
                            min="2022-09-16"
                            max="2023-09-16"                            
                            title="конец периода"
                            name="createdFinish"
                            id="createdFinish"
                            value={form.createdFinish}
                            onChange={changeHandlerUpdateForm}
                            onKeyDown={(event) => onKeyDownPressInput(event)}          
                        />
                    </div>
                    { warningToggleDate ? <StyledWarning>
                        <span>{warningDate}</span>
                    </StyledWarning> : null }
                </div>

                <div>
                    <StyledLabel htmlFor="title">Название документа</StyledLabel>
                    <StyledInput
                        type="text"
                        title="название документа"
                        name="title"
                        id="title"
                        value={form.title}
                        onChange={changeHandlerUpdateForm}
                        onKeyDown={(event) => onKeyDownPressInput(event)}          
                    />
                    { warningToggleTitle ? <StyledWarning>
                        <span>{warningTitle}</span>
                    </StyledWarning> : null }
                </div>

                <div>
                    <StyledLabel htmlFor="sort">Сортировка</StyledLabel>
                    <div className="created">
                        {sortToggle ? <StyledInputRadioSortWrapper>
                            <div>{sort !== null ? sort : "Выбрать значение"}</div>
                            <div className="radio-group">
                                <StyledInputRadio
                                    id="sortRadioCreated"
                                    name="sortRadioCreated"
                                    value="Создан"
                                    onChange={(event) => changeValueInSortInput(event)}                                    
                                />
                                <StyledLabelForInputRadio
                                    htmlFor="sortRadioCreated"
                                >{"Создан"}
                                </StyledLabelForInputRadio>
                            </div>
                            <div className="radio-group">
                                <StyledInputRadio
                                    id="sortRadioTitle"
                                    name="sortRadioTitle"
                                    value="Название"
                                    onChange={(event) => changeValueInSortInput(event)}                                    
                                />
                                <StyledLabelForInputRadio
                                    htmlFor="sortRadioTitle"
                                >{"Название"}
                                </StyledLabelForInputRadio>                              
                            </div>
                        </StyledInputRadioSortWrapper> : 
                            <StyledInputRadioSortContainer>
                                <div>
                                    {sort}
                                </div>
                                <div className="btn-container">
                                        <button
                                            className="btn-remove"
                                            onClick={() => setSort(null)}
                                        />
                                        <button
                                            className="btn-openList"
                                            onClick={() => setSortToggle(true)}
                                        />
                                </div>
                            </StyledInputRadioSortContainer>
                        }
                        {sortingResultToggle ? <StyledInputRadioSortWrapper>
                            <div>{sortingResult}</div>
                            <div className="radio-group">
                                <StyledInputRadio
                                    id="sortRadioTitleDecrease"
                                    name="sortRadioTitleDecrease"
                                    value={"По убыванию"}
                                    onChange={(event) => changeValueInSortInput(event)}
                                />
                                <StyledLabelForInputRadio
                                    htmlFor="sortRadioTitleDecrease"
                                >{"По убыванию"}
                                </StyledLabelForInputRadio>
                            </div>
                            <div className="radio-group">
                                <StyledInputRadio
                                    id="sortRadioTitleIncrease"
                                    name="sortRadioTitleIncrease"
                                    value={"По возрастанию"}
                                    onChange={(event) => changeValueInSortInput(event)}                                    
                                />
                                <StyledLabelForInputRadio
                                    htmlFor="sortRadioTitleIncrease"
                                >{"По возрастанию"}
                                </StyledLabelForInputRadio>                              
                            </div>
                        </StyledInputRadioSortWrapper> : 
                        <StyledInputRadioSortContainer>
                            {sortingResult}
                                <button
                                    className="btn-openList"
                                    onClick={() => setSortingResultToggle(true)}
                                />
                        </StyledInputRadioSortContainer>
                        }
                    </div>
                </div>

            </div>
        </StyledSearchFormContainer>
    )
}

export default SearchForm