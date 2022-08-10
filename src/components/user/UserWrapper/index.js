import './index.scss'
import { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'
import { deleteUser, editCurrentUser } from '../../../context/DataReducer'
import { Link } from 'react-router-dom'
import { ModalContext } from '../../../context/ModalContext'
const UserWrapper = ({ data }) => {
  const { activeHandler } = useContext(ModalContext)
  const { dispatch } = useContext(DataContext)
  return (
    <div className='user-card'>
      <div className='user-wrapper d-flex-sb'>
        <div className='d-flex'>
          <div className='avatar'><img src={data.image} /></div>
          <div className='info ml-32 d-fc'>
            <Link to={`/users/${data.id}`} className='link-div'>
              <div className='d-flex-wrap'>
                <p>{data.firstName}</p>
                <p className='ml-4'>{data.lastName}</p>
              </div>
            </Link>
            <div className='mt--20 fs-14'>
              <p>{data.company.title}</p>
            </div>
          </div>
        </div>
        <div>
          <button className='btn edit' onClick={() => {
            activeHandler()
            dispatch(editCurrentUser(data))
          }}>Edit</button>
          <button className='btn cancel mt-8' onClick={() => {
            dispatch(deleteUser(data))
          }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserWrapper
