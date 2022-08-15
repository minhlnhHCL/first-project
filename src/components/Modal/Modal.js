import React from 'react'
import Form from '../Form/Form'
import { useDispatch, useSelector } from 'react-redux'
import './Modal.scss'
import { setCurrentUser } from '../../store/userSlice'

const Modal = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.users)
  return (
    <>
      <div className={`modal-container active`}>
        <div className='modal-background'>
          <div className="modal">
            <div className="modal-header">
              <div className='d-flex-sb'>
                <h3>{currentUser.id ? 'Edit Current User' : 'Create New User'}</h3>
                <button className='btn-close' onClick={() => {
                  dispatch(setCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
                }}>X</button>
              </div>
            </div>
            <div className='modal-content'>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal