import React, { Component } from 'react'
import styled from 'styled-components'


const Squared = styled.a`
    border-radius: 0 !important;
`

export default class FooterNavbar extends Component {

    render() {

        let lis = ['V1', 'V2'].map((version, i) => {
            return(
                 <li key={i} className="page-item" onClick={this.props.navbarSelect} id="version">
                     <Squared className="page-link bg-dark text-black" href="#">
                         <span id="version" style={version.toLowerCase() === this.props.data.version ? {color: 'white'} : {color: 'gray'}}>
                             {version}
                         </span>
                    </Squared>
                </li>
            )
          })

        return(
            <ul className="pagination justify-content-center">
                {lis}
            </ul>
        )
    }

}