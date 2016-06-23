
import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';

import TeamCard from '../components/TeamCard'
import AsyncRecentActivity from '../containers/AsyncRecentActivity'
import AsyncMovies from '../containers/AsyncMovies'

/* Populated by react-webpack-redux:reducer */
class App extends Component {
  render() {
    return (
      <AsyncMovies />
    )
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  /* Populated by react-webpack-redux:reducer */
  const props = {};
  return props;
}
function mapDispatchToProps(dispatch) {
  /* Populated by react-webpack-redux:action */
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
