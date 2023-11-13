import React, {FC, PropsWithChildren, useMemo} from "react";
import {ModalBody, ModalButtons, ModalHeader, Styled as S} from "./Modal.styled"
import {Btn} from "../default/Btn";
import {Modal, ModalProps} from "./Modal";

interface DialogProps extends ModalProps {
    title?: string;
    disabled?: boolean
    unmissable?: boolean
    onDecline?: () => void;
    onAccept(): void;
    onClose(): void;
}

export const Dialog: FC<PropsWithChildren<DialogProps>> = ({
                                                               title,
                                                               disabled = false,
                                                               unmissable = false,
                                                               onClose,
                                                               children,
                                                               onDecline,
                                                               onAccept,
                                                               width,
                                                               height,
                                                           }) => {
    const modalProps = useMemo(() => (!unmissable ? {onClose} : {}), [unmissable, onClose])

    return (
        <Modal {...modalProps} width={width} height={height}>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            <S.Hr/>
            <ModalButtons>
                {onDecline && <Btn secondary onClick={onDecline}>Назад</Btn>}
                <Btn primary onClick={onAccept} style={{width: "100px"}} disabled={disabled}>Ок</Btn>
            </ModalButtons>
        </Modal>
    )
}