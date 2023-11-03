import styled from "styled-components";

const Bar = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  min-width: 200px;
  max-width: 400px;
  min-height: 200px;
  max-height: 200px;
  
  width: 100%;
  height: 100%;
`

const ListRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  gap: 1em;
`

export const Styled = {
    Bar,
    ListRow
}