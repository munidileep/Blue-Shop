import React from 'react'
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Resetpass = () => {
  const [pwd, setPwd] = useState("");
    const navigate = useNavigate();
    const email = localStorage.getItem("resetEmail");

    let update = () => {
      if (pwd !== "") {
          axios.put("https://blue-shop.onrender.com/forgotpass", { email, pwd }).then((res) => {
              alert(res.data.message);
              if (res.data.message === "password updated successfully") {
                localStorage.removeItem("resetEmail");
                  navigate("/login");
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
                <p className="title">Set New Password </p>
                <div className="input-field">
                    <input required="" className="input" type="text" value={pwd} onChange={(e) => setPwd(e.target.value)} />
                    <label className="label" for="input">Enter New Password</label>
                </div>
                <button className="submit-btn" onClick={update}>update Password</button>
            </div>
        </div>
  )
}

export default Resetpass