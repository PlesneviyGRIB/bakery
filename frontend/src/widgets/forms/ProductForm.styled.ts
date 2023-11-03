import styled from "styled-components";
import {FlexColumn, FlexRow} from "../default/Flex.styled";

const Wrapper = styled(FlexColumn)`
  max-width: 500px;
  gap: 5px;
`
const Label = styled.div`
  font-size: 16px;
  width: fit-content;
  padding: 10px;
`

const Measure = styled.div`
  font-size: 22px;
  align-self: center;
  width: 80px;
`

const Row = styled(FlexRow)`
  padding: 5px;
  justify-content: flex-end;
`

const Column = styled(FlexColumn)`
  padding: 5px;
  gap: 0
`

export const Styled = {
    Wrapper,
    Label,
    Measure,
    Row,
    Column,
}