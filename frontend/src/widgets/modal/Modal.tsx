import React, {FC, PropsWithChildren, useCallback} from "react";
import {Styled as S} from "./Modal.styled";
import {Property} from "csstype";
import {Icon} from "../Icon";

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
                {onClose && !hideCross && <Icon img={"cross"}/>}
                {children}
            </S.Modal>
        </S.ModalBackground>
    )
}