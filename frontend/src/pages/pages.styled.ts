import styled from "styled-components";
import decoration from "../ui/pictures/decoration.svg"
import pretzel from "../ui/pictures/pretzel.svg"

const Header = styled.div`
  height: var(--header-height);
  background-color: var(--color-light-blue);
  box-shadow: 0 0 5px 1px var(--color-gray-violet);
  position: relative;
  z-index: 1;
  
  &:before {
    content: url("${decoration.toString()}");
    position: absolute;
    transform: scaleX(-1);
    margin: auto 0;
    padding: 20px;
  }
  
  &:after {
    content: url("${decoration.toString()}");
    position: absolute;
    margin: auto 0;
    padding: 20px;
    right: 0;
  }
`

const Pretzel = styled.div`
  content: url("${pretzel.toString()}");
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  width: 30px;
  overflow: visible;
`

const Body = styled.div`
  height: calc(100% - var(--header-height));
  width: 100%;
  background-color: var(--color-whitish);
  overflow: scroll scroll;  
  position: relative;
  box-sizing: border-box;
  padding: 20px 8px 20px 20px;
  
`

const Block = styled.div`
  background-color: var(--color-white);
  padding: 30px;
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

export const Styled = {
    Header,
    Body,
    Pretzel,
    Block,
    Link
}