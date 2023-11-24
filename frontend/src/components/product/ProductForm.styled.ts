import styled from "styled-components";
import {FlexColumn, FlexRow} from "../../widgets/default/Flex.styled";
import {FormLabel} from "../../widgets/default/Form";

const Wrapper = styled(FlexColumn)`
  width: clamp(400px, 100%, 600px);
  gap: 5px;
`

const Measure = styled(FormLabel)`
  width: 80px;
  min-width: 80px;
`

const InputWrapper = styled.div`
  width: 100px;
`

const Row = styled(FlexRow)`
  padding: 5px;
  justify-content: flex-end;
`

const Column = styled(FlexColumn)`
  padding: 5px;
  gap: 0
`

const Block = styled.div`
  padding: 10px;
`

const Category = styled.div<{$selected?: boolean}>`
  width: 120px;
  aspect-ratio: 1/1;
  border-radius: 20%;
  cursor: pointer;
  box-shadow: ${({$selected}) => $selected ? "0 0 10px 1px goldenrod" : "0 0 5px 1px  var(--color-light-gray)"};
  background-color: ${({$selected}) => $selected && "rgba(247, 255, 0, 0.64)"};
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 0 0 10px 1px var(--color-deep-dark-gray);
  }
`

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  width: fit-content;
`

const Header = styled.h1`
  font-weight: normal;
  width: fit-content;
  margin: 40px 0 20px 0;
`

const Filter = styled.div<{$active: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 36px;
  height: 36px;
  transition: 0.2s;
  background-color: ${({$active}) => $active ? "var(--color-light-blue)" : "white"};
  border-radius: 5px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .2);
`

const FilterMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  background-color: white;
  width: 400px;
  box-shadow: 0 0 5px 1px rgba(0,0,0,.2);
  border-radius: 5px;
`

const Label = styled.div`
  width: 180px;
  font-size: 14px;
`

const FinishBtn = styled.div`
  position: absolute;
  bottom: -50px;
  right: 0;
`

export const Styled = {
    Wrapper,
    Measure,
    InputWrapper,
    Row,
    Column,
    Block,
    Category,
    FlexContainer,
    Header,
    Filter,
    FilterMenu,
    Label,
    FinishBtn,
}