import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Forgotpass = () => {
    let navigate = useNavigate()
    let [email, setEmail] = useState({"_id":""})

    let send = () => {
        if (email._id !== "") {
            axios.post("https://blue-shop.onrender.com/sendotp",email).then((res) => {
                localStorage.setItem("resetEmail", email._id);
                navigate("/verifyotp");
            })
        }
        else {
            alert("please enter email")
        }
    }
    return (
        <div className='formcon'>
            <div className="form-control">
                <p className="title">Send OTP </p>
                <div className="input-field">
                    <input required="" className="input" type="text" value={email._id} name='_id' onChange={(e) => setEmail({...email,[e.target.name]:e.target.value})} />
                    <label className="label" for="input">Enter Email</label>
                </div>
                <button className="submit-btn" onClick={send}>Send OTP</button>
            </div>
        </div>
    )
}

export default Forgotpass