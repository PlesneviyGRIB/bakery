import {useCallback, useEffect, useState} from "react";
import {BaseDto, PageRequestDto, PageResponseDto, ProductFilterDto} from "../../api/rest-client";
import {BarList} from "./BarList";
import {restClient} from "../../api/axios.conf";

interface InfiniteListProps<D, F> {
    filter: F
    fetchData: (pageRequest: PageRequestDto<F>) => Promise<PageResponseDto<D>>
    renderItem: (data: D) => JSX.Element
    onSelectItem: (id: number) => void
}

export const InfiniteList = <D extends BaseDto, F>({filter, fetchData, renderItem, onSelectItem}: InfiniteListProps<D, F>) => {
    const [currentPage, setCurrentPage] = useState<PageResponseDto<D>>({
        list: [],
        page: 0,
        count: 0,
        totalPages: 0,
        totalCount: 0,
    })

    useEffect(() => {
        fetchData({count: 50, page: 0, filter}).then(setCurrentPage)
    }, [fetchData, filter])

    return (
        <BarList<D> list={currentPage.list} onSelectItem={onSelectItem} renderItem={renderItem} perRow={5} />
    )
}