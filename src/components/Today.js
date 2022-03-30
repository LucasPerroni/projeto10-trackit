import { useEffect } from "react"

// import styled from 'styled-components'

export default function Today({attPercentage}) {
    let percentage = 66
    useEffect(() => attPercentage(percentage), [percentage])

    return (
        <></>
    )
}
