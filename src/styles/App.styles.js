import styled from 'styled-components';


export const Canvas = styled.canvas`
`

export const App = styled.div`

`

export const HiddenImg = styled.img`
  display: none;
`

export const Sticker = styled.img`
  position: relative;
  width: 173px;
  -moz-transform: ${props => 'translate(' + props.xPos + 'px, ' + props.yPos + 'px)'};
  -webkit-transform: ${props => 'translate(' + props.xPos + 'px, ' + props.yPos + 'px)'};
  -o-transform: ${props => 'translate(' + props.xPos + 'px, ' + props.yPos + 'px)'};
  -ms-transform: ${props => 'translate(' + props.xPos + 'px, ' + props.yPos + 'px)'};
  transform: ${props => 'translate(' + props.xPos + 'px, ' + props.yPos + 'px)'};
`
