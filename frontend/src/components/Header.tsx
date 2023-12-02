import React, {FC, PropsWithChildren} from "react";
import {Styled as S} from "./../pages/pages.styled";
import {Icon} from "../widgets/Icon";
import {FlexGrow, FlexRow} from "../widgets/default/Flex.styled";
import {PageRoutes} from "./PageRoutes";
import {UserMenu} from "./user/UserMenu";

interface HeaderProps {

}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({children}) => {
    return (
        <S.Header>
            <Icon img={"decoration"} size={"100px"} flip={"horizontal"}/>
            <FlexGrow>
                <S.Pretzel/>
                <S.HeaderArea>
                    <FlexRow $justifyContent={"space-between"}>
                        <PageRoutes/>
                        <UserMenu/>
                    </FlexRow>
                    {children}
                </S.HeaderArea>
            </FlexGrow>
            <Icon img={"decoration"} size={"100px"}/>
        </S.Header>
    )
}