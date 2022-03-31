import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from  'react-loader-spinner'
import axios from 'axios'

import styled from 'styled-components'
import Logo from './../assets/Images/Logo.jpg'
import UserContext from '../contexts/UserContext'

export default function Login() {
    const {user, setUser} = useContext(UserContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false) // Loading API or not
    const [valid, setValid] = useState(true) // API post status
    const inputs = [ // Array with all inputs
        {type: 'email', placeholder: 'email'}, 
        {type: 'password', placeholder: 'password'}
    ]

    // Skip the login if 'user' obj already exists
    function skipLogin() {
        if (user.name) {
            const skipLogin = window.confirm(`We already saved "${user.name}" login, do you want to skip the login?`)
            if (skipLogin) {navigate('/today')}
        }
    }
    useEffect(() => {
        setTimeout(skipLogin, 500)
    }, [])

    // Post LogIn obj in API
    function submitForm(event) {
        event.preventDefault()
        setLoading(true)

        let promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', {
            email: event.target[0].value,
            password: event.target[1].value
        })
        promise.then(response => {
            setUser(response.data)

            const userString = JSON.stringify(response.data)
            localStorage.setItem('user', userString)

            navigate('/today')
        })
        promise.catch(error => {
            console.log(error.response)
            setLoading(false)
            setValid(false)
        })
    }

    let loadingAnimation = <ThreeDots color="#FFFFFF" height={45} width={60} />
    return (
        <Main>
            <img src={Logo} alt='Logo' />
            <h1>TrackIt</h1>
            <form onSubmit={e => submitForm(e)}>
                {inputs.map( ({type, placeholder}) => {return (
                    <input 
                        key={placeholder}
                        type={type} 
                        placeholder={placeholder}
                        className={loading ? 'loading' : ''}
                        disabled={loading ? true : false} 
                        required />
                )})}
                <button 
                    type='submit' 
                    className={loading ? 'loading' : ''}
                    disabled={loading ? true : false}
                    style={loading ? {cursor: 'auto'} : {cursor: 'pointer'}}
                >{loading ? loadingAnimation : 'Enter'}</button>
            </form>
            {valid ? <></> : <p>Failed to Login...</p>}
            <StyledLink to={'/signin'}>
                Don't have an account? Sign in!
            </StyledLink>
        </Main>
    )
}


// STYLED COMPONENTS
const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: #FFFFFF;

    img {
        width: 154px;
        margin-top: 70px;
    }

    h1 {
        font-family: 'Playball', cursive;
        font-size: 70px;
        color: var(--theme--color--dark);
    }

    form {
        width: 80%;
        margin-top: 30px;
    }

    input {
        display: block;
        width: 100%;
        height: 45px;
        margin-bottom: 6px;
        padding: 0 11px;

        outline: none;
        border: 1px solid var(--input--placeholder);
        border-radius: 5px;

        font-size: 20px;
    }
    
    input.loading {
        background-color: var(--input--loading);
    }

    input::placeholder {
        color: var(--input--placeholder);
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 45px;

        border: none;
        border-radius: 5px;
        background-color: var(--theme--color);

        font-size: 20px;
        color: #FFFFFF;
    }

    button.loading {
        opacity: 0.7;
    }
    
    p {
        margin-top: 15px;
        font-size: 24px;
        font-weight: 500;
        color: var(--error);
    }
` 
const StyledLink = styled(Link)`
    color: var(--theme--color);
    margin: 25px 0 100px;
    font-size: 14px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`
