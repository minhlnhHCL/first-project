import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
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

export const useAppDispatch = () => useDispatch()
export const useAppSelector = useSelector;

export default setupStore;