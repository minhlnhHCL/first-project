import axios from "axios"
import { createContext, Suspense, useEffect, useReducer, useState } from "react"
import Modal from "../components/modal"

import React from 'react'
import { getUsers } from "./DataReducer"
import Spinner from "../components/spinner"

const DataContext = createContext()

const DataProvider = ({ children, reducer, initialState }) => {
    const [globalState, dispatch] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getData = async () => {
            try {
                const req = await axios.get('https://dummyjson.com/users')
                if (req.status === 200) {
                    dispatch(getUsers(req.data.users))

                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])
    return (
        <DataContext.Provider value={{ globalState, dispatch }}>
            {isLoading ? <Spinner /> : children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }