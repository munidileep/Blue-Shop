import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Cs'
import Cookies from 'js-cookie';

const Editprod = () => {
    let navigate = useNavigate()
    let obj = useContext(Ct)
    let fd = new FormData()
    let [data, udata] = useState({ "_id": "", "name": "", "cat": "", "desc": "", "price": "" })
    let editprod = JSON.parse(sessionStorage.getItem("editprod")) || {};
    let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    

    let fun = (e) => {
        udata({ ...data, [e.target.name]: e.target.value })
    }

    let fun1 = (e) => {
        fd.append("pimg", e.target.files[0])
    }

    useEffect(() => {
        let dataobj = {}
        if(!user){
            navigate("/login")
        }
        if (!obj.state.token) {
            dataobj = {...dataobj,...user}
        }
        if(!obj.state.proddet){
            delete editprod.comm;
            dataobj = {...dataobj,"proddet":editprod}
            obj.upd(dataobj)
            udata(editprod)
        }
        else{
            let data = obj.state.proddet
            delete data['comm']
            udata({ ...data })
        }
    }, [])

    let edit = () => {
        if (data.name !== "" && data.price !== "" && data.desc !== "" && data.cat !== "" && data._id !== "") {
            axios.put("https://blue-shop.onrender.com/edit", data,{headers:{Authorization:user.token}}).then(() => {
                const conf = window.confirm("Details updated. Do you want to go to the home page?");
                if (conf) {
                    navigate("/");
                }
            })
        }
        else {
            alert("please fill all the details")
        }
    }

    let editimg = () => {
        fd.append("_id", data._id)
        fd.append("oldimg", data.pimg)
        axios.put("https://blue-shop.onrender.com/editimg", fd,{headers:{Authorization:user.token}}).then(() => {
            const conf = window.confirm("Image updated. Do you want to go to the home page?");
            if (conf) {
                navigate("/")
            }
        })
    }

    return (
        <div className='editcon'>
            <div className="form-control">
                <p className="title">Edit Product</p>
                <div className="input-field">
                    <input required="" className="input" type="text" name='name' onChange={fun} value={data.name} />
                    <label className="label" htmlFor="input">Enter name of product</label>
                </div>
                <div className="input-field">
                    <input required="" className="input" type="text" name='cat' onChange={fun} value={data.cat} />
                    <label className="label" htmlFor="input">Enter cat of product</label>
                </div>
                <div className="input-field">
                    <input required="" className="input" type="text" name='price' onChange={fun} value={data.price} />
                    <label className="label" htmlFor="input">Enter price of product</label>
                </div>
                <div className="input-field">
                    <textarea className="input" rows={4} name='desc' onChange={fun} value={data.desc} ></textarea>
                    <label className="label" htmlFor="input">Enter description</label>
                </div>
                <button className="submit-btn" onClick={edit}>Update Details</button>
            </div>
            <div className='form-control'>
                <span className="form-title">Upload Image</span>
                <p className="form-paragraph">
                    File should be an image
                </p>
                <label htmlFor="file-input" className="drop-container">
                    <span className="drop-title">Drop Image here</span>
                    or
                    <input type="file" accept="image/*" required="" id="file-input" onChange={fun1} />
                </label>
                <button className="submit-btn" onClick={editimg}>Update Image</button>
            </div>
        </div>
    )
}

export default Editprod