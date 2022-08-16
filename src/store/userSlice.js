import { createSlice } from '@reduxjs/toolkit'
export const GET_USER = 'GET_USER'
export const ADD_USER = 'ADD_USER'
export const EDIT_USER = 'EDIT_USER'
export const DELETE_USER = 'ADELETEUSER'
export const CURRENT_USER = 'CURRENT_USER'

export const initialState = {
    users: [],
    currentUser: {
        id: 0,
        firstName: '',
        lastName: '',
        image: '',
        age: 0,
        company: {
            title: ''
        }
    }
}
//UserSlice

export const userSLice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            if (state.users.length == 1) {
                const newUserArr = [...state.users, ...action.payload]
                state.users = newUserArr
                return state
            }
            state.users = action.payload
        },
        addUser: (state, action) => {
            const index = state.users.findIndex(el => el.id == action.payload.id);
            console.log('index', index)

            if (index == -1) {
                console.log('vo day')
                state.users = [action.payload, ...state.users]
                return state
            }
            return state
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        editUser: (state, action) => {
            const index = state.users.findIndex(el => el.id == action.payload.id);
            const newUserArr = [...state.users]
            newUserArr[index] = action.payload
            state.users = newUserArr
        },
        deleteUser: (state, action) => {
            const clonedArr = [...state.users]
            const newUserArr = clonedArr.filter(item => item.id !== action.payload.id)
            state.users = newUserArr
        }
    }
})

export const { getUsers, editUser, addUser, deleteUser, setCurrentUser } = userSLice.actions
export default userSLice.reducer