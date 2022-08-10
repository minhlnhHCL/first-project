
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../context/DataContext'
import { addUser, editUser, editCurrentUser } from '../../context/DataReducer'
import { ModalContext } from '../../context/ModalContext'
import { SpinnerContext } from '../../context/SpinnerContext'
import './index.scss'
const Form = () => {
  const { activeHandler } = useContext(ModalContext)
  const { globalState, dispatch } = useContext(DataContext)
  const { onLoading, offLoading } = useContext(SpinnerContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyTitle, setCompanyTitle] = useState('')

  useEffect(() => {
    setFirstName(globalState.currentUser.firstName)
    setLastName(globalState.currentUser.lastName)
    setCompanyTitle(globalState.currentUser.company.title)
  }, [globalState.currentUser])

  const onSubmit = async (event) => {
    event.preventDefault()
    onLoading()
    try {
      const body = { ...globalState.currentUser }
      body.firstName = firstName
      body.lastName = lastName
      body.company.title = companyTitle
      if (globalState.currentUser.id) {
        const req = await axios.put(`https://dummyjson.com/users/${globalState.currentUser.id}`, body)
        if (req.status == 200) {
          dispatch(editUser(body))
          offLoading()
          activeHandler()
          return true
        }
      }
      const newId = globalState.users.length == 0 ? 1 : globalState.users[globalState.users.length - 1].id + 1
      body.id = newId
      const req = await axios.post('https://dummyjson.com/users/add', body)
      if (req.status == 200) {
        dispatch(addUser(body))
        offLoading()
        activeHandler()
        return true
      }
    } catch (error) {
      offLoading()
      alert(error.message);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='d-flex-ac'>
        <label className='custom-label'>First Name: </label>
        <input className='custom-input ' placeholder='First Name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className='d-flex-ac mt-32'>
        <label className='custom-label'>Last Name: </label>
        <input className='custom-input' placeholder='Last Name' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className='d-flex-ac mt-32'>
        <label className='custom-label'>Last Name: </label>
        <input className='custom-input' placeholder='Company Title' name='companyTitle' value={companyTitle} onChange={(e) => setCompanyTitle(e.target.value)} />
      </div>

      <div className='form-actions'>
        <div className="action-container">
          <button className='btn cancel' type='button' onClick={() => {
            activeHandler()
            dispatch(editCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
          }}>
            Cancel
          </button>
          <button className='btn submit' type='submit'>Submit</button>
        </div>
      </div>
    </form >
  )
}

export default Form