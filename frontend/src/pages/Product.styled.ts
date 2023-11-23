import styled from "styled-components";
import {FlexColumn} from "../widgets/default/Flex.styled";
import {TextOverflowEllipsis} from "../widgets/default/Form.styled";

const BarImage = styled.img`
  position: absolute;
  border-radius: 5%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const BarProduct = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const BarIcon = styled.div`
  position: absolute;
  right: 0;
  transform: translateX(25%) translateY(-25%);
  width: min(20%, 45px);
  min-width: 30px;
  height: min(20%, 45px);
  min-height: 30px;
  z-index: 1;
`

const BarText = styled(FlexColumn)`
  justify-content: flex-end;
  height: 100%;
  border-radius: 5%;
  container-type: inline-size;
  overflow: hidden;
  background: linear-gradient(transparent, 90%, rgba(0,0,0,.4));
  transition: 0.5s;
  color: white;
  gap: 0;
  
  > :last-child {
    display: none;
  }
  
  &:hover {
    background:rgba(0,0,0,.4);
    > :last-child {
      display: block;
    }
  }
`

const BarTitle = styled.span`
  font-size: min(8cqw, 20px);
  padding: 5% 5% 5px 5%;
  ${TextOverflowEllipsis}
`

const BarDescription = styled.span`
  flex-grow: 1;
  font-size: min(7cqw, 14px);
  padding: 0 5%;
  max-height: 80%;
  overflow: scroll;
`

export const Styled = {
    BarImage,
    BarProduct,
    BarIcon,
    BarText,
    BarTitle,
    BarDescription,
}