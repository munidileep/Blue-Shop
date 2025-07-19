import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Reg = () => {
  let [fdata, ufdata] = useState({ "_id": "", "name": "", "phno": "", "pwd": "", "address": "", "gen": "" })
  let [message, umessage] = useState("")
  let navigate = useNavigate()

  let fun = (e) => {
    ufdata({ ...fdata, [e.target.name]: e.target.value })
  }


  let add = () => {
    if (fdata._id !== "" && fdata.name !== "" && fdata.phno !== "" && fdata.pwd !== "" && fdata.address !== "" && fdata.gen !== "") {
      axios.post("https://blue-shop.onrender.com/reg", fdata).then((res) => {
        umessage(res.data.message)
        if (res.data.message === "registration done") {
          navigate("/login")
        }
      })
    }
    else {
      umessage("please enter all details")
    }
  }


  return (
    <div className='formcon'>
      <div className="form-control">
        <p className="title">SignUp</p>
        <div className='message'>{message}</div>
        <div className='details-valuesb'>Note : Once created you cannot Change your Email</div>
        <div className="input-field">
          <input required="" className="input" type="text" name='_id' value={fdata._id} onChange={fun} />
          <label className="label" for="input">Enter Email</label>
        </div>
        <div className="input-field">
          <input required="" className="input" type='text' name='name' value={fdata.name} onChange={fun} />
          <label className="label" for="input">Enter name</label>
        </div>
        <div className="input-field">
          <input required="" className="input" type="password" name='pwd' value={fdata.pwd} onChange={fun} />
          <label className="label" for="input">Enter Password</label>
        </div>
      </div>
      <div className="form-control">
        <div className="input-field">
          <select name='gen' value={fdata.gen} onChange={fun} className='inputgen'>
            <option value="" disabled>-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label className="label" htmlFor="input">Enter Gender</label>
        </div>
        <div className="input-field">
          <input required="" className="input" type="text" name='phno' value={fdata.phno} onChange={fun} />
          <label className="label" for="input">Enter phno</label>
        </div>
        <div className="input-field">
          <textarea required="" className="input" rows={4} name='address' value={fdata.address} onChange={fun}></textarea>
          <label className="label" for="input">Enter Address</label>
        </div>
        <button className="submit-btn" onClick={add}>Verify Email</button>
        <p>Already have an account ? <Link className='signup' to="/login">SignIn</Link></p>
      </div>
    </div>
  )
}

export default Reg