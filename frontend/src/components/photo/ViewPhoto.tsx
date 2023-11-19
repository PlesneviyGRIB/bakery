import React, {FC} from "react";
import {Photo} from "../../types";
import {Modal} from "../../widgets/modal/Modal";
import {Styled as S} from "./photo.styled"

interface ViewPhotoProps {
    photo: Photo

    onClose(): void
}

export const ViewPhoto: FC<ViewPhotoProps> = ({photo, onClose}) => {
    return (
        <Modal height={"80%"} width={"80%"} onClose={onClose} hideCross>
            {photo.title && <S.ViewPhotoTitle>{photo.title}</S.ViewPhotoTitle>}
            <S.ViewPhoto src={photo.src} alt={".."}/>
            {photo.description && <S.ViewPhotoDescription>{photo.description}</S.ViewPhotoDescription>}
        </Modal>
    )
}