import styled, {css} from "styled-components";
import {FlexRow} from "../../widgets/default/Flex.styled";

const TagCloud = styled.div`
  display: flex;
  gap: 0.3em;
  flex-wrap: wrap;
`

const Tag = styled.div<{$selected: boolean, $edit: boolean}>`
  padding: 0 5px;
  background-color: ${({$selected}) => $selected ? "var(--color-yellow)" : "var(--color-turquoise)"};
  border-radius: 3px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.1em;

  > :last-child {
    display: ${({$edit}) => $edit ? 'block' : 'none'};
  }

  ${({$edit}) => !$edit && css`
    &:hover {
      //scale: 1.05;
      box-shadow: 0 0 2px 1px rgba(0,0,0,.2);
    }
  `}
`

const Buttons = styled(FlexRow)`
  justify-content: flex-end;
  gap: 0;
  button {
    font-size: 14px;
    transition: 0.2s;
  }
`

export const Styled = {
    TagCloud,
    Tag,
    Buttons,
}