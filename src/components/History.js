import { useContext, useEffect } from 'react'

import styled from 'styled-components'
import UserContext from '../contexts/UserContext'

export default function History() {
    const {getTodayHabits} = useContext(UserContext)

    useEffect(getTodayHabits, [])

    return (
        <Main>
            <h1>History</h1>
            <p>Soon you'll be able to see your history here!</p>
        </Main>
    )
}


// STYLED COMPONENTS
const Main = styled.main`
    width: 90%;
    margin: 98px auto 100px;

    h1 {
        font-size: 23px;
        color: var(--theme--color--dark);
    }

    p {
        font-size: 18px;
        color: #666666;
        margin: 15px 0;
    }
`
