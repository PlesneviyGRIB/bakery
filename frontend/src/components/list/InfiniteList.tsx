import {createRef, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {BaseDto, PageRequestDto, PageResponseDto} from "../../api/rest-client";
import {BarList} from "./BarList";
import {Styled as S} from "./barlist.styled";
import {isInViewport} from "../../Utils";
import {debounce} from "../../App";

interface InfiniteListProps<D, F> {
    filter: F
    fetchData: (pageRequest: PageRequestDto<F>) => Promise<PageResponseDto<D>>
    renderItem: (data: D) => JSX.Element
    onSelectItem: (id: number) => void,
    perRow?: number
    pageSize?: number
}

export const InfiniteList = <D extends BaseDto, F>({
                                                       filter,
                                                       fetchData,
                                                       renderItem,
                                                       onSelectItem,
                                                       perRow = 5,
                                                       pageSize = 30,
                                                   }: InfiniteListProps<D, F>) => {
    const [pages, setPages] = useState<PageResponseDto<D>[]>([])
    const ref = createRef<HTMLDivElement>()
    const list = useMemo(() => pages.flatMap(p => p.list), [pages])

    const fetch = useCallback((filter: F, pages: PageResponseDto<D>[]) => {
        const lastPage = pages.slice(-1)[0] || {pageNumber: -1, totalPages: 1}
        const pageNumber = lastPage.totalPages > lastPage.pageNumber + 1 ? lastPage.pageNumber + 1 : -1
        if(pageNumber != -1) {
            fetchData({pageSize, pageNumber, filter})
                .then(page => setPages(prevState => ([...prevState, page])))
        }
    }, [pageSize])

    const handleScroll = useCallback(debounce(() => {
        const element = ref.current?.querySelector("#scroll_bound")
        if(element && isInViewport(element)){
            fetch(filter, pages)
        }
    }, 50), [ref, filter, pages])

    useEffect(() => {
        fetch(filter, [])
        setPages([])
    }, [filter]);

    return (
        <S.Scrollable ref={ref} onScroll={handleScroll}>
            <BarList<D> list={list} onSelectItem={onSelectItem} renderItem={renderItem} perRow={perRow}/>
            <div id={"scroll_bound"}/>
        </S.Scrollable>
    )
}