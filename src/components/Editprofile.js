import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Ct from './Cs'
import Cookies from 'js-cookie';


const Editprofile = () => {
    let navigate = useNavigate()
    let obj = useContext(Ct)
    let [fdata, udata] = useState({ "_id": "", "name": "", "phno": "", "gen": "", "address": "" })
    let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    
    let fun = (e) => {
        udata({ ...fdata, [e.target.name]: e.target.value })
    }

    useEffect(() => {
      if(user){
        obj.upd(user)
        udata({"_id":user._id,"name":user.name,"gen":user.gen,"address":user.address,"phno":user.phno})
      }
      else{
        navigate("/login")
      }
    }, [])

    let edit = () => {
        if (fdata.name !== "" && fdata._id !== "" && fdata.address !== "" && fdata.phno !== "" && fdata.gen !== "") {
            axios.put("https://blue-shop.onrender.com/editprofile", fdata,{headers:{Authorization:user.token}}).then(() => {
                obj.upd(fdata);
                Cookies.set('user', JSON.stringify(fdata));
                navigate("/")
            })
        }
        else {
            alert("please fill all the details")
        }
    }
    return (
        <div className='formcon'>
        <div className="form-control">
          <p className="title">Edit Profile</p>
          <div className='details-valuesb'>Note : Email cannot be changed</div>
          <div className="input-field">
            <input className="input" type="text" name='_id' value={fdata._id} onChange={fun} id="email_id"readOnly/>
            <label className="label" htmlFor="input">Enter Email</label>
          </div>
          <div className="input-field">
            <input required="" className="input" type='text' name='name' value={fdata.name} onChange={fun} />
            <label className="label" htmlFor="input">Enter name</label>
          </div>
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
            <label className="label" htmlFor="input">Enter phno</label>
          </div>
          <div className="input-field">
            <textarea required="" className="input" rows={4} name='address' value={fdata.address} onChange={fun}></textarea>
            <label className="label" htmlFor="input">Enter Address</label>
          </div>
          <button className="submit-btn" onClick={edit}>Update</button>
          <div className='details-valuesb'>To Change Password : <Link className='forgot' to="/forgotpass"> Click here</Link></div>
        </div>
      </div>
    )
}

export default Editprofile