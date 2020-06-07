import React, { Component } from 'react'
import styled from 'styled-components'


const KeywordScroll = styled.div`
  margin-top: 50px;
  overflow: auto;
`

const SquaredLi = styled.li`
  border-radius: 0 !important;
  font-style: italic;
 
`

export default class Keywords extends Component {

    render() {

        let keys = this.props.data.keywords.map((info, i) => {
            return(
                <SquaredLi key={i} onClick={this.props.select} className="list-group-item bg-secondary">
                    <span style={info[0] === this.props.data.activeKey ? {color: 'black'} : {color: 'white'}}>{info[0].toUpperCase()} ({info[1]})</span>
                </SquaredLi>
            )
          })

        // Push Clear Button to Front of Array
        keys.unshift(
            <SquaredLi key='clear' onClick={this.props.select} className="list-group-item bg-info">
                <span style={'clear' === this.props.data.activeKey ? {color: 'black'} : {color: 'white'}}>CLEAR</span>
            </SquaredLi>
        )

        return (
            <KeywordScroll>
                <ul className="list-group list-group-horizontal-md">{keys}</ul>
            </KeywordScroll>
        )
    }

}

