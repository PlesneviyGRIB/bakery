import React, {ChangeEvent, FC, useCallback} from "react";
import {Styled as S} from "./ProductForm.styled";
import {Checkbox, FormGroup, FormLabel, Input, Textarea, Tooltip} from "../../widgets/default/Form";
import {GeneralProduct, PartialNewProduct} from "../../types";
import {FlexRow} from "../../widgets/default/Flex.styled";
import {CollapsableBlock} from "../../widgets/supportive/CollapsableBlock";

interface ProductFormProps {
    product: PartialNewProduct

    onSave(product: GeneralProduct): void
}

export const ProductForm: FC<ProductFormProps> = ({product, onSave}) => {

    const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => onSave({
        ...product,
        title: e.target.value
    }), [product, onSave])
    const handleChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => onSave({
        ...product,
        description: e.target.value
    }), [product, onSave])
    const handleChangeProductionTime = useCallback((e: ChangeEvent<HTMLInputElement>) => onSave({
        ...product,
        productionTime: Number.parseInt(e.target.value)
    }), [product, onSave])
    const handleChangeProductionWeight = useCallback((e: ChangeEvent<HTMLInputElement>) => onSave({
        ...product,
        weight: Number.parseInt(e.target.value)
    }), [product, onSave])
    const handleChangeCount = useCallback((e: ChangeEvent<HTMLInputElement>) => onSave({
        ...product,
        count: Number.parseInt(e.target.value)
    }), [product, onSave])
    const handleChangeOrderAvailable = useCallback((state: boolean) => onSave({
        ...product,
        orderAvailable: state
    }), [product, onSave])
    const handleChangeCollapseProductionTime = useCallback(() => onSave({
        ...product,
        productionTime: product.productionTime === undefined ? 0 : undefined
    }), [product, onSave])
    const handleChangeCollapseWeight = useCallback(() => onSave({
        ...product,
        weight: product.weight === undefined ? 0 : undefined
    }), [product, onSave])

    return (
        <S.Wrapper>
            <FormGroup>
                <FormLabel>Наименование товара</FormLabel>
                <Input placeholder={"не более 128 символов"} value={product.title} onChange={handleChangeTitle}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>О товаре</FormLabel>
                <Textarea placeholder={"не более 2048 символов"} value={product.description} $height={'200px'}
                          onChange={handleChangeDescription}/>
            </FormGroup>
            <S.Block>
                <FlexRow $justifyContent={"flex-end"}>
                    <FormLabel>Стоимость за единицу товара</FormLabel>
                    <S.InputWrapper>
                        <Input type={"number"} max={50000} min={0} step={50} placeholder={`0-50000`}/>
                    </S.InputWrapper>
                    <S.Measure>₽</S.Measure>
                </FlexRow>
                <FlexRow $justifyContent={"flex-end"}>
                    <FormLabel>Количество единиц <b>в наличии</b></FormLabel>
                    <S.InputWrapper>
                        <Input type={"number"} max={100} min={0} placeholder={`0-100`} value={product.count}
                               onChange={handleChangeCount}/>
                    </S.InputWrapper>
                    <S.Measure>шт</S.Measure>
                </FlexRow>
            </S.Block>
            <FlexRow>
                <FormLabel>
                    Возможен заказ
                </FormLabel>
                <Checkbox checked={product.orderAvailable} onChange={handleChangeOrderAvailable}/>
            </FlexRow>

            <CollapsableBlock collapsed={product.productionTime === undefined}
                              onChange={handleChangeCollapseProductionTime}>
                <FlexRow $justifyContent={"flex-end"}>
                    <FormLabel>Время производства</FormLabel>
                    <Tooltip
                        text={"Укажите, сколько времени необходимо на производство товара. (Помогает определить, готов ли покупатель ждать, если товара нет в наличии)"}>
                        <S.InputWrapper>
                            <Input type={"number"} max={720} min={1} step={2} placeholder={'0-720'}
                                   value={product.productionTime} onChange={handleChangeProductionTime}/>
                        </S.InputWrapper>
                    </Tooltip>
                    <S.Measure>часа(ов)</S.Measure>
                </FlexRow>
            </CollapsableBlock>
            <CollapsableBlock collapsed={product.weight === undefined} onChange={handleChangeCollapseWeight}>
                <FlexRow $justifyContent={"flex-end"}>
                    <FormLabel>Вес товара</FormLabel>
                    <S.InputWrapper>
                        <Input type={"number"} max={10000} min={0} step={100} placeholder={'0-10000'}
                               value={product.weight} onChange={handleChangeProductionWeight}/>
                    </S.InputWrapper>
                    <S.Measure>гр</S.Measure>
                </FlexRow>
            </CollapsableBlock>
        </S.Wrapper>
    )
}