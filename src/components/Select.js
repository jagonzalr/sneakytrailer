
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SelectFX from 'periodicjs.component.selectfx'
var myFXSelect

class Select extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var selectElement = document.querySelector('select');
    myFXSelect = new SelectFX(selectElement);
    window.myFXSelect = myFXSelect;
  }

  render() {
    console.log(this.props.selectChange)
    return (
      <select className="cs-select cs-skin-elastic" onChange={this.props.selectChange} value={this.props.value}>
        {this.props.options.map((option, i) =>
          <option key={i} value={option.value}>{option.label}</option>
        )}
      </select>    )
  }
}

export default Select