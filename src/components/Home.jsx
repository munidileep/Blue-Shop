import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Cs';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

const Home = () => {
  let obj = useContext(Ct)
  let[prod,uprod]=useState([])
  let navigate=useNavigate()
  let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  useEffect(()=>{
    if(user){
      obj.upd(user)
    }
    fetchprod();
  },[])

  function fetchprod() {
    axios.get("https://blue-shop.onrender.com/products").then((res) => {
      uprod((res.data).sort(() => Math.random() - 0.5));
    });
  }

  function knowmore(prodobj) {
    if (user) {
      // obj.upd({"proddet":prodobj})
      sessionStorage.setItem("proddet", JSON.stringify(prodobj)); // saved in the session storage bcoz for reloading
      navigate("/Km");
    }
    else {
      navigate("/login");
    }
  }

  function addcart(prodobj) {
    if (obj.state.token !== "") {
      axios.post("https://blue-shop.onrender.com/addcart", { "uid": obj.state._id, "pid": prodobj._id, "pimg": prodobj.pimg, "price": prodobj.price, "name": prodobj.name, "qty": 1, "desc": prodobj.desc, "cat": prodobj.cat }, { headers: { Authorization: user.token } }).then(() => {
        navigate("/cart");
      });
    }
    else {
      localStorage.setItem("pendingCartItem", JSON.stringify(prodobj));
      navigate("/login");
    }
  }

  function del(delobj) {
    console.log(delobj);
    axios.delete(`https://blue-shop.onrender.com/delprod/${delobj._id}`).then((res) => {
      fetchprod();
    });
  }

  function buynow(buyprod) {
    if (obj.state.token !== "") {
      navigate("/buynow");
    }
    else {
      navigate("/login");
    }
  }

  function edit(editobj) {
    obj.upd({ "proddet": editobj });
    sessionStorage.setItem("editprod", JSON.stringify(editobj));
    navigate("/edit");
  }

  return (
    <div className='cardcon'>
      {
        prod.map((pobj)=>{
          return ( <div className='card' key={pobj._id}> {/* Added key here bcoz when rendering a list of elements in React, each child must have a unique key prop. */}
          <Card sx={{ maxWidth : 320, boxShadow: '12px 12px 15px rgba(0, 0, 0, 0.4)' }}>
          <CardMedia onClick={()=>knowmore(pobj)}
            sx={{ width: 'auto', height: 'auto',margin:2,border:1, aspectRatio: '1 / 1', cursor: 'pointer', '&:hover': { opacity: 0.8 }, objectFit: 'cover' }}
            image={pobj.pimg}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{fontFamily:"century Gothic"}}>
              {pobj.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{fontFamily:"century Gothic"}}>
              {pobj.desc}
            </Typography><br></br>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} style={{fontFamily:"century Gothic",fontWeight:'bold',fontSize:"20px",color:"black"}}>
              Price : {pobj.price}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex',  flexWrap: 'wrap',  gap: 1,  justifyContent: 'space-evenly'}}>
            {obj.state.role === "user" &&<Button className='btn2' size="small" onClick={()=>knowmore(pobj)}>Know More</Button>}
            <Button className='btn2' size="small" onClick={()=>addcart(pobj)}>Add Cart</Button>
            {(obj.state.role === "user" || obj.state.role === "") && <Button size="small" onClick={()=>buynow(pobj)}>Buy now </Button>}
            {obj.state.token !== ""  && obj.state.role === "admin" && <Button className='btn2' size="small" onClick={()=>del(pobj)}>Delete</Button>}
            {obj.state.token !== "" && obj.state.role === "admin" && <Button className='btn2' size="small" onClick={()=>edit(pobj)}>Edit</Button>}
          </CardActions>
        </Card>
        </div>)
        })
      
    }
    </div>
  );
}

export default Home