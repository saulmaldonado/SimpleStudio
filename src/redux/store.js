import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

//imported reducers
import teacherAuthReducer from './reducers/teacherAuthReducer'
import studentAuthReducer from './reducers/studentAuthReducer'
import teacherReducer from './reducers/teacherReducer'


//rootReducer

const rootReducer = combineReducers ({
    teacherAuthReducer,
    studentAuthReducer,
    teacherReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))