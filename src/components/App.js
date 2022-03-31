import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useState} from 'react'

import Header from './Header'
import Login from './Login'
import SignIn from './SignIn'
import Habits from './Habits'
import Today from './Today'
import History from './History'
import Menu from './Menu'

import UserContext from './../contexts/UserContext'
import PercentageContext from './../contexts/PercentageContext'

export default function App() {
    // Get 'user' obj from localStorage
    const savedUserString = localStorage.getItem('user')
    let savedUser = JSON.parse(savedUserString)
    if (savedUser === null) {savedUser = {}}

    const [user, setUser] = useState(savedUser)
    const [percentage, setPercentage] = useState(0)

    return (
        <UserContext.Provider value={{user, setUser}}>
            <PercentageContext.Provider value={{percentage, setPercentage}}>
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
            </PercentageContext.Provider>
        </UserContext.Provider>
    )
}
