import styled from "styled-components";
import {TextOverflowEllipsis} from "../default/Form.styled";
import {Property} from "csstype";

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background-color: rgba(0,0,0,.2);
`

const Modal = styled.div<{$height?: Property.Height, $width?: Property.Width}>`
  position: fixed;
  inset: 0;
  margin: auto;
  background-color: var(--color-white);
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 1px var(--color-dark-gray);
  min-width: 500px;
  width: ${({$width}) => $width ? $width : 'min-content'};
  height: ${({$height}) => $height ? $height : 'min-content'};;
`

export const ModalHeader = styled.div`
  text-transform: uppercase;
  background-color: white;
  text-align: center;
  padding: 60px 20px 20px 20px;
  font-size: 30px;
  ${TextOverflowEllipsis};
`

export const ModalBody = styled.div`
  padding: 20px 30px 10px 40px;
  flex: 1 1;
  overflow: scroll;
`

export const ModalButtons = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-end;
  padding: 20px 40px;
  gap: 1em;
`

const Cross = styled.div`
  inset: 40px 20px auto auto;
  position: absolute;
  width: 30px;
  height: 30px;
`

const Hr = styled.hr`
  width: calc(100% - 80px);
  margin: 1em auto 0 auto;
`

export const Styled = {
    ModalBackground,
    Modal,
    Cross,
    Hr,
}