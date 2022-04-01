import { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import dayjs from 'dayjs'
import axios from 'axios'

import styled from 'styled-components'
import 'react-calendar/dist/Calendar.css';
import UserContext from '../contexts/UserContext'

export default function History() {
    const {user, getTodayHabits} = useContext(UserContext)

    const [date, setDate] = useState(new Date()) // date selected
    const [days, setDays] = useState([]) // array with all history of user
    const [dayConcluded, setDayConcluded] = useState([]) // array with days that all habits were concluded
    const [dayNotConcluded, setDayNotConcluded] = useState([]) // array with days that one or more habits wasn't concluded
    // obj with all important information for the habits section
    const [habitsWindow, setHabitsWindow] = useState({show: false, habits: [], day: null}) 

    useEffect(getTodayHabits, []) // update 'todayHabits' array [more info in App.js]
    
    // get history from API
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily'
        const config = {Authorization: `Bearer ${user.token}`}
        let promise = axios.get(URL, {headers: config})
        promise.then(response => setDays(response.data))
        promise.catch(error => console.log(error.response))
    }, [])

    // update 'dayConcluded' and 'dayNotConcluded' arrays when 'day' array changes 
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

    // validate if, in specific day, all habits were concluded or not 
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

    // show or hide section with history of the selected day
    function showHabits(date) {
        let counter = 0
        let day = dayjs(date).format('DD/MM/YYYY')
        days.forEach(habitDay => {
            if (habitDay.day === day) {
                setHabitsWindow({show: true, habits: habitDay.habits, day: day})
                setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 50)
            } else {counter++}
        })
        if (counter === days.length) {setHabitsWindow({show: false})}
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
                onClickDay={date => showHabits(date)}
            />
            {habitsWindow.show ? 
            <Habits habits={habitsWindow.habits} day={habitsWindow.day} /> :
            <></>}
        </Main>
    )
}   

function Habits({habits, day}) {
    function HabitName({name, done}) {
        return (
            <div className={done ? 'Concluded' : 'NotConcluded'}>
                <ion-icon name={done ? 'checkmark-circle' : 'close-circle'}></ion-icon>
                <p>{name}</p>
            </div>
        )
    }

    return (
        <Habit>
            <h1>{day}</h1>
            <div className='wrapper'>
                {habits.map( ({name, done}) => {return (
                    <HabitName key={name} name={name} done={done} />
                )})}
            </div>
        </Habit>
    )
}


// STYLED COMPONENTS
const Main = styled.main`
    width: 90%;
    margin: 98px auto 120px;

    h1 {
        font-size: 23px;
        color: var(--theme--color--dark);
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
const Habit = styled.article`
    width: 80%;

    margin: 15px auto;
    padding: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
    
    border-radius: 10px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
    background-color: #FFFFFF;

    .wrapper {
        width: 100%;

        div {
            display: flex;
            align-items: center;
            margin-top: 15px;

            p {
                max-width: 84%;
                max-height: 18px;

                overflow: hidden;
                margin-left: 10px;

                font-size: 18px;
                color: #666666;
            }

            ion-icon {
                font-size: 24px;
            }
        }
    }

    .Concluded {
        * {color: var(--concluded) !important;}
    }
    .NotConcluded {
        * {color: var(--not--concluded) !important;}
    }
`
