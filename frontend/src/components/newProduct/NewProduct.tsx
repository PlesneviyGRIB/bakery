import React, {FC, useState} from "react";
import {Tabs} from "../../widgets/tabs/Tabs";
import {Tab} from "../../widgets/tabs/Tab";
import {ProductForm} from "./ProductForm";
import {GeneralProduct, PartialNewProduct} from "../../types";

interface NewProductProps {

}

const newProduct: PartialNewProduct = {
    price: 0,
    count: 1,
    productionTime: 0,
    title: '',
    description: '',
    weight: 0,
    orderAvailable: true,
}

export const NewProduct: FC<NewProductProps> = ({}) => {
    const [product, setProduct] = useState<GeneralProduct>(() => newProduct)

    return (
        <Tabs>
            <Tab title={"Основные параметры"}>
                <ProductForm product={product} onSave={setProduct}/>
            </Tab>
            <Tab title={"Категории"}>second</Tab>
            <Tab title={"Теги"}></Tab>
            <Tab title={"Фотографии"}>third</Tab>
            <Tab title={"Предпросмотр"}>434q</Tab>
        </Tabs>
    )
}