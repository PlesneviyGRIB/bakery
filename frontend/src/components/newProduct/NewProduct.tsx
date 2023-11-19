import React, {FC, useCallback} from "react";
import {Tabs} from "../../widgets/tabs/Tabs";
import {Tab} from "../../widgets/tabs/Tab";
import {ProductForm} from "./ProductForm";
import {GeneralProduct, Photo} from "../../types";
import {ProductCategorySelection} from "./ProductCategorySelection";
import {useSessionState} from "../../hooks/useSessionState";
import {Modal} from "../../widgets/modal/Modal";
import {Btn} from "../../widgets/default/Btn";
import {restClient} from "../../api/axios.conf";
import {NewPhoto} from "../photo/NewPhoto";
import {useMemoryState} from "../../hooks/useMemoryState";

interface NewProductProps {
    onClose(): void

    onCreate(): void
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

export const NewProduct: FC<NewProductProps> = ({onClose, onCreate}) => {
    const [product, setProduct] = useSessionState<GeneralProduct>("NewProduct", () => newProduct)
    const [photos, setPhotos] = useMemoryState<Photo[]>("NewProduct", () => [])

    const createNewProduct = useCallback(() => {
        restClient
            .newProduct(product)
            .then(product => photos.reduce((p, c) => p.then(() => {
                    const {title, description, file} = c
                    const formData = new FormData();
                    formData.append("file", file)
                    return restClient.addPhoto(product.id, formData as any, {
                        title,
                        description,
                        isPreview: false
                    })
                }), Promise.resolve()).then(onClose)
            )
    }    , [product, onCreate, photos])

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
                <Tab title={"Фотографии"}>
                    <NewPhoto photos={photos} onChange={setPhotos} limit={4}/>
                </Tab>
                <Tab title={"Предпросмотр"}>
                    <Btn primary onClick={createNewProduct}>Создать</Btn>
                </Tab>
            </Tabs>
        </Modal>
    )
}