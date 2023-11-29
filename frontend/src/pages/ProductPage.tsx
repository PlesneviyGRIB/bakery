import React, {FC, useCallback, useEffect, useState} from "react";
import {Styled as S} from "./pages.styled";
import {useParams} from "react-router-dom";
import {Header} from "../components/Header";
import {restClient} from "../api/axios.conf";
import {ProductDto} from "../api/rest-client";
import {Btn} from "../widgets/default/Btn";
import {useAppNavigation} from "../hooks/useAppNavigation";
import {PagePath} from "../types";

export const ProductPage: FC = () => {
    const navigate = useAppNavigation()

    const {productId} = useParams()

    const [product, setProduct] = useState<ProductDto>()

    useEffect(() => {
        if(!productId || !Number.parseInt(`${productId}`)){
            navigate(PagePath.NOT_FOUND)
            return
        }
        restClient.getProduct(productId).then(setProduct)
    }, [productId, navigate]);

    const handleDelete = useCallback(() => product && restClient.deleteProduct("" + product.id).then(() => navigate(PagePath.PRODUCTS)), [product])

    return(
        <>
            <Header>
                <Btn danger onClick={handleDelete}>Удалить</Btn>
            </Header>
            <S.Body>
                {
                    product &&
                    <>
                        <S.Block>
                            <b>{product.title}</b>
                        </S.Block>
                    </>
                }
            </S.Body>
        </>
    )
}