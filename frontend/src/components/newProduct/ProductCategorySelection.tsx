import {FC, useCallback} from "react";
import {GeneralProduct} from "../../types";
import {Styled as S} from "./ProductForm.styled";
import {Tooltip} from "../../widgets/default/Form";
import {ProductCategory} from "../../api/rest-client";

interface ProductCategorySelectionProps {
    product: GeneralProduct
    onChangeProduct(product: GeneralProduct) : void
}

export const ProductCategorySelection : FC<ProductCategorySelectionProps> = ({product, onChangeProduct}) => {

    const handleChangeDiscriminator = useCallback((discriminator: ProductCategory) => onChangeProduct({...product, discriminator}), [onChangeProduct, product])

    return (
        <>
            <Tooltip text={"От выбранной ратегории зависят дополнительные параметры товара, а также поиск"}>
            <S.Header>{product.discriminator}</S.Header>
            </Tooltip>
            <S.FlexContainer>
                <S.Category onClick={() => handleChangeDiscriminator("COOKIE")} $selected={product.discriminator === "COOKIE"}/>
                <S.Category onClick={() => handleChangeDiscriminator("PIE")} $selected={product.discriminator === "PIE"}/>
                <S.Category onClick={() => handleChangeDiscriminator("MARSHMALLOW")} $selected={product.discriminator === "MARSHMALLOW"}/>
            </S.FlexContainer>
        </>
    )
}