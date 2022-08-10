import React, { lazy, Suspense, useContext } from 'react'
import './index.scss'
import { DataContext } from '../../context/DataContext'
import { editCurrentUser } from '../../context/DataReducer'
import { ModalContext } from '../../context/ModalContext'
import Spinner from '../spinner'

const UserWrapper = lazy(() => import('./UserWrapper'))

const List = () => {
    const { activeHandler } = useContext(ModalContext)
    const { globalState, dispatch } = useContext(DataContext)
    return (
        <div className='list-container mt-32'>
            <button onClick={() => {
                activeHandler()
                dispatch(editCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
            }}>Create New User</button>
            <div className='list-wrapper'>
                {
                    globalState.users.map((item, idx) => (
                        <UserWrapper key={`${item.id}-${idx}`} data={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default List