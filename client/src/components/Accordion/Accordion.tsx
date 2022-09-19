import React, {
    useState,
    FC
} from 'react'

import {
    StyledAccordionContent,
    StyledAccordionTitle,
    StyledAccordionTitleContainer
} from './Accordion.styles'

type Props = {
    title: string
    content: string
}

const Accordion: FC<Props> = (props) => {
    const {
        title,
        content,
    } = props

    const [isActive, setIsActive] = useState<boolean>(false)

    const handleClick = () => { 
        setIsActive(!isActive)
    }

    return (
        <>
            <StyledAccordionTitleContainer isActive={isActive}>
                <StyledAccordionTitle isActive={isActive} onClick={handleClick}>
                    <span>{title}</span>
                </StyledAccordionTitle>                
            </StyledAccordionTitleContainer>
            {isActive && <StyledAccordionContent>{content}</StyledAccordionContent>}
        </>
    )
}

export default Accordion