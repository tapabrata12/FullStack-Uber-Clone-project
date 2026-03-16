import { useEffect, useContext, useState } from 'react';
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const CaptainWrapper = ({ children }) => {
    const { setCaptainData } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((responce) => {
            if (responce.status === 200) {
                setIsLoading(false);
                setCaptainData(responce.data);

            }
        }).catch((err) => {
            setIsLoading(false);
            localStorage.removeItem('token');
            navigate('/captain-login');
        })

    }, [token]);
  
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainWrapper