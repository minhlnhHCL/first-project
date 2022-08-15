import axios from "axios"
import { createContext, useReducer } from "react"

import Modal from "../components/Modal/Modal"


const DataContext = createContext()

const DataProvider = ({ children, reducer, initialState }) => {
    const [globalState, dispatch] = useReducer(reducer, initialState)
    
    return (
        <DataContext.Provider value={{ globalState, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}

export { DataContext, DataProvider }