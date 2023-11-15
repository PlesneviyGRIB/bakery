import {OrderDto} from "../api/rest-client";
import {Named} from "../types";
import {Styled as S} from "./Order.styled";
import {useCallback, useEffect, useMemo} from "react";
import {Icon} from "../widgets/Icon";

interface OrderProps<T> {
    orders: Named<T>[]
    selected: OrderDto<T>[]
    onChange(orders: OrderDto<T>[]): void
}

type NamedExd<T> = Named<{ order: T, state?: boolean }>

export const Order = <T, >({orders, selected, onChange}: OrderProps<T>) => {
    const handleClick = useCallback((order: T) => {
        const option = selected.find(s => s.order === order)
        if (!option) {
            onChange([...selected, {order, state: true}])
            return
        }
        onChange(option.state ? selected.map(o => o.order === order ? {order, state: false} : o) : selected.filter(s => s.order !== order))
    }, [selected, onChange])

    const options : NamedExd<T>[] = useMemo(() => {
        const options = selected.map(s => s.order)
        const head = selected.map(s => ({name: orders.find(o => o.value === s.order)?.name, value: s})) as NamedExd<T>[]
        const tail = orders.filter(o => !options.includes(o.value)).map(o => ({name: o.name, value: {order: o.value, state: undefined}}))
        return head.concat(tail)
    }, [orders, selected])

    return (
        <S.OrderTab>
            {options.map(o => <OrderOption key={o.name} option={o} onClick={handleClick}/>)}
        </S.OrderTab>
    )
}

interface OrderOptionProps<T> {
    option: NamedExd<T>
    onClick(option: T): void
}

const OrderOption = <T, >({option, onClick}: OrderOptionProps<T>) => {
    const state = option.value.state
    return (
        <S.Order $selected={state !== undefined} onClick={() => onClick(option.value.order)}>
            {option.name}
            {
                state ?
                    <Icon img={"dropdown_arrow"} size={"10px"} fill={"white"} flip={"vertical"}/>
                    : state === false ?
                        <Icon img={"dropdown_arrow"} size={"10px"} fill={"white"}/>
                        : <></>
            }
        </S.Order>
    )
}