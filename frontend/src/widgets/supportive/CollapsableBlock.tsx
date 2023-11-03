import {FC, PropsWithChildren} from "react";
import {FlexRow} from "../default/Flex.styled";
import {Toggle} from "../default/Form";
import {Styled as S} from "./collapsableBlock.styled"

interface CollapsableBlockProps {
    collapsed: boolean,
    onChange(): void
}

export const CollapsableBlock: FC<PropsWithChildren<CollapsableBlockProps>> = ({collapsed, onChange, children}) => {
    return(
        <S.Frame>
            <FlexRow><Toggle size={"normal"} checked={!collapsed} onChange={onChange} /></FlexRow>
            {!collapsed && children}
        </S.Frame>
    )
}