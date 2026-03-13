import whiteLogo from '../assets/Logo3.png'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from 'axios';
import { UserDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();
  async function submitHadelar(e) {
    e.preventDefault();

    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/login`, userData);

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      console.log(user);
      
      navigate('/home');
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className='w-full h-screen flex flex-col text-base'>
      <nav className='bg-black h-[12%] w-full overflow-hidden pl-5 mb-10'>
        <img className='w-20 pb-5' src={whiteLogo} alt="Logo" />
      </nav>

      <form className='flex flex-col gap-5 p-5' onSubmit={(e) => { submitHadelar(e) }}>
        <label className='font-medium' htmlFor="email">Enter your email address</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] w-full px-4 py-2 rounded-lg ' required type="email" placeholder='email@email.com' />
        <label className='font-medium' htmlFor="password">Enter your password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='bg-[#eeeeee] w-full px-4 py-2 rounded-lg' required type="password" placeholder='myPass@134' />
        <input className='bg-[#111] w-full text-white px-4 py-2 rounded-lg cursor-pointer active:scale-95' type="submit" value={"Login"} />

      </form>
      <p className='pl-5 pr-5 w-full flex justify-center gap-2 tracking-wide'>
        New to Uber? <Link to={"/user-signup"} className='text-blue-400 no-underline hover:underline'>Create an account</Link>
      </p>

      <footer className='p-5 pr-5 w-full flex justify-center gap-2 tracking-wide text-xs mt-auto text-[#5E5E5E] leading-tight'>
        By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
      </footer>
    </div>
  )
}

export default UserLogin