import React, { useEffect } from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Verifyotp = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    let [message, umessage] = useState("")
    const fdata = location.state?.data;
    const email = localStorage.getItem("resetEmail")||fdata.email;
   

    useEffect(() => {
        const timer = setTimeout(() => {
            umessage("")
        }, 5000)
        return () => clearTimeout(timer);
    }, [message])


    let verify = () => {
        if (otp !== "") {
            axios.post("http://localhost:5555/verifyotp", { email, otp }).then((res) => {
                let result = res.data.message
                if (result === "OTP verified successfully") {
                    if (fdata) {
                        if (fdata._id !== "" && fdata.name !== "" && fdata.phno !== "" && fdata.pwd !== "" && fdata.address !== "" && fdata.gen !== "") {
                            axios.post("https://blue-shop.onrender.com/reg", fdata).then((res) => {
                                umessage(res.data.message)
                                if (res.data.message === "registration done") {
                                    return navigate("/login")
                                }
                            })
                        }
                    } else {
                        return navigate("/resetpass");
                    }

                }
                if (result === 'OTP expired') {
                    alert('OTP expires, So send OTP again')
                    navigate('/forgotpass',{state:{data :fdata}})
                }
                else {
                    return umessage(result)
                }
            })
        }
        else {
            return umessage("please enter OTP")
        }
    }

    return (
        <div className='formcon'>
            <div className="form-control">
                <p className="title">Verify OTP </p>
                <div className='message'>{message}</div>
                <p>check your email OTP is already sent </p>
                <div className="input-field">
                    <input required="" className="input" type="text" onChange={(e) => setOtp(e.target.value)} />
                    <label className="label" htmlFor="input">Enter OTP</label>
                </div>
                <button className="submit-btn" onClick={verify}>Verify OTP</button>
            </div>
        </div>
    )
}

export default Verifyotp