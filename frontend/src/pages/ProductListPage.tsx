import React, {FC, useCallback, useState} from "react";
import {Styled as S} from "./pages.styled";
import {NewProduct} from "../components/newProduct/NewProduct";
import {useDialog} from "../hooks/useDialogState";
import {Btn} from "../widgets/default/Btn";
import {InfiniteList} from "../components/list/InfiniteList";
import {ProductDto, ProductFilterDto} from "../api/rest-client";
import {restClient} from "../api/axios.conf";
import {useNavigate} from "react-router-dom";
import {PerRow} from "../components/list/PerRow";
import {useSessionState} from "../hooks/useSessionState";
import {FlexColumn, FlexRow} from "../widgets/default/Flex.styled";

const page = {
    perRowOptions: [3, 4, 5, 6]
}

type ProductListPageState = {
    filter: ProductFilterDto,
    perRow: number
}

export const ProductListPage: FC = () => {
    const navigate = useNavigate()

    const [pageState, setPageState] = useSessionState<ProductListPageState>("ProductListPage", {
        filter: {category: "COOKIE"},
        perRow: 5
    })
    const [state, onOpen, onClose] = useDialog()
    const [refresh, setRefresh] = useState<boolean>()

    const handleCreate = useCallback(() => {
        setRefresh(prevState => !prevState)
        onClose()
    }, [onClose])

    const fetchProducts = useCallback((params: any) => restClient.products(params), [refresh])
    const handleSelectProduct = useCallback((id: number) => navigate(`${id}`, {relative: "path"}), [navigate])
    const handleChangePerRow = useCallback((perRow: number) => setPageState(prevState => ({
        ...prevState,
        perRow
    })), [setPageState])

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
                <Btn onClick={onOpen}>Новый продукт</Btn>
            </S.Header>
            <S.Body>
                <FlexColumn>
                    <FlexRow $justifyContent={"flex-end"}>
                        <PerRow options={page.perRowOptions} onChange={handleChangePerRow} value={pageState.perRow}/>
                    </FlexRow>
                    <S.Block $padding={"0"} style={{height: "700px", overflow: "hidden"}}>
                        <InfiniteList<ProductDto, ProductFilterDto>
                            fetchData={fetchProducts}
                            onSelectItem={handleSelectProduct}
                            filter={pageState.filter}
                            renderItem={renderProduct}
                            perRow={pageState.perRow}
                        />
                    </S.Block>
                </FlexColumn>
            </S.Body>
            {state && <NewProduct onClose={onClose} onCreate={handleCreate}/>}
        </>
    )
}