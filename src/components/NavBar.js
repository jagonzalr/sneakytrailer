
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">  
        <div className="container-fluid"> 
          <div className="navbar-header"> 
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-header" aria-expanded="false"> 
              <span className="sr-only">Toggle navigation</span> 
              <span className="icon-bar"></span> 
              <span className="icon-bar"></span> 
              <span className="icon-bar"></span> 
            </button> 
            <a className="navbar-brand" href="/">Sneaky Trailer</a> 
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

NavBar.propTypes = {}

export default NavBar