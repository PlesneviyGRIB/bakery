import {FC} from "react";
import {SpecificProduct} from "../../types";
import {ProductDto} from "../../api/rest-client";

interface SpecificProductFormProps<T extends ProductDto> {
    tabs: SpecificProduct<T>[]
    placement?: "horizontal" | "vertical"
}

export const SpecificProductForm = <T extends ProductDto>({ tabs, placement = "horizontal"} : SpecificProductFormProps<T>) : JSX.Element => {
    return(
        <>
        </>
    )
}


interface SpecificProductFormTabProps<T extends ProductDto> {
    tab: SpecificProduct<T>
}


const SpecificProductFormTab = <T extends ProductDto>({tab} : SpecificProductFormTabProps<T>) : JSX.Element => {
    return (
        <></>
    )
}