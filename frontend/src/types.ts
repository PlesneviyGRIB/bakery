import {NewProductDto, ProductDto} from "./api/rest-client";

export type MatrixReducer <T> = {
    accumulator: T[][]
    current: T[]
}

export type SpecificProduct<T extends ProductDto> = {
    title: string,
    render() : JSX.Element
    onAccept(product: T) : void
}

export type Option = {
    id: number,
    title: string
}

export type Interaction = "hover" | "click"

export type PartialNewProduct = Omit<NewProductDto, 'discriminator'>
export type GeneralProduct = PartialNewProduct | NewProductDto