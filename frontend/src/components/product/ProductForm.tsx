import React, {ChangeEvent, FC, useCallback} from "react";
import {Styled as S} from "./ProductForm.styled";
import {Checkbox, FormGroup, FormLabel, Input, Textarea, Tooltip} from "../../widgets/default/Form";
import {FlexRow} from "../../widgets/default/Flex.styled";
import {CollapsableBlock} from "../../widgets/supportive/CollapsableBlock";
import {NewProductDto} from "../../api/rest-client";

interface ProductFormProps {
    product: NewProductDto

    onChangeProduct(product: NewProductDto): void
}

export const ProductForm: FC<ProductFormProps> = ({product, onChangeProduct}) => {

    const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => onChangeProduct({
        ...product,
        title: e.target.value
    }), [product, onChangeProduct])
    const handleChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => onChangeProduct({
        ...product,
        description: e.target.value
    }), [product, onChangeProduct])
    const handleChangeProductionTime = useCallback((e: ChangeEvent<HTMLInputElement>) => onChangeProduct({
        ...product,
        productionTime: Number.parseInt(e.target.value)
    }), [product, onChangeProduct])
    const handleChangeProductionWeight = useCallback((e: ChangeEvent<HTMLInputElement>) => onChangeProduct({
        ...product,
        weight: Number.parseInt(e.target.value)
    }), [product, onChangeProduct])
    const handleChangeCount = useCallback((e: ChangeEvent<HTMLInputElement>) => onChangeProduct({
        ...product,
        count: Number.parseInt(e.target.value)
    }), [product, onChangeProduct])
    const handleChangeOrderAvailable = useCallback((state: boolean) => onChangeProduct({
        ...product,
        orderAvailable: state
    }), [product, onChangeProduct])
    const handleChangeCollapseProductionTime = useCallback(() => onChangeProduct({
        ...product,
        productionTime: product.productionTime === undefined ? 0 : undefined as any
    }), [product, onChangeProduct])
    const handleChangeCollapseWeight = useCallback(() => onChangeProduct({
        ...product,
        weight: product.weight === undefined ? 0 : undefined as any
    }), [product, onChangeProduct])

    return (
        <S.Wrapper>
            <FormGroup>
                <FormLabel>Наименование товара</FormLabel>
                <Input placeholder={"не более 128 символов"} value={product.title} onChange={handleChangeTitle}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>О товаре</FormLabel>
                <Textarea placeholder={"не более 8192 символов"} value={product.description} $height={'200px'}
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
                        <Input type={"number"} max={100} min={0} placeholder={`0-1000`} value={product.count}
                               onChange={handleChangeCount}/>
                    </S.InputWrapper>
                    <S.Measure>шт</S.Measure>
                </FlexRow>
                <FlexRow $justifyContent={"flex-end"}>
                    <FormLabel>Возможен заказ</FormLabel>
                    <S.InputWrapper>
                        <Checkbox checked={product.orderAvailable} onChange={handleChangeOrderAvailable}/>
                    </S.InputWrapper>
                    <S.Measure/>
                </FlexRow>
            </S.Block>
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