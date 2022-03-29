import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import Bunny from './../assets/Images/Bunny.jpg'

export default function Header() {
    const {pathname} = useLocation()

    return (pathname !== '/' && pathname !== '/signin')  ? (
        <Top>
            <h1>TrackIt</h1>
            <img src={Bunny} alt='Profile' />
        </Top>
    ) : (
        <></>
    )
}

const Top = styled.header`
    height: 70px;
    padding: 0 18px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    position: fixed;
    top: 0;
    right: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-family: 'Playball', cursive;
        font-size: 39px;
        color: #FFFFFF;
    }

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`
