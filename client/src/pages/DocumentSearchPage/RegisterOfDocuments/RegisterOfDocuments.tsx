import React, { 
    FC,
    useEffect,
    useState
} from 'react'

import Accordion from '../../../components/Accordion/Accordion'

import {
    StyledRegisterOfDocumentsContainer
} from './RegisterOfDocuments.styles'

import {
    TDocument
} from '../../../toolkit/slices/documentsSlice'   
import { Loader } from '../../../components/Loader/Loader'

type Props = {
    arrayGroup: TDocument[][]
    storage: TDocument[]
    filteredItemByID: TDocument
    filteredItemByForm: TDocument[]
}

const RegisterOfDocuments: FC<Props> = ({ 
    arrayGroup,
    storage,
    filteredItemByID,
    filteredItemByForm
}) => {

    const [totalCount, setTotalCount] = useState<number>(1)
    const [listItems, setListItems] = useState<TDocument[]>([]);

    const [loading, setLoading] = useState<boolean>(false) 

    useEffect(() => {
        if (arrayGroup.length > 0) { 
            setListItems(arrayGroup[0])
        }
    }, [arrayGroup])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll)
        };
    }, []);  

    useEffect(() => { 
        if (!loading) return
        listItems.length !== storage.length ? addMoreListItems() : setLoading(false)
    }, [loading])
    
    const handleScroll = ():void => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) { 
            setLoading(true)
        }
    }
    
    const addMoreListItems = () => {
        setTimeout(() => {
            setListItems(prevState => ([...prevState, ...arrayGroup[totalCount]]))
            setLoading(false)
            setTotalCount(prevCount => prevCount + 1)
        }, 2000)
    }      

    return (
        <StyledRegisterOfDocumentsContainer>
            {
                filteredItemByID !== null ?
                    <Accordion
                        key={filteredItemByID._id}
                        title={filteredItemByID.title}
                        content={filteredItemByID.body}
                    /> : filteredItemByForm ? filteredItemByForm.map(({ _id, title, body }) => <Accordion key={_id} title={title} content={body} />)
                    : <>
                        {listItems.length > 0 ? listItems.map(({ _id, title, body }) => <Accordion key={_id} title={title} content={body} />)
                            : "Нет документов"}
                        {loading ? <div className="loader-container"><Loader/></div> : null}                        
                    </>
            }
        </StyledRegisterOfDocumentsContainer>
    )
}

export default RegisterOfDocuments