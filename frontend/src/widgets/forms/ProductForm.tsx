import {ProductDto} from "../../api/rest-client";
import {FC} from "react";
import {Styled as S} from "./ProductForm.styled";
import {Input, Textarea} from "../default/Form";
import {useTranslation} from "react-i18next";

interface ProductFormProps {
    onSave(product: ProductDto): void
}

export const ProductForm: FC<ProductFormProps> = () => {
    const {t} = useTranslation('measure')

    return (
        <S.Wrapper>
            <S.Column>
                <S.Label>Наименование товара</S.Label>
                <Input placeholder={"не более 128 символов"}/>
            </S.Column>
            <S.Column>
                <S.Label>О товаре</S.Label>
                <Textarea placeholder={"не более 2048 символов"} style={{height: "160px"}}/>
            </S.Column>
            <S.Row>
                <S.Label>Стоимость за единицу товара</S.Label>
                <S.InputWrapper>
                    <Input type={"number"} max={50000} min={0} step={50} placeholder={`0-50000`}/>
                </S.InputWrapper>
                <S.Measure>{t('coin')}</S.Measure>
            </S.Row>
            <S.Row>
                <S.Label>Количество единиц <b>в наличии</b></S.Label>
                <S.InputWrapper>
                    <Input type={"number"} max={100} min={0} placeholder={`0-100`}/>
                </S.InputWrapper>
                <S.Measure>шт</S.Measure>
            </S.Row>
            <S.Row>
                <S.Label>Время производства (в часах)</S.Label>
                <S.InputWrapper>
                    <Input type={"number"} max={720} min={1} step={2} placeholder={'0-720'}/>
                </S.InputWrapper>
                <S.Measure>часа(ов)</S.Measure>
            </S.Row>
        </S.Wrapper>
    )
}