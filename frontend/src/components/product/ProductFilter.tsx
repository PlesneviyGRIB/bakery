import React, {FC, useCallback} from "react";
import {Popover} from "../../widgets/Popover";
import {Icon} from "../../widgets/Icon";
import {ProductCategory, ProductFilterDto} from "../../api/rest-client";
import {Styled as S} from "./ProductForm.styled"
import {Select} from "../../widgets/default/Form";
import {FlexRow} from "../../widgets/default/Flex.styled";
import {Option} from "../../types";
import {Tags} from "../tag/Tags";

interface ProductFilterProps {
    filter: ProductFilterDto

    onChange(filter: ProductFilterDto): void
}

const optionIds: ProductCategory[] = ["COOKIE", "PIE", "MARSHMALLOW"]
const options: Option[] = [{id: 0, title: "Печенье"}, {id: 1, title: "Пироги"}, {id: 2, title: "Зефир"}]

export const ProductFilter: FC<ProductFilterProps> = ({filter, onChange}) => {

    const handleChangeCategory = useCallback((id: number) => onChange({
        ...filter,
        category: optionIds[id]
    }), [filter, onChange])

    const handleChangeTags = useCallback((tagIds: number[]) => onChange({...filter, tagIds}), [filter, onChange])

    const selectedCategoryId = filter.category && optionIds.findIndex(o => o === filter.category)
    const active = !!filter.category || !!filter.tagIds.length

    return (
        <Popover target={<S.Filter $active={active}><Icon img={"filter"} size={"26px"}/></S.Filter>}>
            <S.FilterMenu>
                <FlexRow>
                    <S.Label>Категория</S.Label>
                    <Select options={options} onSelect={handleChangeCategory} selectedId={selectedCategoryId}
                            placeholder={"All"}/>
                </FlexRow>
                <br/>
                <br/>
                <Tags selectedIds={filter.tagIds} onChange={handleChangeTags}/>
            </S.FilterMenu>
        </Popover>
    )
}