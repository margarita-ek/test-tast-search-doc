import React, { 
    FC
} from "react"

import {
    StyledHeader,
    StyledHeading
} from "./Header.styles"

const Header: FC = () => (
        <StyledHeader>
            <StyledHeading>Поиск документов</StyledHeading>
        </StyledHeader>
)

export default Header