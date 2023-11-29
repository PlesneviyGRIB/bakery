import {FC, useCallback} from "react";
import {Styled as S} from "./ProductForm.styled";
import {NewProductDto, ProductCategory} from "../../api/rest-client";
import {Icon} from "../../widgets/Icon";
import {FlexColumn, Gray} from "../../widgets/default/Flex.styled";

interface ProductCategorySelectionProps {
    product: NewProductDto

    onChangeProduct(product: NewProductDto): void
}

const values : { [K in ProductCategory]: string } = {
    "COOKIE": "Печенье",
    "PIE": "Пирог",
    "MARSHMALLOW": "Зефир"
}

export const ProductCategorySelection: FC<ProductCategorySelectionProps> = ({product, onChangeProduct}) => {

    const handleChangeDiscriminator = useCallback((discriminator: ProductCategory) => onChangeProduct({
        ...product,
        discriminator
    }), [onChangeProduct, product])

    return (
        <FlexColumn style={{alignItems: "center"}}>
            <S.Header>{values[product.discriminator]}</S.Header>
            <S.FlexContainer>
                <S.Category onClick={() => handleChangeDiscriminator("COOKIE")}
                            $selected={product.discriminator === "COOKIE"}>
                    <Icon img={"cookie"} size={"80px"}/>
                </S.Category>
                <S.Category onClick={() => handleChangeDiscriminator("PIE")}
                            $selected={product.discriminator === "PIE"}>
                    <Icon img={"pie"} size={"90px"}/>
                </S.Category>
                <S.Category onClick={() => handleChangeDiscriminator("MARSHMALLOW")}
                            $selected={product.discriminator === "MARSHMALLOW"}>
                    <Icon img={"marshmallow"} size={"80px"}/>
                </S.Category>
            </S.FlexContainer>
        </FlexColumn>
    )
}