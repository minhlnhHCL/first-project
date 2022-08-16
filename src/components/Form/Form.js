import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SpinnerContext } from '../../context/SpinnerContext'
import { addUser, editUser, setCurrentUser } from '../../store/userSlice'
import './Form.scss'
import { useAppDispatch, useAppSelector } from '../../store'
import { put, post } from '../utils/api-requests'

const Form = () => {
  //Declare initial values
  const { currentUser, users } = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()
  const { onLoading, offLoading } = useContext(SpinnerContext)
  const [firstName, setFirstName] = useState(currentUser.firstName)
  const [lastName, setLastName] = useState(currentUser.lastName)
  const [companyTitle, setCompanyTitle] = useState(currentUser.company.title)
  const navigate = useNavigate()

  //Form Functions
  const successHandler = (res, reducer) => {
    offLoading()
    dispatch(reducer(res.data))
    navigate('/')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    onLoading()
    try {
      const body = { ...currentUser }
      body.firstName = firstName
      body.lastName = lastName
      body.company = { ...body.company, title: companyTitle }

      let url = '/add'
      if (currentUser.id) {
        url = `/${currentUser.id}`
        const req = await put(url, body)
        return successHandler(req, editUser)

      }
      const newId = users.length == 0 ? 31 : users[users.length == 31 ? 0 : users.length - 1].id + 1
      body.id = newId
      const newRes = {data: body}
      await post(url, body)
      return successHandler(newRes, addUser)


    } catch (error) {
      offLoading()
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='d-flex-ac'>
        <label htmlFor='firstName' className='custom-label'>First Name</label>
        <input id='firstName' className='custom-input ' placeholder='First Name' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className='d-flex-ac mt-32'>
        <label htmlFor='lastName' className='custom-label'>Last Name</label>
        <input id='lastName' className='custom-input' placeholder='Last Name' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className='d-flex-ac mt-32'>
        <label htmlFor='companyTitle' className='custom-label'>Company title</label>
        <input id='companyTitle' className='custom-input' placeholder='Company Title' name='companyTitle' value={companyTitle} onChange={(e) => setCompanyTitle(e.target.value)} />
      </div>

      <div className='form-actions'>
        <div className="action-container">
          <button className='btn cancel' type='button' onClick={() => {
            dispatch(setCurrentUser({ firstName: '', lastName: '', age: 0, id: 0, company: { title: '' } }))
            navigate('/')
          }}>
            Cancel
          </button>
          <button aria-label='submit' name='btn-submit' className='btn submit' disabled={!(firstName && lastName && companyTitle)} type='submit'>Submit</button>
        </div>
      </div>
    </form >
  )
}

export default Form