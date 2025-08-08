import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Ct from './Cs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';

const Cart = () => {
  let navigate = useNavigate()
  let obj = useContext(Ct)
  let [cart, ucart] = useState([])
  let [total, utotal] = useState(0)
  let [f, setf] = useState(true)
  const userData = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  useEffect(() => {
    try {
      if (userData) {
        axios.get(`https://blue-shop.onrender.com/getcart/${userData._id}`, {
          headers: { Authorization: userData._id },
        }).then((res) => {
          ucart(res.data);
          Cookies.set("cartlength", res.data.length);
          let s = 0;
          for (let i = 0; i < res.data.length; i++) {
            s = s + res.data[i].qty * res.data[i].price;
          }
          utotal(s);
          obj.upd(userData);
        }).catch((error) => {
          console.error("Error fetching cart data:", error);
        });
      } else {
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error("Unexpected error occurred:", error);
      navigate("/login");
    }

  }, [f, navigate])

  let knowmore = (prodobj) => {
    let productDetails = { ...prodobj, _id: prodobj.pid };  // Ensure we keep original product ID
    sessionStorage.setItem("proddet", JSON.stringify(productDetails))
    // obj.upd({"proddet": productDetails });
    navigate("/Km");
  };

  let shopnow = () => {
    navigate("/")
  }

  let inc = (cid) => {
    if (cid)
      axios.get(`https://blue-shop.onrender.com/inc/${cid}`).then((res) => {
        setf(!f)
      })
  }

  let dec = (cid, qty) => {
    if (qty > 1) {
      axios.get(`https://blue-shop.onrender.com/dec/${cid}`).then((res) => {
        setf(!f)
      })
    }
    else {
      del(cid)
    }
  }

  let del = (cid) => {
    axios.delete(`https://blue-shop.onrender.com/delcart/${cid}`).then((res) => {
      setf(!f)
    })
  }

  let buynow = () => {
    navigate("/buynow")
  }


  return (
    <>
      <div className='cardcon2'>
        {cart.length === 0 && <div className='cart-empty'>
          <img src='https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' alt='err' />
          Your cart is empty! Start adding some amazing products.
          <button className='cart-shop' onClick={shopnow}>Shop Now</button></div>}
        {
          cart.map((pobj) => {
            return (
              <div className='card' key={pobj._id}>
                <Card sx={{boxShadow: '12px 12px 15px rgba(0, 0, 0, 0.4)' }}>
                  <CardMedia onClick={() => knowmore(pobj)}
                    sx={{ width: 'auto', height: 'auto', margin: 2, border: 1, aspectRatio: '1 / 1', cursor: 'pointer', '&:hover': { opacity: 0.8 }, objectFit: 'cover', }}
                    image={pobj.pimg}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ fontFamily: "century Gothic" }}>
                      {pobj.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{ fontFamily: "century Gothic", fontWeight: 'bold', fontSize: "20px", color: "black" }}>
                      Price : {pobj.price}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{display:'flex',justifyContent:'space-evenly'}}>
                    <Button size="small" onClick={() => del(pobj._id)}>Remove</Button>
                    <Button onClick={() => dec(pobj._id, pobj.qty)} size="small" style={{ fontSize: "30px" }}>-</Button>
                    <p style={{ color: "rgba(17, 118, 206, 0.8)" }}>{pobj.qty}</p>
                    <Button onClick={() => inc(pobj._id)} size="small" style={{ fontSize: "20px" }}>+</Button>
                  </CardActions>
                </Card>
              </div>)
          })

        }
      </div>
      {cart.length > 0 &&
        <div className='cart-nav'>
          <div className='cart-total'>
            <i className="fas fa-shopping-bag"></i> Cart Total : {total}
          </div>
          <button className='cart-shop' onClick={() => buynow()}>Place Order</button>
        </div>}
    </>
  )
}

export default Cart