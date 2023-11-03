import styled from "styled-components";
import {FlexColumn, FlexRow} from "../../widgets/default/Flex.styled";
import {FormLabel} from "../../widgets/default/Form";

const Wrapper = styled(FlexColumn)`
  width: clamp(400px, 100%, 600px);
  gap: 5px;
`

const Measure = styled(FormLabel)`
  font-size: 18px;
  width: 80px;
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

export const Styled = {
    Wrapper,
    Measure,
    InputWrapper,
    Row,
    Column,
    Block,
}