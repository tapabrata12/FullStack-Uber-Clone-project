import { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/captain-login');
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/captain/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((responce) => {
            if (responce.status === 200) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
        }).catch((err) => {
            console.log(err);
            localStorage.removeItem('token');
            navigate('/captain-login');
        });
    }, [navigate]);

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout