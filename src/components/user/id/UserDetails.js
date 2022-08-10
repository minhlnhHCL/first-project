import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../../context/DataContext'
import { useParams } from "react-router-dom";
import axios from 'axios';

const fetchData = () => {
    const userPromise = fetchUser()
    return {
        user: wrapPromise(userPromise)
    }
}

const wrapPromise = (promise) => {
    // Initial status
    let status = 'pending'
    let result;
    let suspender = promise.then(
        res => {
            status = 'success'
            result = res
        },
        err => {
            status = 'error'
            result = err
        }
    )
    return {
        read() {
            if (status == 'pending') {
                throw suspender
            } else if (status == 'error') {
                throw result
            } else if (status == 'success') {
                return result
            }
        }
    }
}

const fetchUser = () => {
    return axios.get(`https://dummyjson.com/users/1`)
        .then(res => res.data)
        .catch(err => console.log(err))
}

const userReq = fetchData();

const UserDetails = () => {
    const [data, setData] = useState(null)

    const user = userReq.user.read();
    // useEffect(() => {
    //     setData(user)
    // }, [])
    return (
        <div>
            {user.id}
        </div>
    )
}

export default UserDetails