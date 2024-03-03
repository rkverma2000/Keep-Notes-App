import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import PrivateRoute from './components/Routes/Private'
import MyNotes from './Pages/MyNotes'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-notes' element={<PrivateRoute />}>
          <Route path='' element={<MyNotes />} />
        </Route>
      </Routes>
    </>
  )
}

export default App