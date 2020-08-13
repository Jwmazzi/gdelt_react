import React, { Component } from 'react'
import styled from 'styled-components'


const KeywordScroll = styled.div`
  margin-top: 50px;
  overflow: auto;
`

const SquaredLi = styled.li`
  border-radius: 0 !important;
`

export default class Keywords extends Component {

    render() {

        let keys = this.props.data.keywords.map((info, i) => {

            var className = info[0] === this.props.data.activeKey ? "bg-info": "bg-secondary"

            return(
                <SquaredLi key={i} onClick={this.props.select} className={`list-group-item ${className}`}>
                    <span style={{color: 'white'}}>{info[0].toUpperCase()}</span>
                </SquaredLi>
            )

          })

        keys.unshift(
            <SquaredLi key='clear' onClick={this.props.clear} className="list-group-item bg-dark">
                <span style={{color: 'white', fontStyle: 'italic'}}>RESET</span>
            </SquaredLi>
        )

        return (
            <KeywordScroll>
                <ul className="list-group list-group-horizontal-md">{keys}</ul>
            </KeywordScroll>
        )
    }

}

