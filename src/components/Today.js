import { useEffect, useState, useContext } from "react"
import { ThreeDots } from  'react-loader-spinner'
import dayjs from 'dayjs'
import axios from 'axios'

import styled from 'styled-components'
import UserContext from "../contexts/UserContext"

export default function Today() {
    const {user, todayHabits, setTodayHabits} = useContext(UserContext)

    const [refresh, setRefresh] = useState(false) // refresh API get

    let today = dayjs().format('dddd, DD/MM') // Today date "weekday, day/month"
    const config = {Authorization: `Bearer ${user.token}`} // axios authorization

    // Get habit list from API
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        let promise = axios.get(URL, {headers: config})
        promise.then(response => setTodayHabits(response.data))
        promise.catch(error => console.log(error.response))
    }, [refresh])

    // Show all habits of the day
    function ShowHabits({habit}) {
        const [loading, setLoading] = useState('') // Sending request to API

        const {id, name, done, currentSequence:CS, highestSequence:HS} = habit
        const URL_CHECK = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        const URL_UNCHECK = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`

        // Check or uncheck habit in API
        function attConcluded() {
            setLoading('loading')
            const obj = {id, name, done, currentSequence: CS, highestSequence: HS}
            if (done) {
                let promise = axios.post(URL_UNCHECK, obj, {headers: config})
                promise.then(response => {
                    setRefresh(!refresh)
                })
                promise.catch(error => console.log(error.response))
            } else {
                let promise = axios.post(URL_CHECK, obj, {headers: config})
                promise.then(response => {
                    setRefresh(!refresh)
                })
                promise.catch(error => console.log(error.response))
            }
        }

        let icon = <ion-icon name="checkmark-sharp"></ion-icon>
        let loadingAnimation = <ThreeDots color="#FFFFFF" height={69} width={60} />
        return (
            <Habit>
                <h3>{name}</h3>
                <p>Current sequence: <span className={done ? 'concluded' : ''}>{CS} days</span></p>
                <p>Your max sequence: <span className={(done && CS === HS) ? 'concluded' : ''}>{HS} days</span></p>
                <button 
                    onClick={attConcluded}
                    className={done ? `concluded ${loading}` : `${loading}`}
                >
                    {loading === '' ? icon : loadingAnimation}
                </button>
            </Habit>
        )
    }

    let percentage = todayHabits.length > 0 ? todayHabits.filter(h => h.done).length/todayHabits.length * 100 : 0
    return (
        <Main>
            <h1>{today}</h1>
            {percentage === 0 ? 
            <h2>No habit has been concluded yet</h2> : 
            <h2 className="concluded">{`${percentage.toFixed(0)}% of the habits concluded`}</h2>}
            {todayHabits.map(habit => <ShowHabits key={habit.id} habit={habit} />)}
        </Main>
    )
}


// STYLED COMPONENTS
const Main = styled.main`
    width: 90%;
    margin: 98px auto 115px;

    h1 {
        font-size: 23px;
        color: var(--theme--color--dark);
    }

    h2 {
        font-size: 18px;
        color: var(--habit--pending);
        margin: 5px 0 28px;
    }
    h2.concluded {
        color: var(--habit--concluded);
    }
`
const Habit = styled.article`
    position: relative;
    width: 100%;
    height: 94px;

    margin-bottom: 10px;
    padding: 13px 15px;

    border-radius: 5px;
    background-color: #FFFFFF;

    * {
        color: #666666;
    }

    h3 {
        max-width: 70%;
        max-height: 20px;
        overflow: hidden;

        margin-bottom: 10px;
        font-size: 20px;
    }

    p {
        font-size: 13px;
        margin-bottom: 3px;
    }
    span.concluded {
        color: var(--habit--concluded);
    }

    button {
        position: absolute;
        top: 13px;
        right: 13px;
        
        width: 69px;
        height: 69px;
        cursor: pointer;
        transition: all 0.5s;

        border: 1px solid #E7E7E7;
        border-radius: 5px;
        background-color: #EBEBEB;
    }
    ion-icon {
        font-size: 45px;
        color: #FFFFFF;
    }
    button.concluded {
        background-color: var(--habit--concluded);
    }
    button.loading {
        opacity: 0.7;
    }
`
