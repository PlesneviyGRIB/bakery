import styled from "styled-components";
import {TextOverflowEllipsis} from "../widgets/default/Form.styled";

const Order = styled.div<{$selected: boolean}>`
  background-color: ${({$selected}) => $selected ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)"};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  padding: 4px 8px ;
  gap: 0.5em;
  ${TextOverflowEllipsis}
  &:hover{
    background-color: rgba(0,0,0,0.6);
  }
`

const OrderTab  = styled.div`
  display: flex;
  width: fit-content;
  padding: 5px;
  gap: 0.5em;
  border-radius: 5px;
  background-color: var(--color-white);
  color: white;
`

const Popover = styled.div`
  background-color: white;
  padding: 10px;
`

export const Styled = {
    Order,
    OrderTab,
    Popover,
}