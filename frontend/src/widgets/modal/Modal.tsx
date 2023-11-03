import React, {FC, PropsWithChildren, useCallback} from "react";
import {Styled as S} from "./Modal.styled";
import {Property} from "csstype";

export interface ModalProps {
    onClose?: () => void
    hideCross?: boolean
    width?: Property.Width
    height?: Property.Height
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({onClose, hideCross, children, height, width}) => {
    const handlePropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])

    return (
        <S.ModalBackground onClick={onClose}>
            <S.Modal onClick={handlePropagation} $height={height} $width={width}>
                {onClose && !hideCross && <S.Cross onClick={onClose}>X</S.Cross>}
                {children}
            </S.Modal>
        </S.ModalBackground>
    )
}