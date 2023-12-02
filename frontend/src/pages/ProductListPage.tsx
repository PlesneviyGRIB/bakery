import React, {ChangeEvent, FC, useCallback, useMemo} from "react";
import {Styled as S} from "./pages.styled";
import {Styled as S1} from "../components/product/Product.styled";
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
import {useDebouncedValue} from "../hooks/useDebouncedValue";
import {ProductFilter} from "../components/product/ProductFilter";
import {Tooltip} from "../widgets/default/Form";

const page = {
    perRowOptions: [3, 4, 5, 6]
}

type ProductListPageState = {
    filter: ProductFilterDto,
    perRow: number
}

const defaultFilter: ProductFilterDto = {keyword: '', order: [], tagIds: []} as any

const orders: Named<ProductOrder>[] = [
    {name: "По названию", value: "TITLE"},
    {name: "По цене", value: "PRICE"},
    {name: "По количеству", value: "COUNT"},
    {name: "По времени производства", value: "PRODUCTION_TIME"},
    {name: "По весу", value: "WEIGHT"},
    {name: "По дате загрузки", value: "CREATION_TIME"},
]

export const ProductListPage: FC = () => {
    const navigate = useNavigate()

    const [pageState, setPageState] = useSessionState<ProductListPageState>("ProductListPage", {
        filter: defaultFilter,
        perRow: 5,
    })

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
    }), [pageState.filter, handleChangeFilter])
    const dropFilters = useCallback(() => handleChangeFilter({...defaultFilter, order: []}), [handleChangeFilter])

    const filtersActive = useMemo(() => JSON.stringify(pageState.filter) !== JSON.stringify(defaultFilter), [pageState.filter])

    const renderProduct = useCallback((product: ProductDto) => {
        return (
            <>
                <S1.BarImage src={product.photos.length ? product.photos[0].src : "/default.png"} alt={".."}/>
                <S1.BarProduct>
                    <S1.BarIcon aria-label={""}>
                        <Icon img={product.discriminator.toString().toLowerCase() as any} size={"100%"}/>
                    </S1.BarIcon>
                    <S1.BarText>
                        <S1.BarTitle>{product.title}</S1.BarTitle>
                        <S1.BarDescription>{product.description}</S1.BarDescription>
                    </S1.BarText>
                </S1.BarProduct>
            </>
        )
    }, [])

    const setKeyword = useCallback((keyword: string) => setPageState(prevState => ({
        ...prevState,
        filter: {...prevState.filter, keyword}
    })), [setPageState])

    const [searchValue, setSearchValue] = useDebouncedValue<string>(pageState.filter.keyword, setKeyword, 800)

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value), [setSearchValue])

    return (
        <>
            <Header>
                <FlexRow $justifyContent={"center"} style={{gap: 0}}>
                    <S.Search placeholder={"Поиск по товарам"} value={searchValue} onChange={handleSearch}/>
                    <S.DropFilters $visible={filtersActive}>
                        <Tooltip text={"Сбросить фильтры"}>
                            <Icon img={"cross"} onClick={dropFilters}/>
                        </Tooltip>
                    </S.DropFilters>
                </FlexRow>
            </Header>
            <S.Body>
                <FlexColumn style={{height: "100%"}}>
                    <FlexRow $justifyContent={"space-between"}>
                        <Order<ProductOrder>
                            orders={orders}
                            selected={pageState.filter.order}
                            onChange={handleChangeOrder}
                        />
                        <FlexRow>
                            <ProductFilter filter={pageState.filter} onChange={handleChangeFilter}/>
                            <PerRow options={page.perRowOptions}
                                    onChange={handleChangePerRow}
                                    value={pageState.perRow}/>
                        </FlexRow>
                    </FlexRow>
                    <S.Block $padding={"0"} style={{overflow: "hidden"}}>
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
        </>
    )
}