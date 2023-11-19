import React, {FC, useCallback, useMemo} from "react";
import {Styled as S} from "./pages.styled";
import {Styled as S1} from "./Product.styled";
import {NewProduct} from "../components/newProduct/NewProduct";
import {useDialog} from "../hooks/useDialogState";
import {Btn} from "../widgets/default/Btn";
import {InfiniteList} from "../components/list/InfiniteList";
import {OrderDto, ProductDto, ProductFilterDto, ProductOrder} from "../api/rest-client";
import {restClient} from "../api/axios.conf";
import {useNavigate} from "react-router-dom";
import {PerRow} from "../components/list/PerRow";
import {FlexColumn, FlexRow} from "../widgets/default/Flex.styled";
import {Header} from "../components/Header";
import {Order} from "../components/Order";
import {Named} from "../types";
import {useSessionState} from "../hooks/useSessionState";
import {Icon} from "../widgets/Icon";

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
        filter: {category: "COOKIE", order: []},
        perRow: 5
    })
    const [state, onOpen, onClose] = useDialog()

    const handleCreate = useCallback(() => onClose(), [onClose])
    const fetchProducts = useCallback((params: any) => restClient.products(params), [])
    const handleSelectProduct = useCallback((id: number) => navigate(`${id}`, {relative: "path"}), [navigate])
    const handleChangePerRow = useCallback((perRow: number) => setPageState(prevState => ({
        ...prevState,
        perRow
    })), [setPageState])
    const handleChangeFilter = useCallback((filter: ProductFilterDto) => setPageState(prevState => ({
        ...prevState,
        filter
    })), [setPageState])
    const handleChangeOrder = useCallback((order: OrderDto<ProductOrder>[]) => handleChangeFilter({
        ...pageState.filter,
        order
    }), [pageState.filter])

    const renderProduct = useCallback((product: ProductDto) => {
        return (
            <>
            {product.photos.length > 0 && <S1.BarImage src={product.photos[0].src} alt={".."} />}
                <S1.BarProduct>
                    <S1.BarIcon><Icon img={product.discriminator.toString().toLowerCase() as any} size={"100%"}/></S1.BarIcon>
                    <div>{product.id}</div>
                    <div>{product.discriminator}</div>
                </S1.BarProduct>
            </>
        )
    }, [])

    const orders: Named<ProductOrder>[] = useMemo(() => [
        {name: "По названию", value: "TITLE"},
        {name: "По цене", value: "PRICE"},
        {name: "По количеству", value: "COUNT"},
        {name: "По времени производства", value: "PRODUCTION_TIME"},
        {name: "По весу", value: "WEIGHT"},
        {name: "По дате загрузки", value: "CREATION_TIME"},
    ], [])

    return (
        <>
            <Header>
                <Btn onClick={onOpen}>Новый продукт</Btn>
            </Header>
            <S.Body>
                <FlexColumn>
                    <FlexRow $justifyContent={"space-between"}>
                        <Order<ProductOrder> orders={orders} selected={pageState.filter.order}
                                             onChange={handleChangeOrder}/>
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