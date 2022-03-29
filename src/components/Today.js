import { useLocation } from "react-router-dom"

// import styled from 'styled-components'

export default function Today() {
    const location = useLocation()
    let profile = location.state
    console.log(profile)

    return (
        <></>
    )
}
