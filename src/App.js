import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Reg from './components/Reg'
import Login from './components/Login'
import Cart from './components/Cart'
import Add from './components/Add'
import Logout from './components/Logout'
import Home from './components/Home'
import Ct from './components/Cs'
import Km from './components/Km'
import Buynow from './components/Buynow'
import Search from './components/Search'
import Editprod from './components/Editprod'
import Profile from './components/Profile'
import Editprofile from './components/Editprofile'
import Forgotpass from './components/Forgotpass'
import Verifyotp from './components/Verifyotp'
import Resetpass from './components/Resetpass'

const App = () => {
  let [state, ustate] = useState({ "token": "", "name": "", "_id": "", "role": "" })
  let upd = (obj) => {
    ustate({ ...state, ...obj })
  }
  let obj = { "state": state, "upd": upd }
  return (
    <BrowserRouter>
      <Ct.Provider value={obj}>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add' element={<Add />} />
          <Route path='/Km' element={<Km />} />
          <Route path='/search' element={<Search />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/buynow' element={<Buynow />} />
          <Route path='/edit' element={<Editprod />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editprofile' element={<Editprofile />} />
          <Route path='/forgotpass' element={<Forgotpass />} />
          <Route path='/verifyotp' element={<Verifyotp />} />
          <Route path='/resetpass' element={<Resetpass />} />
        </Routes>
      </Ct.Provider>
    </BrowserRouter>
  )
}

export default App