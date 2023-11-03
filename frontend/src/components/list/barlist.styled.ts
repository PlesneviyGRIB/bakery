import styled from "styled-components";

const Bar = styled.div`
  border: 1px solid black;
  border-radius: 5%;
  min-width: 160px;
  width: min(100%, 360px);
  aspect-ratio: 1 / 1;
  cursor: pointer;
`

const ListRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  gap: 2%;
`

const List = styled.div`
    padding: 5px 0;
`

export const Styled = {
    Bar,
    ListRow,
    List
}