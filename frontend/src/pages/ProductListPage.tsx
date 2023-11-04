import React, {FC, useCallback, useState} from "react";
import {Styled as S} from "./pages.styled";
import {NewProduct} from "../components/newProduct/NewProduct";
import {useDialog} from "../hooks/useDialogState";
import {Btn} from "../widgets/default/Btn";
import {InfiniteList} from "../components/list/InfiniteList";
import {ProductDto, ProductFilterDto} from "../api/rest-client";
import {restClient} from "../api/axios.conf";
import {useNavigate} from "react-router-dom";

export const ProductListPage: FC = () => {
    const navigate = useNavigate()

    const [productFilter, setProductFilter] = useState<ProductFilterDto>({category: "COOKIE"})
    const [state, onOpen, onClose] = useDialog()
    const [refresh, setRefresh] = useState<boolean>()

    const handleCreate = useCallback(() => {
        setRefresh(prevState => !prevState)
        onClose()
    }, [onClose])

    const fetchProducts = useCallback((params: any) => restClient.products(params), [refresh])
    const handleSelectProduct = useCallback((id: number) => navigate(`${id}`, {relative: "path"}), [navigate])
    const renderProduct = useCallback((product: ProductDto) =>
        <>
            <div>{product.id}</div>
            <div>{product.discriminator}</div>
        </>
        , [])

    return (
        <>
            <S.Header>
                <S.Pretzel/>
            </S.Header>
            <S.Body>

                <Btn onClick={onOpen}>Новый продукт</Btn>
                {state && <NewProduct onClose={onClose} onCreate={handleCreate}/>}

                <S.Block>
                    <InfiniteList<ProductDto, ProductFilterDto>
                        fetchData={fetchProducts}
                        onSelectItem={handleSelectProduct}
                        filter={productFilter}
                        renderItem={renderProduct}/>
                </S.Block>
            </S.Body>
        </>
    )
}