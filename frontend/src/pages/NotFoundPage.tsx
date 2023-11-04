import React, {FC, useCallback} from "react";
import {Styled as S} from "./pages.styled";
import {useNavigate} from "react-router-dom";

export const NotFoundPage: FC = () => {
    const navigate = useNavigate()
    const handleClick = useCallback(() => navigate("/products"), [navigate])

    return (
        <>
            <S.Header>
                <S.Pretzel/>
            </S.Header>
            <S.Body>
                <S.Block>
                    <h3>Страница не найдена</h3>
                    <br/>
                    <S.Link onClick={handleClick}>Вернуться на главную</S.Link>
                </S.Block>
            </S.Body>
        </>
    )
}