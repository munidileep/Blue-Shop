import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verifyotp = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");

    let verify = () => {
        if (otp !== "") {
            axios.post("https://blue-shop.onrender.com/verifyotp", { email, otp }).then((res) => {
                alert(res.data.message);
                if (res.data.message === "OTP verified successfully") {
                    navigate("/resetpass");
                }
            })
        }
        else {
            alert("please enter OTP")
        }
    }

    return (
        <div className='formcon'>
            <div className="form-control">
                <p className="title">Verify OTP </p>
                <p>check your email OTP is already sent </p>
                <div className="input-field">
                    <input required="" className="input" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <label className="label" for="input">Enter OTP</label>
                </div>
                <button className="submit-btn" onClick={verify}>Verify OTP</button>
            </div>
        </div>
    )
}

export default Verifyotp