import React, {cloneElement, FC, PropsWithChildren, useMemo, useState} from "react";
import {
    autoUpdate,
    flip,
    offset,
    Placement,
    useClick,
    useDismiss,
    useFloating,
    useInteractions
} from "@floating-ui/react";

interface PopoverProps {
    target: JSX.Element
    placement?: Placement
}

export const Popover: FC<PropsWithChildren<PopoverProps>> = ({target, placement = "bottom-start", children}) => {
    const [opened, setOpened] = useState(false)
    const {refs: {setReference, setFloating}, floatingStyles, context} = useFloating({
        open: opened,
        onOpenChange: setOpened,
        placement,
        middleware: [offset(10), flip()],
        whileElementsMounted: autoUpdate,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([click, dismiss])

    return (
        <>
            <div {...getReferenceProps({ref: setReference})}>{target}</div>
            {
                opened &&
                <div {...getFloatingProps({ref: setFloating, style: floatingStyles})}>
                    {children}
                </div>
            }
        </>
    )
}