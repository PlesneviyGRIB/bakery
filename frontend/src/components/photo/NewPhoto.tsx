import React, {createRef, FC, useCallback} from "react";
import {Btn} from "../../widgets/default/Btn";
import {Icon} from "../../widgets/Icon";
import {Styled as S} from "./photo.styled"
import {FlexColumn} from "../../widgets/default/Flex.styled";
import {Input, Textarea} from "../../widgets/default/Form";
import {Photo} from "../../types";
import {useDialogState} from "../../hooks/useDialogState";
import {ViewPhoto} from "./ViewPhoto";

interface NewPhotoProps {
    photos: Photo[]
    limit: number
    onChange(photos: Photo[]): void
}

export const NewPhoto: FC<NewPhotoProps> = ({photos, onChange, limit}) => {
    const [state, open, close] = useDialogState<Photo>()
    const ref = createRef<HTMLInputElement>()
    const handleRemove = useCallback((photo: Photo) => onChange(photos.filter(p => p != photo)), [photos, onChange])
    const handleClick = useCallback(() => ref.current?.click(), [ref])
    const processFiles = useCallback(() => {
        const file = ref.current?.files?.item(0)
        if (!file) {
            return
        }
        onChange([...photos, {src: URL.createObjectURL(file), title: "", description: ""}])
    }, [ref, photos, onChange])

    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        photos[index].title = e.target.value
        onChange([...photos])
    }, [photos, onChange])

    const handleChangeDescription = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        photos[index].description = e.target.value
        onChange([...photos])
    }, [photos, onChange])

    return (
        <>
            <FlexColumn $gap={"1.5em"}>
                {
                    photos.map((p, index) =>
                        <S.NewPhotoBlock key={index}>
                            <S.NewPhoto src={p.src} alt={".."} onClick={() => open(p)}/>
                            <FlexColumn style={{width: "600px"}} $gap={"0.5em"}>
                                <Input placeholder={"Название (опционально)"}
                                       onChange={e => handleChangeTitle(e, index)}
                                       value={p.title}
                                />
                                <Textarea placeholder={"Описание (опционально)"}
                                          height={"80px"}
                                          onChange={e => handleChangeDescription(e, index)}
                                          value={p.description}
                                />
                            </FlexColumn>
                            <S.Cross>
                                <Icon img={"cross"} onClick={() => handleRemove(p)}/>
                            </S.Cross>
                        </S.NewPhotoBlock>
                    )
                }
                <Btn secondary style={{maxWidth: "300px"}} onClick={handleClick} disabled={photos.length >= limit}>
                    <Icon img={"clip"} fill={"white"} size={"20"}/>
                    Добавить изображение
                </Btn>
                <input type={"file"} accept={"image/png, image/jpeg"} style={{display: "none"}} ref={ref}
                       onChange={processFiles}/>
            </FlexColumn>
            {state && <ViewPhoto photo={state} onClose={close}/>}
        </>
    )
}