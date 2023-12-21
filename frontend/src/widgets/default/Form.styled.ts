import styled, {css} from "styled-components";
import checkMark from "../../ui/pictures/checked.svg"
import tilde from "../../ui/pictures/tilde.svg"
import arrow from "../../ui/pictures/dropdown_arrow.svg"

const inputBase = css`
  border: 2px solid var(--color-dark-gray);
  transition: 0.2s;
  cursor: pointer;
  border-radius: 3px;
  box-sizing: border-box;
  display: block;
  margin: 5px 0;

  &:hover {
    border-color: var(--color-deep-dark-gray);
    box-shadow: 0 0 2px 1px var(--color-deep-dark-gray);
  }
`

const Checkbox = styled.div<{ $checked: boolean; $indeterminate: boolean }>`
  ${inputBase};
  box-sizing: unset;
  max-height: 12px;
  max-width: 12px;
  min-width: 12px;
  min-height: 12px;
  border-color: ${({$checked}) => $checked && "var(--color-dark-gray)"};
  position: relative;
  background-color: ${({$checked, $indeterminate}) => ($checked || $indeterminate) && "var(--color-white)"};

  ${({$checked, $indeterminate}) => $checked && (!$indeterminate ?
          css`
            &:before {
              content: url(${checkMark.toString()});
              position: absolute;
              scale: 0.16;
              width: 0;
              height: 0;
              top: -4px;
            }
          ` :
          css`
            &:before {
              content: url(${tilde.toString()});
              position: absolute;
              scale: 0.14 0.16;
              width: 0;
              height: 0;
              top: -2.3px;
              left: -1px;
            }
          `)
  }
`

const Toggle = styled.div<{ $checked: boolean, $size: number}>`
  ${inputBase};
  height: ${({$size}) => `${$size}px`};
  aspect-ratio: 2/1 !important;
  border-color: ${({$checked}) => $checked && "var(--color-dark-gray)"};
  background-color: ${({$checked}) => $checked && "var(--color-white)"};
  display: flex;
  justify-items: center;
  justify-content: ${({$checked}) => $checked ? "flex-end" : "flex-start"};
  
  &:before {
    content: '';
    aspect-ratio: 1/1 !important;
    margin: 1px;
    background-color: var(--color-deep-dark-gray);
    border-radius: 1px;
  }
`

const input = css`
  cursor: auto;
  border-radius: 5px;
  font-size: 14px;
  padding: 10px;
  min-width: 100px;
  width: 100%;
  max-width: 600px;
`

const Input = styled.input<{$limit?: number}>`
  ${inputBase};
  ${input};
  height: 40px;
`

export const TextOverflowEllipsis = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const TextOverflowEllipsisDiv = styled.div`
    ${TextOverflowEllipsis}
`

const Select = styled.div<{$opened: boolean}>`
  ${inputBase};
  ${input};
  height: 40px;
  position: relative;
  background-color: var(--color-white);
  cursor: pointer;
  padding-right: 30px;
  
  &:after{
    content: url(${arrow.toString()});
    transition: 0.2s;
    rotate: ${({$opened}) => !$opened && '90deg'};
    display: block;
    position: absolute;
    scale: 0.16;
    right: -30px;
    top: -34px;
    transform-origin: center;
  }
`

const DropdownOptions = styled.ul`
  width: fit-content;
  min-width: 100px;
  z-index: 1; 
  border-radius: 5px;
  border: 2px solid var(--color-dark-gray);
  overflow: hidden;
  padding: 0;
  
  li:last-child{
    border: none;
  }
`

const SelectOptions = styled(DropdownOptions)`
  width: 100%;
`

const DropdownOption = styled.li<{$selected?:boolean}>`
  padding: 10px 20px;
  border-bottom: 1px solid var(--color-dark-gray);
  background-color: ${({$selected}) => $selected ? "var(--color-light-blue)" : "var(--color-white)"};
  ${TextOverflowEllipsis};
  
  &:hover{
    background-color: var(--color-light-blue);
  }
`

const Textarea = styled.textarea<{$limit?: number}>`
  ${inputBase};
  ${input};
  resize: none;
`

const Tooltip = styled.div`
  padding: 5px 12px;
  border-radius: 10px;
  background-color: var(--color-deep-dark-gray);
  color: var(--color-white);
  font-size: 14px;
  z-index: 2000;
`

const FormLabel = styled.label`
  width: fit-content;
  margin: 0;
  ${TextOverflowEllipsis}
`

const FormGroup = styled.div`
  padding: 10px;
`

export const Styled = {
    Checkbox,
    Toggle,
    Input,
    Select,
    SelectOptions,
    DropdownOptions,
    DropdownOption,
    Textarea,
    Tooltip,
    FormLabel,
    FormGroup,
}