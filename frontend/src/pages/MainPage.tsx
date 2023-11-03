import React, {FC} from "react";
import {Styled as S} from "./pages.styled";
import {NewProduct} from "../components/newProduct/NewProduct";

export const MainPage: FC = () => {
    return (
        <>
            <S.Header>
                <S.Pretzel/>
            </S.Header>
            <S.Body>
                <NewProduct/>
            </S.Body>
        </>
    )
}