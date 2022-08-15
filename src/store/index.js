import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import users from './userSlice'

const reducer = combineReducers({
    users
})
const setupStore = preloadedState => {
    return configureStore({
        reducer,
        preloadedState
    })
}
export default setupStore;