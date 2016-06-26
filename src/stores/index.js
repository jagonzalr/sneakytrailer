
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import rootReducer from '../reducers'

// const loggerMiddleware = createLogger()

export default function configureStore(history, initialState) {

  const reducer = combineReducers({
    rootReducer,
    routing: routerReducer
  })

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      // loggerMiddleware,
      routerMiddleware(history)
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}