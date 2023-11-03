import React, {FC} from "react";
import {Styled as S} from "./pages.styled";
import {NewProduct} from "../components/newProduct/NewProduct";
import {useDialog} from "../hooks/useDialogState";
import {Btn} from "../widgets/default/Btn";

export const MainPage: FC = () => {
    const [state, onOpen, onClose] = useDialog()

    return (
        <>
            <S.Header>
                <S.Pretzel/>
            </S.Header>
            <S.Body>
                <Btn onClick={onOpen}>Новый продукт</Btn>
                {state && <NewProduct onClose={onClose}/>}
            </S.Body>
        </>
    )
}