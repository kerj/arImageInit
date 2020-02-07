import styled from 'styled-components';
import CameraEle from 'react-webcam'

export const Snapshot = styled.button`
    border-radius: 50%;
    width: 90px;
    height: 90px;
    padding: 0;
    background: #cb4e4e;
    color: #fff;
    box-shadow: 0 6px #ab3c3c;
    -webkit-transition: none;
    -moz-transition: none;
    transition: none;
    border: none;
    font-family: inherit;
    cursor: pointer;
    display: inline-block;
    margin: 15px 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
`

export const Camera = styled(CameraEle)`

`

export const Sticker = styled.img`
    position: relative;
    height: 29em;
    width: 173px;
    margin-left: 22%;
    margin-top: -157%;
    z-index: 1000;
`