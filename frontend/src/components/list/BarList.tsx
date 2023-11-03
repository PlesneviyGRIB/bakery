import {ProductDto} from "../../api/rest-client";
import {Bar} from "./Bar";
import {useMemo} from "react";
import {MatrixReducer} from "../../types";
import {Styled as S} from "./barlist.styled"

interface BarListProps<T extends ProductDto> {
    list: T[]
    onSelectItem(id: number): void
    perRow: number
}

export const BarList = <T extends ProductDto>({
                                                  list,
                                                  onSelectItem,
                                                  perRow
                                              }: BarListProps<T>): JSX.Element => {
    const matrix : T[][] = useMemo(() => {
        const matrix = list.reduce((p : MatrixReducer<T>, c) =>
                    p.current.length === perRow ?
                        {accumulator: [...p.accumulator, p.current], current: []}
                        : {accumulator: p.accumulator, current: p.current.concat(c)}
                ,{ accumulator:[], current: []})
        return [...matrix.accumulator, matrix.current]
    }, [])

    console.log(matrix)

    return (
        <>
            {matrix.map((row, index) =>
                <S.ListRow key={index}>
                    {row.map(item => <Bar key={item.id} item={item} onSelect={onSelectItem}/>)}
                </S.ListRow>
            )}
        </>
    )
}
