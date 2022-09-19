import React from "react"
import { StyledLoader } from "./Loader.styles"

export const Loader: React.FC = () => { 
    return (
        <StyledLoader><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></StyledLoader>
    )
}