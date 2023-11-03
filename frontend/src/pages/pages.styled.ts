import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: var(--header-height);
  background-color: var(--color-light-blue);
  box-shadow: 0 0 5px 1px var(--color-gray-violet);
  position: relative;
`

const Body = styled.div`
  height: calc(100% - var(--header-height));
  width: 100%;
  background-color: var(--color-whitish);
  overflow: scroll;
`

export const Styled = {
    Header,
    Body,
}