import React, {CSSProperties, FC, useMemo, useState} from "react";
import {ReactComponent as Decoration} from '../ui/pictures/decoration.svg';
import {ReactComponent as Cookie} from '../ui/pictures/cookie.svg';
import {ReactComponent as Pie} from '../ui/pictures/cake.svg';
import {ReactComponent as Marshmallow} from '../ui/pictures/marshmallow.svg';
import {ReactComponent as DropdownArrow} from '../ui/pictures/dropdown_arrow.svg';
import {ReactComponent as Clip} from '../ui/pictures/clip.svg';
import {ReactComponent as Cross} from '../ui/pictures/cross.svg';
import {ReactComponent as Filter} from '../ui/pictures/filter.svg';
import {ReactComponent as Bookmark} from '../ui/pictures/bookmark.svg';
import {ReactComponent as Plus} from '../ui/pictures/plus.svg';
import {ReactComponent as Checked} from '../ui/pictures/checked.svg';
import {ReactComponent as Logout} from '../ui/pictures/logout.svg';
import {ReactComponent as Heart} from '../ui/pictures/heart.svg';
import {Property} from "csstype";
import {Tooltip} from "./default/Form";

type Img = 'decoration' | 'cookie' | 'pie' | 'marshmallow' | 'empty' | "dropdown_arrow" | "clip" | "cross" | "filter" | "bookmark" | "plus" | "checked" | "logout" | "heart"

interface IconProps extends React.SVGProps<SVGSVGElement> {
    img: Img,
    size?: Property.Width
    flip?: 'horizontal' | 'vertical' | 'both'
    tooltip?: string
    coloring?: true | 'fill' | 'stroke' | false
    onClick?: () => void
}

export const Icon: FC<IconProps> = ({img, size = "24px", flip, tooltip, coloring = 'stroke', onClick, ...other}) => {
    const [hovered, setHovered] = useState<boolean>(false);

    const element = useMemo(() => {
        const transform = flip && (flip === 'vertical' ? "scaleY(-1)" : flip === 'horizontal' ? "scaleX(-1)" : "scaleX(-1) scaleY(-1)")
        const style: CSSProperties = {
            minWidth: size,
            maxWidth: size,
            minHeight: size,
            maxHeight: size,
            aspectRatio: "1/1",
            transform,
            cursor: onClick && "pointer",
            opacity: (onClick && !hovered && '0.7') || '1',
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
            case "clip":
                return <Clip style={style} />
            case "cross":
                return <Cross style={style} />
            case "filter":
                return <Filter style={style} />
            case "bookmark":
                return <Bookmark style={style} />
            case "plus":
                return <Plus style={style} />
            case "checked":
                return <Checked style={style} />
            case "logout":
                return <Logout style={style} />
            case "heart":
                return <Heart style={style} />
            default:
                return <span style={style}/>
        }
    }, [img, size, flip, onClick, hovered])

    const icon = useMemo(() => React.cloneElement(element, {
        'coloring': `${coloring}`,
        onClick,
        onMouseLeave:() => setHovered(false),
        onMouseEnter:() => setHovered(true),
        ...other,
    }), [element, coloring, onClick, other])

    return (
        tooltip ?
            <Tooltip text={tooltip}>
                {icon}
            </Tooltip>
            : icon
    )
}