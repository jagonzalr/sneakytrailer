
import React, { Component } from 'react'
import Select from 'react-select'

class DiscoveryHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 main-box-header">
          <span className="input input--isao" style={{marginLeft: '35px', marginTop: '-10px'}}>
            <input className="input__field input__field--isao" type="text" id="input-38" onChange={this.props.searchMovie} value={this.props.searchText} />
            <label className="input__label input__label--isao" for="input-38" data-content="Search for a movie">
              <span className="input__label-content input__label-content--isao">Discovery</span>
            </label>
          </span>
        </div>
      </div>
    )
  }
}

export default DiscoveryHeader