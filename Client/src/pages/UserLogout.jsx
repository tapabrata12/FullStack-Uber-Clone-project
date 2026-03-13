import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((responce) => {
            if (responce.status === 200) {
                localStorage.removeItem('token');
                navigate('/user-login');
            }
        });
    }, []);

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout