import React, { useContext, useEffect } from 'react'
import Ct from './Cs'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Logout = () => {
  let obj = useContext(Ct)
  let navigate = useNavigate()
  useEffect(()=>{
    obj.upd({"token":"","name":"","_id":"","role":""})
    Cookies.remove('user');
    Cookies.remove("cartlength");
    sessionStorage.removeItem("proddet")
    navigate("/")
  },[])
  return (
    <div>logout</div>
  )
}

export default Logout