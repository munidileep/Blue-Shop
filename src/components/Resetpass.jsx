import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Ct from './Cs'


const Resetpass = () => {
  let obj = useContext(Ct)
  const [pwd, setPwd] = useState({ "pass": "", "repass": "" });
  let [message, umessage] = useState("")
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    const timer = setTimeout(() => {
      umessage("")
    }, 5000)
    return () => clearTimeout(timer);
  }, [message])

  let update = () => {
    if (pwd.pass !== "" && pwd.repass !== "") {
      if (pwd.pass === pwd.repass) {
        axios.put("https://blue-shop.onrender.com/forgotpass", { email, "pwd": pwd.pass }).then((res) => {
          let result = res.data.message
          if (result === "password updated successfully") {
            alert("password updated successfully")
            localStorage.removeItem("resetEmail");
            obj.upd({ "token": "", "name": "", "_id": "", "role": "" })
            Cookies.remove('user');
            Cookies.remove("cartlength");
            sessionStorage.removeItem("proddet")
            navigate("/login");
          } else {
            umessage(result)
          }
        })
      }
      else {
        umessage("Both passwords doesn't match")
      }
    }
    else {
      umessage("please enter password")
    }
  }
  return (
    <div className='formcon'>
      <div className="form-control">
        <p className="title">Set New Password </p>
        <div className='message'>{message}</div>
        <div className="input-field">
          <input required="" className="input" type="password" onChange={(e) => setPwd({ ...pwd, "pass": e.target.value })} />
          <label className="label" htmlFor="input">Enter New Password</label>
        </div>
        <div className="input-field">
          <input required="" className="input" type="password" onChange={(e) => setPwd({ ...pwd, "repass": e.target.value })} />
          <label className="label" htmlFor="input">Re-enter Password</label>
        </div>
        <button className="submit-btn" onClick={update}>update Password</button>
      </div>
    </div>
  )
}

export default Resetpass