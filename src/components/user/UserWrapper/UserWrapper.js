import './UserWrapper.scss'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SpinnerContext } from '../../../context/SpinnerContext'
import { deleteUser, setCurrentUser } from '../../../store/userSlice'
import { useAppDispatch } from '../../../store'
import { deleteReq } from '../../utils/api-requests'

const UserWrapper = ({ data }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { onLoading, offLoading } = useContext(SpinnerContext)
  const deleteHandler = async () => {
    try {
      onLoading()
      const req = await deleteReq(`/${data.id}`)
      if (req.status == 200) {
        return dispatch(deleteUser(data))
      }
    } catch (error) {
      console.log(error)
    } finally {
      offLoading()
    }
  }
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
            dispatch(setCurrentUser(data))
            navigate('/edit')
          }}>Edit</button>
          <button className='btn cancel mt-8' onClick={deleteHandler}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserWrapper
