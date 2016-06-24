
require('static/styles.scss')

import React, { Component, PropTypes } from 'react'

import {
  API_IMAGE_URL,
  API_IMAGE_SIZE_ORIGINAL,
  API_IMAGE_SIZE_W780,
  API_IMAGE_SIZE_H632
} from '../actions'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">  
        <div className="container-fluid"> 
          <div className="navbar-header"> 
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6" aria-expanded="false"> 
              <span className="sr-only">Toggle navigation</span> 
              <span className="icon-bar"></span> 
              <span className="icon-bar"></span> 
              <span className="icon-bar"></span> 
            </button> 
            <a className="navbar-brand" href="#">Sneaky Trailer</a> 
          </div> 
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-6"> 
            <ul className="nav navbar-nav"> 
              <li className="active">
                <a href="#">Discovery</a>
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