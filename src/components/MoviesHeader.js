
import React, { Component } from 'react'
import Select from './Select'
import SelectFX from 'periodicjs.component.selectfx'
var myFXSelect

class MoviesHeader extends Component {
  constructor(props) {
    super(props)

    this._selectChange = this._selectChange.bind(this)
  }

  componentDidMount() {
    var selectElement = document.querySelector('select');
    myFXSelect = new SelectFX(selectElement, this.props.selectChange);
    window.myFXSelect = myFXSelect;
  }

  _selectChange(value) {
    if (this.props.selectChange) {
      this.props.selectChange(value)
    }
  }

  render() {

    return (
      <div className="row">
        <div className="col-xs-12 main-box-header">
          <div className="col-xs-6">
            <select className="cs-select cs-skin-elastic" id="lang" onChange={this.props.selectChange} value={this.props.filter}>
              {this.props.options.map((option, i) =>
                <option key={i} value={option.value}>{option.label}</option>
              )}
           </select>
          </div>
        </div>
      </div>
    )
  }
}

export default MoviesHeader