import React, {FC} from "react";
import {Tabs} from "../../widgets/tabs/Tabs";
import {Tab} from "../../widgets/tabs/Tab";
import {ProductForm} from "./ProductForm";
import {GeneralProduct} from "../../types";
import {ProductCategorySelection} from "./ProductCategorySelection";
import {useSessionState} from "../../hooks/useSessionState";
import {Modal} from "../../widgets/modal/Modal";
import {Btn} from "../../widgets/default/Btn";

interface NewProductProps {
    onClose(): void
}

const newProduct: GeneralProduct = {
    discriminator: "COOKIE",
    price: 0,
    count: 1,
    productionTime: 0,
    title: '',
    description: '',
    weight: 0,
    orderAvailable: true,
}

export const NewProduct: FC<NewProductProps> = ({onClose}) => {
    const [product, setProduct] = useSessionState<GeneralProduct>("NewProduct", () => newProduct)

    return (
        <Modal height={"800px"} width={"1000px"} onClose={onClose} hideCross>
            <Tabs>
                <Tab title={"Основные параметры"}>
                    <ProductForm product={product} onChangeProduct={setProduct}/>
                </Tab>
                <Tab title={"Категории"}>
                    <ProductCategorySelection product={product} onChangeProduct={setProduct}/>
                </Tab>
                <Tab title={"Теги"}></Tab>
                <Tab title={"Фотографии"}>third</Tab>
                <Tab title={"Предпросмотр"}>
                    <Btn primary>Создать</Btn>
                </Tab>
            </Tabs>
        </Modal>
    )
}