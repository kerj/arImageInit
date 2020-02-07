import styled from 'styled-components';


export const Canvas = styled.canvas`
  background-image: url(${props => props.background});
  background-position: 5% 5%;
  background-repeat: no-repeat;
`

export const App = styled.div`
  display: flex;
  flex-direction: row;
`

export const HiddenImg = styled.img`
  transform: translate3d(-50vw, 34vh, 0px);
  display: none;
  width: 50px;
`