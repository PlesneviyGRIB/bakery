import styled from "styled-components";
import pretzel from "../ui/pictures/pretzel.svg"
import {Property} from "csstype";
import {Input} from "../widgets/default/Form";

const Header = styled.div`
  height: var(--header-height);
  background-color: var(--color-light-blue);
  box-shadow: 0 0 5px 1px rgba(0,0,0,.2);
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding: 0 20px;
`

const HeaderArea = styled.div`
  flex-grow: 1;
  height: 110px;
  padding: 10px 0 20px 0;
`

const Pretzel = styled.div`
  content: url("${pretzel.toString()}");
  margin: 0 auto;
  width: 30px;
`

const Body = styled.div`
  height: calc(100% - var(--header-height));
  width: 100%;
  background-color: var(--color-whitish);
  overflow: scroll scroll;  
  position: relative;
  box-sizing: border-box;
  padding: 20px 8px 8px 20px;
  font-size: 14px;
`

const Block = styled.div<{$padding?: Property.Padding}>`
  background-color: var(--color-white);
  padding: ${({$padding}) => $padding || "20px"};
  border-radius: 20px;
  min-width: fit-content;
`

const Link = styled.div`
  cursor: pointer;
  color: var(--color-light-gray);
  width: fit-content;

  &:hover {
    text-decoration: underline;
    color: var(--color-blue);
  }
`

const Search = styled(Input)`
  max-width: 500px;
  transform: translateY(-6px);
  text-align: center;
`

const HeaderLine = styled.div`
    height: 50%;
`

export const Styled = {
    Header,
    HeaderArea,
    Body,
    Pretzel,
    Block,
    Link,
    HeaderLine,
    Search,
}