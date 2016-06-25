
import React, { Component } from 'react'
import Select from 'react-select'

class MoviesHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12 main-box-header">
            <div className="col-xs-6 col-sm-9">
              <h5>{this.props.titles[this.props.filter]}</h5>
            </div>
            <div className="col-xs-6 col-sm-3">
              <Select
                name="form-field-name"
                value={this.props.filter}
                options={this.props.options}
                onChange={this.props.selectChange}
              />
          </div>
        </div>
      </div>
    )
  }
}

export default MoviesHeader