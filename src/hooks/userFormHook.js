import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store';

const userFormHook = ({
    initialValues = {},
    userId = '',
    onSubmit
}) => {
    const { users, currentUser } = useSelector(state => state.users)
    const { onLoading, offLoading } = useContext(SpinnerContext)
    const [data, setData] = useState(initialValues);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        
    })

    return (
        <div>userFormHook</div>
    )
}

export default userFormHook