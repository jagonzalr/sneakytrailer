
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
        </div>
      </nav>
    )
  }
}

export default NavBar