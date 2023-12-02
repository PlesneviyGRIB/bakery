import React, {FC, PropsWithChildren, useState} from "react";
import {
    autoUpdate,
    flip,
    offset,
    Placement,
    safePolygon,
    useClick,
    useDismiss,
    useFloating,
    useHover,
    useInteractions
} from "@floating-ui/react";

interface PopoverProps {
    target: JSX.Element
    placement?: Placement
    interaction?: 'click' | 'hover'
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({
                                                                 target,
                                                                 placement = "bottom-start",
                                                                 interaction = 'click',
                                                                 children
                                                             }) => {
    const [opened, setOpened] = useState(false)
    const {refs: {setReference, setFloating}, floatingStyles, context} = useFloating({
        open: opened,
        onOpenChange: setOpened,
        placement,
        middleware: [offset(10), flip()],
        whileElementsMounted: autoUpdate,
    })

    const hover = useHover(context, {handleClose: safePolygon(), enabled: interaction === 'hover'})
    const click = useClick(context, {enabled: interaction === 'click'})
    const dismiss = useDismiss(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([hover, click, dismiss])

    return (
        <>
            <div {...getReferenceProps({ref: setReference})}>{target}</div>
            {
                opened &&
                <div {...getFloatingProps({ref: setFloating, style: {...floatingStyles, zIndex: 1}})}>
                    {children}
                </div>
            }
        </>
    )
}