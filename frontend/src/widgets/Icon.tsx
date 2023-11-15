import React, {CSSProperties, FC, useMemo, useState} from "react";
import {ReactComponent as Decoration} from '../ui/pictures/decoration.svg';
import {ReactComponent as Cookie} from '../ui/pictures/cookie.svg';
import {ReactComponent as Pie} from '../ui/pictures/cake.svg';
import {ReactComponent as Marshmallow} from '../ui/pictures/marshmallow.svg';
import {ReactComponent as DropdownArrow} from '../ui/pictures/dropdown_arrow.svg';
import {Property} from "csstype";
import {Tooltip} from "./default/Form";

type Img = 'decoration' | 'cookie' | 'pie' | 'marshmallow' | 'empty' | "dropdown_arrow"

interface IconProps extends React.SVGProps<SVGSVGElement> {
    img: Img,
    size?: Property.Width
    flip?: 'horizontal' | 'vertical' | 'both'
    tooltip?: string
    onClick?: () => void
}

export const Icon: FC<IconProps> = ({img, size = "24px", flip, tooltip, onClick, ...other}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const element = useMemo(() => {
        const transform = flip && (flip == 'vertical' ? "scaleY(-1)" : flip == 'horizontal' ? "scaleX(-1)" : "scaleX(-1) scaleY(-1)")
        const style: CSSProperties = {
            minWidth: size,
            maxWidth: size,
            minHeight: size,
            maxHeight: size,
            aspectRatio: "1/1",
            transform,
            cursor: onClick && "pointer",
            opacity: onClick && !hovered && '0.7' || '1',
            transition: "0.2s",
        }

        switch (img) {
            case "decoration":
                return <Decoration style={style} />
            case "cookie":
                return <Cookie style={style} />
            case "pie":
                return <Pie style={style} />
            case "marshmallow":
                return <Marshmallow style={style} />
            case "dropdown_arrow":
                return <DropdownArrow style={style} />
            default:
                return <span style={style}/>
        }
    }, [img, size, flip, onClick, hovered])

    const icon = useMemo(() => React.cloneElement(element, {
        onClick,
        onMouseLeave:() => setHovered(false),
        onMouseEnter:() => setHovered(true),
        ...other
    }), [element, onClick, other])

    return (
        tooltip ?
            <Tooltip text={tooltip}>
                {icon}
            </Tooltip>
            : icon
    )
}