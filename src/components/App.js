import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'

import Header from './Header'
import Login from './Login'
import SignIn from './SignIn'
import Habits from './Habits'
import Today from './Today'
import History from './History'
import Menu from './Menu'

import UserContext from './../contexts/UserContext'

export default function App() {
    // Get 'user' obj from localStorage
    const savedUserString = localStorage.getItem('user')
    let savedUser = JSON.parse(savedUserString)
    if (savedUser === null) {savedUser = {}}

    const [user, setUser] = useState(savedUser) // obj with user main informations
    const [todayHabits, setTodayHabits] = useState([]) // array with all habits of the day

    // update 'todayHabits' array
    function getTodayHabits() {
        let config = {Authorization: `Bearer ${user.token}`}
        let promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', {headers: config})
        promise.then(response => setTodayHabits(response.data))
        promise.catch(e => console.log(e.response))
    }

    return (
        <UserContext.Provider value={{user, setUser, todayHabits, setTodayHabits, getTodayHabits}}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/today" element={<Today />} />
                    <Route path="/history" element={<History />} />
                    <Route path='*' element={<p>This page does not exist</p>} />
                </Routes>
                <Menu />
            </BrowserRouter>
        </UserContext.Provider>
    )
}
