import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SpinnerProvider } from './context/SpinnerContext'
import Spinner from './components/Spinner/Spinner'
import { Provider } from 'react-redux'
import store from './store'
import UserList from './components/user/UserList'
// const UserList = lazy(() => import('./components/user/UserList'))
const Modal = lazy(() => import('./components/Modal/Modal'))

function App() {
  return (
    <Provider store={store()}>
      <SpinnerProvider>
        <Routes>
          <Route exact path='/' element={<UserList />} />
          <Route exact path='/edit' element={<Suspense fallback={<Spinner />}><Modal /></Suspense>} />
        </Routes>
      </SpinnerProvider>
    </Provider>
    // <BrowserRouter>
    //   <Routes>
    //     {/* <Route exact path='/' element={<Link to={'/users/1'}><button>testing</button></Link>} /> */}
    //     <Route exact path='/' element={<Suspense fallback={<Spinner />}><UserList /></Suspense>} />
    //     <Route exact path='/users/:userId' element={<Suspense fallback={<Spinner />}><UserDetails /></Suspense>} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
