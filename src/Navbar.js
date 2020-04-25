import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component {

    render() {

        let tabs = Object.keys(this.props.data.cameo).map((info, i) => {
            return(
              <li key={i} className="nav-item">
                <a style={this.props.data.cameo[info] === this.props.data.active ? {color: 'white'} : {}} 
                className="nav-link" href={`?category=${info}`} onClick={this.props.navbarSelect}>{info.toUpperCase()}</a>
              </li>
            )
          })

        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{marginBottom: 15}}>
                <Link class="navbar-brand" to="/"><img style={{height: 35, width: 35}} src="news.png"/></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        {tabs}
                    </ul>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                        <span style={{color: 'white'}}>{this.props.data.last_run.toString()}</span>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }

}