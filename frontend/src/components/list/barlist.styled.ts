import styled, {keyframes} from "styled-components";

const Bar = styled.div`
  border-radius: 5%;
  min-width: 130px;
  width: min(100%, 360px);
  aspect-ratio: 1 / 1;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0 10px 1px rgba(0,0,0,.1);
  
  transition: 0.5s;
  
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0,0,0,.4);
    div[aria-label] {
      scale: 1.08;
    }
  }
`

const ListRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 10px;
  gap: 2%;
`

const PerPowTab = styled.div`
  display: flex;
  width: fit-content;
  padding: 5px;
  gap: 0.5em;
  border-radius: 5px;
  background-color: var(--color-white);
  color: white;
`

const PerPowElement = styled.div<{$selected: boolean}>`
  width: 29px;
  height: 29px;
  background-color: ${({$selected}) => $selected ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)"};
  border-radius: 3px;
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