import whiteLogo from '../assets/Logo3.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserdetails] = useState({});
  const submitHadelar = (e) => {
    e.preventDefault();
    setUserdetails({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      password: password
    });

    setFirstName("");
    setMiddleName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }


  return (
    <div className='w-full h-screen flex flex-col text-base'>
      <nav className='bg-black h-[12%] w-full overflow-hidden pl-5 mb-5'>
        <img className='w-20 pb-5' src={whiteLogo} alt="Logo" />
      </nav>

      <form className='flex flex-col p-5 gap-5' onSubmit={(e) => { submitHadelar(e) }}>

        <label className='font-medium' htmlFor="text">What is your name?</label>

        <div className='flex gap-2 mb-5'>
          <input value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required type="text" className='bg-[#eeeeee] w-[50%] px-4 py-2 rounded-lg ' placeholder='First' />
          <input value={middleName} onChange={(e) => { setMiddleName(e.target.value) }} type="text" className='bg-[#eeeeee] w-[50%] px-4 py-2 rounded-lg ' placeholder='Middle' />
          <input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" className='bg-[#eeeeee] w-[50%]  px-4 py-2 rounded-lg ' placeholder='Last' />
        </div>

        <label className='font-medium' htmlFor="email">Enter your email address</label>
        <input value={email} onChange={(e) => { setEmail(e.target.value) }} className='bg-[#eeeeee] w-full px-4 py-2 rounded-lg ' required type="email" placeholder='email@email.com' />
        <label className=' font-medium' htmlFor="password">Enter your password</label>
        <input value={password} onChange={(e) => { setPassword(e.target.value) }} className='bg-[#eeeeee] w-full px-4 py-2 rounded-lg' required type="password" placeholder='myPass@134' />
        <input className='bg-[#111] w-full text-white px-4 py-2 rounded-lg cursor-pointer active:scale-95 mt-5' type="submit" value={"Create Account"} />

      </form>
      <p className='pl-5 pr-5 w-full flex justify-center gap-2 tracking-wide'>
        Aready a user? <Link to={"/user-login"} className='text-blue-400 no-underline hover:underline'>Login</Link>
      </p>

      <footer className='p-5 pr-5 w-full flex justify-center gap-2 tracking-wide text-xs mt-auto text-[#5E5E5E] leading-tight'>
        By continuing, you agree to calls, including by autodialer, WhatsApp, or texts from Uber and its affiliates.
      </footer>
    </div>
  )
}

export default UserSignup