import styled from "styled-components";

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
`

export const Styled = {
    BarImage,
    BarProduct,
    BarIcon,
}