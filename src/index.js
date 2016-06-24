import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from './stores'
import routes from './routes'

let state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app')
)