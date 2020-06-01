import React, { Component } from 'react'
import styled from 'styled-components'


const Squared = styled.a`
    border-radius: 0 !important;
`

export default class FooterNavbar extends Component {

    render() {
        return(
            <ul className="pagination justify-content-center">
                <li className="page-item"><Squared className="page-link bg-dark text-white" href="last">Last</Squared></li>
                <li className="page-item"><Squared className="page-link bg-dark text-white" href="past">Past</Squared></li>
                <li className="page-item"><Squared className="page-link bg-dark text-white" href="itsy">Itsy</Squared></li>
            </ul>
        )
    }

}