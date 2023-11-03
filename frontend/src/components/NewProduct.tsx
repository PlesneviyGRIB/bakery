import React, {FC} from "react";
import {Tabs} from "../widgets/tabs/Tabs";
import {Tab} from "../widgets/tabs/Tab";
import {ProductForm} from "../widgets/forms/ProductForm";

interface NewProductProps {

}

export const NewProduct : FC<NewProductProps> = ({}) => {
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