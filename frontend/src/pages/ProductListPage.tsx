import React, {FC, useCallback, useState} from "react";
import {Styled as S} from "./pages.styled";
import {NewProduct} from "../components/newProduct/NewProduct";
import {useDialog} from "../hooks/useDialogState";
import {Btn} from "../widgets/default/Btn";
import {InfiniteList} from "../components/list/InfiniteList";
import {ProductDto, ProductFilterDto} from "../api/rest-client";
import {restClient} from "../api/axios.conf";

export const ProductListPage: FC = () => {
    const [productFilter, setProductFilter] = useState<ProductFilterDto>({category: "COOKIE"})
    const [state, onOpen, onClose] = useDialog()
    const [refresh, setRefresh] = useState<boolean>()

    const handleCreate = useCallback(() => {
        setRefresh(prevState => !prevState)
        onClose()
    }, [onClose])

    const fetchProducts = useCallback((params : any) => restClient.products(params), [refresh])
    const handleSelectProduct = useCallback(() => {}, [])
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

                <InfiniteList<ProductDto, ProductFilterDto>
                    fetchData={fetchProducts}
                    onSelectItem={handleSelectProduct}
                    filter={productFilter}
                    renderItem={renderProduct}/>

            </S.Body>
        </>
    )
}