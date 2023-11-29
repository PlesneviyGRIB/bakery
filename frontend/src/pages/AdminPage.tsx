import React, {FC} from "react";
import {Styled as S} from "./pages.styled";
import {Header} from "../components/Header";
import {Tags} from "../components/tag/Tags";

export const AdminPage: FC = () => {
    return (
        <>
            <Header>
            </Header>
            <S.Body>
                <S.Block>
                    <Tags selectedIds={[]} onChange={() => {
                    }} mode={"edit"}/>
                </S.Block>
            </S.Body>
        </>
    )
}