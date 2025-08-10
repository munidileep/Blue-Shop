import axios from 'axios'
import { useState, useEffect, useContext, } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';
import Ct from './Cs';

const Forgotpass = () => {
    let navigate = useNavigate()
    let location = useLocation()
    let [email, setEmail] = useState({ "_id": "", "forgot": true })
    let [message, umessage] = useState("")
    let obj = useContext(Ct)
    let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const fdata = location.state?.data;

    let send = () => {
        console.log(fdata)
        if (email._id !== "") {
            console.log(email)
            axios.post("http://localhost:5555/sendotp", email).then((res) => {
                let result = res.data.message
                if (result === "OTP sent to your email") {
                    localStorage.setItem("resetEmail", email._id);
                    setEmail({"_id": "","forgot":true })
                    if(fdata){
                        navigate("/verifyotp", {replace:true, state: { "data": fdata } });
                    }
                    else{
                        navigate("/verifyotp");
                    }
                }
                else {
                    umessage(result)
                }
            })
        }
        else {
            umessage("please enter email")
        }
    }

    useEffect(() => {
        if (user) {
            obj.upd(user)
        }
        if(fdata){
            setEmail({ "_id": fdata._id,"forgot":false })
        }
    }, [])



    useEffect(() => {
        const timer = setTimeout(() => {
            umessage("")
        }, 5000)
        return () => clearTimeout(timer);
    }, [message])


    return (
        <div className='formcon'>
            <div className="form-control">
                <p className="title">Send OTP </p>
                <div className='message'>{message}</div>
                <div className="input-field">
                    <input required="" className="input" type="text" name='_id' onChange={(e) => setEmail({ ...email, [e.target.name]: e.target.value })} />
                    <label className="label" htmlFor="input">Enter Email</label>
                </div>
                <button className="submit-btn" onClick={send}>Send OTP</button>
            </div>
        </div>
    )
}

export default Forgotpass