import styled from 'styled-components'

export const Preview = styled.div`
  position: relative;
`

export const HiddenImg = styled.img`
  display: none;
`

export const StickerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  top: ${props => props.yPos + 'px'};
  left: ${props => props.xPos + 'px'};
  opacity: ${props => props.show ? 1 : 0};
`

export const Sticker = styled.img`
  position: absolute;
  width: 100%;
  height: auto;
  display: block;
  padding: 0;
  border: 0;
  margin: 0;
`
