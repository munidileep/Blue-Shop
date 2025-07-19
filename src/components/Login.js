import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Ct from './Cs'
import Cookies from 'js-cookie'

const Login = () => {
  let [fdata,ufdata] = useState({"_id":"","pwd":""})
  let [message,umessage]= useState("")
  let navigate=useNavigate()
  let obj = useContext(Ct)

  let fun = (e)=>{
    ufdata({...fdata,[e.target.name]:e.target.value})
  }

  let addcart = (prodobj,uid)=>{
      let user = JSON.parse(Cookies.get('user'))
      axios.post("https://blue-shop.onrender.com/addcart",{"uid":uid,"pid":prodobj._id,"pimg":prodobj.pimg,"price":prodobj.price,"name":prodobj.name,"qty":1,"desc":prodobj.desc,"cat":prodobj.cat},{headers:{Authorization:user.token}}).then(()=>{
        navigate("/cart")
      })
  }

  let add =()=>{
    if(fdata._id !== "" && fdata.pwd !== ""){
      axios.post("https://blue-shop.onrender.com/login",fdata).then((res)=>{
        if(res.data.token !== undefined){
          obj.upd(res.data)
          Cookies.set('user', JSON.stringify(res.data));
          var uid = res.data._id
          const pendingProduct = localStorage.getItem("pendingCartItem");
          if (pendingProduct) {
              let proobj = JSON.parse(pendingProduct);
              localStorage.removeItem("pendingCartItem");
              addcart(proobj,uid);
          }
          else{
            navigate("/")
          }
        }
        else{
          umessage(res.data.message)
        }
      })
    }
    else{
      umessage("please enter email and password")
    }
  }
  return (
    <div className='formcon'>
      <div className="form-control">
          <p className="title">SignIn</p>
          <div className='message'>{message}</div>
          <div className="input-field">
            <input required="" className="input" type="text" name='_id' value={fdata._id} onChange={fun} />
            <label className="label" htmlFor="input">Enter Email</label>
          </div>
          <div className="input-field">
            <input required="" className="input" type="password" name='pwd' value={fdata.pwd} onChange={fun} />
            <label className="label" htmlFor="input">Enter Password</label>
          </div>
          <Link className='forgot' to="/forgotpass">Forgot Password</Link>
          <button className="submit-btn" onClick={add}>Sign In</button>
          <p>Dont have an account ? <Link className='signup' to="/reg">Signup</Link></p>
      </div>
    </div>
  )
}

export default Login