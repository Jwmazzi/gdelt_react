import React, { Component } from 'react'
import styled from 'styled-components'


const SquareLi = styled.div`
    border-radius:none !important;
    margin-top: 200px
`

export default class FooterNavbar extends Component {

    render() {
        return(
            <ul class="pagination justify-content-center">
                <SquareLi class="page-item"><a class="page-link" href="last">Last</a></SquareLi>
                <SquareLi class="page-item"><a class="page-link" href="past">Past</a></SquareLi>
                <SquareLi class="page-item"><a class="page-link" href="itsy">Itsy</a></SquareLi>
            </ul>
        )
    }

}