import { createContext, useState } from "react";
import Spinner from "../components/spinner";

const SpinnerContext = createContext()

const SpinnerProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const onLoading = () => {
        setIsLoading(true)
    }
    const offLoading = () => {
        setIsLoading(false)
    }
    return (
        <SpinnerContext.Provider value={{ onLoading, offLoading }}>
            <>
                {isLoading && <Spinner />}
                {children}
            </>
        </SpinnerContext.Provider>
    )
}

export { SpinnerContext, SpinnerProvider }