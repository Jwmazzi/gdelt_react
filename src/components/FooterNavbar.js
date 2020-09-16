import React, { Component } from 'react'
import styled from 'styled-components'


const SquaredLi = styled.li`
  border-radius: 0 !important;
`

export default class FooterNavbar extends Component {

    render() {

        let lis = ['V1', 'V2'].map((version, i) => {

            var className = version.toLowerCase() === this.props.data.version ? "bg-info" : "bg-secondary"
            return(
                <SquaredLi key={i} onClick={this.props.select} className={`list-group-item ${className}`}>
                    <span style={{color: 'white'}}>{version}</span>
                </SquaredLi>
            )
          })

        return(
            <ul className="list-group list-group-horizontal-md">
                {lis}
            </ul>
        )
    }

}