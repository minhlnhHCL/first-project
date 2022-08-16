import React, { useEffect } from 'react'
import './UserList.scss'
import UserWrapper from './UserWrapper/UserWrapper'
import { useNavigate } from 'react-router-dom'
import { getUsers, setCurrentUser } from '../../store/userSlice'
import { useContext } from 'react'
import { SpinnerContext } from '../../context/SpinnerContext'
import { useAppDispatch, useAppSelector } from '../../store'
import { get } from '../utils/api-requests'

const UserList = () => {
    const { users } = useAppSelector(state => state.users)
    const { onLoading, offLoading } = useContext(SpinnerContext)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        onLoading()
        const getData = async () => {
            try {
                if (users.length === 0 || users.length === 1) {
                    const res = await get()
                    if (res.status === 200) {
                        return dispatch(getUsers(res.data.users))
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                offLoading()
            }
        }
        getData()
    }, [users])

    return (
        <div className='list-container mt-32'>
            <button className='btn-create' onClick={() => {
                dispatch(setCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
                navigate('/edit')
            }}>Create New User</button>
            <div className='list-wrapper'>
                {
                    users !== undefined && users.length !== 0 && users.map((item, idx) => (
                        <UserWrapper key={`${item.id}-${idx}`} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default UserList