import '../App.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useContext } from 'react';
import Ct from './Cs';

const Orders = () => {
    let navigate = useNavigate()
    let user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    let obj = useContext(Ct)
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        else {
            obj.upd(user)
        }
    }, [])
    return (
        <div className='formcon'>
            <div className='orders-con'>
                This page is under construction
            </div>
        </div>
    )
}

export default Orders