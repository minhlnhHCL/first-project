
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SpinnerContext } from '../../context/SpinnerContext'
import { addUser, editUser, setCurrentUser } from '../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Form.scss'
const Form = () => {
  const { users, currentUser } = useSelector(state => state.users)
  const dispatch = useDispatch()
  const { onLoading, offLoading } = useContext(SpinnerContext)
  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [companyTitle, setCompanyTitle] = useState(currentUser.company.title)
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    onLoading()
    try {
      const body = { ...currentUser }
      body.firstName = firstName
      body.lastName = lastName
      body.company = { ...body.company, title: companyTitle }
      if (currentUser.id) {
        const req = await axios.put(`https://dummyjson.com/users/${currentUser.id}`, body)
        if (req.status == 200) {
          dispatch(editUser(body))
          offLoading()
          return navigate('/')

        }
      }
      const newId = users.length == 0 ? 31 : users[users.length == 31 ? 0 : users.length - 1].id + 1
      body.id = newId
      const req = await axios.post('https://dummyjson.com/users/add', body)
      if (req.status == 200) {
        dispatch(addUser(body))
        offLoading()
        return navigate('/')
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
            dispatch(setCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
          }}>
            Cancel
          </button>
          <button aria-label='submit' name='btn-submit' className='btn submit'disabled={!(firstName && lastName && companyTitle)} type='submit'>Submit</button>
        </div>
      </div>
    </form >
  )
}

export default Form