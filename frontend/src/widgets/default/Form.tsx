import React, {FC, InputHTMLAttributes, PropsWithChildren, useCallback, useRef, useState} from "react";
import {Styled as S, TextOverflowEllipsisDiv} from "./Form.styled"
import {Interaction, Option} from "../../types";
import {
    arrow,
    autoUpdate,
    flip,
    FloatingArrow,
    offset,
    Placement,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useHover,
    useInteractions,
    useRole
} from "@floating-ui/react";

interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;

    onChange(checked: boolean): void
}

export const Checkbox: FC<CheckboxProps> = ({checked, indeterminate = false, onChange}) => {
    const handleChange = useCallback(() => onChange(indeterminate || !checked), [checked, indeterminate, onChange])
    return (
        <S.Checkbox $checked={checked || indeterminate} $indeterminate={indeterminate} onClick={handleChange}/>
    )
}

interface ToggleProps {
    checked: boolean;
    size?: 'small' | 'normal' | 'big';

    onChange(checked: boolean): void
}

export const Toggle: FC<ToggleProps> = ({checked, size = 'normal', onChange}) => {
    const handleChange = useCallback(() => onChange(!checked), [checked, onChange])
    return (
        <S.Toggle $checked={checked} onClick={handleChange}
                  $size={size === "small" ? 12 : size === "normal" ? 16 : 20}/>
    )
}

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { limit?: number}> = (props) => {
    return (
        <S.Input $limit={props.limit} {...props} />
    )
}

export const Textarea: FC<InputHTMLAttributes<HTMLTextAreaElement> & { limit?: number }> = (props) => {
    return (
        <S.Textarea $limit={props.limit} {...props} />
    )
}

interface SelectProps<T extends Option> {
    options: T[]
    selected?: T

    onSelect(option: T): void
}

export const Select = <T extends Option>({options, selected, onSelect}: SelectProps<T>): JSX.Element => {
    const [opened, setOpened] = useState<boolean>(false)

    const {refs: {setReference, setFloating}, floatingStyles, context} = useFloating({
        open: opened,
        onOpenChange: setOpened,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([click, dismiss]);

    return (
        <S.Select $opened={opened} {...getReferenceProps({ref: setReference})}>
            {selected && <TextOverflowEllipsisDiv>{selected.title}</TextOverflowEllipsisDiv>}
            {
                opened &&
                <S.SelectOptions {...getFloatingProps({ref: setFloating, style: floatingStyles})}>
                    {options.map(o =>
                        <S.DropdownOption key={o.id} $selected={o.id === selected?.id}
                                          onClick={() => onSelect(o)}>{o.title}</S.DropdownOption>
                    )}
                </S.SelectOptions>
            }
        </S.Select>
    )
}

export const DropdownOption: FC<PropsWithChildren> = ({children}) => {
    return (
        <S.DropdownOption>
            {children}
        </S.DropdownOption>
    )
}

interface DropdownMenuProps {
    target: () => JSX.Element
    interaction?: Interaction
    placement?: Placement
}

export const DropdownMenu: FC<PropsWithChildren<DropdownMenuProps>> = ({target, interaction = "click", placement = "bottom-start", children}) => {
    const [opened, setOpened] = useState<boolean>(false)

    const {refs: {setReference, setFloating}, floatingStyles, context} = useFloating({
        open: opened,
        onOpenChange: setOpened,
        placement
    })

    const click = useClick(context)
    const dismiss = useDismiss(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([click, dismiss]);
    const targetElem = target()

    return (
        <>
            {React.cloneElement(targetElem, {...getReferenceProps({ref: setReference, style: {...targetElem.props.style, cursor: 'pointer'}})})}
            {
                opened &&
                <S.DropdownOptions {...getFloatingProps({ref: setFloating, style: floatingStyles})}>
                    {children}
                </S.DropdownOptions>
            }
        </>
    )
}

interface TooltipProps {
    text: string
    children: JSX.Element
}

export const Tooltip: FC<TooltipProps> = (({text, children}) => {
    const [opened, setOpened] = useState<boolean>(false)

    const arrowRef = useRef(null);
    const {refs: {setReference, setFloating}, floatingStyles, context, placement, middlewareData} = useFloating({
        open: opened,
        onOpenChange: setOpened,
        placement: "top",
        middleware: [
            arrow({element: arrowRef}),
            flip(),
            shift({}),
            offset(10),
        ],
        whileElementsMounted: autoUpdate,
    })

    const hover = useHover(context)
    const role = useRole(context, {role: "tooltip"})
    const {getReferenceProps, getFloatingProps} = useInteractions([hover, role])

    const staticSide = {
        top: 'bottom',
        right: 'left',
        bottom: 'top',
        left: 'right',
    }[placement.split('-')[0]] || '';

    const a = middlewareData.arrow;

    return (
        <>
            {React.cloneElement(children, {...getReferenceProps({ref: setReference})})}
            {
                opened &&
                <S.Tooltip {...getFloatingProps({ref: setFloating, style: floatingStyles})}>
                    <FloatingArrow
                        ref={arrowRef}
                        context={context}
                        width={15}
                        tipRadius={1}
                        height={10}
                        fill={"var(--color-deep-dark-gray)"}
                        style={{
                            left: a?.x && `${a.x}px`,
                            top: a?.y && `${a.y}px`,
                            right: '',
                            bottom: '',
                            [staticSide]: '-15px',
                        }}
                    />
                    {text}
                </S.Tooltip>
            }
        </>
    )
})