import { useState } from "react"

import styled from 'styled-components'

export default function Habits() {
    const [add, setAdd] = useState(false)
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

    return (
        <Main>
            <Wrapper>
                <p>My habits</p>
                <button onClick={() => setAdd(true)}><ion-icon name="add-outline"></ion-icon></button>
            </Wrapper>
            {add ? 
            <AddHabit>
                <input type='text' placeholder='habit name'/>
                <div className='Days'>
                    {days.map((day, i) => <button key={`${day} - ${i}`}>{day}</button>)}   
                </div>
                <div className='FinishHabit'>
                    <p onClick={() => setAdd(false)}>Cancel</p>
                    <button>Save</button>
                </div>
            </AddHabit> : 
            <></>}
            <Habit>
                <ion-icon name="trash-outline"></ion-icon>
                <p>Ler 1 capítulo de livro</p>
                <div className='Days'>
                    {days.map((day, i) => <button key={`${day} - ${i}`}>{day}</button>)}   
                </div>
            </Habit>
            <Text>You don't have any habit yet. Add a habit to start the traking!</Text>
        </Main>
    )
}

// STYLED COMPONENTS
const Main = styled.main`
    width: 90%;
    margin: 92px auto 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;


    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 23px;
        color: var(--theme--color--dark);
    }

    button {
        width: 40px;
        height: 35px;
        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        border: none;
        border-radius: 5px;
        background-color: var(--theme--color);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);

        ion-icon {
            font-size: 22px;
            color: #FFFFFF;
        }
    }
`

const AddHabit = styled.article`
    position: relative;
    width: 100%;
    height: 180px;
    margin-bottom: 20px;

    border-radius: 5px;
    background-color: #FFFFFF;

    input {
        display: block;
        width: 90%;
        height: 45px;
        margin: 20px auto 8px;
        padding: 0 11px;

        outline: none;
        border: 1px solid var(--input--placeholder);
        border-radius: 5px;

        font-size: 20px;
    }

    input::placeholder {
        color: var(--input--placeholder);
    }

    input.loading {
        background-color: var(--input--loading);
    }

    .Days {
        width: 90%;
        margin: 0 auto;

        button {
            width: 30px;
            height: 30px;
            margin-right: 4px;

            font-size: 20px;
            color: var(--input--placeholder);
            cursor: pointer;

            border-radius: 5px;
            border: 1px solid var(--input--placeholder);
            background: #FFFFFF;
        }
    }

    .FinishHabit {
        position: absolute;
        bottom: 16px;
        right: 16px;

        display: flex;
        align-items: center;

        * {
            font-size: 16px;
            cursor: pointer;
        }

        p {
            color: var(--theme--color);
            margin-right: 23px;
        }

        button {
            width: 84px;
            height: 35px;

            color: #FFFFFF;

            border: none;
            border-radius: 5px;
            background-color: var(--theme--color);
        }
    }
`

const Habit = styled.article`
    position: relative;
    width: 100%;
    height: 91px;
    margin-bottom: 20px;
    padding: 0 15px;

    border-radius: 5px;
    background-color: #FFFFFF;

    ion-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    * {
        font-size: 20px;
    }

    p {
        margin: 13px 0;
        color: #666666;
    }

    button {
        width: 30px;
        height: 30px;
        margin-right: 4px;

        font-size: 20px;
        color: var(--input--placeholder);
        cursor: pointer;

        border-radius: 5px;
        border: 1px solid var(--input--placeholder);
        background: #FFFFFF;
    }
`

const Text = styled.p`
    font-size: 18px;
    color: #666666;
`
