import {useEffect, useState} from "react";
import {BaseDto, PageRequestDto, PageResponseDto} from "../../api/rest-client";
import {BarList} from "./BarList";

interface InfiniteListProps<D, F> {
    filter: F
    fetchData: (pageRequest: PageRequestDto<F>) => Promise<PageResponseDto<D>>
    renderItem: (data: D) => JSX.Element
    onSelectItem: (id: number) => void
}

export const InfiniteList = <D extends BaseDto, F>({
                                                       filter,
                                                       fetchData,
                                                       renderItem,
                                                       onSelectItem
                                                   }: InfiniteListProps<D, F>) => {
    const [currentPage, setCurrentPage] = useState<PageResponseDto<D>>({
        list: [],
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        totalCount: 0,
    })

    useEffect(() => {
        fetchData({pageSize: 50, pageNumber: 0, filter}).then(setCurrentPage)
    }, [fetchData, filter])

    return (
        <BarList<D> list={currentPage.list} onSelectItem={onSelectItem} renderItem={renderItem} perRow={5}/>
    )
}