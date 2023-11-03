import {FC, PropsWithChildren} from "react";
import {Styled as S} from "./Tabs.styled";

interface TabProps{
    title: string
}

export const Tab : FC<PropsWithChildren<TabProps>> = ({title, children}) => {
    return (
        <S.Tab>
            {children}
        </S.Tab>
    )
}