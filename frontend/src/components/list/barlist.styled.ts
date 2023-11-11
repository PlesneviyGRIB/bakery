import styled from "styled-components";

const Bar = styled.div`
  border: 1px solid black;
  border-radius: 5%;
  min-width: 130px;
  width: min(100%, 360px);
  aspect-ratio: 1 / 1;
  cursor: pointer;
`

const ListRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  overflow: hidden;
  gap: 2%;
`

const PerPowTab = styled.div`
  display: flex;
  width: fit-content;
  padding: 5px;
  gap: 0.5em;
  border-radius: 6px;
  background-color: var(--color-white);
  color: white;
`

const PerPowElement = styled.div<{$selected: boolean}>`
  width: 32px;
  height: 32px;
  background-color: ${({$selected}) => $selected ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)"};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
  
  &:hover{
    background-color: rgba(0,0,0,0.6);
  }
`

const Scrollable = styled.div`
  padding: 12px 0 12px 12px;
  height: 100%;
  overflow: hidden scroll;
`

export const Styled = {
    Bar,
    ListRow,
    PerPowTab,
    PerPowElement,
    Scrollable,
}