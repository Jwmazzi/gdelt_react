import React, { Component } from 'react'


class Table extends Component {

    render() {
        
        let rows = this.props.data.stories.map((info, i)=> {
            return(
                <tr key={i}>
                    <td><a href={info.source} target="_blank" rel="noopener noreferrer">{info.title}</a></td>
                    <td>{info.keywords}</td>
                    <td>{info.name_one}</td>
                    <td>{info.name_two}</td>
                    <td>{info.goldstein}</td>
                    <td>{info.avgtone}</td>
                </tr>
            )
        })

        return(

            <table className="table table-bordered table-striped">
                <thead className="thead-dark header-row">
                <tr>
                    <th>TITLE</th>
                    <th>KEYWORDS</th>
                    <th>A1</th>
                    <th>A2</th>
                    <th>Goldstein</th>
                    <th>Sentiment</th>
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }

}

export default Table