import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from './Header'
import Login from './Login'
import SignIn from './SignIn'
import Habits from './Habits'
import Today from './Today'
import History from './History'

export default function App() {
    return (
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
        </BrowserRouter>
    )
}
