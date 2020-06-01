import React, { Component } from 'react'
import styled from 'styled-components'


const KeywordScroll = styled.div`
  overflow: auto;
`

const SquaredLi = styled.li`
  border-radius: 0 !important;
  font-style: italic;

`

export default class Keywords extends Component {

    render() {


        let keys = this.props.data.map((info, i) => {
            return(
                <SquaredLi key={i} className="list-group-item bg-secondary text-white">
                    {info[0].toUpperCase()} ({info[1]})
                </SquaredLi>
            )
          })

        return (
            <KeywordScroll>
                <ul className="list-group list-group-horizontal-md">{keys}</ul>
            </KeywordScroll>
        )
    }

}

