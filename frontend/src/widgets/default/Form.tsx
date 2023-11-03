import {FC, InputHTMLAttributes, useCallback, useState} from "react";
import {Styled as S, TextOverflowEllipsis, TextOverflowEllipsisDiv} from "./Form.styled"
import {Option} from "../../types";
import {useClick, useDismiss, useFloating, useInteractions} from "@floating-ui/react";

interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;

    onChange(checked: boolean): void
}

export const Checkbox: FC<CheckboxProps> = ({checked, indeterminate = false, onChange}) => {
    const handleChange = useCallback(() => onChange(indeterminate || !checked), [checked, indeterminate, onChange])
    return (
        <S.Wrapper>
            <S.Checkbox $checked={checked || indeterminate} $indeterminate={indeterminate} onClick={handleChange}/>
        </S.Wrapper>
    )
}

interface ToggleProps {
    checked: boolean;
    size?: 'normal' | 'big' | 'huge';

    onChange(checked: boolean): void
}

export const Toggle: FC<ToggleProps> = ({checked, size = 'normal', onChange}) => {
    const handleChange = useCallback(() => onChange(!checked), [checked, onChange])
    return (
        <S.Wrapper>
            <S.Toggle $checked={checked} onClick={handleChange}
                      $size={size === "normal" ? 12 : size === "big" ? 16 : 20}/>
        </S.Wrapper>
    )
}

export const Input: FC<InputHTMLAttributes<HTMLInputElement> & { limit?: number }> = (props) => {
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
                        <S.SelectOption key={o.id} $selected={o.id === selected?.id} onClick={() => onSelect(o)}>{o.title}</S.SelectOption>
                    )}
                </S.SelectOptions>
            }
        </S.Select>
    )
}