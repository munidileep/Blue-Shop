import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import Ct from './Cs';

const Buynow = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Generate a random date within the last 30 days
    let randomDaysAgo = Math.floor(Math.random() * 30);
    let orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - randomDaysAgo);

    let day = orderDate.getDate();
    let month = months[orderDate.getMonth()];
    let weekday = weekdays[orderDate.getDay()];
    let id = Math.random().toString(36).substring(2, 10 + 2).toUpperCase();

    let navigate = useNavigate()
    let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    let obj = useContext(Ct)

    let shop = ()=>{
      navigate("/")
    }

    useEffect(()=>{
      if(user){
          obj.upd(user)
      }
      else{
        navigate("/login")
      }
    },[])

  return (
    <div className='ordcon'>
        <img className="ordimg" src='https://www.pngall.com/wp-content/uploads/9/Green-Tick-Vector-PNG-Images.png' alt='error'/>
        <h1>Your order is placed successfully</h1>
        <p><b>order id :</b> #{id}</p>
        <h3>Estimated Delivery by {day} {month}, {weekday}</h3>
        <button className='ordbtn' onClick={shop}>Continue Shopping</button>
    </div>
  )
}

export default Buynow