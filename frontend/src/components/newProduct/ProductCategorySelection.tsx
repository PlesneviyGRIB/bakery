import {FC, useCallback} from "react";
import {GeneralProduct} from "../../types";
import {Styled as S} from "./ProductForm.styled";
import {ProductCategory} from "../../api/rest-client";
import {Icon} from "../../widgets/Icon";

interface ProductCategorySelectionProps {
    product: GeneralProduct

    onChangeProduct(product: GeneralProduct): void
}

export const ProductCategorySelection: FC<ProductCategorySelectionProps> = ({product, onChangeProduct}) => {

    const handleChangeDiscriminator = useCallback((discriminator: ProductCategory) => onChangeProduct({...product, discriminator}), [onChangeProduct, product])

    return (
        <>
            <S.Header>{product.discriminator}</S.Header>
            <S.FlexContainer>
                <S.Category onClick={() => handleChangeDiscriminator("COOKIE")}
                            $selected={product.discriminator === "COOKIE"}>
                    <Icon img={"cookie"} size={"100px"}/>
                </S.Category>
                <S.Category onClick={() => handleChangeDiscriminator("PIE")}
                            $selected={product.discriminator === "PIE"}>
                    <Icon img={"pie"} size={"110px"}/>
                </S.Category>
                <S.Category onClick={() => handleChangeDiscriminator("MARSHMALLOW")}
                            $selected={product.discriminator === "MARSHMALLOW"}>
                    <Icon img={"marshmallow"} size={"100px"}/>
                </S.Category>
            </S.FlexContainer>
            <br/>
            <p style={{color: "var(--color-dark-gray)"}}>*От выбранной категории зависят дополнительные параметры
                товара, а также поиск.</p>
        </>
    )
}