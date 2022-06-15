// ** Reducers Imports
import { combineReducers } from 'redux';
import navbar from './navbar'
import layout from './layout'
import appReducer from './reducers/app.reducer'
import authReducer from './reducers/auth.reducer'

const mainReducer = combineReducers({
  navbar,
  layout,
  app: appReducer,
  auth: authReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return mainReducer(undefined, action)
  }

  return mainReducer(state, action)
}

export default rootReducer;