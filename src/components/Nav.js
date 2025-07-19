import React, { useContext,useEffect,useState } from 'react'
import {Link} from 'react-router-dom'
import "../App.css"
import Ct from './Cs'
import { Avatar, Menu, MenuItem } from "@mui/material";
import {lightBlue} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const Nav = () => {
  let obj = useContext(Ct)
  const [anchorEl, setAnchorEl] = useState(null);
  let [forsearch,updsearch]=useState([])
  const open = Boolean(anchorEl);
  let navigate=useNavigate()
  let cart_length = Cookies.get('cartlength') ? Cookies.get('cartlength') : 0;
  let refresh_prod = JSON.parse(sessionStorage.getItem("searchprod"));

  const menuopen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuclose = () => {
    setAnchorEl(null);
  };

  function signout() {
    menuclose();
    // navigate("/logout");
    setTimeout(() => navigate("/logout"), 0);
  }

  function profile(){
    menuclose();
    // navigate("/profile")
    setTimeout(() => navigate("/profile"), 0);
  }

  function edit(){
    menuclose();
    // navigate("/editprofile")
    setTimeout(() => navigate("/editprofile"), 0);
  }

  const handleSearch = (e) => {
    if(e.target.value!==""){
      updsearch(e.target.value);
      sessionStorage.setItem("searchprod", JSON.stringify(e.target.value))
    }
    else{
      updsearch([])
    }
  };
  
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    obj.upd({"searchd": forsearch});
    updsearch([])
    navigate("/search");
  };

  useEffect(()=>{
    if(refresh_prod){
      updsearch(refresh_prod)
    }
  },[])

  return (
    <div className='navbar'>
        <h1><i className="fa-brands fa-shopify"></i>  Blueshop</h1>
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input className="searchbar" name="text" placeholder="Search..." type="text" value={forsearch} onChange={handleSearch}/>
          <button onClick={handleSubmitSearch} className='searchbutton'>Search</button>
        </div>
        <Link className='navanchor' to="/">Products <i className="fa-solid fa-shop"></i></Link>
        {obj.state.token === "" && <Link className='navanchor' to="/login">Signin <i className="fa-solid fa-arrow-right-to-bracket"></i></Link>}
        {obj.state.token !== ""&& obj.state.role === "admin" && <Link className='navanchor' to="/add">AddProd <i className="fa-solid fa-cart-plus"></i></Link>}
        {obj.state.token !== "" && <Link className='navanchor' to="/cart">Cart <i className="fa-solid fa-cart-shopping"></i> {cart_length>0 &&<button className='cartlen'>{cart_length}</button>}</Link>}
        {obj.state.token !== "" && <Link className='navanchor' to="">orders <i className="fa-solid fa-arrow-right-from-bracket"></i></Link>}
        {obj.state.token !== "" && <div className='name' onClick={menuopen}><Avatar sx={{ bgcolor: lightBlue[900] }}>{obj.state.name[0].toUpperCase()}</Avatar></div>}
        <Menu anchorEl={anchorEl} open={open} onClose={menuclose}>
        <MenuItem onClick={profile}>Profile <i className="fa-solid fa-user"></i></MenuItem>
        <MenuItem onClick={edit}>Edit <i className="fa-solid fa-pen-to-square"></i></MenuItem>
        <MenuItem onClick={signout}>Logout <i className="fa-solid fa-arrow-right-from-bracket"></i></MenuItem>
      </Menu>
    </div>
  )
}

export default Nav
