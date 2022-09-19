import styled from "styled-components"

type getErrorProps = {
    getError?: boolean
}


export const StyledSearchFormContainer = styled.div`
    grid-column: 1/2;

    .created{
        display: flex;

        & > :first-child{
            margin-right: 25px;
        }
    }
`

export const StyledLabel = styled.label`
    margin-top: 23px;
    text-align: left;
    display: block;
    font-weight: 600;
`

export const StyledInput = styled.input<getErrorProps>`
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::-webkit-calendar-picker-indicator{
        display: none;
    }

    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding: 10px 14px;
    border: 1px solid #8F8F8F;
    caret-color: '#000';    
    border-radius: 4px;
    font-size: 14px;
    letter-spacing: 1px;

    &:hover{
        background-color: #efeeee;
    }
    
    &:disabled{
        background-color: #F5F5F5;        
    }    
`

export const StyledWarning = styled.div`
    margin-top: 5px;

    & > span {
        font-size: 11px;
        color: #c53b24;
    }
`

export const StyledInputRadioSortWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
    border: 1px solid #8F8F8F;
    border-radius: 4px;

    & > div:first-child{
        background-color: #8F8F8F;
        font-weight: 600;
        color: white;
        padding: 10px 14px;      
    }
    
    .radio-group{
        cursor: pointer;
        
        &:hover{
            background-color: #8F8F8F;
            color: white;
        }
    }    
`

export const StyledInputRadioSortContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding: 10px 14px;
    border: 1px solid #8F8F8F;
    caret-color: '#000';    
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    .btn-container{
        display: flex;
    }

    button{
        width: 15px;
        height: 15px;
    }    

    .btn-remove{
        margin: 0 5px;
        background: url("/img/remove.svg") center center/ 15px 15px no-repeat;         
    }

    .btn-openList{
        background: url("/img/arrow.svg") center center/ 10px 10px no-repeat;   
        margin-left: 5px;
    }
`
export const StyledInputRadio = styled.input.attrs({ 
    type: "radio"
})`
    display: none;
`

export const StyledLabelForInputRadio = styled.label`
    display: block;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin: 10px 14px;    
`
