import { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import axios from 'axios'

import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css';
import UserContext from '../contexts/UserContext'

export default function History() {
    const {user, getTodayHabits} = useContext(UserContext)

    const [date, setDate] = useState(new Date())
    const [days, setDays] = useState([])
    const [dayConcluded, setDayConcluded] = useState([])
    const [dayNotConcluded, setDayNotConcluded] = useState([])

    useEffect(getTodayHabits, [])
    
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily'
        const config = {Authorization: `Bearer ${user.token}`}
        let promise = axios.get(URL, {headers: config})
        promise.then(response => setDays(response.data))
        promise.catch(error => console.log(error.response))
    }, [])

    useEffect(() => {
        const arrayTrue = [] // new array with days concluded 
        const arrayFalse = [] // new array with days not concluded 

        days.forEach(day => {
            let counter = 0
            day.habits.forEach( ({done}) => {
                if (done) {counter++}
            })

            if (counter === day.habits.length) {
                arrayTrue.push(day)
                setDayConcluded(arrayTrue)
            } else {
                arrayFalse.push(day)
                setDayNotConcluded(arrayFalse)
            }
        })
    }, [days])

    function validateDay(date, status) {
        if (status) {
            for (let i = 0; i < dayConcluded.length; i++) {
                if (dayjs(date).format('DD/MM/YYYY') === dayConcluded[i].day) {
                    return true
                }
            }
        } else {
            for (let i = 0; i < dayNotConcluded.length; i++) {
                if (dayjs(date).format('DD/MM/YYYY') === dayNotConcluded[i].day) {
                    return true
                }
            }
        }
    }

    return (
        <Main>
            <h1>History</h1>
            <StyledCalendar 
                value={date} 
                onChange={setDate} 
                minDate={new Date(2022, 2, 1)}
                minDetail='year'
                calendarType='US'
                formatDay={(locate, date) => dayjs(date).format('DD')} 
                formatShortWeekday={(locate, date) => dayjs(date).format('ddd')}
                formatMonthYear={(locate, date) => dayjs(date).format('MMMM YYYY')}

                tileClassName={({date}) => {
                    if (validateDay(date, true)) {
                        return 'true'
                    } else if (validateDay(date, false)) {
                        return 'false'
                    }
                }}
            />
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

const StyledCalendar = styled(Calendar)`
    width: 100%;
    height: 402px;

    margin-top: 15px;
    overflow-y: auto;

    border: none;
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);

    * {
        --concluded: #8CC654;
        --not--concluded: #EA5766;
    }

    // All buttons
    button {
       display: flex;
       align-items: center;
       justify-content: center;
       font-weight: 600;
    }

    // display of the days
    .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 
    }

    // Days
    .react-calendar__tile {
        max-width: initial !important;
        transition: all 0.5s;

        margin: 13px 5px;
        border-radius: 10px;
    }

    // Today
    .react-calendar__tile--now {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 0;
        background: #FFFFA9 !important;
    }
    
    // Weekend
    .react-calendar__month-view__days__day--weekend {
        color: black;
    }

    // Days of another month
    .react-calendar__month-view__days__day--neighboringMonth {
        opacity: 0.7;
        color: #8a8a8a;
    }

    // Selected day
    .react-calendar__tile:focus {
        background: var(--theme--color);
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
    }
    
    // Selected day --unactive
    .react-calendar__tile--active {
        color: black;
        background: var(--theme--color);
        box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
    }

    .true {
        background: var(--concluded);
    }
    .false {
        background: var(--not--concluded);
    }
`
