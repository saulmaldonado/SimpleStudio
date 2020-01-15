import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

//imported reducers
import teacherAuthReducer from './reducers/teacherAuthReducer'
import studentAuthReducer from './reducers/studentAuthReducer'
import teacherReducer from './reducers/teacherReducer'
import studentReducer from './reducers/studentReducer'


//rootReducer

const rootReducer = combineReducers ({
    teacherAuthReducer,
    studentAuthReducer,
    teacherReducer,
    studentReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))