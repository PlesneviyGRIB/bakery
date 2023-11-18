import styled from "styled-components";

const NewPhotoBlock = styled.div`
  display: flex;
  gap: 2em;
  align-items: center;
  transition: 0.2s;

  & textarea, input {
    opacity: 0.6;
    border-color: var(--color-deep-dark-gray);
  }
  > :last-child {
    display: none;
  }

  &:hover {
    & textarea, input {
      opacity: 1;
      border-color: var(--color-deep-dark-gray);
      box-shadow: none;
    }
    > :last-child {
      display: block;
    }
  }
`

const NewPhoto = styled.img`
  height: 132px;
  width: 132px;
  box-shadow: 0 0 2px 1px rgba(0,0,0,.4);
  object-fit: contain;
  cursor: pointer;
`

const ViewPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ViewPhotoTitle = styled.div`
  position: absolute;
  padding: 40px 60px;
  font-size: 30px;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.01));
  color: white;
`

const ViewPhotoDescription = styled.div`
  position: absolute;
  bottom: 0;
  padding: 40px 60px 20px 60px;
  width: 100%;
  background: linear-gradient(rgba(0,0,0,.01), rgba(0,0,0,.5));
  font-size: 16px;
  color: white;
`

const Cross = styled.div`
  align-self: start;
  padding-top: 5px;
`

export const Styled = {
    NewPhotoBlock,
    NewPhoto,
    Cross,
    ViewPhoto,
    ViewPhotoTitle,
    ViewPhotoDescription,
}