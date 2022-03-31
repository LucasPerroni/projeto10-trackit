import { useEffect, useState, useContext } from "react"
import dayjs from 'dayjs'
import axios from 'axios'

import styled from 'styled-components'
import UserContext from "../contexts/UserContext"
import PercentageContext from "../contexts/PercentageContext"

export default function Today() {
    const {user} = useContext(UserContext)
    const {percentage, setPercentage} = useContext(PercentageContext)

    const [concluded, setConcluded] = useState(0) // number of habits concluded
    const [refresh, setRefresh] = useState(false) // refresh API get
    const [tasks, setTasks] = useState([]) // list of the habits

    let today = dayjs().format('dddd, DD/MM') // Today date "weekday, day/month"
    const config = {Authorization: `Bearer ${user.token}`} // axios authorization

    // Update percentage when 'concluded' changes
    function attPercentage() {
        if (tasks.length > 0) {setPercentage((concluded / tasks.length) * 100)}
        else {setPercentage(0)}
    }
    useEffect(attPercentage, [concluded])

    // Get habit list from API
    useEffect(() => {
        let counter = 0
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        let promise = axios.get(URL, {headers: config})
        promise.then(response => {
            setTasks(response.data)
            response.data.forEach(task => {
                if (task.done) {counter++}
            })
            setConcluded(counter)
        })
        promise.catch(error => console.log(error.response))
    }, [refresh])

    function ShowTasks({task}) {
        const {id, name, done, currentSequence:CS, highestSequence:HS} = task
        const URL_CHECK = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
        const URL_UNCHECK = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`

        // Check or uncheck habit in API
        function attConcluded() {
            const obj = {id, name, done, currentSequence: CS, highestSequence: HS}
            if (done) {
                let promise = axios.post(URL_UNCHECK, obj, {headers: config})
                promise.then(response => {
                    setRefresh(!refresh)
                    setConcluded(concluded - 1)
                })
                promise.catch(error => console.log(error.response))
            } else {
                let promise = axios.post(URL_CHECK, obj, {headers: config})
                promise.then(response => {
                    setRefresh(!refresh)
                    setConcluded(concluded + 1)
                })
                promise.catch(error => console.log(error.response))
            }
        }

        return (
            <Task>
                <h3>{name}</h3>
                <p>Current sequence: <span className={done ? 'concluded' : ''}>{CS} days</span></p>
                <p>Your max sequence: <span className={CS === HS ? 'concluded' : ''}>{HS} days</span></p>
                <button 
                    onClick={attConcluded}
                    className={done ? 'concluded' : ''}
                >
                    <ion-icon name="checkmark-sharp"></ion-icon>
                </button>
            </Task>
        )
    }

    return (
        <Main>
            <h1>{today}</h1>
            {percentage === 0 ? 
            <h2>No habit has been concluded yet</h2> : 
            <h2 className="concluded">{`${percentage.toFixed(0)}% of the habits concluded`}</h2>}
            {tasks.map(task => <ShowTasks key={task.id} task={task} />)}
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
const Task = styled.article`
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
`
