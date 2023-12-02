import React, {FC, useCallback, useEffect, useState} from "react";
import {Styled as S} from "./pages.styled";
import {useParams} from "react-router-dom";
import {Header} from "../components/Header";
import {restClient} from "../api/axios.conf";
import {ProductDto} from "../api/rest-client";
import {Btn} from "../widgets/default/Btn";
import {useAppNavigation} from "../hooks/useAppNavigation";
import {PagePath} from "../types";
import {FlexColumn, FlexRow} from "../widgets/default/Flex.styled";

export const ProductPage: FC = () => {
    const navigate = useAppNavigation()

    const {productId} = useParams()

    const [product, setProduct] = useState<ProductDto>()

    useEffect(() => {
        if (!productId || !Number.parseInt(`${productId}`)) {
            navigate(PagePath.NOT_FOUND)
            return
        }
        restClient.getProduct(productId).then(setProduct)
    }, [productId, navigate]);

    const handleDelete = useCallback(() => product && restClient.deleteProduct("" + product.id).then(() => navigate(PagePath.PRODUCTS)), [product])

    return (
        <>
            <Header/>
            <S.Body>
                {
                    product &&
                    <FlexColumn>
                        <FlexRow $justifyContent={"flex-end"}><Btn danger onClick={handleDelete}>Удалить</Btn></FlexRow>
                        <S.Block>
                            <FlexRow $justifyContent={"flex-end"} $gap={"0.5em"}>{product.tags.map(t =>
                                <S.Tag key={t.id}>{t.title}</S.Tag>)}</FlexRow>
                            <h2>{product.title}</h2>
                        </S.Block>
                        <FlexRow>
                            <S.Block $grow={3}>
                                {product.description}
                            </S.Block>
                            <S.Block $grow={1}>
                            </S.Block>
                        </FlexRow>
                    </FlexColumn>
                }
            </S.Body>
        </>
    )
}