import axios from 'axios'
import React, { lazy, Suspense } from 'react'
import { DataContext, DataProvider } from './context/DataContext'
import { DataReducer, initialState } from './context/DataReducer'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext'
import { SpinnerProvider } from './context/SpinnerContext'
import Spinner from './components/spinner'

const List = lazy(() => import('./components/user/List'))
const UserDetails = lazy(() => import('./components/user/id/UserDetails'))

function App() {
  return (
    <DataProvider initialState={initialState} reducer={DataReducer}>
      <SpinnerProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<List />} />
              <Route exact path='/users/:userId' element={<UserDetails />} />
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </SpinnerProvider>
    </DataProvider>
    // <BrowserRouter>
    //   <Routes>
    //     {/* <Route exact path='/' element={<Link to={'/users/1'}><button>testing</button></Link>} /> */}
    //     <Route exact path='/' element={<Suspense fallback={<Spinner />}><List /></Suspense>} />
    //     <Route exact path='/users/:userId' element={<Suspense fallback={<Spinner />}><UserDetails /></Suspense>} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
