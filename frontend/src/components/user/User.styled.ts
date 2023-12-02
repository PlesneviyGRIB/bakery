import styled from "styled-components";

const UserMenu = styled.ul`
  background-color: white;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 3px;
  box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
  min-width: 180px;
`

const UserMenuLi = styled.li`
  padding: 5px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  &:hover {
    background-color: var(--color-light-blue);
  }
`

export const Styled = {
    UserMenu,
    UserMenuLi,
}