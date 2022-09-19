import styled from "styled-components"

export const StyledHeader = styled.header`
    height: 45px;
    display: grid;
    grid-template: auto/ minmax(15px, 1fr) minmax(300px, 1400px) minmax(15px, 1fr);
    align-items: center;
    background-color: #444444; 
`

export const StyledHeading = styled.span`
    grid-column: 2/3;
    font-size: 12px;
    color: #fff;
`