import React, {FC, PropsWithChildren} from "react";
import {Styled as S} from "./../pages/pages.styled";
import {Icon} from "../widgets/Icon";

interface HeaderProps {

}

export const Header: FC<PropsWithChildren<HeaderProps>> = ({children}) => {
    return (
        <S.Header>
            <Icon img={"decoration"} size={"100px"} flip={"horizontal"}/>
            <div style={{width: "100%"}}>
                <S.Pretzel/>
                <S.HeaderArea>
                    {children}
                </S.HeaderArea>
            </div>
            <Icon img={"decoration"} size={"100px"}/>
        </S.Header>
    )
}