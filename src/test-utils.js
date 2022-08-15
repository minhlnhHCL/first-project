import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Routes } from "react-router-dom"
import { SpinnerContext, SpinnerProvider } from "./context/SpinnerContext"
import setupStore from "./store"

// export const renderWithRedux = (children) => {
//     const renderResult = render(<Provider store={store}>
//         <SpinnerProvider value={SpinnerContext}>
//             {children}
//         </SpinnerProvider>
//     </Provider>)
//     return {
//         ...renderResult,
//         store,
//     };
// }
// re-export everything
export * from '@testing-library/react'

export const renderWithRedux = (
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) => {
    const Wrapper = ({ children }) => {
        return (
            <Provider store={store}>
                <SpinnerProvider value={SpinnerContext}>
                    {children}</SpinnerProvider>
            </Provider>
        )
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}