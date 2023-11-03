import React, {FC} from "react";
import {Tabs} from "../../widgets/tabs/Tabs";
import {Tab} from "../../widgets/tabs/Tab";
import {ProductForm} from "./ProductForm";
import {GeneralProduct} from "../../types";
import {ProductCategorySelection} from "./ProductCategorySelection";
import {useSessionState} from "../../hooks/useSessionState";

interface NewProductProps {

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

export const NewProduct: FC<NewProductProps> = ({}) => {
    const [product, setProduct] = useSessionState<GeneralProduct>("NewProduct", () => newProduct)

    return (
        <Tabs>
            <Tab title={"Основные параметры"}>
                <ProductForm product={product} onChangeProduct={setProduct}/>
            </Tab>
            <Tab title={"Категории"}>
                <ProductCategorySelection product={product} onChangeProduct={setProduct}/>
            </Tab>
            <Tab title={"Теги"}></Tab>
            <Tab title={"Фотографии"}>third</Tab>
            <Tab title={"Предпросмотр"}>434q</Tab>
        </Tabs>
    )
}