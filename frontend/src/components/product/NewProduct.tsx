import React, {FC, useCallback} from "react";
import {Tabs} from "../../widgets/tabs/Tabs";
import {Tab} from "../../widgets/tabs/Tab";
import {ProductForm} from "./ProductForm";
import {Photo} from "../../types";
import {ProductCategorySelection} from "./ProductCategorySelection";
import {useSessionState} from "../../hooks/useSessionState";
import {Modal} from "../../widgets/modal/Modal";
import {Btn} from "../../widgets/default/Btn";
import {restClient} from "../../api/axios.conf";
import {NewPhoto} from "../photo/NewPhoto";
import {useMemoryState} from "../../hooks/useMemoryState";
import {Styled as S} from "./ProductForm.styled"
import {Icon} from "../../widgets/Icon";
import {Tags} from "../tag/Tags";
import {NewProductDto} from "../../api/rest-client";
import {FlexColumn, Gray} from "../../widgets/default/Flex.styled";
import {IMAGES_COUNT, TAGS_COUNT} from "../../Constants";

interface NewProductProps {
    onClose(): void

    onCreate(): void
}

const newProduct: NewProductDto = {
    discriminator: "COOKIE",
    price: 0,
    count: 1,
    productionTime: 0,
    title: '',
    description: '',
    weight: 0,
    orderAvailable: true,
    tagIds: []
}

export const NewProduct: FC<NewProductProps> = ({onClose, onCreate}) => {
    const [product, setProduct] = useSessionState<NewProductDto>("NewProduct", () => newProduct)
    const [photos, setPhotos] = useMemoryState<Photo[]>("NewProduct", () => [])

    const handleApplyTag = useCallback((tagIds: number[]) => setProduct(prevState => ({
        ...prevState,
        tagIds
    })), [setProduct])

    const createNewProduct = useCallback(() => {
        restClient
            .newProduct(product)
            .then(product => photos.reduce((p, c) => p.then(() => {
                    const {title, description, file} = c
                    const formData = new FormData();
                    formData.append("file", file)
                    return restClient.addProductPhoto(product.id, formData as any, {
                        title,
                        description,
                        isPreview: false
                    })
                }), Promise.resolve()).then(onCreate)
            ).catch(e => {
        })
    }, [product, onCreate, photos])

    return (
        <Modal height={"800px"} width={"min(1000px, 100%)"} hideCross>
            <Tabs>
                <Tab title={"Основные параметры"}>
                    <ProductForm product={product} onChangeProduct={setProduct}/>
                </Tab>
                <Tab title={"Категории и теги"}>
                    <FlexColumn style={{padding: "60px 0 0 0", gap: "1em"}}>
                        <ProductCategorySelection product={product} onChangeProduct={setProduct}/>
                        <br/>
                        <Gray>* От выбранной категории зависят дополнительные параметры товара, а также поиск.</Gray>
                        <Gray>* По тегам можно удобно находить товары.</Gray>
                        <br/>
                        <Tags selectedIds={product.tagIds} onChange={handleApplyTag} mode={'selectImmediate'} limit={TAGS_COUNT}/>
                    </FlexColumn>
                </Tab>
                <Tab title={"Фотографии"}>
                    <NewPhoto photos={photos} onChange={setPhotos} limit={IMAGES_COUNT}/>
                </Tab>
                <Tab title={"Предпросмотр"}>
                    <Btn primary onClick={createNewProduct}>Создать</Btn>
                </Tab>
            </Tabs>
            <S.FinishBtn>
                <Btn style={{width: "240px", height: "45px", paddingRight: "30px"}} secondary onClick={onClose}>
                    <Icon img={"bookmark"}/>
                    Завершить позже
                </Btn>
            </S.FinishBtn>
        </Modal>
    )
}