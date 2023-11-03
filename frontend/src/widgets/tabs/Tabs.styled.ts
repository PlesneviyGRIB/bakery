import styled from "styled-components";
import {FlexRow} from "../default/Flex.styled";
import {TextOverflowEllipsis} from "../default/Form.styled";


const Tabs = styled.div`
  height: 100%;
  border: 1px solid var(--color-turquoise);
  box-sizing: border-box;
  background-color: var(--color-white);
`

const Tab = styled.div`
  height: calc(100% - 40px);
  padding: 20px;
  box-sizing: border-box;
`

const Bookmarks = styled(FlexRow)`
  height: 40px;
  background-color: var(--color-turquoise);
  align-items: end;
  overflow: hidden;
  padding: 0 20px 0 40px;
  gap: 0;
`

const Bookmark = styled.div<{$selected?: boolean, $title: string}>`
  min-width: 80px;
  border-bottom: 30px solid  ${({$selected}) => !$selected ? "var(--color-dark-blue)" : "var(--color-white)"} ;
  border-right: 40px solid transparent;
  border-radius: 10px 0 0 0;
  cursor: pointer;
  flex-grow: ${({$selected}) => $selected ? 3 : 1};
  transition: 0.2s;
  scale: ${({$selected}) => $selected && 1.05};
  position: relative;
  
  &:hover {
    border-bottom-color: ${({$selected}) => !$selected && "var(--color-whitish)"};
    scale: 1.05;
  }

  &:hover:before {
    transition: 0.5s;
    color: black;
  }
  
  &:before {
    content: "${({$title}) => $title}";
    position: absolute;
    translate: 0 6px;
    display: block;
    padding: 0 20px;
    font-size: 18px;
    width: 95%;
    color: ${({$selected}) => !$selected && "var(--color-white)"};
    ${TextOverflowEllipsis}
  }
`

export const Styled = {
    Tabs,
    Tab,
    Bookmarks,
    Bookmark,
}