import {ProductDto} from "../../api/rest-client";
import {Styled as S} from "./barlist.styled"

interface BarProps<T extends ProductDto> {
    item: T,

    onSelect(id: number): void
}

export const Bar = <T extends ProductDto>({
                                              item,
                                              onSelect
                                          }: BarProps<T>): JSX.Element => {
    return (
        <S.Bar>

        </S.Bar>
    )
}