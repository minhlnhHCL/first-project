import React, { useEffect, useState } from 'react'
import './UserList.scss'
import UserWrapper from './UserWrapper/UserWrapper'
import { fetchData } from '../utils/fetchData'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, setCurrentUser } from '../../store/userSlice'
import { useContext } from 'react'
import { SpinnerContext } from '../../context/SpinnerContext'
import axios from 'axios'

const resource = fetchData('https://dummyjson.com/users')

const UserList = () => {
    const { users } = useSelector(state => state.users)
    const { onLoading, offLoading } = useContext(SpinnerContext)
    const dispatch = useDispatch()
    const data = resource.read()
    const [, setActive] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        onLoading()
        const getData = async () => {
            try {
                const res = await axios.get('https://dummyjson.com/users')
                if (res.status == 200) {
                    if (users.length == 0 || users.length == 1) {
                        return dispatch(getUsers(data.users))
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                offLoading()
            }
        }
        getData()
        // if (reduxState.users.length == 0 || reduxState.users.length == 1) {
        //     setActive(true)
        //     dispatch(getUsers(data.users))
        // } else {
        //     setActive(false)
        // }
    }, [users])
    return (
        <div className='list-container mt-32'>
            <button className='btn-create' onClick={() => {
                dispatch(setCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
                navigate('/edit')
            }}>Create New User</button>
            <div className='list-wrapper'>
                {
                    users.map((item, idx) => (
                        <UserWrapper key={`${item.id}-${idx}`} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserList