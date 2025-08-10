
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import Ct from './Cs';
import { Avatar, Menu, MenuItem } from "@mui/material";
import { lightBlue } from '@mui/material/colors';
import Cookies from 'js-cookie';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = () => {
  let obj = useContext(Ct);
  const [anchorEl, setAnchorEl] = useState(null);
  let [forsearch, updsearch] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();
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
    setMobileOpen(false);
    setTimeout(() => navigate("/logout"), 0);
  }

  function profile() {
    menuclose();
    setMobileOpen(false);
    setTimeout(() => navigate("/profile"), 0);
  }

  function edit() {
    menuclose();
    setMobileOpen(false);
    setTimeout(() => navigate("/editprofile"), 0);
  }

  const handleSearch = (e) => {
    if (e.target.value !== "") {
      updsearch(e.target.value);
      sessionStorage.setItem("searchprod", JSON.stringify(e.target.value));
    } else {
      updsearch([]);
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    obj.upd({ "searchd": forsearch });
    updsearch([]);
    navigate("/search");
  };

  useEffect(() => {
    if (refresh_prod) {
      updsearch(refresh_prod);
    }
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar">
        {/* Logo */}
        <h1 className="logo">
          <i className="fa-brands fa-shopify"></i> Blueshop
        </h1>

        {/* Desktop Search */}
        <form className="search-container desktop-search" onSubmit={handleSubmitSearch}>
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            className="searchbar"
            name="text"
            placeholder="Search..."
            type="text"
            value={forsearch}
            onChange={handleSearch}
          />
          <button type="submit" className="searchbutton">
            Search
          </button>
        </form>

        {/* Hamburger for Mobile */}
        <div className="menu-icon" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Links */}
        <div className={`nav-links ${mobileOpen ? "active" : ""}`}>
          <Link className="navanchor" to="/" onClick={() => setMobileOpen(false)}>
            Products <i className="fa-solid fa-shop"></i>
          </Link>

          {obj.state.token === "" && (
            <Link className="navanchor" to="/login" onClick={() => setMobileOpen(false)}>
              Signin <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </Link>
          )}

          {obj.state.token !== "" && obj.state.role === "admin" && (
            <Link className="navanchor" to="/add" onClick={() => setMobileOpen(false)}>
              AddProd <i className="fa-solid fa-cart-plus"></i>
            </Link>
          )}

          {obj.state.token !== "" && (
            <Link className="navanchor" to="/cart" onClick={() => setMobileOpen(false)}>
              Cart <i className="fa-solid fa-cart-shopping"></i>{" "}
              {cart_length > 0 && <button className="cartlen">{cart_length}</button>}
            </Link>
          )}

          {obj.state.token !== "" && (
            <Link className="navanchor" to="/orders" onClick={() => setMobileOpen(false)}>
              Orders <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </Link>
          )}

          {obj.state.token !== "" && (
            <div className="name" onClick={menuopen}>
              <Avatar sx={{ bgcolor: lightBlue[900] }}>
                {obj.state.name[0].toUpperCase()}
              </Avatar>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={menuclose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right', // where the menu is anchored to the button
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right', // starting point inside the menu
          }}
          sx={{mt:1}}
        >
          <MenuItem onClick={profile}>
            Profile <i className="fa-solid fa-user"></i>
          </MenuItem>
          <MenuItem onClick={edit}>
            Edit <i className="fa-solid fa-pen-to-square"></i>
          </MenuItem>
          <MenuItem onClick={signout}>
            Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </MenuItem>
        </Menu>

      </div>

      {/* Mobile Search Below Navbar */}
      <form className="search-container mobile-search" onSubmit={handleSubmitSearch}>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          className="searchbar"
          name="text"
          placeholder="Search..."
          type="text"
          value={forsearch}
          onChange={handleSearch}
        />
        <button type="submit" className="searchbutton">
          Search
        </button>
      </form>
    </>
  );
};

export default Nav;
