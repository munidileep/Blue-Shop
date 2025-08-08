import { useState,useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import Ct from './Cs'


const Resetpass = () => {
  let obj = useContext(Ct)
  const [pwd, setPwd] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  let update = () => {
    if (pwd !== "") {
      axios.put("https://blue-shop.onrender.com/forgotpass", { email, pwd }).then((res) => {
        alert(res.data.message);
        if (res.data.message === "password updated successfully") {
          localStorage.removeItem("resetEmail");
          obj.upd({ "token": "", "name": "", "_id": "", "role": "" })
          Cookies.remove('user');
          Cookies.remove("cartlength");
          sessionStorage.removeItem("proddet")
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
          <label className="label" htmlFor="input">Enter New Password</label>
        </div>
        <button className="submit-btn" onClick={update}>update Password</button>
      </div>
    </div>
  )
}

export default Resetpass