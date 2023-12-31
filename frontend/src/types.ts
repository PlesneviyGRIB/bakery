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

export type Placeholder = "All" | "None"

export type Interaction = "hover" | "click"

export type Named<T> = {
    name: string
    value: T
}

export type Photo = {
    src: string
    file: File
    title: string
    description: string
}

export enum PagePath {
    LOGIN = '/login',
    PRODUCTS = '/products',
    ADMIN = '/admin',
    NOT_FOUND = '/'
}

export enum APP_EVENT {
    INTERCEPTOR_ERROR = 'interceptor_error',
    INTERCEPTOR_PENDING_STATUS = 'interceptor_pending_status'
}
