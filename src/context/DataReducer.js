export const GET_USER = 'GET_USER'
export const ADD_USER = 'ADD_USER'
export const EDIT_USER = 'EDIT_USER'
export const DELETE_USER = 'ADELETEUSER'
export const CURRENT_USER = 'CURRENT_USER'

export const initialState = {
    users: [],
    currentUser: {
        firstName: '',
        lastName: '',
        image: '',
        age: 0,
        company: {
            title: ''
        }
    }
}

export const getUsers = (users) => ({
    type: GET_USER,
    users
})
export const addUser = (user) => ({
    type: ADD_USER,
    user
})
export const editUser = (user) => ({
    type: EDIT_USER,
    user
})
export const deleteUser = (user) => ({
    type: DELETE_USER,
    user
})
export const editCurrentUser = (user) => ({
    type: CURRENT_USER,
    user
})

export const DataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            // if(state.users.length !==0 ) return { ...state, users: [...state.users, action.users]}
            state.users = action.users
            return state
        case ADD_USER:
            {
                console.log('vo add')

                const index = state.users.findIndex(el => el.id == action.user.id);
                if (index == -1)
                    return { ...state, users: [action.user, ...state.users] }
                return state
            }
        case EDIT_USER:
            {
                console.log('vo edit')

                const index = state.users.findIndex(el => el.id == action.user.id);
                const newUserArr = [...state.users]
                newUserArr[index] = action.user
                console.log('edit user', newUserArr)
                return { ...state, users: newUserArr }
            }
        case CURRENT_USER:
            console.log('vo current')
            return {
                ...state,
                currentUser: action.user
            }
        case DELETE_USER:
            const clonedArr = [...state.users]
            const newUserArr = clonedArr.filter(item => item.id !== action.user.id)
            return { ...state, users: newUserArr }
        default:
            return state
    }
}