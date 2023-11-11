import React, {FC, useEffect} from "react";
import {Styled as S} from "./pages.styled";
import {useNavigate, useParams} from "react-router-dom";
import {Header} from "../components/Header";

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
            <Header />
            <S.Body>
            </S.Body>
        </>
    )
}