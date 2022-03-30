// import {useContext} from  'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import styled from 'styled-components'
import 'react-circular-progressbar/dist/styles.css'

export default function Menu() {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    let percentage = 66

    return (pathname !== '/' && pathname !== '/signin') ? (
        <Footer>
            <Link to='/habits' style={{textDecoration: 'none'}}>
                <p>Habits</p>
            </Link>
            <Progressbar onClick={() => navigate('/today')}>
                <CircularProgressbar value={percentage} text={`Today`} background={true} backgroundPadding={6}
                    styles={buildStyles({
                        textSize: '18px',
                        pathColor: '#FFFFFF',
                        textColor: '#FFFFFF',
                        trailColor: 'none',
                        backgroundColor: 'var(--theme--color)',
                    })}
                />
            </Progressbar>
            <Link to='/history' style={{textDecoration: 'none'}}>
                <p>History</p>
            </Link>
        </Footer>
    ) : (
        <></>
    )
}

// STYLED COMPONENTS
const Footer = styled.footer`
    height: 70px;
    background-color: #FFFFFF;
    padding: 0 36px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;

    p {
        font-size: 18px;
        color: var(--theme--color);
    }
`
const Progressbar = styled.div`
    width: 91px;
    height: 91px;

    position: absolute;
    bottom: 10px;
    right: calc((100% - 91px) / 2);

    cursor: pointer;
`