import React, {FC, useCallback} from "react";
import {Styled as S} from "./pages.styled";
import {Header} from "../components/Header";
import {Tags} from "../components/tag/Tags";
import {Btn} from "../widgets/default/Btn";
import {useDialog} from "../hooks/useDialogState";
import {NewProduct} from "../components/product/NewProduct";
import {FlexColumn, FlexRow} from "../widgets/default/Flex.styled";

export const AdminPage: FC = () => {
    const [state, onOpen, onClose] = useDialog()
    const handleCreate = useCallback(() => onClose(), [onClose])

    return (
        <>
            <Header/>
            <S.Body>
                <FlexColumn>
                    <FlexRow $justifyContent={"flex-end"}>
                        <Btn onClick={onOpen} secondary>Новый продукт</Btn>
                    </FlexRow>
                    <S.Block>
                        <Tags selectedIds={[]} onChange={() => {
                        }} mode={"edit"}/>
                    </S.Block>
                </FlexColumn>
            </S.Body>
            {state && <NewProduct onClose={onClose} onCreate={handleCreate}/>}
        </>
    )
}