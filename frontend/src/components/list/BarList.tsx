import {useEffect, useMemo} from "react";
import {MatrixReducer} from "../../types";
import {Styled as S} from "./barlist.styled"
import {BaseDto} from "../../api/rest-client";

interface BarListProps<T> {
    list: T[]
    onSelectItem: (id: number) => void
    renderItem: (data: T) => JSX.Element
    perRow: number
}

export const BarList = <T extends BaseDto>({
                                               list,
                                               renderItem,
                                               onSelectItem,
                                               perRow
                                           }: BarListProps<T>): JSX.Element => {
    const matrix: T[][] = useMemo(() => {
        const matrix = list.reduce((p: MatrixReducer<T>, c) =>
                p.current.length === perRow ?
                    {accumulator: [...p.accumulator, p.current], current: [c]}
                    : {accumulator: p.accumulator, current: p.current.concat(c)}
            , {accumulator: [], current: []})
        return [...matrix.accumulator, matrix.current]
    }, [list, perRow])

    return (
        <>
            {matrix.map((row, index) =>
                <S.ListRow key={index}>
                    {row.map(item => <S.Bar key={item.id} onClick={() => onSelectItem(item.id)}>{renderItem(item)}</S.Bar>)}
                </S.ListRow>
            )}
        </>
    )
}
