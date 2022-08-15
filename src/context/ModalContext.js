import { createContext, useState } from "react"
import Modal from "../components/Modal/Modal"

import React from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
    const [active, setActive] = useState(false)
    const activeHandler = () => setActive(!active)
    return (
        <ModalContext.Provider value={{ active, activeHandler }}>
            <>
                <Modal />
                {children}
            </>
        </ModalContext.Provider>
    )
}

export { ModalContext, ModalProvider }