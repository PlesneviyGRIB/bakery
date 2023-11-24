import React, {
    FC,
    InputHTMLAttributes,
    LabelHTMLAttributes,
    PropsWithChildren,
    useCallback,
    useMemo,
    useRef,
    useState
} from "react";
import {Styled as S, TextOverflowEllipsisDiv} from "./Form.styled"
import {Option, Placeholder} from "../../types";
import {
    arrow,
    autoUpdate,
    flip,
    FloatingArrow,
    offset,
    Placement,
    useClick,
    useDismiss,
    useFloating,
    useHover,
    useInteractions,
    useRole
} from "@floating-ui/react";
import {Property} from "csstype";

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

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { limit?: number }> = (props) => {
    return (
        <S.Input $limit={props.limit} {...props} />
    )
}

export const Textarea: FC<InputHTMLAttributes<HTMLTextAreaElement> & {
    limit?: number,
    $height?: Property.Height
}> = (props) => {
    return (
        <S.Textarea $limit={props.limit} {...props} style={{height: props.$height}}/>
    )
}

interface SelectProps {
    options: Option[]
    selectedId?: number
    placeholder?: Placeholder

    onSelect(id: number | undefined): void
}

export const Select: FC<SelectProps> = ({options, selectedId, placeholder, onSelect}): JSX.Element => {
    const [opened, setOpened] = useState<boolean>(false)

    const {refs: {setReference, setFloating}, floatingStyles, context} = useFloating({
        open: opened,
        onOpenChange: setOpened,
    })

    const click = useClick(context)
    const dismiss = useDismiss(context);
    const {getReferenceProps, getFloatingProps} = useInteractions([click, dismiss]);

    const selected = selectedId !== undefined && options.find(o => o.id === selectedId)

    return (
        <S.Select $opened={opened} {...getReferenceProps({ref: setReference})}>
            {(selected || placeholder) &&
                <TextOverflowEllipsisDiv>{selected ? selected.title : placeholder}</TextOverflowEllipsisDiv>}
            {
                opened &&
                <S.SelectOptions {...getFloatingProps({ref: setFloating, style: floatingStyles})}>
                    {placeholder &&
                        <S.DropdownOption $selected={selectedId === undefined} onClick={() => onSelect(undefined)}>
                            {placeholder}
                        </S.DropdownOption>
                    }
                    {options.map(o =>
                        <S.DropdownOption key={o.id}
                                          $selected={o.id === selectedId}
                                          onClick={() => onSelect(o.id)}>
                            {o.title}
                        </S.DropdownOption>
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
    placement?: Placement
}

export const DropdownMenu: FC<PropsWithChildren<DropdownMenuProps>> = ({
                                                                           target,
                                                                           placement = "bottom-start",
                                                                           children
                                                                       }) => {
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
            {React.cloneElement(targetElem, {
                ...getReferenceProps({
                    ref: setReference,
                    style: {...targetElem.props.style, cursor: 'pointer'}
                })
            })}
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
}

export const Tooltip: FC<PropsWithChildren<TooltipProps>> = (({text, children}) => {
    const [opened, setOpened] = useState<boolean>(false)

    const arrowRef = useRef(null);
    const {refs: {setReference, setFloating}, floatingStyles, context, placement, middlewareData} = useFloating({
        open: opened,
        onOpenChange: setOpened,
        placement: "top",
        middleware: [
            arrow({element: arrowRef}),
            flip(),
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

    const child = useMemo(() =>
            <div style={{width: "fit-content", height: "fit-content"}}>
                {children}
            </div>
        , [children])

    return (
        <>
            {React.cloneElement(child, {...getReferenceProps({ref: setReference})})}
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

export const FormGroup: React.FC<PropsWithChildren> = ({children}) => <S.FormGroup>{children}</S.FormGroup>;
export const FormLabel: React.FC<PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>> = (props) =>
    <S.FormLabel {...props} />;
