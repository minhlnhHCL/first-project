import React, { useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { editCurrentUser } from '../../context/DataReducer'
import { ModalContext } from '../../context/ModalContext'
import Form from '../form'
import PortalContainer from '../portal'
import './index.scss'

const Modal = () => {
  const { active, activeHandler } = useContext(ModalContext)
  const { dispatch, globalState } = useContext(DataContext)
  return (
    <PortalContainer>
      <div className={`modal-container ${active ? 'active' : 'active out'} `}>
        <div className='modal-background'>
          <div className="modal">
            <div className="modal-header">
              <div className='d-flex-sb'>
                <h3>{globalState.currentUser.id ? 'Edit Current User' : 'Create New User'}</h3>
                <button className='btn-close' onClick={() => {
                  activeHandler()
                  dispatch(editCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
                }}>X</button>
              </div>
            </div>
            <div className='modal-content'>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </PortalContainer>
  )
}

export default Modal