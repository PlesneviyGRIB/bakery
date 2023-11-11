import React, {CSSProperties, FC, useCallback, useMemo, useState} from "react";
import {ReactComponent as Decoration} from '../ui/pictures/decoration.svg';
import {Property} from "csstype";
import {Tooltip} from "./default/Form";

type Img = 'decoration'

interface IconProps {
    img: Img,
    size?: Property.Width
    flip?: 'horizontal' | 'vertical' | 'both'
    tooltip?: string
    onClick?: () => void
}

export const Icon: FC<IconProps> = ({img, size = "24px", flip, tooltip, onClick}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const element = useMemo(() => {
        const transform = flip && (flip == 'vertical' ? "scaleY(-1)" : flip == 'horizontal' ? "scaleX(-1)" : "scaleX(-1) scaleY(-1)")
        const style: CSSProperties = {
            minWidth: size,
            maxWidth: size,
            aspectRatio: "1/1",
            transform,
            cursor: onClick && "pointer",
            opacity: onClick && !hovered && '0.7' || '1',
            transition: "0.2s"
        }

        switch (img) {
            case "decoration":
                return <Decoration style={style} />
            default:
                return <></>
        }
    }, [img, size, flip, onClick, hovered])

    const icon = useMemo(() => React.cloneElement(element, {
        onClick,
        onMouseLeave:() => setHovered(false),
        onMouseEnter:() => setHovered(true)
    }), [element, onClick])

    return (
        tooltip ?
            <Tooltip text={tooltip}>
                {icon}
            </Tooltip>
            : icon
    )
}