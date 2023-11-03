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
  width: 12px;
  aspect-ratio: 1/1;
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
    margin: max(2%, 1px);
    width: calc(50% - max(2%, 1px));
    background-color: var(--color-deep-dark-gray);
    border-radius: 1px;
  }
`

const input = css`
  cursor: auto;
  border-radius: 5px;
  font-size: 14px;
  padding: 10px;
  width: clamp(200px, 100%, 600px);
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
  font-size: 16px;
  background-color: var(--color-white);
  cursor: pointer;
  padding-right: 30px;
  
  &:after{
    content: url(${arrow.toString()});
    transition: 0.2s;
    rotate: ${({$opened}) => !$opened && '90deg'};
    display: block;
    position: absolute;
    scale: 0.2;
    right: -30px;
    top: -34px;
    transform-origin: center;
  }
`

const SelectOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
`

const SelectOption = styled.div<{$selected?:boolean}>`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid;
  border-color: var(--color-dark-gray);
  ${TextOverflowEllipsis};

  background-color: ${({$selected}) => $selected ? "var(--color-light-orange)" : "var(--color-white)"};
  
  &:hover{
    background-color: var(--color-light-orange);
    border-color: var(--color-deep-dark-gray);
  }
`

const Textarea = styled.textarea<{$limit?: number}>`
  ${inputBase};
  ${input};
  height: 100px;
  resize: none;
`

const Wrapper = styled.div`
  padding: 2px;
  max-height: fit-content;
  max-width: fit-content;
`

export const Styled = {
    Checkbox,
    Toggle,
    Input,
    Select,
    SelectOptions,
    SelectOption,
    Textarea,
    Wrapper,
}