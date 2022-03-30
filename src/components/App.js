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

export default function App() {
    const [user, setUser] = useState({})
    const [percentage, setPercentage] = useState(0)

    return (
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/today" element={<Today attPercentage={p => setPercentage(p)} />} />
                    <Route path="/history" element={<History />} />
                    <Route path='*' element={<p>This page does not exist</p>} />
                </Routes>
                <Menu percentage={percentage} />
            </BrowserRouter>
        </UserContext.Provider>
    )
}
