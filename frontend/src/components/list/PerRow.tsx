import {FC} from "react";
import {Styled as S} from "./barlist.styled";

interface PerRowProps {
    options: number[]
    value: number,
    onChange: (perRow: number) => void
}

export const PerRow: FC<PerRowProps> = ({options, value, onChange}) => {
    return (
        <S.PerPowTab>
            {options.map(v => <S.PerPowElement key={v} $selected={v === value} onClick={() => onChange(v)}>{v}</S.PerPowElement>)}
        </S.PerPowTab>
    )
}