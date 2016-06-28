
import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <IndexLink to='/' className="navbar-brand">
              Sneaky Trailer
            </IndexLink>
          </div>
          <div className="collapse navbar-collapse" id="navbar-header"> 
            <ul className="nav navbar-nav"> 
              <li className="active">
                <Link to='/discovery'>
                  Discovery
                </Link>
              </li> 
            </ul>
          </div> 
        </div>
      </nav>
    )
  }
}

export default NavBar