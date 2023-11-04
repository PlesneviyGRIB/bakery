import React, {FC, useEffect} from "react";
import {Styled as S} from "./pages.styled";
import {useNavigate, useParams} from "react-router-dom";

export const ProductPage: FC = () => {
    const navigate = useNavigate()
    const {productId} = useParams()

    useEffect(() => {
        if(!Number.parseInt(`${productId}`)){
            navigate("/")
        }
    }, [productId, navigate]);

    return(
        <>
            <S.Header>
                <S.Pretzel/>
            </S.Header>
            <S.Body>
            </S.Body>
        </>
    )
}