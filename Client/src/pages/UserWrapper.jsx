import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/user-login');
        }

    }, [token])


    return (
        <>
            {children}
        </>
    )
}

export default UserWrapper