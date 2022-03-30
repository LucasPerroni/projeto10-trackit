import { useLocation } from 'react-router-dom'
import { useContext } from 'react'

import styled from 'styled-components'
import UserContext from '../contexts/UserContext'

export default function Header() {
    const {user} = useContext(UserContext)
    const {pathname} = useLocation()

    return (pathname !== '/' && pathname !== '/signin')  ? (
        <Top>
            <h1>TrackIt</h1>
            <img src={user.image} alt='Profile' />
        </Top>
    ) : (
        <></>
    )
}

// STYLED COMPONENTS
const Top = styled.header`
    height: 70px;
    padding: 0 18px;
    background-color: var(--theme--color--dark);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;

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
