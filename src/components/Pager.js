
import React, { Component, PropTypes } from 'react'

class Pager extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav>
        <ul className="pager">
          {this.props.total > 1 &&
            <div>
              {this.props.current !== 1 &&
                <li className={this.props.current === 1 ? 'disabled' : ''} style={{marginRight: '5px'}}>
                  <a href="#" onClick={this.props.previousPage}>Previous</a>
                </li>
              }
              {this.props.current !== this.props.total &&
                <li className={this.props.current === this.props.total ? 'disabled' : ''}>
                  <a href="#" onClick={this.props.nextPage}>Next</a>
                </li>
              }
            </div>
          }
          <h6 style={{marginTop: '20px'}}>{this.props.current} of {this.props.total}</h6>
        </ul>
        {this.props.showMovieDBLogo &&
          <p>
            <a href="https://www.themoviedb.org/" target="_blank">
              <img src='https://assets.tmdb.org/images/logos/var_1_0_PoweredByTMDB_Blk_Antitled.png' style={{width: '200px'}}/>
            </a>
          </p>
        }
      </nav>
    )
  }
}

Pager.propTypes = {}

export default Pager
