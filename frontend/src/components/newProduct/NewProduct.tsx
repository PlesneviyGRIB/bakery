import React, {FC, useState} from "react";
import {Tabs} from "../../widgets/tabs/Tabs";
import {Tab} from "../../widgets/tabs/Tab";
import {ProductForm} from "./ProductForm";
import {ProductDto} from "../../api/rest-client";

interface NewProductProps {

}

const newProduct : ProductDto = {
    price: 0

}

export const NewProduct : FC<NewProductProps> = ({}) => {
    const [product, setProduct] = useState<ProductDto>()

    return(
        <Tabs>
            <Tab title={"Основные параметры"}>
                <ProductForm onSave={() => {}}/>
            </Tab>
            <Tab title={"Категории"}>second</Tab>
            <Tab title={"Теги"}></Tab>
            <Tab title={"Фотографии"}>third</Tab>
            <Tab title={"Предпросмотр"}>434q</Tab>
        </Tabs>
    )
}