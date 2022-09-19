import styled from "styled-components"

type TIsActive = {
    isActive: boolean
}

export const StyledAccordionTitleContainer = styled.div<TIsActive>`
    margin-bottom: ${props => (props.isActive ? "0px" : "20px")};
`

export const StyledAccordionTitle = styled.div<TIsActive>`
    display: grid;
    grid-template: auto/ minmax(22px, 1fr) minmax(300px, 1400px) minmax(22px, 1fr);
    align-items: center;
    position: relative;
    cursor: pointer;
    height: 55px;
    background-color: #D2E8BA;
    border-radius: ${props => (props.isActive ? "4px 4px 0 0" : "4px")};

    & > span {
        grid-column: 2/3;
        display: inline-block;
        padding-right: 45px;
    }

    &::after{
        content: "";
        display: inline-block;
        position: absolute;
        top: 20px;
        right: 22px;
        width: 38px;
        height: 15px;
        background: url("/img/arrow-acc.svg") no-repeat;
        background-size: 100% 100%;
        transform: ${props => (props.isActive ? "rotate(-180deg)" : "")};
    }
`

export const StyledAccordionContent = styled.div`
    min-height: 200px;
    padding: 25px 20px; 
    border: 1px solid #D2E8BA;
    border-radius: 0 0 4px 4px;
    margin-bottom: 15px;  
`

