import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class HeaderNavbar extends Component {

    render() {

        let tabs = Object.keys(this.props.data.cameo).map((info, i) => {

            var className = this.props.data.cameo[info] === this.props.data.active ? "nav-item active": "nav-item"

            return(
              <li key={i} className={className}>
                <a id="category" className="nav-link" href={`?category=${info}`} onClick={this.props.navbarSelect}>{info.toUpperCase()}</a>
              </li>
            )
            
          })

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <Link className="navbar-brand" to="/"><img alt="News" style={{height: 35, width: 35}} src="news.png"/></Link>
                    <ul id="navCategories" className="navbar-nav mr-auto">
                         {tabs}
                    </ul>
                    <i><span className="nav-item" style={{color: 'white'}}>Last Updated: {this.props.data.last_run.toString()}</span></i>
                </div>
            </nav>
        )

    }

}