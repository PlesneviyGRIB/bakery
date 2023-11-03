import {FC} from "react";
import {Styled as S} from "./pages.styled";
import {BarList} from "../components/list/BarList";
import {DateAsNumber, ProductDto} from "../api/rest-client";
import {products} from "../api/testData";

export const MainPage : FC = () => {
    return (
        <>
            <S.Header></S.Header>
            <S.Body>
                <BarList<ProductDto> list={products} perRow={3} onSelectItem={(id) => {}}/>
            </S.Body>
        </>
    )
}