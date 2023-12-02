import React, {CSSProperties, FC, useCallback, useEffect, useState} from "react";
import {Triangle} from "react-loader-spinner";
import {CSSTransition} from "react-transition-group"
import {Style} from "react-loader-spinner/dist/type";
import {debounce} from "../app/App";

interface LoaderProps {
    show: boolean
    style?: CSSProperties
    size?: number
}

export const Loader: FC<LoaderProps> = ({show, style = {}, size = 40}) => {
    const [visible, setVisible] = useState(false)

    const setDebounced = useCallback(debounce((value: boolean) => setVisible(value), 100), [setVisible])

    useEffect(() => {
        setDebounced(show)
    }, [show, setDebounced]);

    return (
        <CSSTransition in={visible} timeout={300} classNames="loader" unmountOnExit>
            <Triangle height={size} width={size} wrapperStyle={{maxWidth: `${size}px`, maxHeight: `${size}px`, ...(style as unknown as Style)}} color="#3c4245"/>
        </CSSTransition>
    )
}