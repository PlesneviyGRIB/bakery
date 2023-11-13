import React, {CSSProperties, FC, useDeferredValue, useMemo} from "react";
import {Triangle} from "react-loader-spinner";
import {CSSTransition} from "react-transition-group"
import {Style} from "react-loader-spinner/dist/type";

interface LoaderProps {
    show: boolean
    style?: CSSProperties
    size?: number
}

export const Loader: FC<LoaderProps> = ({show, style = {}, size = 40}) => {
    const visible = useDeferredValue<boolean>(show)

    return (
        <CSSTransition in={visible} timeout={300} classNames="loader" unmountOnExit>
            <Triangle height={size} width={size} wrapperStyle={{maxWidth: `${size}px`, maxHeight: `${size}px`, ...(style as unknown as Style)}} color="#3c4245"/>
        </CSSTransition>
    )
}