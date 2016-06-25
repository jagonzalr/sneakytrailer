
import React, { Component } from 'react'

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">  
        <div className="container-fluid"> 
          <div className="navbar-header"> 
            <a className="navbar-brand" href="/">Sneaky Trailer</a> 
          </div> 
        </div> 
      </nav>
    )
  }
}

export default NavBar